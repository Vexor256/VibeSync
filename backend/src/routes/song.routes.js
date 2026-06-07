const express = require('express');
const upload = require("../middlewares/upload.middleware")
const songController = require("../controllers/song.controler")

const router = express.Router();

router.post("/", upload.single("song"), songController.uploadSong)

router.get("/", songController.getSong)

module.exports = router;