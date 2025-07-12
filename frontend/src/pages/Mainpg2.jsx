import { MorphingText } from "@/components/magicui/morphing-text";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { Marquee } from "@/components/magicui/marquee";
import { cn } from "@/lib/utils";
import { AuroraText } from "@/components/magicui/aurora-text";
import Mainpg3 from "./Mainpg3";
import "../index.css";
import { AvatarCircles } from "@/components/magicui/avatar-circles";


import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Braces,
  Sigma,
  Bot,
  Earth,
  LayoutDashboard,
  Users,
  Tally5,
} from "lucide-react";

import { Globe } from "@/components/magicui/globe";

const avatars = [
  {
    imageUrl: "https://img.icons8.com/?size=100&id=108784&format=png&color=000000",
    // profileUrl: "https://github.com/dillionverma",
  },
  {
    imageUrl: "https://img.icons8.com/?size=100&id=hGdCwhSHUe6L&format=png&color=000000",
    // profileUrl: "https://github.com/tomonarifeehan",
  },
  {
    imageUrl: "https://img.icons8.com/?size=100&id=13679&format=png&color=000000",
    // profileUrl: "https://github.com/BankkRoll",
  },
  {
    imageUrl: "https://img.icons8.com/?size=100&id=40669&format=png&color=000000",
    // profileUrl: "https://github.com/safethecode",
  },
  {
    imageUrl: "https://img.icons8.com/?size=100&id=44442&format=png&color=000000",
    // profileUrl: "https://github.com/safethecode",
  },


];

