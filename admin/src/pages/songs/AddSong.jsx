import { useContext } from "react";
import { assets } from "../../assets/assets";
import { AddContext } from "../../context/AddContext";

const AddSong = () => {
  const {
    song,
    image,
    isLoading,
    onSubmitHandler,
    songRef,
    imageRef,
    albumRef,
    descriptionRef,
    nameRef,
    handleImageAudioUpload,
    listAlbum,
  } = useContext(AddContext);

  return isLoading ? (
    <div className="grid min-h-[80vh] place-items-center">
      <div className="h-16 w-16 border-4 place-items-center border-gray-400 border-t-green-800 animate-spin rounded-full"></div>
    </div>
  ) : (
    <form
      onSubmit={onSubmitHandler}
      className="flex items-start flex-col text-gray-600 gap-8"
    >
      <section className="flex gap-8">
        <div className="flex gap-4 flex-col">
          <p>Upload Song</p>
          <input
            onChange={() => handleImageAudioUpload(songRef, "audio")}
            ref={songRef}
            type="file"
            id="song"
            accept="audio/*"
            hidden
          />
          <label htmlFor="song">
            <img
              className="w-24 cursor-pointer"
              src={song ? assets.upload_added : assets.upload_song}
              alt="upload"
            />
          </label>
        </div>
        <div className="flex gap-4 flex-col">
          <p>Upload Image</p>
          <input
            onChange={() => handleImageAudioUpload(imageRef, "image")}
            ref={imageRef}
            type="file"
            id="image"
            accept="image/*"
            hidden
          />
          <label htmlFor="image">
            <img
              className="w-24 cursor-pointer"
              src={image ? image : assets.upload_area}
              alt="upload"
            />
          </label>
        </div>
      </section>
      <section className="flex gap-2.5 flex-col">
        <p>Song Name</p>
        <input
          ref={nameRef}
          type="text"
          className="outline-green-600 border-2 bg-transparent border-gray-400 p-2.5 custom-width-2xl"
          placeholder="Name Here..."
          required
        />
      </section>
      <section className="flex gap-2.5 flex-col">
        <p>Song Description</p>
        <input
          ref={descriptionRef}
          type="text"
          className="outline-green-600 border-2 bg-transparent border-gray-400 p-2.5 custom-width-2xl"
          placeholder="Description Here..."
          required
        />
      </section>
      <section className="flex gap-2.5 flex-col">
        <p>Album</p>
        <select
          ref={albumRef}
          className="outline-green-600 border-2 bg-transparent border-gray-400 p-2.5 w-[150px]"
        >
          <option value="none">None</option>
          {listAlbum.map((item, index) => (
            <option key={index} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </section>
      <button
        type="submit"
        className="bg-black text-base text-white px-14 py-2.5 rounded-lg cursor-pointer"
      >
        Upload
      </button>
    </form>
  );
};

export default AddSong;
