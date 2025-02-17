import React from "react";
import UniHat from "../../../public/svg/uni_hat.svg"

const SvgFigure = ({ scale = 1 }) => {
    return (
        <figure className="pt-[3vh] pl-[7vw]" style={{ transform: `scale(${scale})`, transformOrigin: "center" }}>
            <section className="relative w-[70vh] flex justify-center items-center">
                <svg className="h-full" viewBox="-20 0 400 200" preserveAspectRatio="xMidYMid meet">
                    <defs>
                        {/* Define a circular clipping path with percentage-based coordinates */}
                        <clipPath id="circleClip">
                            <circle cx="25.76%" cy="48.27%" r="18.5%" />
                            {/* Relative to SVG's size */}
                        </clipPath>
                    </defs>

                    {/* UniHat SVG, now respecting the simulated padding */}
                    <g> {/* Translate UniHat to start after the "padding" */}
                        <UniHat />
                    </g>

                    {/* Apply the clipping path to the image */}
                    <g clipPath="url(#circleClip)">
                        <image
                            href="/path/to/image.jpg" // Replace with the actual image path
                            x="0" y="0" width="100%" height="100%"
                            preserveAspectRatio="xMidYMid slice"
                        />
                    </g>
                </svg>
            </section>
        </figure>
    );
};

export default SvgFigure;
