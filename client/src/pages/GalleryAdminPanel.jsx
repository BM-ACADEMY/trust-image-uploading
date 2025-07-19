import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { X } from "lucide-react";
import ImageTable from "./ImageTable";

const ImageUploadCard = () => {
  const [sectionHeadline, setSectionHeadline] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [items, setItems] = useState([]);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

  const handleAdd = () => {
    if (!sectionHeadline || !title || !file) {
      toast.error("Please fill in the Gallery Heading, image title, and select a file.");
      return;
    }

    const newItem = {
      id: Date.now(),
      title,
      fileName: file.name,
      file,
      imageUrl: preview,
    };

    setItems([...items, newItem]);
    setTitle("");
    setFile(null);
    setPreview(null);
    document.getElementById("fileInput").value = "";
    toast.success("Item added successfully!");
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > MAX_FILE_SIZE) {
        toast.error("File size exceeds 5MB. Please select a smaller file.");
        setFile(null);
        setPreview(null);
        document.getElementById("fileInput").value = "";
        return;
      }

      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleRemove = (id) => {
    setItems(items.filter((item) => item.id !== id));
    toast.success("Item removed");
  };

  const handleSubmit = async () => {
    if (items.length === 0) {
      toast.error("No items to submit");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", sectionHeadline);

      items.forEach((item) => {
        formData.append("imageHeadings", item.title);
        formData.append("images", item.file);
      });

      const url = `${import.meta.env.VITE_API_BASE_URL}/gallery/create`;
      await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Gallery uploaded successfully!");
      setItems([]);
      setSectionHeadline("");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Upload failed.");
    }
  };

  return (
    <div className="bg-gray-100">
      <div className="flex items-center justify-center min-h-screen px-4 md:px-10">
        <Toaster position="top-center" />

        <div className="max-w-md w-full p-6 bg-white rounded-lg border border-gray-500/30 shadow text-sm">
          <div className="flex items-center justify-center w-11 h-11 bg-gray-500/10 rounded-full">
            📁
          </div>

          <h2 className="text-2xl text-gray-800 font-medium mt-3">Upload a file</h2>
          <p className="text-gray-500/80 mt-1">Attach the file below (max 5MB)</p>

          <input
            id="sectionHeadline"
            type="text"
            value={sectionHeadline}
            onChange={(e) => setSectionHeadline(e.target.value)}
            placeholder="Enter Gallery Heading"
            className="w-full px-3 py-2 mt-4 border rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            aria-label="Gallery Heading"
          />

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter image title"
            className="w-full mt-4 px-3 py-2 border rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            aria-label="Image title"
          />

          <label
            htmlFor="fileInput"
            className="border-2 border-dotted border-gray-400 p-8 mt-4 flex flex-col items-center gap-4 cursor-pointer hover:border-blue-500 transition"
          >
            {preview ? (
              <img src={preview} alt="Preview" className="max-h-40 max-w-full object-contain" />
            ) : (
              <>
                <svg width="31" height="31" viewBox="0 0 31 31" fill="none">
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
              id="fileInput"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept="image/*"
              aria-label="Upload image"
            />
          </label>

          <div className="mt-6 flex justify-end gap-4">
            <button
              type="button"
              className="px-6 py-2 border border-gray-500/50 bg-white hover:bg-blue-100/30 active:scale-95 transition-all text-gray-500 rounded"
              onClick={() => {
                setTitle("");
                setFile(null);
                setPreview(null);
                document.getElementById("fileInput").value = "";
              }}
              aria-label="Cancel upload"
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 active:scale-95 transition-all text-white rounded"
              onClick={handleAdd}
              aria-label="Add image"
            >
              Add
            </button>
            <button
              type="button"
              className="px-6 py-2 bg-green-500 hover:bg-green-600 active:scale-95 transition-all text-white rounded"
              onClick={handleSubmit}
              aria-label="Submit gallery"
            >
              Submit
            </button>
          </div>

          {/* Uploaded Items Preview */}
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Uploaded Images</h3>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <img src={item.imageUrl} alt={item.title} className="w-12 h-12 object-cover rounded" />
                    <span className="font-medium">{item.title}</span>
                  </div>
                  <X
                    className="w-5 h-5 cursor-pointer text-gray-500 hover:text-red-500"
                    onClick={() => handleRemove(item.id)}
                    aria-label={`Remove ${item.title}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div>
        <ImageTable />
      </div>
    </div>
  );
};

export default ImageUploadCard;