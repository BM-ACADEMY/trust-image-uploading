import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Gallery from './pages/GalleryAdminPanel';
import Admin from './pages/GalleryAdminPanel';
import Presentations from './pages/Presentations';
import WhatsAppChatIcon from './components/floatingcomponent';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Presentations" element={<Presentations />} />
            <Route path="/Services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/admin-kiet-trust" element={<Admin />} />
          </Routes>
        </main>
        <WhatsAppChatIcon />
        <Footer />
      </div>
    </Router>
  );
}

export default App;