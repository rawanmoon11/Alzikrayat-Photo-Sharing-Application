import { useState } from 'react';
import axios from 'axios';

function CommentForm({ photoId, userId, onCommentAdd }) {
    const [newcomment, setNewComments] = useState("");
    const [error, setError] = useState("");

    const handlesubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            if (!userId) {
                return alert("please login");
            }
            const url = "http://localhost:3000/api/comment/createComment";

            const response = await axios.post(url, { photoId, userId, comment: newcomment });

            console.log("Comment Response:", response.data);
            setNewComments("");
            onCommentAdd(response.data.comment);
        } catch (error) {
            setError(error.response?.data?.message || "add comment failed");
        }
    };
    return (
        <form className="container mt-5" onSubmit={handlesubmit} >
            <div className="row-md-5">

                <textarea className="form-control" name="comment" id="comm"
                    value={newcomment} onChange={(e) => setNewComments(e.target.value)}
                    required> </textarea>
            </div>
            {error && (
                <p id="error" className="text-danger">
                    {error}
                </p>
            )}
            <div className="col-md-5">
                <button type="submit" id="comments" className="btn btn-info  mx-auto"
                    style={{ width: "250px" }}>
                    Add Comment</button>
            </div>

        </form>
    );
}
export default CommentForm;