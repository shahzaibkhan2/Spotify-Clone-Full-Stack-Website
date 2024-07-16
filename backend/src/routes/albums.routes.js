import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import {
  addAlbum,
  deleteAlbum,
  listAlbum,
} from "../controllers/albums.controllers.js";

const router = Router();

router.route("/add-album").post(upload.single("image"), addAlbum);
router.route("/list-album").get(listAlbum);
router.route("/delete-album").post(deleteAlbum);

export default router;
