'use client';
import React, {useRef} from 'react';

import Logo from "../../public/svg/logo.svg";
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
import SvgFigure from "@/app/components/unihat";
import Accordion from "@/app/components/motion_accordion";
import Faq from "@/app/components/faq";
import {AuthProvider} from "@/app/components/logged_in";

const Page: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null); // Create ref

    const section1Ref = useRef<HTMLDivElement | null>(null);
    const section2Ref = useRef<HTMLDivElement | null>(null);
    const section3Ref = useRef<HTMLDivElement | null>(null);
    const section4Ref = useRef<HTMLDivElement | null>(null);
    const section5Ref = useRef<HTMLDivElement | null>(null);
    const section6Ref = useRef<HTMLDivElement | null>(null);
    const sectionEnd = useRef<HTMLDivElement | null>(null);

    const handleScrollToSection = (section: string) => {
        if (section === "section1") section1Ref.current?.scrollIntoView({ behavior: "smooth" });
        if (section === "section2") section2Ref.current?.scrollIntoView({ behavior: "smooth" });
        if (section === "section3") section3Ref.current?.scrollIntoView({ behavior: "smooth" });
        if (section === "section4") section4Ref.current?.scrollIntoView({ behavior: "smooth" });
        if (section === "section5") section5Ref.current?.scrollIntoView({ behavior: "smooth" });
        if (section === "section6") section5Ref.current?.scrollIntoView({ behavior: "smooth" });
        if (section === "sectionEnd") sectionEnd.current?.scrollIntoView({ behavior: "smooth" });
    };

    const DropdownMenu: React.FC<{ onNavigate?: (section: string) => void }> = ({ onNavigate }) => (
        <ul className="dropdown-content">
            <li onClick={() => onNavigate?.("section1")}
                className="dropdown-item text-white text-2xl hover:text-gray-200">
                Kwalifikacje
            </li>
            <li onClick={() => onNavigate?.("section2")}
                className="dropdown-item text-white text-2xl hover:text-gray-200">
                Jak dbać o siebie?
            </li>
            <li onClick={() => onNavigate?.("section3")}
                className="dropdown-item text-white text-2xl hover:text-gray-200">
                Jak wyglądają sesje terapii systemowej?
            </li>
            <li onClick={() => onNavigate?.("section4")}
                className="dropdown-item text-white text-2xl hover:text-gray-200">
                Lokalizacja gabinetu
            </li>
            <li onClick={() => onNavigate?.("section5")}
                className="dropdown-item text-white text-2xl hover:text-gray-200">
                Wolne terminy
            </li>
            <li onClick={() => onNavigate?.("sectionEnd")}
                className="dropdown-item text-white text-2xl hover:text-gray-200">
                Stopka
            </li>
        </ul>
    );


    return (
        <main className="max-w-screen-lg min-h-screen flex flex-col">
            {/* Hamburger Menu Button */}
            <div className="fixed right-0 top-0 z-50">
                <MotionHamMenu onNavigate={handleScrollToSection} variantMini={false}>
                    <DropdownMenu/>
                </MotionHamMenu>
            </div>

            {/* Logo Section */}
            <section
                ref={sectionRef} // Attach ref to the section
                className="h-screen flex justify-center items-center bg-bg_1 margin-top-0 pt-0 text-white relative rounded-bl-2xl rounded-br-2xl"
                style={{position: "relative", height: "100vh", overflow: "hidden"}}>

                <div className="justify-items-end w-full h-full">
                    <Trapezoids sectionRef={sectionRef}/>
                </div>
                {/* Logo */}
                <div className="h-[10vh] top-[5vh] left-[5vw] absolute z-25">
                    <Logo/>
                </div>
                {/* HandB (foreground, on top of HeroB) */}
                <div className="absolute h-[80vh] w-[80vw] z-40 flex justify-center items-center wrapper">
                    <AnimateOnScroll/>
                </div>
            </section>

            {/* SECTION DIVIDER */}
            <div ref={section1Ref} id="section1">
                <SectionDivider id="section1"/>
            </div>

            {/* About Section */}
            <div className="card bg-gray-50 w-full shadow-xl">
                <SvgFigure scale={1.5}/>
                <div className="card-body items-center text-center">
                    <h2 className="card-title font-kodchasan font-bold">Kwalifikacje</h2>
                    <p className="font-kodchasan font-normal text-justify">
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

            {/* SECTION DIVIDER */}
            <div ref={section2Ref} id="section2">
                <SectionDivider id="section2"/>
            </div>

            <div className="card bg-gray-50 w-full shadow-xl">
                <div className="pt-[5vh] auto-flex content-center items-center">
                    <Section_title
                        svgPath="svg/section_title.svg"
                        replaceTextIds={{
                            tspan1: "Jak dbać o siebie?",
                        }}
                        className="justify-center scale-150 flex"

                    />
                </div>
                <div className="card-body items-center text-center">
                    <p className="font-kodchasan font-normal text-justify">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec maximus arcu eu
                        lacinia hendrerit. Aliquam sed nisi non eros dignissim auctor quis ac lorem. Curabitur
                        euismod,
                        enim ut sollicitudin aliquam, augue nunc lacinia velit, dictum ullamcorper elit ex eget
                        purus.
                        Ut lacinia urna eget cursus molestie.
                        Interdum et malesuada fames ac ante ipsum primis in faucibus.
                    </p>
                </div>
                <Box1 className="size-[90%] mx-auto relative"/>
                <InstagramCarousel/>

            </div>

            {/* SECTION DIVIDER */}
            <div ref={section3Ref} id="section3">
                <SectionDivider id="section3"/>
            </div>

            <div className="card bg-gray-50 w-full shadow-xl">
                <div className="pt-[5vh] auto-flex content-center items-center">
                    <Section_title
                        svgPath="svg/section_title.svg"
                        replaceTextIds={{
                            tspan1: "Jak wyglądają sesje terapii systemowej?",
                        }}
                        className="justify-center scale-150 flex"
                    />
                </div>

                <div className="card-body items-center text-center">
                    <p className="font-kodchasan font-normal text-justify">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec maximus arcu eu
                        lacinia hendrerit. Aliquam sed nisi non eros dignissim auctor quis ac lorem. Curabitur
                        euismod,
                        enim ut sollicitudin aliquam, augue nunc lacinia velit, dictum ullamcorper elit ex eget
                        purus.
                        Ut lacinia urna eget cursus molestie.
                        Interdum et malesuada fames ac ante ipsum primis in faucibus.
                    </p>
                </div>

                <Box2 className="size-[90%] mx-auto relative"/>

                <div className="card-body items-center text-center">
                    <p className="font-kodchasan font-normal text-justify">
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

            {/* SECTION DIVIDER */}
            <div ref={section4Ref} id="section4">
                <SectionDivider id="section4"/>
            </div>

            <div className="card bg-gray-50 w-full shadow-xl">
                <div className="pt-[5vh] auto-flex content-center items-center">
                    <LokGab className="scale-150 mx-auto flex"/>
                </div>
                <div className="card-body items-center text-center">
                    <p className="font-kodchasan font-normal mt-[5vh] text-justify">
                        Sed egestas dapibus lorem, quis sollicitudin ligula elementum ac.
                        Maecenas sit amet est nunc. Vivamus sit amet enim gravida, hendrerit sapien in, molestie augue.

                        Nam dolor ipsum, imperdiet id ipsum ac, ornare pulvinar ex. Maecenas porta quam non odio
                        lacinia, non dapibus tellus aliquam.
                    </p>
                </div>
                <a href="https://www.google.pl/maps/dir/Natolin,+Belgradzka,+02-793+Warszawa/Na+Uboczu+26,+02-791+Warszawa/@52.1401111,21.0501311,17.17z/data=!4m19!4m18!1m10!1m1!1s0x47192d82abded8f9:0xbd25f25d5bb49ffd!2m2!1d21.0575824!2d52.1403392!3m4!1m2!1d21.0485162!2d52.1407609!3s0x47192d81ec1ce537:0xf0dd640d76b13c46!1m5!1m1!1s0x47192d81ce50d9e1:0xf1f58f0a051d2e85!2m2!1d21.0470319!2d52.1412447!3e2?entry=ttu&g_ep=EgoyMDI1MDIwOS4wIKXMDSoASAFQAw%3D%3D">
                    <Box3 className="size-[90%] mx-auto relative mb-[5vh]"/>
                </a>
            </div>

            {/* SECTION DIVIDER */}
            <div ref={section5Ref} id="section5">
                <SectionDivider id="section5"/>
            </div>

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

            {/* SECTION DIVIDER */}
            <div ref={section6Ref} id="section6">
                <SectionDivider id="section6"/>
            </div>

            <div className="card bg-gray-50 w-full shadow-xl">
                <div className="pt-[5vh] auto-flex content-center items-center">
                    <Section_title
                        svgPath="svg/section_title.svg"
                        replaceTextIds={{
                            tspan1: "FAQ",
                        }}
                        className="justify-center scale-125 flex"
                    />
                </div>
                <div className="p-10">
                    <AuthProvider>
                        <Faq/>
                    </AuthProvider>
                </div>

            </div>

            {/* SECTION DIVIDER */}
            <div ref={sectionEnd} id="sectionEnd">
                <SectionDivider id="sectionEnd"/>
            </div>

            {/* Footer Section */}
            <div className="card py-8 bg-bg_2 shadow-xl text-white text-center mb-[5vh] ">
                <p>&copy; 2024 Psychologia-Systemowa. All Rights Reserved.</p>
            </div>
        </main>
);
};

export default Page;
