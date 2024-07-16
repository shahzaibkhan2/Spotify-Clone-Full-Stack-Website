import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";
import validator from "validator";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();
    const newRefreshToken = user.generateRefreshToken();
    user.refreshToken = newRefreshToken;

    await user.save({ ValidateBeforeSave: false });

    return { accessToken, newRefreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      error.message ||
        "Something went wrong while generating access and refresh token !"
    );
  }
};

// AUTHENTICATIONS USING COOKIES

const registerUser = asyncHandler(async (req, res) => {
  //   get user details from frontend
  //  validation - if any field is empty or not
  //  check if user already exists: using username and email
  //  check for images and avatar
  //  upload them to cloudinary , avatar and images etc.
  //  create user object - create entry in mongodb
  //  remove password and refresh token field from response
  //  check for user creation
  //  return response

  const { fullname, email, username, password } = req.body;

  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required !");
  }

  const userExists = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (userExists) {
    throw new ApiError(409, "User with this name or email already exists.");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  //   const coverImageLocalPath = req.files?.coverImage[0]?.path;
  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required !");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar is required !");
  }

  const user = await User.create({
    username: username.toLowerCase(),
    fullname,
    email,
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
  });

  const userCreated = await User.find(user._id).select(
    "-password -refreshToken"
  );

  if (!userCreated) {
    throw new ApiError(
      500,
      "Oops ! Something went wrong while registering a user."
    );
  }

  return res
    .status(201)
    .json(new ApiResponse(200, userCreated, "Registration Successful !"));
});

const loginUser = asyncHandler(async (req, res) => {
  // req body -> data
  // username or email
  // find the user
  // password check
  // generate access and refresh token
  // send cookie

  const { email, username, password } = req.body;

  if (!email || !username) {
    throw new ApiError(400, "Username or Email is required !");
  }

  const user = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (!user) {
    throw new ApiError(404, "User not found !");
  }

  const isPassCorrect = await user.isPasswordCorrect(password);

  if (!isPassCorrect) {
    throw new ApiError(401, "Invalid Password !");
  }

  const { accessToken, newRefreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user?._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", newRefreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          newRefreshToken,
          accessToken,
        },
        "User logged in successfully !"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("refreshToken", options)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "User Logged Out Successfully !"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    (await req.cookies.refreshToken) || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized Request !");
  }

  try {
    const decodedRefreshToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedRefreshToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid Refresh Token !");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh is expired or used.");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } = generateAccessAndRefreshToken(
      user?._d
    );

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            accessToken,
            refreshToken: newRefreshToken,
          },
          "Token refreshed successfully !"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Refresh Token");
  }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req?.user?._id);

  const isPassCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPassCorrect) {
    throw new ApiError(400, "Wrong Password !");
  }

  user.password = newPassword;
  user.save({ ValidateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password Changed Successfully !"));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { email, username } = req.body;

  if (!(email || username)) {
    throw new ApiError(400, "All fields are required !");
  }

  const user = await User.findByIdAndUpdate(
    req?.user?._d,
    {
      $set: {
        fullname,
        email,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(
      new ApiResponse(200, user, "User account details changed successfully !")
    );
});

// AUTHENTICATIONS USING LOCAL STORAGE

const registerUserLocal = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if ([name, email, password].some((field) => field === "")) {
    throw new ApiError(400, "All fields are required.");
  }

  const existedUser = await User.findOne({ email });

  if (existedUser) {
    throw new ApiError(400, "User with this email already exists.");
  }

  if (!validator.isEmail(email)) {
    throw new ApiError(400, "Please enter a valid email.");
  }

  if (password.length < 8) {
    throw new ApiError(400, "Password should be greater than 8 characters.");
  }

  const createdUser = await User.create({
    name,
    email,
    password,
  });

  if (!createdUser) {
    throw new ApiError(
      500,
      "User not created due to some internal server error."
    );
  }

  await createdUser.save();

  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "User created successfully !"));
});

const loginUserLocal = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if ([email, password].some((field) => field === "")) {
    throw new ApiError(400, "All the fields are required.");
  }

  const isUser = await User.findOne({ email });

  if (!isUser) {
    throw new ApiError(400, "User not found..");
  }

  const isPassCorrect = await isUser.isPasswordCorrect(password);

  if (!isPassCorrect) {
    throw new ApiError(400, "Invalid password");
  }

  const accessToken = isUser.generateAccessToken();

  if (!accessToken) {
    throw new ApiError(
      500,
      "Access token is not generated due to internal server error."
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { accessToken }, "Logged in successfully !"));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  updateAccountDetails,
  registerUserLocal,
  loginUserLocal,
};
