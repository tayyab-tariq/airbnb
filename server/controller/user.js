import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import uploadToS3 from "../utils/uploadFile.js";
import imageDownloader from 'image-downloader';
import mime from 'mime-types';

const profile = asyncHandler(async (req, res) => {
    res.json(req.user);
});

const uploadLink = asyncHandler(async (req, res) => {
    const {link} = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    const image = await imageDownloader.image({
        url: link,
        dest: '/tmp/' +newName,
    });

    const url = await uploadToS3('/tmp/'+newName, newName, mime.lookup('/tmp/' +newName));
    res.json(url);
});


const uploadFile = asyncHandler(async (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const {buffer,originalname,mimetype} = req.files[i];
        const url = await uploadToS3(buffer, originalname, mimetype);
        uploadedFiles.push(url);
    }
    res.json(uploadedFiles);
});

export {
    profile,
    uploadLink,
    uploadFile
};
  

