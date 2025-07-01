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

import "../page1.css";

const slugs = [
  "typescript",
  "typescript",
  "react",
  "python",
  "c++",
  "c++",
  "c++",
  "c++",
  "c++",
  "c++",
  "python",
  "python",
  "python",
  "javascript",
  "javascript",
  "javascript",
  "javascript",
  "nodedotjs",
  "express",
  "typescript",
  "nextdotjs",
  "react",
  "python",
  "ruby",
  "ruby",
  "ruby",
  "nextdotjs",
  "react",
  "react",
  "react",
  "react",
  "python",
  "github",
  "gitlab",
];

export default function Mainpg() {
  const images = slugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
  );

  return (
    <div>
      <div className="relative">
        {/* Navbar */}
        <Navbar />

        {/* Hero Section */}
        <div className="relative  flex h-[810px] w-full flex-col items-center justify-center px-4 mt-0 text-center bg-gray-100 overflow-hidden">
          {/* Background Animation */}
          <InteractiveGridPattern
            className={cn(
              "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
              "absolute inset-x-10 inset-y-[-20%] h-[123%] skew-y-12 z-10"
            )}
          />

          {/* Hero Text */}
          <div className="relative z-8 space-y-7 max-w-5xl mt-9">
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
          <IconCloud images={images} />
        </div>
      </div>
      <Mainpg2 />
    </div>
  );
}
