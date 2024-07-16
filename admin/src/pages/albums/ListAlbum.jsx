import { useContext } from "react";
import { AddContext } from "../../context/AddContext";
import { assets } from "../../assets/assets";

const ListAlbum = () => {
  const { listAlbum, deleteAlbum } = useContext(AddContext);
  return (
    <div>
      <p>All Songs List</p>
      <br />
      <div>
        <div className="sm:grid grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] hidden gap-2.5 items-center p-3 border border-gray-300 text-sm bg-gray-100 mr-5">
          <p>Image</p>
          <p>Name</p>
          <p>Description</p>
          <p>Background Color</p>
          <p>Delete</p>
        </div>
        {listAlbum.map((album, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] gap-2.5 items-center p-3 border border-gray-300 text-sm mr-5"
            >
              <img
                src={album.image}
                className="w-16 h-12 object-cover"
                alt="song-image"
              />
              <p>{album.name}</p>
              <p>{album.description}</p>
              <input type="color" defaultValue={album.backgroundColor} />
              <img
                onClick={() => deleteAlbum(album._id)}
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

export default ListAlbum;
