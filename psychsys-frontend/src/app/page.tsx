'use client';
import React from 'react';

import Logo from "../../public/svg/logo.svg";
import UniHat from  "../../public/svg/uni_hat.svg";
import Box1 from "../../public/svg/box1.svg";
import Box2 from "../../public/svg/box2.svg";
import Box3 from "../../public/svg/box3.svg";
import LokGab from "../../public/svg/lok_gab.svg"

import InstagramCarousel from "@/app/components/insta";
import AppointmentRequestForm from "@/app/components/appointment_request_form";
import Section_title from "@/app/components/section_title";
import SectionDivider from "@/app/components/section_divider";
import REGCheckbox from "@/app/components/accept_reg";
import {AppointmentProvider} from "@/app/components/appointment_context";

import AnimateOnScroll from "@/app/components/motion_h&b";
import Trapezoids from "@/app/components/motion_background";
import MotionHamMenu from "@/app/components/motion_hammenu";


const Page: React.FC = () => {
    return (
        <main className="bg-white max-w-screen-lg min-h-screen flex flex-col">
            {/* Hamburger Menu Button */}
            <div className="fixed right-0 top-0 z-50">
                <MotionHamMenu />
            </div>

            {/* Logo Section */}
            <section
                className="h-screen flex justify-center items-center bg-bg_1 margin-top-0 pt-0 text-white relative rounded-bl-2xl rounded-br-2xl"
                style={{ position: "relative", height: "100vh", overflow: "hidden" }}>

                <div className="justify-items-end h-[100vh] w-[100vw]">
                    <Trapezoids />
               </div>
                {/* Logo */}
                <div className="h-[10vh] top-8 left-20 absolute z-50">
                    <Logo/>
                </div>
                {/* HandB (foreground, on top of HeroB) */}
                <div className="absolute h-[80vh] w-[80vw] z-40 flex justify-center items-center wrapper">
                    <AnimateOnScroll/>
                </div>
            </section>

            <SectionDivider id="section1"/>

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
                    <p className="font-kodchasan font-normal ml-20 mr-20 text-justify">
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

            <SectionDivider id="section2"/>

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

            <SectionDivider id="Jak wyglądają sesjeterapii systemowej?"/>

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
                    <p className="font-kodchasan font-normal ml-20 mr-20 text-justify">
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
                    <p className="font-kodchasan font-normal ml-20 mr-20 text-justify">
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

            <SectionDivider id="Lokalizacja gabinetu"/>

            <div className="card bg-gray-50 w-full shadow-xl">

                <div className="justify-center content-center flex mt-[5%]">
                    <LokGab className="size-[40%] flex"/>
                </div>

                <div className="card-body items-center text-center">
                    <p className="font-kodchasan font-normal ml-20 mr-20 text-justify">
                        Sed egestas dapibus lorem, quis sollicitudin ligula elementum ac.
                        Maecenas sit amet est nunc. Vivamus sit amet enim gravida, hendrerit sapien in, molestie augue.

                        Nam dolor ipsum, imperdiet id ipsum ac, ornare pulvinar ex. Maecenas porta quam non odio
                        lacinia, non dapibus tellus aliquam.
                    </p>
                </div>

                <a href="https://www.google.pl/maps/dir/Natolin,+Belgradzka,+02-793+Warszawa/Na+Uboczu+26,+02-791+Warszawa/@52.1401111,21.0501311,17.17z/data=!4m19!4m18!1m10!1m1!1s0x47192d82abded8f9:0xbd25f25d5bb49ffd!2m2!1d21.0575824!2d52.1403392!3m4!1m2!1d21.0485162!2d52.1407609!3s0x47192d81ec1ce537:0xf0dd640d76b13c46!1m5!1m1!1s0x47192d81ce50d9e1:0xf1f58f0a051d2e85!2m2!1d21.0470319!2d52.1412447!3e2?entry=ttu&g_ep=EgoyMDI1MDIwOS4wIKXMDSoASAFQAw%3D%3D">
                    <Box3 className="size-[70%] mx-auto relative mb-[5vh]"/>
                </a>

            </div>

            <SectionDivider id="Wolne terminy"/>

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
                <AppointmentProvider>
                    <div className="card-bodytext-center my-10">
                        <p className="font-kodchasan font-normal text-xl">
                            <AppointmentRequestForm></AppointmentRequestForm>
                        </p>
                    </div>
                    <div className="auto-flex grid grid-rows-1">
                        <div className="flex items-center justify-center w-full">

                            <REGCheckbox value={"smscode_modal"}></REGCheckbox>

                        </div>
                    </div>
                </AppointmentProvider>
            </div>

            <SectionDivider id="Stopka"/>

            {/* Footer Section */}
            <div className="card py-8 bg-bg_2 shadow-xl text-white text-center mb-[5vh] ">
                <p>&copy; 2024 Psychologia-Systemowa. All Rights Reserved.</p>
            </div>
        </main>
    );
};

export default Page;
