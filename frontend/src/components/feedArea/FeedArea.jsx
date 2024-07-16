import { Route, Routes, useLocation } from "react-router-dom";
import HomeFeedArea from "./HomeFeedArea";
import AlbumFeedArea from "./AlbumFeedArea";
import { useContext, useEffect } from "react";
import { PlayerContext } from "../../context/PlayerContext";

const FeedArea = () => {
  const { feedRef, albumsData } = useContext(PlayerContext);
  const location = useLocation();

  const isAlbum = location.pathname.includes("album");
  const albumId =
    isAlbum && albumsData.length > 0 ? location.pathname.split("/").pop() : "";
  const bgColor = isAlbum
    ? albumsData.find((album) => album._id === albumId).backgroundColor
    : "#121212";

  useEffect(() => {
    if (isAlbum) {
      feedRef.current.style.background = `linear-gradient(${bgColor}, #121212)`;
    } else {
      feedRef.current.style.background = "#121212";
    }
  });

  return (
    <main
      ref={feedRef}
      className="w-[100%] px-6 m-2 rounded pt-4 text-white bg-[#121212] lg:w-[75%] overflow-auto lg:ml-0"
    >
      {albumsData.length > 0 ? (
        <Routes>
          <Route path="/" element={<HomeFeedArea />} />
          <Route path="/album/:id" element={<AlbumFeedArea />} />
        </Routes>
      ) : null}
    </main>
  );
};

export default FeedArea;
