import { useContext } from "react";
import { assets } from "../../assets/assets";
import { AddContext } from "../../context/AddContext";

const AddAlbum = () => {
  const {
    albumImageRef,
    albumDescriptionRef,
    albumBgColorRef,
    albumNameRef,
    albumImage,
    handleImageAudioUpload,
    isLoading,
    albumOnSubmitHandler,
  } = useContext(AddContext);
  return isLoading ? (
    <div className="grid min-h-[80vh] place-items-center">
      <div className="h-16 w-16 border-4 place-items-center border-gray-400 border-t-green-800 animate-spin rounded-full"></div>
    </div>
  ) : (
    <form
      onSubmit={albumOnSubmitHandler}
      className="flex flex-col items-start text-gray-600 gap-8"
    >
      <div className="flex gap-4 flex-col">
        <p>Upload Image</p>
        <input
          onChange={() => handleImageAudioUpload(albumImageRef, "album-image")}
          ref={albumImageRef}
          type="file"
          accept="image/*"
          id="image"
          required
          hidden
        />
        <label className="cursor-pointer" htmlFor="image">
          <img
            className="w-24"
            src={albumImage ? albumImage : assets.uploadImg}
            alt="upload-image"
          />
        </label>
      </div>
      <div className="flex gap-2.5 flex-col">
        <p>Album Name</p>
        <input
          ref={albumNameRef}
          type="text"
          className="bg-transparent outline-green-600 border-2 p-2.5 border-gray-400 custom-width-2xl"
          required
          placeholder="Name Here"
        />
      </div>
      <div className="flex gap-2.5 flex-col">
        <p>Album Description</p>
        <input
          ref={albumDescriptionRef}
          type="text"
          className="bg-transparent outline-green-600 border-2 p-2.5 border-gray-400 custom-width-2xl"
          required
          placeholder="Description Here"
        />
      </div>
      <div className="flex gap-2.5 flex-col">
        <p>Background Color</p>
        <input ref={albumBgColorRef} type="color" />
      </div>

      <button className="bg-[#a04c68] text-base text-white px-14 py-2.5 cursor-pointer rounded-lg">
        Upload
      </button>
    </form>
  );
};

export default AddAlbum;
