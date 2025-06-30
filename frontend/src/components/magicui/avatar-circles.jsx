/* eslint-disable @next/next/no-img-element */
"use client";;
import { cn } from "@/lib/utils";

export const AvatarCircles = ({
  numPeople,
  className,
  avatarUrls
}) => {
  return (
    <div className={cn("z-10 flex -space-x-1 rtl:space-x-reverse", className)}>
      {avatarUrls.map((url, index) => (
        <a
          key={index}
          href={url.profileUrl}
          target="_blank"
          rel="noopener noreferrer">
          <img
            key={index}
            className="h-50 w-50 rounded-full border-0 border-white dark:border-gray-800"
            src={url.imageUrl}
            width={50}
            height={50}
            alt={`Avatar ${index + 1}`} />
        </a>
      ))}
      {(numPeople ?? 0) > 0 && (
        <p
          className="flex h-15 w-12 items-center justify-center rounded-full border-3 border-white bg-black text-center text-xs font-medium text-white hover:bg-gray-600 dark:border-gray-800 dark:bg-white dark:text-black"
        >
          +{numPeople}
        </p>
      )}
    </div>
  );
};
