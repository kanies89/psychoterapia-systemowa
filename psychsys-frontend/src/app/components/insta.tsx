import React, { useState, useEffect } from "react";
import Image from 'next/image';

const InstagramCarousel = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const url_backend = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const fetchInstagramImages = async () => {
            try {
                const response = await fetch(`${url_backend}/api/get_instagram_images`);
                const data = await response.json();

                if (data.images && data.images.length > 0) {
                    setImages(data.images);
                } else {
                    console.log("No images found.");
                }
            } catch (error) {
                console.error("Error fetching Instagram images:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchInstagramImages();
    }, [url_backend]);

    if (loading) {
        return (
            <button className="btn btn-square">
                <span className="loading loading-spinner"></span>
            </button>
        );
    }

    return (
        <div className="carousel carousel-center bg-c1 rounded-box max-w-4xl mx-auto space-x-4 p-2 m-10">
            {images.length > 0 ? (
                images.map((imageUrl, index) => (
                    <div key={index} className="carousel-item">
                        <Image
                            src={imageUrl}
                            alt={`Instagram Image ${index + 1}`}
                            width={100}
                            height={100}
                            className="rounded-box object-cover w-full h-120"
                            unoptimized // Optional for local development
                        />
                    </div>
                ))
            ) : (
                <div className="carousel-item">
                    <p>No images available.</p>
                </div>
            )}
        </div>
    );
};

export default InstagramCarousel;
