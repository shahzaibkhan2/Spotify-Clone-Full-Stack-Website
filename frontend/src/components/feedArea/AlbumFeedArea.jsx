import { useParams } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { assets } from "../../assets/assets";
import { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../../context/PlayerContext";

const AlbumFeedArea = () => {
  const { playSongWithId, albumsData, songsData, isLoggedIn } =
    useContext(PlayerContext);
  const { id } = useParams();
  const [albumData, setAlbumData] = useState("");

  useEffect(() => {
    albumsData.map((album) => {
      if (album._id === id) {
        setAlbumData(album);
      }
    });
  }, []);

  return albumData ? (
    <>
      <Navbar />
      <article className="flex mt-10 flex-col gap-8 md:flex-row md:items-end">
        <img className="rounded w-48" src={albumData.image} alt="album-image" />
        <div className="flex flex-col">
          <p>Playlist</p>
          <h2 className="font-bold text-5xl mb-4 md:text-7xl">
            {albumData.name}
          </h2>
          <h4>{albumData.description}</h4>
          <p className="mt-1 flex gap-4">
            <img className="w-6" src={assets.miniLogo} alt="logo" />
            <b>Spotify</b>
            2,464,322 likes
            <b>30 songs </b>
            about 4 hr 10 min
          </p>
        </div>
      </article>
      <article className="grid grid-cols-3 sm:grid-cols-4 mb-4 mt-10 text-[#a7a7a7] pl-2">
        <p>
          <b className="mr-4">No.</b>Title
        </p>
        <p>Album</p>
        <p className="hidden sm:block">Date Added</p>
        <img className="w-4 m-auto" src={assets.clock_icon} alt="clock" />
      </article>
      <hr />
      {songsData
        .filter((filteredSong) => filteredSong.album === albumData.name)
        .map((song, index) => (
          <article
            onClick={() => playSongWithId(song._id)}
            key={index}
            className="grid grid-cols-3 sm:grid-cols-4 p-2 items-center gap-2 cursor-pointer text-[#a7a7a7] hover:bg-[#ffffff2b]"
          >
            <p className="text-white">
              <b className="text-[#a7a7a7] mr-4">{index + 1}</b>
              <img
                className="w-10 mr-5 inline"
                src={song.image}
                alt="song-image"
              />
              {song.name}
            </p>
            <p className="text-[15px]">{albumData.name}</p>
            <p className="text-[15px] hidden sm:block">3 days ago</p>
            <p className="text-center text-[15px]">{song.duration}</p>
          </article>
        ))}
    </>
  ) : null;
};

export default AlbumFeedArea;
