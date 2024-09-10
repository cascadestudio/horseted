"use client";

import { usePathname } from "next/navigation";
import FacebookIconNoBorder from "@/assets/icons/FacebookIconNoBorder";
import LinkedInIconNoBorder from "@/assets/icons/LinkedInIconNoBorder";
import XIcon from "@/assets/icons/XIcon";
import WhatsAppIcon from "@/assets/icons/WhatsAppIcon";
// import MailIcon from "@/assets/icons/MailIcon";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

export default function ShareSection() {
  const pathname = usePathname();
  const currentURL = `https://horseted.vercel.app${pathname}`;
  //   const threadsShareLink = `https://www.threads.net/share?text=${encodeURIComponent(currentURL)}`;

  return (
    <div className="row-start-1 row-span-1 col-start-2 lg:col-start-3 lg:pb-16 ">
      <span className="font-extrabold">Partager :</span>
      <div className="flex items-center space-x-3 mt-2">
        <FacebookShareButton url={currentURL}>
          <FacebookIconNoBorder className="h-4" />
        </FacebookShareButton>
        <TwitterShareButton url={currentURL}>
          <XIcon className="h-4" />
        </TwitterShareButton>
        <LinkedinShareButton url={currentURL}>
          <LinkedInIconNoBorder className="h-4" />
        </LinkedinShareButton>
        <WhatsappShareButton url={currentURL}>
          <WhatsAppIcon className="h-4" />
        </WhatsappShareButton>
        {/* <a href={threadsShareLink} target="_blank" rel="noopener noreferrer">
          <MailIcon className="h-4" />
        </a> */}
      </div>
    </div>
  );
}
