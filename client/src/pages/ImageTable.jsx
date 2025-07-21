import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Edit, Trash2, Plus } from "lucide-react";
import { toast } from "react-hot-toast";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const ImageTable = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editHeading, setEditHeading] = useState("");
  const [editFile, setEditFile] = useState(null);
  const [addMoreItem, setAddMoreItem] = useState(null);
  const [addMoreHeading, setAddMoreHeading] = useState("");
  const [addMoreFile, setAddMoreFile] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({
    itemId: null,
    index: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Loading state for edit
  const [isAdding, setIsAdding] = useState(false); // Loading state for add more
  const [isDeleting, setIsDeleting] = useState(null); // Loading state for delete (per item)
  const ITEMS_PER_PAGE = 5;
  const MAX_PAGE_BUTTONS = 5;

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/gallery`);
      console.log("Fetched gallery items:", res.data); // Debug: Log fetched data
      setGalleryItems(res.data);
    } catch (error) {
      console.error("Error fetching gallery:", error);
      toast.error("Failed to fetch gallery.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (itemId, imageIndex) => {
    setIsDeleting(`${itemId}-${imageIndex}`); // Set deleting state for specific item
    try {
      await axios.delete(`${API_BASE}/gallery/delete-image/${itemId}/${imageIndex}`);
      toast.success("Image deleted successfully!");
      fetchGallery();
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Failed to delete image.");
    } finally {
      setIsDeleting(null);
    }
  };

  const openEditModal = (item, index) => {
    setEditingItem(item);
    setEditingIndex(index);
    setEditHeading(item.images[index].imageHeading);
    setEditTitle(item.title);
    setEditFile(null);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingItem) return;

    setIsEditing(true); // Start editing loading
    const formData = new FormData();
    formData.append("imageHeading", editHeading);
    formData.append("title", editTitle);
    if (editFile) formData.append("image", editFile);

    try {
      await axios.put(
        `${API_BASE}/gallery/update-image/${editingItem._id}/${editingIndex}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      toast.success("Image and title updated successfully!");
      setEditingItem(null);
      fetchGallery();
    } catch (err) {
      console.error("Error updating image:", err);
      toast.error("Failed to update.");
    } finally {
      setIsEditing(false); // Stop editing loading
    }
  };

  const handleAddMoreSubmit = async (e) => {
    e.preventDefault();
    if (!addMoreFile || !addMoreHeading || !addMoreItem) {
      return toast.error("Heading and file are required.");
    }

    setIsAdding(true); // Start adding loading
    const formData = new FormData();
    formData.append("imageHeading", addMoreHeading);
    formData.append("image", addMoreFile);

    try {
      await axios.put(
        `${API_BASE}/gallery/update-image/${addMoreItem._id}/-1`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      toast.success("Image added successfully!");
      setAddMoreItem(null);
      setAddMoreHeading("");
      setAddMoreFile(null);
      fetchGallery();
    } catch (err) {
      console.error("Error adding image:", err);
      toast.error("Failed to add image.");
    } finally {
      setIsAdding(false); // Stop adding loading
    }
  };

  const flattened = useMemo(
    () =>
      galleryItems.flatMap((item) =>
        item.images.map((img, idx) => ({
          ...img,
          imageUrl: img.imageUrl,
          imageHeading: img.imageHeading,
          itemId: item._id,
          title: item.title,
          index: idx,
        }))
      ),
    [galleryItems]
  );

  const totalPages = Math.ceil(flattened.length / ITEMS_PER_PAGE);
  const paginated = useMemo(
    () =>
      flattened.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
      ),
    [flattened, currentPage]
  );

  const getPageRange = () => {
    const half = Math.floor(MAX_PAGE_BUTTONS / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + MAX_PAGE_BUTTONS - 1);

    if (end - start + 1 < MAX_PAGE_BUTTONS) {
      start = Math.max(1, end - MAX_PAGE_BUTTONS + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const handleImageError = (e, imageUrl) => {
    console.error(`Failed to load image: ${imageUrl}`); // Debug: Log image load errors
    e.target.src = "https://via.placeholder.com/300?text=Image+Not+Found"; // Fallback image
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-12 lg:px-20 py-6">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-indigo-500 to-purple-600">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                  Title
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                  Heading
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                  Image
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : paginated.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                    No images found.
                  </td>
                </tr>
              ) : (
                paginated.map((img) => (
                  <tr
                    key={`${img.itemId}-${img.index}`}
                    className="hover:bg-gray-100"
                  >
                    <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                      {img.title}
                    </td>
                    <td
                      className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate"
                      title={img.imageHeading}
                    >
                      {img.imageHeading}
                    </td>
                    <td className="px-6 py-4">
                      <img
                        src={img.imageUrl} // Use absolute Cloudinary URL
                        alt={img.imageHeading || "Gallery image"}
                        className="w-16 h-16 object-cover rounded-lg border"
                        onError={(e) => handleImageError(e, img.imageUrl)} // Handle image load errors
                      />
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() =>
                            openEditModal(
                              galleryItems.find((g) => g._id === img.itemId),
                              img.index
                            )
                          }
                          className={`bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-lg relative ${
                            isEditing ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                          aria-label="Edit image"
                          disabled={isEditing || isAdding || isDeleting}
                        >
                          {isEditing && (
                            <svg
                              className="animate-spin h-5 w-5 text-white absolute inset-0 m-auto"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z"
                              ></path>
                            </svg>
                          )}
                          <Edit
                            size={18}
                            className={isEditing ? "opacity-0" : "opacity-100"}
                          />
                        </button>
                        <button
                          onClick={() =>
                            setDeleteConfirm({
                              itemId: img.itemId,
                              index: img.index,
                            })
                          }
                          className={`bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg relative ${
                            isDeleting === `${img.itemId}-${img.index}`
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          aria-label="Delete image"
                          disabled={isEditing || isAdding || isDeleting}
                        >
                          {isDeleting === `${img.itemId}-${img.index}` && (
                            <svg
                              className="animate-spin h-5 w-5 text-white absolute inset-0 m-auto"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z"
                              ></path>
                            </svg>
                          )}
                          <Trash2
                            size={18}
                            className={
                              isDeleting === `${img.itemId}-${img.index}`
                                ? "opacity-0"
                                : "opacity-100"
                            }
                          />
                        </button>
                        <button
                          onClick={() =>
                            setAddMoreItem(
                              galleryItems.find((g) => g._id === img.itemId)
                            )
                          }
                          className={`bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg relative ${
                            isAdding ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                          aria-label="Add more images"
                          disabled={isEditing || isAdding || isDeleting}
                        >
                          {isAdding && (
                            <svg
                              className="animate-spin h-5 w-5 text-white absolute inset-0 m-auto"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z"
                              ></path>
                            </svg>
                          )}
                          <Plus
                            size={18}
                            className={isAdding ? "opacity-0" : "opacity-100"}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 py-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1 || isLoading}
              className="px-3 py-1 rounded border text-sm bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
              aria-label="Previous page"
            >
              Prev
            </button>
            {getPageRange().map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded border text-sm ${
                  currentPage === page
                    ? "bg-indigo-600 text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
                aria-label={`Page ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages || isLoading}
              className="px-3 py-1 rounded border text-sm bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
              aria-label="Next page"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4 md:px-10">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative">
            <h2 className="text-lg font-semibold mb-4">Edit Image</h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">
                  Gallery Title
                </label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full border p-2 rounded"
                  aria-label="Gallery title"
                  disabled={isEditing}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Image Heading
                </label>
                <input
                  type="text"
                  value={editHeading}
                  onChange={(e) => setEditHeading(e.target.value)}
                  className="w-full border p-2 rounded"
                  aria-label="Image heading"
                  disabled={isEditing}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Current Image</label>
                <div
                  className={`relative w-32 h-32 group ${
                    isEditing ? "opacity-50 pointer-events-none" : ""
                  }`}
                  onClick={() =>
                    !isEditing && document.getElementById("edit-file-input").click()
                  }
                >
                  <img
                    src={
                      editFile
                        ? URL.createObjectURL(editFile)
                        : editingItem.images[editingIndex].imageUrl
                    }
                    alt="Preview"
                    className="w-full h-full object-cover rounded border"
                    onError={(e) => handleImageError(e, editingItem.images[editingIndex].imageUrl)}
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-sm rounded transition-opacity">
                    Click to change
                  </div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  id="edit-file-input"
                  onChange={(e) => setEditFile(e.target.files[0])}
                  className="hidden"
                  aria-label="Upload new image"
                  disabled={isEditing}
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className={`px-4 py-2 border rounded text-gray-600 ${
                    isEditing ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  aria-label="Cancel edit"
                  disabled={isEditing}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 bg-indigo-600 text-white rounded relative ${
                    isEditing ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  aria-label="Save changes"
                  disabled={isEditing}
                >
                  {isEditing ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-2 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z"
                        ></path>
                      </svg>
                      Saving...
                    </span>
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add More Modal */}
      {addMoreItem && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4 md:px-10">
          <div className="max-w-md w-full p-6 bg-white rounded-lg border border-gray-500/30 shadow-[0px_1px_15px_0px] shadow-black/10 text-sm">
            <h2 className="text-lg font-semibold mb-4">Add More Image</h2>
            <form onSubmit={handleAddMoreSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Image Heading
                </label>
                <input
                  type="text"
                  value={addMoreHeading}
                  onChange={(e) => setAddMoreHeading(e.target.value)}
                  className="w-full border p-2 rounded"
                  aria-label="New image heading"
                  disabled={isAdding}
                />
              </div>
              <label
                htmlFor="add-file-input"
                className={`border-2 border-dotted border-gray-400 p-4 mt-2 flex flex-col items-center gap-4 cursor-pointer hover:border-blue-500 transition min-h-[160px] justify-center ${
                  isAdding ? "opacity-50 pointer-events-none" : ""
                }`}
              >
                {addMoreFile ? (
                  <div className="w-32 h-32 rounded-lg overflow-hidden border">
                    <img
                      src={URL.createObjectURL(addMoreFile)}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <span className="text-sm text-gray-600 mt-2">
                      {addMoreFile.name}
                    </span>
                  </div>
                ) : (
                  <>
                    <svg
                      width="31"
                      height="31"
                      viewBox="0 0 31 31"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.085 2.583H7.75a2.583 2.583 0 0 0-2.583 2.584v20.666a2.583 2.583 0 0 0 2.583 2.584h15.5a2.583 2.583 0 0 0 2.584-2.584v-15.5m-7.75-7.75 7.75 7.75m-7.75-7.75v7.75h7.75M15.5 23.25V15.5m-3.875 3.875h7.75"
                        stroke="#2563EB"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="text-gray-500">Drag files here to upload</p>
                    <p className="text-gray-400">
                      Or <span className="text-blue-500 underline">click here</span> to select a file
                    </p>
                  </>
                )}
                <input
                  id="add-file-input"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setAddMoreFile(e.target.files[0])}
                  className="hidden"
                  aria-label="Upload new image"
                  disabled={isAdding}
                />
              </label>

              <div className="mt-6 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setAddMoreItem(null)}
                  className={`px-9 py-2 border border-gray-500/50 bg-white hover:bg-blue-100/30 active:scale-95 transition-all text-gray-500 rounded ${
                    isAdding ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  aria-label="Cancel upload"
                  disabled={isAdding}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-6 py-2 bg-indigo-500 hover:bg-indigo-600 active:scale-95 transition-all text-white rounded relative ${
                    isAdding ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  aria-label="Upload image"
                  disabled={isAdding}
                >
                  {isAdding ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-2 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z"
                        ></path>
                      </svg>
                      Uploading...
                    </span>
                  ) : (
                    "Upload File"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm.itemId !== null && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4 md:px-10">
          <div className="bg-white p-6 rounded-lg w-full max-w-sm text-center shadow-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Delete Confirmation
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete this image? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setDeleteConfirm({ itemId: null, index: null })}
                className={`px-4 py-2 border border-gray-400 text-gray-600 rounded hover:bg-gray-100 ${
                  isDeleting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                aria-label="Cancel deletion"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleDelete(deleteConfirm.itemId, deleteConfirm.index);
                  setDeleteConfirm({ itemId: null, index: null });
                }}
                className={`px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 relative ${
                  isDeleting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                aria-label="Confirm deletion"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z"
                      ></path>
                    </svg>
                    Deleting...
                  </span>
                ) : (
                  "Confirm"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageTable;