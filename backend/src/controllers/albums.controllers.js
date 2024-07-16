import Album from "../models/albums.models.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/uploadOnCloudinary.js";

const addAlbum = asyncHandler(async (req, res) => {
  const { name, description, backgroundColor } = req.body;
  const imageFile = req.file;

  if (!name || !description || !backgroundColor || !imageFile) {
    throw new ApiError(400, "All fields are required.");
  }

  if (
    [name, description, backgroundColor].some((field) => field.trim() === "")
  ) {
    throw new ApiError(400, "All the fields must be filled properly.");
  }

  const uploadImage = await uploadOnCloudinary(imageFile.path);

  if (!uploadImage) {
    throw new ApiError(
      500,
      "Image uploading failed due to internal server error."
    );
  }

  const creatingAlbum = {
    name,
    description,
    backgroundColor,
    image: uploadImage.secure_url,
  };

  const createdAlbum = await Album.create(creatingAlbum);
  await createdAlbum.save();

  if (!createdAlbum) {
    throw new ApiError(
      500,
      "Album uploading failed due to internal server error."
    );
  }

  return res
    .status(201)
    .json(new ApiResponse(200, {}, "Album created successfully !"));
});

const listAlbum = asyncHandler(async (_, res) => {
  const listAlbum = await Album.find({});

  if (!listAlbum) {
    throw new ApiError(
      500,
      "Album list fetching failed due to internal server error."
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, listAlbum, "Album list fetched successfully !"));
});

const deleteAlbum = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id || id.trim() === "") {
    throw new ApiError(400, "ID is missing.");
  }

  const albumDeleted = await Album.findByIdAndDelete(id);

  if (!albumDeleted) {
    throw new ApiError(500, "Album not deleted due to internal server error.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Album deleted successfully !"));
});

export { addAlbum, listAlbum, deleteAlbum };
