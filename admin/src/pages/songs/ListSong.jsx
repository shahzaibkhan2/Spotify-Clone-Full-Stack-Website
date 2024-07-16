import { useContext } from "react";
import { AddContext } from "../../context/AddContext";
import { assets } from "../../assets/assets";

const ListSong = () => {
  const { listSong, deleteSong } = useContext(AddContext);
  return (
    <div>
      <p>All Songs List</p>
      <br />
      <div>
        <div className="sm:grid grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] hidden gap-2.5 items-center p-3 border border-gray-300 text-sm bg-gray-100 mr-5">
          <p>Image</p>
          <p>Name</p>
          <p>Album</p>
          <p>Duration</p>
          <p>Delete</p>
        </div>
        {listSong.map((song, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] gap-2.5 items-center p-3 border border-gray-300 text-sm mr-5"
            >
              <img
                src={song.image}
                className="w-16 h-12 object-cover"
                alt="song-image"
              />
              <p>{song.name}</p>
              <p>{song.album}</p>
              <p>{song.duration}</p>
              <img
                onClick={() => deleteSong(song._id)}
                className="w-6 cursor-pointer"
                src={assets.remove}
                alt="remove"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListSong;
