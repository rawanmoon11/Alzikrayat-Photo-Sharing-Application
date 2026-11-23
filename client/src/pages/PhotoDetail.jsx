
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import CommentForm from '../components/CommentForm';

function PhotoDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [photo, setPhoto] = useState(null);
    const [comments, setComments] = useState([]);

    // Fetch Photo
    useEffect(() => {
        const url = `http://localhost:3000/api/photo/getPhoto/${id}`;

        const fetchPhotos = async () => {
            try {
                const response = await axios.get(url);
                setPhoto(response.data.Photo);
            } catch (error) {
                console.error("Error fetching photos", error);
            }
        };

        fetchPhotos();
    }, [id]);

    // Fetch Comments
    useEffect(() => {
        const url = `http://localhost:3000/api/comment/getAllcomment/${id}`;

        const fetchComments = async () => {
            try {
                const response = await axios.get(url);
                console.log("COMMENTS RESPONSE:", response.data);

                setComments(response.data.comments);
            } catch (error) {
                console.error("Error fetching comments", error);
            }
        };

        fetchComments();
    }, [id]);

    // Check Photo Owner
    if (!photo) {
        return <p>Loading...</p>;
    }

    const user = JSON.parse(localStorage.getItem("user"));

    // Delete Photo
    const handleDelete = async (e) => {
        e.preventDefault();

        if (!user) {
            alert("Please login first");
            return;
        }

        if (!window.confirm("Are you sure you want to delete this photo?")) {
            return;
        }

        try {
            const url = `http://localhost:3000/api/photo/deletePhoto/${id}/${user._id}`;

            const response = await axios.delete(url);

            alert(response.data.message);
            navigate('/gallery');

        } catch (error) {
            console.error("DELETE ERROR:", error);
            alert(error.response?.data?.message || "Failed to delete photo");
        }
    };

    console.log(photo.userId);

    return (
        <>
            <div id="photo-details-card" className="card mb-3">

                <img
                    className="card-img-top"
                    id="details"
                    src={`http://localhost:3000/uploads/${photo.fileName}`}
                    alt={photo.title}
                />

                <div className="card-body">

                    <p className="card-text">
                        <small className="text-body-secondary">
                            date time: {photo.dateTime}
                        </small>
                    </p>

                    <p className="card-text">
                        <b>Author: </b>
                        {photo.userId.firstName} {photo.userId.lastName}
                    </p>

                    <p className="card-text">
                        <b>Title: </b>
                        {photo.title}
                    </p>

                    <p className="card-text">
                        <b>Description: </b>
                        {photo.description}
                    </p>

                    <b>Comments:</b>

                    {comments.length > 0 ? (
                        comments.map((comment) => (
                            <p key={comment._id} className="card-text">
                                {comment.comment} - {comment.dateTime}
                            </p>
                        ))
                    ) : (
                        <p>No Comment</p>
                    )}

                </div>

                <CommentForm
                    photoId={id}
                    userId={user?._id}

                    onCommentAdd={(newComment) => {
                        setComments((prevComments) => [
                            ...prevComments,
                            newComment
                        ]);
                    }}
                />

            </div>


            <div id="delete-container" className="container mt-5">
                <button
                    id="delete-photo"
                    type="button"
                    className="btn btn-danger"
                    style={{ width: "250px" }}
                    onClick={handleDelete}
                >
                    Delete
                </button>
            </div>

        </>
    );
}

export default PhotoDetails;
