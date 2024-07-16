import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/uploadOnCloudinary.js";
import Song from "../models/songs.models.js";
import { ApiResponse } from "../utils/apiResponse.js";

const addSong = asyncHandler(async (req, res) => {
  const { name, description, album } = req.body;
  const audioFile = req.files.audio[0];
  const imageFile = req.files.image[0];

  if (!name || !description || !album || !audioFile || !imageFile) {
    throw new ApiError(400, "All fields are required.");
  }

  if ([name, description, album].some((field) => field.trim() === "")) {
    throw new ApiError(400, "All the fields must be filled properly.");
  }

  const audioUpload = await uploadOnCloudinary(audioFile.path);
  const imageUpload = await uploadOnCloudinary(imageFile.path);
  console.log(audioUpload);

  if (!audioFile || !imageFile) {
    throw new ApiError(
      500,
      "Image uploading failed due to internal server error."
    );
  }

  const duration = `${Math.floor(audioUpload.duration / 60)} : ${Math.floor(
    audioUpload.duration % 60
  )}`;

  const creatingSong = {
    name,
    album,
    description,
    image: imageUpload.secure_url,
    file: audioUpload.secure_url,
    duration,
  };

  const createdSong = await Song.create(creatingSong);

  if (!createdSong) {
    throw new ApiError(
      500,
      "Data uploading failed due to internal server error."
    );
  }
  await createdSong.save();

  return res
    .status(201)
    .json(new ApiResponse(200, createdSong, "Song uploaded successfully !"));
});

const listSong = asyncHandler(async (_, res) => {
  const listSongs = await Song.find({});

  if (!listSongs) {
    throw new ApiError(
      500,
      "Song list fetch failed due to internal server error."
    );
  }

  return res
    .status(201)
    .json(new ApiResponse(200, listSongs, "Song list fetched successfully !"));
});

const deleteSong = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id || id.trim() === "") {
    throw new ApiError(400, "Song ID is missing.");
  }

  const songDeleted = await Song.findByIdAndDelete(id);

  if (!songDeleted) {
    throw new ApiError(500, "Album not deleted due to internal server error.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Song deleted successfully !"));
});

export { addSong, listSong, deleteSong };
