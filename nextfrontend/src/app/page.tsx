'use client';
import React, { useState } from 'react';
import HamburgerMenu from "@/app/components/ham_menu";
import Logo from "../../public/svg/logo.svg";
import HeroBackground from "../../public/svg/hero_background.svg";
import HandB from  "../../public/svg/h&b_4.svg";
import UniHat from  "../../public/svg/uni_hat.svg";
import SectionDivider from "@/app/components/section_divider";
import SectionTitle from "../../public/svg/section_title.svg";
import Box1 from "../../public/svg/box1.svg";
import InstagramCarousel from "@/app/components/insta";

const DropdownMenu = ({ isMenuOpen, toggleDropdown }: { isMenuOpen: boolean; toggleDropdown: () => void }) => (
    isMenuOpen ? (
        <ul
            tabIndex={0}
            className="dropdown-content menu bg-bg_2 text-gray-700 rounded-md shadow fixed top-24 right-1 z-50 p-2 space-y-2"
        >
            <li>
                <a className="block p-2 rounded hover:bg-c1 hover:text-white">Item 1</a>
            </li>
            <li>
                <a className="block p-2 rounded hover:bg-c1 hover:text-white">Item 2</a>
            </li>
        </ul>
    ) : null
);

const HeroB = () => {
    return (
        <div className="h-full w-full relative">
            {/* HeroBackground positioned at the bottom of the section */}
            <HeroBackground className="w-full h-auto object-cover absolute bottom-0 left-0 right-0
            rounded-bl-2xl
            rounded-br-2xl z-1" />
            {/* Your content or other elements can go here */}
        </div>
    );
};

const Page: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleDropdown = () => {
        setIsMenuOpen(!isMenuOpen); // Toggle menu state
    };

    return (
        <main className="bg-white max-w-screen-lg min-h-screen flex flex-col">
            {/* Hamburger Menu Button */}
            <div
                tabIndex={0}
                role="button"
                className="fixed top-4 right-0 z-50"
                onClick={toggleDropdown}
                onKeyDown={(e) => e.key === 'Enter' && toggleDropdown()} // Add keyboard accessibility
            >
                {/* Render HamburgerMenu component here */}
                <HamburgerMenu/>
            </div>

            {/* Dropdown Menu */}
            <DropdownMenu isMenuOpen={isMenuOpen} toggleDropdown={toggleDropdown}/>

            {/* Logo Section */}
            <section className="h-screen flex justify-center items-center bg-bg_1 text-white relative
            rounded-bl-2xl rounded-br-2xl">
                {/* Logo */}
                <div className="h-[10vh] top-8 left-20 absolute z-50">
                    <Logo/>
                </div>

                {/* HandB (foreground, on top of HeroB) */}
                <div className="absolute h-[80vh] w-[80vw] z-40 flex justify-center items-center">
                    <HandB className="h-full w-full"/>
                </div>

                {/* HeroB (background, behind HandB) */}
                <div className="h-full w-full absolute top-0 left-0 z-10">
                    <HeroB/>
                </div>
            </section>

            <SectionDivider/>

            {/* About Section */}
            <div className="card bg-gray-50 w-full shadow-xl">
                <figure className="pt-[15vh]">
                    <section className="relative w-[70vh] flex justify-center items-center">
                        <svg className="h-full" viewBox="-20 0 400 200" preserveAspectRatio="xMidYMid meet">
                            <defs>
                                {/* Define a circular clipping path with percentage-based coordinates */}
                                <clipPath id="circleClip">
                                    <circle cx="25.76%" cy="48.27%" r="18.5%"/>
                                    {/* Relative to SVG's size */}
                                </clipPath>
                            </defs>


                            {/* UniHat SVG, now respecting the simulated padding */}
                            <g> {/* Translate UniHat to start after the "padding" */}
                                <UniHat/>
                            </g>
                            {/* Create a "padding" effect by adding a rect */}


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
                <div className="card-body items-center text-center">
                    <h2 className="card-title font-kodchasan font-bold">Kwalifikacje</h2>
                    <p className="font-kodchasan font-normal ml-20 mr-20">
                        Maecenas sit amet malesuada dolor. Pellentesque eget facilisis odio, ut tempor sapien. Duis non
                        varius tortor. Fusce et rutrum risus, ac tristique lacus. Morbi malesuada quis ligula eget
                        cursus. In commodo, tortor sit amet congue efficitur, velit felis condimentum turpis, eget
                        bibendum libero neque sed dui. Aliquam erat volutpat. Pellentesque vel pharetra magna, ac
                        tincidunt eros. In quam quam, efficitur porta ligula at, mattis porta tellus. Integer interdum,
                        libero sodales volutpat mattis, mi lorem pretium nibh, sed bibendum turpis diam non risus. Proin
                        ac dictum purus. Duis malesuada varius dolor, eu volutpat ipsum. Morbi sit amet nulla et nulla
                        convallis condimentum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas
                        nec luctus urna, quis tincidunt enim.

                        Sed vehicula ex nec bibendum porttitor. Duis dignissim ultrices mauris eget laoreet. Suspendisse
                        fermentum lorem rhoncus leo congue, ut mollis tellus posuere. Ut non dapibus nibh, quis congue
                        lectus. In ultrices at sapien et euismod. Morbi ac mi maximus, porta ante eu, consectetur erat.
                        Vestibulum eleifend tristique tortor in porttitor. Vestibulum id rhoncus ex. Nunc mauris arcu,
                        tempus quis tellus in, pellentesque facilisis diam. In tincidunt tincidunt venenatis. Donec
                        facilisis leo id purus sodales elementum. Donec sodales pretium lacus nec posuere. Sed maximus
                        massa nec dui hendrerit, et sagittis diam congue. Vestibulum pretium porta dolor, vel feugiat
                        sapien commodo et.
                    </p>
                </div>
            </div>

            <SectionDivider/>

            <div className="card bg-gray-50 w-full shadow-xl">
                <figure className="pt-[15vh]">
                    <div className="indicator w-full">
                        {/* Section Title */}
                        <SectionTitle className="indicator-item indicator-center size-[60%] z-45" />
                        <text className="
                        indicator-item
                        indicator-top
                        indicator-center
                        font-kodchasan
                        font-bold
                        text-white
                        text-center
                        text-3xl
                        w-full
                        pb-12
                        ">
                            Jak dbać o siebie?
                        </text>
                        {/* Box1 - Resized to 70% of the section width */}
                        <Box1 className="indicator-content size-[70%] mx-auto relative"/>
                    </div>
                </figure>
                <InstagramCarousel />
            </div>

            <SectionDivider/>

            {/* Services Section */}
            <section className="py-16 px-8 bg-white">
                <h2 className="text-3xl font-bold mb-4 text-center">Our Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-6 bg-gray-100 rounded shadow">
                        <h3 className="text-xl font-semibold mb-2">Service 1</h3>
                        <p className="text-gray-600">Details about service 1.</p>
                    </div>
                    <div className="p-6 bg-gray-100 rounded shadow">
                        <h3 className="text-xl font-semibold mb-2">Service 2</h3>
                        <p className="text-gray-600">Details about service 2.</p>
                    </div>
                    <div className="p-6 bg-gray-100 rounded shadow">
                        <h3 className="text-xl font-semibold mb-2">Service 3</h3>
                        <p className="text-gray-600">Details about service 3.</p>
                    </div>
                </div>
            </section>

            {/* Footer Section */}
            <footer className="py-8 bg-blue-500 text-white text-center">
                <p>&copy; 2024 My Website. All Rights Reserved.</p>
            </footer>
        </main>
    );
};

export default Page;
