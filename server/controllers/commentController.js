const Comment = require('../models/Comment');

//create Comment
const createComment = async (req, res, next) => {
    try {
        const {
            photoId,
            userId,
            comment,
            dateTime
        } = req.body;
        if (!photoId || !userId) {
            return res.status(400).json({ message: "photoId and  userId are required " });
        }
        const newComment = new Comment(
            {
                photoId,
                userId,
                comment,
                dateTime
            }
        );
        await newComment.save();
        return res.status(201).json({ message: "comment saved  Successfully", comment: newComment });
    } catch (error) {
        next(error);
    }
}

//getcomments
const getAllcomment = async (req, res, next) => {
    try {
        const { photoId } = req.params;
        const existingcomment = await Comment.find({ photoId });
        if (existingcomment.length !== 0) {
            return res.status(200).json({
                message: "comments retrieved  Successfully",
                comments: existingcomment
            });
        }
        else {
            return res.status(200).json({
                message: "NO comments Found", comments: []
            });
        };

    } catch (error) {
        next(error);
    }
}

module.exports = { createComment, getAllcomment };

