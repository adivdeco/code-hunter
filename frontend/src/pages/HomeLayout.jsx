import { IconCloud } from "@/components/magicui/icon-cloud";
import Navbar from "@/components/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import React from "react";

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

export default function HomeLayout() {
    const location = useLocation();
    const images = slugs.map((slug) => iconMap[slug]);

    const showIconCloud = location.pathname === "/";

    return (
        <div className="relative">
            <Navbar />

            {/* IconCloud only on the homepage */}
            {showIconCloud && (
                <div className="absolute top-0 z-20">
                    <IconCloud images={images} />
                </div>
            )}

            <div className="relative z-10">
                <Outlet />
            </div>
        </div>
    );
}
