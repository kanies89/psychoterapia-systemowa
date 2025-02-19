import React, { useState, useEffect, useRef } from "react";
import UniHat from "../../../public/svg/uni_hat.svg";
import MotionHamMenu from "@/app/components/motion_hammenu";

interface SectionDividerProps {
    scale?: number;
    image?: string;
    isLoggedIn?: boolean; // Track if user is logged in
}

const SvgFigure: React.FC<SectionDividerProps> = ({ scale = 1, image, isLoggedIn=true }) => {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(image);
    const [uploadedImages, setUploadedImages] = useState<any[]>([]);

    const [imageTransform, setImageTransform] = useState({ translateX: 0, translateY: 0, scale: 1 });

    // For dragging the image
    const [isDraggingImage, setIsDraggingImage] = useState(false);
    const [imageOffset, setImageOffset] = useState({ x: 0, y: 0 });

    // Toggle dropdown menu visibility
    const toggleMenu = (e: React.MouseEvent) => {
        if (isLoggedIn) {
            setIsMenuVisible(true);
        }
        e.stopPropagation(); // Prevent event from bubbling to parent
    };

    // Handle image upload (to backend)
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Simulate API call to upload the image
            console.log("Uploading image:", file);
            // Assuming backend sends back the uploaded image URL
            const newImage = URL.createObjectURL(file);
            setSelectedImage(newImage);
        }
    };

    // Select image from the uploaded images
    const selectImageFromUploaded = (imageSrc: string) => {
        setSelectedImage(imageSrc);
    };

    // Handle resizing image
    const handleResize = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImageTransform((prev) => ({
            ...prev,
            scale: parseFloat(e.target.value),
        }));
    };

    // Handle moving the image
    const handleMove = (axis: "X" | "Y", value: number) => {
        setImageTransform((prev) => ({
            ...prev,
            [`translate${axis}`]: value,
        }));
    };

    // Handle dragging the image
    const handleImageMouseDown = (e: React.MouseEvent) => {
        setIsDraggingImage(true);
        setImageOffset({
            x: e.clientX - imageTransform.translateX,
            y: e.clientY - imageTransform.translateY,
        });
    };

    const handleImageMouseMove = (e: MouseEvent) => {
        if (isDraggingImage) {
            const x = e.clientX - imageOffset.x;
            const y = e.clientY - imageOffset.y;
            setImageTransform((prev) => ({
                ...prev,
                translateX: x,
                translateY: y,
            }));
        }
    };

    const handleImageMouseUp = () => {
        setIsDraggingImage(false);
    };

    const handleClosing = () => {
        setIsMenuVisible(false);
    };

    useEffect(() => {
        if (isDraggingImage) {
            document.addEventListener("mousemove", handleImageMouseMove);
            document.addEventListener("mouseup", handleImageMouseUp);
        } else {
            document.removeEventListener("mousemove", handleImageMouseMove);
            document.removeEventListener("mouseup", handleImageMouseUp);
        }

        return () => {
            document.removeEventListener("mousemove", handleImageMouseMove);
            document.removeEventListener("mouseup", handleImageMouseUp);
        };
    }, [isDraggingImage]);

    return (
        <div>
        <MotionHamMenu variantMini={true}>
                <div
                    className="bg-white border-4 border-c1 shadow-lg text-xs rounded-md z-50">
                    <div className="p-1">
                        <label className="text-[#EB7443] text-xl m-3 font-bold">
                            Edit Profile Picture
                        </label>
                    </div>

                    <div>
                        <div className="bg-c1 p-2 mx-4 w-full text-white rounded-lg">
                            <label>Upload</label>
                        </div>
                        {/* You can pass the div with your menu as children here */}
                        <div className="px-10 py-5">
                            <input type="file" onChange={handleImageUpload}/>
                        </div>
                        <div className="bg-c1 p-2 mx-4 w-full text-white rounded-lg">
                            <label>Edit</label>
                        </div>
                        <div className="px-5 py-5">
                            <h3>Select an Image</h3>
                            <ul>
                                {uploadedImages.map((img) => (
                                    <li key={img.id}>
                                        <button onClick={() => selectImageFromUploaded(img.src)}>
                                            <img src={img.src} alt="uploaded" width="50"/>
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            <div className="p-2 flex">
                                <label className="mx-5">Resize Image:</label>
                                <input type="range" min="0.5" max="2" step="0.1" onChange={handleResize}
                                       className="accent-bg_2"/>
                            </div>

                            <div className="grid grid-cols-1 p-2">
                                <div className="my-2">
                                    <label className="mx-5">Move X:</label>
                                    <input
                                        type="number"
                                        value={imageTransform.translateX}
                                        className="w-10 mx-5 p-1 bg-[#3B3B3B] rounded-md"
                                        onChange={(e) => handleMove("X", parseInt(e.target.value))}
                                    />
                                </div>
                                <div className="my-2">
                                    <label className="mx-5 my-2">Move Y:</label>
                                    <input
                                        type="number"
                                        value={imageTransform.translateY}
                                        className="w-10 mx-5 p-1 bg-[#3B3B3B] rounded-md"
                                        onChange={(e) => handleMove("Y", parseInt(e.target.value))}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </MotionHamMenu>

            <figure
                className="pt-[3vh] pl-[7vw] z-40"
                style={{
                    transform: `scale(${scale})`,
                transformOrigin: "center",
            }}
        >
            <section className="relative w-[70vh] flex justify-center items-center" onClick={toggleMenu}>
                <svg className="h-full" viewBox="-20 0 400 200" preserveAspectRatio="xMidYMid meet">
                    <defs>
                        <clipPath id="circleClip">
                            <circle cx="25.76%" cy="48.27%" r="18.5%" />
                        </clipPath>
                    </defs>

                    <g>
                        <UniHat />
                    </g>

                    <g clipPath="url(#circleClip)">
                        <image
                            href={selectedImage}
                            x="0"
                            y="0"
                            width="100%"
                            height="100%"
                            preserveAspectRatio="xMidYMid slice"
                            style={{
                                transform: `translate(${imageTransform.translateX}px, ${imageTransform.translateY}px) scale(${imageTransform.scale})`,
                                cursor: "grab",
                            }}
                            onMouseDown={handleImageMouseDown}
                        />
                    </g>
                </svg>
            </section>
        </figure>
        </div>
    );
};

export default SvgFigure;
