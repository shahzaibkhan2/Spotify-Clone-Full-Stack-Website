import { Router } from "express";
import {
  addSong,
  deleteSong,
  listSong,
} from "../controllers/songs.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = Router();

router.route("/add-song").post(
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  addSong
);
router.route("/list-song").get(listSong);
router.route("/delete-song").post(deleteSong);

export default router;
