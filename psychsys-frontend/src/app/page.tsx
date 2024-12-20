'use client';
import React, { useState } from 'react';

import Logo from "../../public/svg/logo.svg";
import HeroBackground from "../../public/svg/hero_background.svg";
import HandB from  "../../public/svg/h&b_4.svg";
import UniHat from  "../../public/svg/uni_hat.svg";
import Box1 from "../../public/svg/box1.svg";
import Box2 from "../../public/svg/box2.svg";
import Box3 from "../../public/svg/box3.svg";
import LokGab from "../../public/svg/lok_gab.svg"

import Input from "@/app/components/normal_input";
import AcceptReg from "@/app/components/accept_reg";
import ButtonN from "@/app/components/normal_button";
import InstagramCarousel from "@/app/components/insta";
import AppointmentRequestForm from "@/app/components/appointment_request_form";
import Section_title from "@/app/components/section_title";
import SectionDivider from "@/app/components/section_divider";
import HamburgerMenu from "@/app/components/ham_menu";

const DropdownMenu = ({ isMenuOpen }: { isMenuOpen: boolean; toggleDropdown: () => void }) => (
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
                <HamburgerMenu
                    svgPath="svg/ham_menu.svg"
                    className="w-15% h-12"
                />
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
                <figure className="pt-[5vh]">
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
                <figure className="pt-[10vh] w-full">
                    <div className="indicator w-[70%]">
                        {/* Section Title */}
                            <span className="indicator-item indicator-center indicator-top w-full">
                                <Section_title
                                    svgPath="svg/section_title.svg"
                                    replaceTextIds={{
                                        tspan1: "Jak dbać o siebie?",
                                    }}
                                    className="justify-center scale-125 flex"

                                />
                            </span>
                        {/* Box1 - Resized to 70% of the section width */}
                        <Box1 className="mx-auto h-full w-full"/>
                    </div>
                </figure>
                <InstagramCarousel/>
            </div>

            <SectionDivider/>

            <div className="card bg-gray-50 w-full shadow-xl">
                <div className="pt-[5vh] auto-flex content-center items-center">
                    <Section_title
                        svgPath="svg/section_title.svg"
                        replaceTextIds={{
                            tspan1: "Jak wyglądają sesje terapii systemowej?",
                        }}
                        className="justify-center scale-125 flex"
                    />
                </div>


                <div className="card-body items-center text-center">
                    <p className="font-kodchasan font-normal ml-20 mr-20">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec maximus arcu eu
                        lacinia hendrerit. Aliquam sed nisi non eros dignissim auctor quis ac lorem. Curabitur
                        euismod,
                        enim ut sollicitudin aliquam, augue nunc lacinia velit, dictum ullamcorper elit ex eget
                        purus.
                        Ut lacinia urna eget cursus molestie.
                        Interdum et malesuada fames ac ante ipsum primis in faucibus.
                    </p>
                </div>

                <Box2 className="size-[70%] mx-auto relative"/>

                <div className="card-body items-center text-center">
                    <p className="font-kodchasan font-normal ml-20 mr-20">
                        Suspendisse eget lorem vitae turpis facilisis aliquam vitae ut lacus. Curabitur nunc
                        felis,
                        aliquam a turpis vel, laoreet porta nulla.

                        Sed egestas dapibus lorem, quis sollicitudin ligula elementum ac.
                        Maecenas sit amet est nunc. Vivamus sit amet enim gravida, hendrerit sapien in, molestie
                        augue.
                        Nam dolor ipsum, imperdiet id ipsum ac, ornare pulvinar ex.
                        Maecenas porta quam non odio lacinia, non dapibus tellus aliquam.
                        Fusce rhoncus faucibus leo ac porta. Aliquam molestie pellentesque tempor.
                        Aliquam erat volutpat. Cras id ornare enim. Suspendisse nec porta purus.
                        Nunc elementum elit faucibus lacinia luctus.
                    </p>
                </div>
            </div>

            <SectionDivider/>

            <div className="card bg-gray-50 w-full shadow-xl">

                <div className="justify-center content-center flex mt-[5%]">
                    <LokGab className="size-[40%] flex"/>
                </div>

                <div className="card-body items-center text-center">
                    <p className="font-kodchasan font-normal ml-20 mr-20">
                        Sed egestas dapibus lorem, quis sollicitudin ligula elementum ac.
                        Maecenas sit amet est nunc. Vivamus sit amet enim gravida, hendrerit sapien in, molestie augue.

                        Nam dolor ipsum, imperdiet id ipsum ac, ornare pulvinar ex. Maecenas porta quam non odio lacinia, non dapibus tellus aliquam.
                    </p>
                </div>

                <Box3 className="size-[70%] mx-auto relative mb-[5vh]"/>

            </div>

            <SectionDivider/>

            <div className="card bg-gray-50 w-full shadow-xl">
                <div className="pt-[5vh] auto-flex content-center items-center">
                    <Section_title
                        svgPath="svg/section_title.svg"
                        replaceTextIds={{
                            tspan1: "Wolne terminy",
                        }}
                        className="justify-center scale-125 flex"
                    />
                </div>
                <div className="card-bodytext-center my-10">
                    <p className="font-kodchasan font-normal text-xl">
                        <AppointmentRequestForm></AppointmentRequestForm>
                    </p>
                </div>
                <div className="auto-flex grid grid-rows-1">
                    <Input type="name" text="Imię:" placeholder="Podaj swoje imię"/>
                    <Input type="surname" text="Nazwisko:" placeholder="Nazwisko"/>
                    <Input type="email" text="Email:" placeholder="adres email"/>
                    <Input type="phone" text="Telefon:" placeholder="Telefon w celu potwierdzenia wizyty"/>
                    <div className="flex items-center justify-center w-full m-5">
                        <AcceptReg svgPath="svg/accept_rules.svg"/>
                    </div>

                    <p className="py-4 w-full text-center">
                        Na podany numer telefonu wysłaliśmy kod w celu potwierdzenia wizyty.<br/>Wpisz poniżej i potwierdź.</p>

                    <Input type="smscode" text="Kod SMS:" placeholder="Powierdź 5-cyfrowym kodem sms"/>
                    <dialog id="my_modal_3" className="modal">
                        <div className="modal-box">
                            <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                            <div className="grid grid-rows-1">
                                <h3 className="font-bold text-lg">Regulamin i RODO</h3>
                                <p className="py-4">Zaakceptuj regulamin</p>
                                <div className="form-control">
                                    <label className="cursor-pointer label">
                                        <span className="label-text">Akceptuję regulamin i warunki RODO</span>
                                        <input type="checkbox" className="checkbox checkbox-success"/>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </dialog>
                    <ButtonN type="submit" value="Umów wizytę"></ButtonN>
                </div>
            </div>

            <SectionDivider/>

            {/* Footer Section */}
            <div className="card py-8 bg-bg_2 shadow-xl text-white text-center mb-[5vh] ">
                <p>&copy; 2024 Psychologia-Systemowa. All Rights Reserved.</p>
            </div>
        </main>
    );
};

export default Page;
