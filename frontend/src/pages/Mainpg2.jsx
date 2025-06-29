import { MorphingText } from "@/components/magicui/morphing-text";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { Marquee } from "@/components/magicui/marquee";
import { cn } from "@/lib/utils";
import { AuroraText } from "@/components/magicui/aurora-text";
import { AnimatedList } from "@/components/magicui/animated-list";
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

const features = [
  {
    Icon: Braces,
    name: "Access pre-built templates and common algorithms to speed up your coding.",
    description: `Access a diverse collection of coding problems across various topics and difficulty levels. 
    Challenge yourself with beginner to expert-level tasks and enhance your coding skills.`,
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className:
      "lg:col-start-1 lg:col-end-3 lg:row-start-1 lg:row-end-3 font-changa",
  },
  {
    Icon: Sigma,
    name: "number of language suports hear",
    description: "language.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className:
      "lg:row-start-1 lg:row-end-2 lg:col-start-3 lg:col-end-5 font-changa",
  },

  {
    Icon: Tally5,
    name: "number of question",
    description: "Supports 100+ languages and counting.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className:
      "lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-3 font-changa",
  },
  {
    Icon: Bot,
    name: "with ai feature",
    description: "Use the calendar to filter your files by date.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className:
      "lg:col-start-4 lg:col-end-5 lg:row-start-2 lg:row-end-3 font-changa",
  },
  {
    Icon: Earth,
    name: "user all over world",
    description:
      "Get notified when someone shares a file or mentions you in a comment.",
    href: "/",
    cta: "Learn more",
    background: <Globe />,
    className:
      "lg:col-start-1 lg:col-end-3 lg:row-start-3 lg:row-end-4 font-changa",
  },
  {
    Icon: LayoutDashboard,
    name: "intrigated dashbord",
    description:
      "Get notified when someone shares a file or mentions you in a comment.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className:
      "lg:col-start-3 lg:col-end-4 lg:row-start-3 lg:row-end-4 font-changa",
  },
  {
    Icon: Users,
    name: "Contribute to the Community",
    description:
      "Get notified when someone shares a file or mentions you in a comment.",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className:
      "lg:col-start-4 lg:col-end-5 lg:row-start-3 lg:row-end-4 font-changa",
  },
];
const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Jane",
    username: "@jane",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "James",
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
    icon: "🗞️",
    color: "#1E86FF",
  },
];

const texts = ["CODE", "MASTER", "DOMINATE"];

export default function Mainpg2() {
  return (
    <div className="min-h-screen w-full bg-slate-100 px-4 py-10">
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
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden font-changa text-xl mt-32">
        <h2 className="text-5xl font-bold mb-5">
          <AuroraText className="italic">FAQs</AuroraText>
        </h2>
        <p className="mb-10">CodeHunter Gets These Questions A Lot.</p>
      </div>
      {/* faq animation */}

      <div
        className={cn(
          "relative flex h-[500px] w-full flex-col overflow-hidden p-2"
        )}
      >
        <Accordion
          className="max-w-5xl w-full mx-auto"
          type="single"
          collapsible
        >
          {notifications.map((item, idx) => (
            <AccordionItem key={item.name} value={item.name}>
              <AccordionTrigger className="font-changa  text-3xl decoration-0">
                {item.name}
              </AccordionTrigger>
              <AccordionContent className="font-changa  text-lg">
                {item.description}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
      </div>
    </div>
  );
}
