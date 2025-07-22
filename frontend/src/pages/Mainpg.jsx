"use client";
import { cn } from "@/lib/utils";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import { AuroraText } from "@/components/magicui/aurora-text";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { IconCloud } from "@/components/magicui/icon-cloud";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { ChevronRight } from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import Mainpg2 from "./Mainpg2";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import "../page1.css";
import TawkManager from "@/components/TawkToWidget";
import useTawkTo from '@/hooks/useTawkTo';
// import TawkToWidget from "@/components/TawkToWidget";
// import { useEffect } from "react";
// import useTawkTo from "@/hooks/useTawkTo";


// import { useState, useRef, Suspense, lazy, useEffect } from "react";


const slugs = [
  "typescript",
  "react",
  "go", "go", "go", "go", "go", "go", "go",
  "python", "python", "python", "python", "python", "python", "python", "python",
  "cplusplus", "cplusplus", "cplusplus", "cplusplus", "cplusplus",
  "github",
  "gitlab",
  "javascript", "javascript", "javascript", "javascript", "javascript",
  "express",
  "nextjs",
  "nodejs",
  "ruby", "ruby", "ruby", "ruby", "ruby",
  "java", "java", "java", "java", "java", "java", "java", "java", "java"
];
const iconMap = {
  go: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
  react: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  java: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  cplusplus: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  github: "https://img.icons8.com/material-outlined/96/github.png",
  gitlab: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg",
  nextjs: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  typescript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  javascript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  express: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  ruby: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg",
  nodejs: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
};


export default function Mainpg() {
  useTawkTo()
  // const images = slugs.map(
  //   (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`,
  //   // (slug) => `https://img.icons8.com/?size=100&id=${slug}&format=png&color=000000`
  // );
  const images = slugs.map((slug) => iconMap[slug]);

  return (

    <div className="bg-white">

      <TawkManager />
      <div className="relative">
        {/* Navbar */}
        <Navbar />


        {/* Hero Section */}
        <div className="relative  flex h-[810px] w-full flex-col items-center justify-center px-4 mt-0 text-center bg-white overflow-hidden">
          {/* Background Animation */}
          <InteractiveGridPattern
            className={cn(
              "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
              "absolute inset-x-10 inset-y-[-20%] h-[123%] skew-y-12 z-10"
            )}
          />

          {/* Hero Text */}
          <div className="relative z-7 space-y-7 max-w-5xl mt-9">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-foreground tracking-tight font-rocksalt">
              Your <AuroraText className="font-rocksalt">Coding</AuroraText>{" "}
              Journey
            </h1>

            <h2 className="text-2xl md:text-6xl font-bold text-foreground font-rocksalt">
              Start <AuroraText className="font-rocksalt">Hear</AuroraText>
            </h2>

            <div className="text-xl md:text-xl text-muted-foreground font-rocksalt">
              <TypingAnimation className="">
                Let the Hunt Begin.
              </TypingAnimation>
            </div>

            <p className="text-md md:text-xl text-muted-foreground  px-4 py-2 rounded-md mx-auto font-changa">
              Where logic meets ambition, and coders become champions — Crack
              the toughest problems, climb the highest ranks, and launch your
              journey with the CodeHunter community.
            </p>
          </div>

          {/* home-button */}
          <NavLink to={"/login"}>
            <div className="group relative mx-auto flex items-center justify-center rounded-full px-4 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f] mt-9 bg-gradient-to-r from-white to-gray-200 z-20 ">
              <span
                className={cn(
                  "absolute inset-0 block h-full w-full animate-gradient rounded-[inherit] bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[2px]"
                )}
                style={{
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "destination-out",
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  maskComposite: "subtract",
                  WebkitClipPath: "padding-box",
                }}
              />
              🎉 <hr className="mx-4 h-9 w-px shrink-0 bg-neutral-900" />
              <AnimatedGradientText className="text-xl z-15 font-bold font-changa">
                Join the Hunt
              </AnimatedGradientText>
              <ChevronRight
                className="ml-1 size-7 stroke-neutral-800 transition-transform
 duration-300 ease-in-out group-hover:translate-x-0.5"
              />
            </div>
          </NavLink>
        </div>
        <div className="absolute  top-0 flex size-full items-center justify-center overflow-hidden z-4 ">
          {/* <IconCloud images={images} /> */}
        </div>
      </div>

      <Mainpg2 />

      {/* <div className=" mb-[75vh]"> */}
      <Footer />
      {/* </div> */}


    </div>
  );
}
