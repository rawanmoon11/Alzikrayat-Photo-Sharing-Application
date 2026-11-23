const Photo = require('../models/Photo');
const fs = require('fs');
const path = require('path');

//create photo
const createPhoto = async (req, res, next) => {
    try {
        const {
            userId,
            title,
            description,
            dateTime
        } = req.body;
        if (!req.file) {
            return res.status(400).json({ message: "photo file is required" });

        }
        const fileName = req.file.filename;
        const newPhoto = new Photo(
            {
                userId,
                fileName,
                title,
                description,
                dateTime
            }
        );
        await newPhoto.save();
        return res.status(201).json({ message: "photo saved  Successfully" });
    } catch (error) {
        next(error);
    }
}




//getphoto
const getPhoto = async (req, res, next) => {
    try {
        const { id } = req.params;
        const existingPhoto = await Photo.findById(id).populate('userId', 'firstName lastName');
        console.log(existingPhoto.userId);
        if (existingPhoto) {
            return res.status(200).json({
                message: "photo retrieved  Successfully",
                Photo: {
                    userId: existingPhoto.userId,
                    fileName: existingPhoto.fileName,
                    title: existingPhoto.title,
                    description: existingPhoto.description,
                    dateTime: existingPhoto.dateTime
                }
            });
        };

        if (!existingPhoto) {
            return res.status(404).json({ message: "NOT Found" });
        };

    } catch (error) {
        next(error);
    }
}


//
//getphotos
const getAllPhoto = async (req, res, next) => {
    try {
        const existingPhotos = await Photo.find();
        if (existingPhotos.length !== 0) {
            return res.status(200).json({
                message: "photos retrieved  Successfully",
                Photos: existingPhotos
            });
        }
        else {
            return res.status(200).json({
                message: "NO PHOTO Found", Photos: []
            });
        };

    } catch (error) {
        next(error);
    }
}

//delet photo
const deletePhoto = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userId } = req.params;
        const existingPhoto = await Photo.findById(id);
        if (!existingPhoto) {
            return res.status(404).json({ message: "NOT Found" });
        };
        const filePath = path.join(__dirname, '..', 'uploads', existingPhoto.fileName);
        if (userId !== existingPhoto.userId.toString()) {
            return res.status(403).json({ message: "NOT ALLOWED TO DELETE", });
        }
        try {
            await fs.promises.unlink(filePath);
        }
        catch (error) {
            if (error.code !== 'ENOENT') throw error;
        }

        await Photo.findByIdAndDelete(id);
        return res.status(200).json({
            message: "photo deleted  Successfully",
        });

    } catch (error) {
        next(error);
    }
}

module.exports = { createPhoto, getPhoto, getAllPhoto, deletePhoto };




