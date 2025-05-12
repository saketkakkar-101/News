import Comment from "../models/comment.model.js"
import { errorHandler } from "../utils/error.js"

export const createComment = async (req , res, next) => {
    try {
        const {content, postId, userId} = req.body

        if (userId !== req.user.id) {
            return next(errorHandler(403, "You are not allowed to add comment!"))
        }
        const newComment = new Comment({

        })
    } catch (error) {
        next(error)
    }
}