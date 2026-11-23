import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function Gallery() {
    const [photos, setPhotos] = useState([]);


    useEffect(() => {
        const url = "http://localhost:3000/api/photo/getAllPhoto";
        const fetchPhotos = async () => {
            try {
                const response = await axios.get(url);
                console.log(response.data.Photos[0]);
                setPhotos(response.data.Photos);
            } catch (error) {
                console.error("Error fetching photos", error);
            }
        };
        fetchPhotos();
    }, []);
    return (
        <>
            <div className="container mt-5">
                <Link to="/upload"><b>Upload </b></Link>
                <div className="row g-4" >
                    {photos.map((photo) => (

                        <div key={photo._id} className="col-12  col-md-6 col-lg-4 change_galley">
                            <div className="card">
                                <img className="card-img" src={`http://localhost:3000/uploads/${photo.fileName}`} />
                                <div className="card-body text-center">

                                    <Link to={`/photo/${photo._id}`}>  View details</Link>

                                </div>
                            </div>
                        </div>

                    ))}

                </div>

            </div>
        </>
    )

};
export default Gallery;
