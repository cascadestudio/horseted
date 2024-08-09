import profilePicture from "@/assets/images/profilePicture.jpg";
import StarRating from "@/components/StarRating";
import MessageGreenIcon from "@/assets/icons/MessageGreenIcon";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";

export default function SellerBlock({ sellerData, productId }) {
  const { username, review } = sellerData;

  return (
    <div className="flex justify-between w-full mt-3 mb-5">
      <div className="flex">
        <Image
          src={profilePicture}
          alt="Photo de profil"
          className="h-14 w-14 object-cover rounded-full"
        />
        <div className="flex flex-col justify-center min-w-0">
          <h4 className="font-mcqueen font-bold lg:text-lg leading-5 ml-3 truncate">
            {username}
          </h4>
          <StarRating
            className="ml-3"
            rating={review.rating}
            count={review.count}
          />
        </div>
      </div>
      <div className="flex items-center">
        <Link
          href={`/messagerie?productId=${productId}`}
          className="h-8 w-8 mx-4 lg:pr-4 box-content lg:mr-4 lg:border-r border-grey flex justify-center items-center "
        >
          <MessageGreenIcon />
        </Link>
        <Button
          href="#"
          className="text-xs lg:text-sm h-8 px-4 py-2 max-w-24 lg:max-w-[110px]"
        >
          Voir le profil
        </Button>
      </div>
    </div>
  );
}
