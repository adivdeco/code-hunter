import { AuroraText } from "@/components/magicui/aurora-text";
import { ChevronRight } from "lucide-react";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { NavLink } from "react-router";
import { cn } from "@/lib/utils";
import { IconCloud } from "@/components/magicui/icon-cloud";


const slugs = [
  "typescript",
  "javascript",
  "dart",
  "java",
  "react",
  "flutter",
  "android",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "amazonaws",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  "cypress",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "visualstudiocode",
  "androidstudio",
  "sonarqube",
  "figma",
];


export default function Mainpg3() {
  const images = slugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
  );

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center   ">
      <div className="relative space-y-9  max-w-5xl text-center">
        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight leading-tight font-rocksalt">
          Ready to <AuroraText className="font-rocksalt">Embrace</AuroraText>{" "}
          the <span className="">Night?</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-700 font-changa max-w-2xl mx-auto">
          Behind every great coder is a darker chapter of quiet practice. Start
          yours — inside <span className="font-bold italic"><AuroraText>Coder Hunter</AuroraText></span>.
        </p>

        {/* CTA Button */}
        <NavLink to={"/login"} className="inline-block">
          <div className="group relative flex items-center justify-center rounded-full px-6 py-3 transition-shadow duration-500 ease-out bg-gradient-to-r from-white to-gray-200 shadow-[inset_0_-8px_10px_#8fdfff1f] hover:shadow-[inset_0_-5px_10px_#8fdfff3f]">
            {/* Animated Border Overlay */}
            <span
              className={cn(
                "absolute inset-0 h-full w-full animate-gradient rounded-full bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[2px] z-0"
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

            {/* Button Content */}
            <span className="relative z-10 flex items-center font-changa font-semibold text-lg text-gray-900">
              🎉
              <hr className="mx-3 h-6 w-px bg-gray-600" />
              <AnimatedGradientText className="text-xl font-bold font-changa">
                Join the Hunt
              </AnimatedGradientText>
              <ChevronRight className="ml-2 size-6 stroke-neutral-800 transition-transform duration-300 group-hover:translate-x-1" />
            </span>

          </div>
        </NavLink>

        <div className="absolute  h-full top-0 flex size-full items-center justify-center overflow-hidden ">
          <IconCloud images={images} />
        </div>
      </div>

    </div>
  );
}
