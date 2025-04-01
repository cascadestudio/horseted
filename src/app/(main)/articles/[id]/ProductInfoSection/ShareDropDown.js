import { usePathname } from "next/navigation";
import FacebookIconNoBorder from "@/assets/icons/FacebookIconNoBorder";
import LinkedInIconNoBorder from "@/assets/icons/LinkedInIconNoBorder";
import XIcon from "@/assets/icons/XIcon";
import WhatsAppIcon from "@/assets/icons/WhatsAppIcon";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

export default function ShareDropDown({}) {
  const pathname = usePathname();
  const currentURL = `https://horseted.vercel.app${pathname}`;

  return (
    <>
      <div className="flex items-start bg-white border border-dark-grey rounded-lg p-4 font-semibold gap-4 w-full">
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
      </div>
    </>
  );
}
