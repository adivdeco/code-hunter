import { AuroraText } from "@/components/magicui/aurora-text";
import { ChevronRight } from "lucide-react";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { NavLink } from "react-router";
import { cn } from "@/lib/utils";
import { IconCloud } from "@/components/magicui/icon-cloud";


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


export default function Mainpg3() {
  const images = slugs.map((slug) => iconMap[slug]);


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

        {/* <div className="absolute  h-full top-0 flex size-full items-center justify-center overflow-hidden ">
          <IconCloud images={images} />
        </div> */}
        <div className="absolute  top-0 flex size-full items-center justify-center overflow-hidden z-4 ">
          <IconCloud images={images} />

        </div>
      </div>

    </div>
  );
}
