import React, { useState, useEffect } from "react";

const InstagramCarousel = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch Instagram images when the component mounts
    useEffect(() => {
        const fetchInstagramImages = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/get_instagram_images");
                const data = await response.json();

                if (data.images && data.images.length > 0) {
                    setImages(data.images);
                    console.log(data.images);
                } else {
                    console.log("No images found.");
                }
            } catch (error) {
                console.error("Error fetching Instagram images:", error);
            } finally {
                setLoading(false); // Stop loading regardless of the result
            }
        };

        fetchInstagramImages();
    }, []);

    if (loading) {
        return <p className="text-center">Loading...</p>;
    }

    return (
        <div className="carousel carousel-center bg-c1 rounded-box max-w-4xl mx-auto space-x-4 p-2 m-10">
            {images.length > 0 ? (
                images.map((imageUrl, index) => (
                    <div key={index} className="carousel-item">
                        <img
                            src={imageUrl}
                            alt={`Instagram Image ${index + 1}`}
                            className="rounded-box object-cover w-full h-120"
                            onError={(e) => {
                            const target = e.target as HTMLImageElement; // Type assertion
                            target.src = "/fallback_image.png"; // Fallback for broken images
                        }}
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
