
import { useState } from 'react';
import axios from 'axios';

function UploadPhoto() {
    const [photofile, setPhotofile] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");

    const handlesubmit = async (e) => {
        e.preventDefault();
        setError("");
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            return alert("please Login First");
        }
        try {
            const formData = new FormData();

            formData.append("photo", photofile);
            formData.append("title", title);
            formData.append("description", description);
            formData.append("userId", user._id);
            console.log("SAVED USER:", user);
            console.log("USER ID:", user?._id);
            const url = "http://localhost:3000/api/photo/createPhoto";

            const response = await axios.post(url, formData);

            console.log("Upload Response:", response.data);
            alert(response.data.message);

        } catch (error) {
            console.log("UPLOAD ERROR:", error);
            console.log("ERROR RESPONSE:", error.response?.data);
            setError(error.response?.data?.message || "Upload failed");
        }
    };

    return (
        <>
            <form
                id="up"
                className="row g-3 justify-content-center mt-5"
                onSubmit={handlesubmit}
            >

                <div className="col-md-5">
                    <label className="form-label">choose file</label>
                    <input
                        id="photo-file"
                        className="form-control"
                        type="file"
                        name="photo_file"
                        accept="image/*"
                        required
                        onChange={(e) => setPhotofile(e.target.files[0])}
                    />
                </div>

                <div className="col-md-5">
                    <label className="form-label">title</label>
                    <input
                        className="form-control"
                        id="title"
                        name="title"
                        required
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="col-md-5">
                    <label className="form-label">description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="col-md-5"></div>

                <div className="col-md-5">
                    <button
                        className="btn btn-primary"
                        type="submit"
                        id="upload"
                        style={{ width: "500px" }}
                    >
                        Add
                    </button>
                </div>

                {error && (
                    <p id="error" className="text-danger">
                        {error}
                    </p>
                )}

            </form>
        </>
    );
}

export default UploadPhoto;