const features = [
  {
    Icon: Braces,
    name: "Access pre-built templates and common algorithms to speed up your coding.",
    description: `Access a diverse collection of coding problems across various topics and difficulty levels. 
    Challenge yourself with beginner to expert-level tasks and enhance your coding skills.`,
    href: "/",
    cta: "Learn more",
    background: <img src="home.png" alt="hompg" className=" h-96 w-full p-2 rounded-2xl shadow-2xl " />,
    className:
      "lg:col-start-1 lg:col-end-3 lg:row-start-1 lg:row-end-3 font-changa border-2 hover:border-purple-500 ",
  },
  {
    Icon: Sigma,
    name: "Number of language suports hear",
    description: "language.",
    href: "/",
    cta: "Learn more",
    background:
      <div className="flex items-center justify-center w-full h-full  bg-gradient-to-br from-[#f475b4] via-[#dbc7ef] via-[#d9e8f8] via-indigo to-[#e3bed1]">
        <div className="flex flex-col justify-center text-center mt-16">
          <div className="font-aladin text-9xl flex flex-col ml-28 text-center"><AvatarCircles numPeople={+4} avatarUrls={avatars} />
          </div>
          <p className="max-w-lg mt-9 mx-auto">Explore and practice coding in multiple programming languages, Code in your favorite language —Python, Java, C++, JS, Go, etc.</p>
        </div>
      </div>,
    className:
      "lg:row-start-1 lg:row-end-2 lg:col-start-3 lg:col-end-5  font-changa  border-2 hover:border-pink-400 shadow-md backdrop-blur-sm ",
  },
  {
    Icon: Tally5,
    name: "Number of question",
    description: "Supports 100+ languages and counting.",
    href: "/",
    cta: "Learn more",
    background:
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex flex-col justify-center text-center mt-16">
          <h1 className="font-aladin text-9xl"><span><AuroraText>150+</AuroraText></span></h1>
        </div>
      </div>,
    className:
      "lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-3 font-changa border-2 hover:border-red-400",
  },
  {
    Icon: Bot,
    name: "With ai feature",
    description: "Stuck on a problem? Our built-in AI assistant is here to help you.",
    cta: "Learn more",
    background:
      <div className="botposn">
        <div className="ai-bot">
          <div className="head">
            <div className="face">
              <div className="eyes"> </div>
              <div className="mouth"> </div>
            </div>
          </div>
        </div>
      </div>,
    className:
      "lg:col-start-4 lg:col-end-5 lg:row-start-2 lg:row-end-3 font-changa bg-gray-100 border-2 hover:border-cyan-400",
  },
  {
    Icon: Earth,
    name: "User all over world",
    description:
      "• Join a global community of learners, challengers, and developers solving problems together",
    href: "/",
    cta: "Learn more",
    background: <Globe />,
    className:
      "lg:col-start-1 lg:col-end-3 lg:row-start-3 lg:row-end-4 font-changa bg-gray-100 border-2 hover:border-green-600",
  },
  {
    Icon: LayoutDashboard,
    name: "Intrigated dashbord",
    description:
      `• Get a clear view of your progress, submissions, and solved problems.`,
    href: "/",
    cta: "Learn more",
    background: <img src="https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?q=80&w=2946&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />,
    className:
      "lg:col-start-3 lg:col-end-4 lg:row-start-3 lg:row-end-4 font-changa border-2 hover:border-blue-800 ",
  },
  {
    Icon: Users,
    name: "Contribute to the Community",
    description:
      "• Submit test cases, report issues, or suggest improvements — every voice matters.",
    href: "/",
    cta: "Learn more",
    background: <img src="https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />,
    className:
      "lg:col-start-4 lg:col-end-5 lg:row-start-3 lg:row-end-4 font-changa border-2 hover:border-orange-400",
  },
];
const reviews = [
  {
    name: "Adiv",
    username: "@Atul",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Rohit",
    username: "@Hunter",
    body: "best platform for dominating in codeing.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Rupesh",
    username: "@Sparta",
    body: "I really love the ai feature.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Suraj",
    username: "@Undertaker",
    body: "Only focus on dout-solving.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Himanshu",
    username: "@Hemaa",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Prince",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "Nanshy",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Prince",
    username: "@jane",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Sunny",
    username: "@jenny",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "Piyush",
    username: "@james",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/james",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ img, name, username, body }) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

let notifications = [
  {
    name: "What Language do we support ",
    description: "Java, JavaScript, Phyton, C++",
    time: "15days ago",
    icon: "📚",
    color: "#00C9A7",
  },
  {
    name: "Do I need prior coding experience?",
    description: `Not at all. We guide you through the journey with increasing difficulty.
     Start with our beginner-friendly problems and work your way up as you build confidence.`,
    time: "10days ago",
    icon: "👤",
    color: "#FFB800",
  },

  {
    name: "How long until I see improvement in my coding interviews?",
    description: `Most users report significant confidence improvements within 2-3 weeks of consistent training.
     Measurable skill improvements typically show in our metrics within 3-4 weeks.`,
    time: "5days ago",
    icon: "💬",
    color: "#FF3D71",
  },
  {
    name: "Do you offer any guarantees for job placement?",
    description:
      "We don't guarantee specific job outcomes, but we do guarantee measurable skill improvement. Our data shows that members who complete our full training program experience a 74% higher interview success rate.",
    time: "2month ago",
    icon: "🗞️",
    color: "#1E86FF",
  },
  {
    name: "Is this better than LeetCode?",
    description:
      "We're not here to compete — we're here to focus. CoderHunter is for those who want a guided, immersive, and themed experience.",
    time: "2hour ago",
    icon: "🔥",
    color: "#1E86FF",
  },
];

const texts = ["CODE", "MASTER", "DOMINATE"];

export default function Mainpg2() {
  return (
    <div className="min-h-screen w-full bg-white  mt-5">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center space-y-4 mb-12">
        <div className="text-2xl md:text-lg font-bold font-changa text-orange-500 flex items-center gap-2">
          <span className="text-2xl font-light text-orange-400">—</span>
          <div className="w-1 h-1 bg-orange-400 rounded-full"></div>
          <span>Features</span>
          <div className="w-1 h-1 bg-orange-400 rounded-full"></div>
          <span className="text-2xl font-light text-orange-400">—</span>
        </div>

        <div className="w-full flex justify-center items-center">
          <MorphingText texts={texts} />
        </div>

        <p className="font-changa text-lg md:text-xl text-gray-700 max-w-2xl">
          Unlock the Full Potential of Competitive Programming with These Key
          Features
        </p>
      </div>

      {/* Feature Grid */}
      <div className="w-full flex justify-center">
        <BentoGrid className="w-full md:w-11/12 grid lg:grid-cols-4 gap-6 px-4">
          {features.map((feature) => (
            <BentoCard key={feature.name} {...feature} />
          ))}
        </BentoGrid>
      </div>
      {/* review */}
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden font-changa text-xl mt-32">
        <h2 className="text-5xl font-bold mb-5">
          Loved by <AuroraText className="italic">Coders</AuroraText> Like You
        </h2>
        <p className="mb-10">
          These testimonials are from real developers who’ve used this platform
          to improve their coding journey.
        </p>
      </div>

      {/* marque */}
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden mb-28">
        <Marquee pauseOnHover className="[--duration:20s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
      </div>
      {/* faq */}
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden font-changa text-xl mt-36">
        <h2 className="text-5xl font-bold mb-5">
          <AuroraText className="italic">FAQs</AuroraText>
        </h2>
        <p className="mb-10">CodeHunter Gets These Questions A Lot.</p>
      </div>
      {/* faq animation */}

      <div
        className={cn(
          "relative flex h-[400px] w-full flex-col overflow-hidden mb-5 p-2"
        )}
      >
        <Accordion
          className="max-w-5xl w-full mx-auto border-black"
          type="single"
          collapsible
        >
          {notifications.map((item, idx) => (
            <AccordionItem key={idx} value={item.name}>
              <AccordionTrigger className="font-changa  text-3xl decoration-0">
                {item.name}
                {item.icon}
              </AccordionTrigger>
              <AccordionContent className="font-changa  text-lg">
                {item.description}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <Mainpg3 />

    </div>
  );
}
