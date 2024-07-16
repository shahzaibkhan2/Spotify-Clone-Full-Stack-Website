import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import AddSong from "./pages/songs/AddSong";
import ListSong from "./pages/songs/ListSong";
import AddAlbum from "./pages/albums/AddAlbum";
import ListAlbum from "./pages/albums/ListAlbum";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <main className="flex min-h-screen items-star">
      <ToastContainer />
      <Sidebar />
      <div className="h-screen flex-1 bg-[#f3fff7] overflow-y-scroll">
        <Navbar />
        <div className="pl-5 pt-8 sm:pl-12 sm:pt-12">
          <Routes>
            <Route path="/add-song" element={<AddSong />} />
            <Route path="/list-song" element={<ListSong />} />
            <Route path="/add-album" element={<AddAlbum />} />
            <Route path="/list-album" element={<ListAlbum />} />
          </Routes>
        </div>
      </div>
    </main>
  );
};

export default App;
