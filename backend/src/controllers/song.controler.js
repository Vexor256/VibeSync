const songModel = require("../models/song.model");
const storageService = require("../services/storage.service");
const id3 = require("node-id3");

async function uploadSong(req, res) {
    const songBuffer = req.file.buffer;
    const { mood } = req.body;

    const tags = id3.read(songBuffer);

    // 🔥 SAFE TITLE (fallback to filename)
    let cleanTitle = tags.title || req.file.originalname;

    // 🔥 CLEAN TITLE
    cleanTitle = cleanTitle
        .replace(".mp3", "")
        .replace(/\(.*?\)/g, "")
        .replace(/\[.*?\]/g, "")
        .replace(/riskyjatt|downloadming|\.com|\.ws/gi, "")
        .replace(/happy|sad|neutral/gi, "")
        .replace(/&quot;/g, "")
        .replace(/_/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    // ✅ UPLOAD SONG
    const songFile = await storageService.uploadFile({
        buffer: songBuffer,
        filename: cleanTitle + ".mp3",
        folder: "/jisucluster/moodify/songs"
    });

    // ✅ SAFE POSTER UPLOAD
    let posterFile = { url: "default.jpg" };

    if (tags.image && tags.image.imageBuffer) {
        posterFile = await storageService.uploadFile({
            buffer: tags.image.imageBuffer,
            filename: cleanTitle + ".jpeg",
            folder: "/jisucluster/moodify/posters"
        });
    }

    // ✅ SAVE TO DB
    const song = await songModel.create({
        title: cleanTitle,
        url: songFile.url,
        posterUrl: posterFile.url,
        mood
    });

    res.status(201).json({
        message: "Song uploaded successfully",
        song
    });
}

async function getSong(req, res) {
    const { mood } = req.query;

    const songs = await songModel.find({ mood });

    res.status(200).json({
        message: "Songs fetched successfully",
        songs
    });
}

module.exports = { uploadSong, getSong };