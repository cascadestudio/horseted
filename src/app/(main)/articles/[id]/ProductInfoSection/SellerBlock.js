import StarRating from "@/components/StarRating";
import MessageGreenIcon from "@/assets/icons/MessageGreenIcon";
import Link from "next/link";
import Button from "@/components/Button";
import AvatarDisplay from "@/components/AvatarDisplay";

export default function SellerBlock({ sellerData, productId, isUserSeller }) {
  const { username, review, id, avatar } = sellerData;

  return (
    <div className="flex justify-between w-full mt-3 mb-5">
      <div className="flex">
        <AvatarDisplay size="56" avatar={avatar} />
        <div className="flex flex-col justify-center min-w-0">
          <h4 className="font-mcqueen font-bold lg:text-lg leading-5 ml-3 truncate capitalize">
            {username}
          </h4>
          <StarRating className="ml-3" review={review} />
        </div>
      </div>
      {!isUserSeller && (
        <div className="flex items-center">
          <Link
            href={`/messagerie?productId=${productId}&userId=${id}`}
            className="h-8 w-8 mx-4 lg:pr-4 box-content lg:mr-4 lg:border-r border-grey flex justify-center items-center "
          >
            <MessageGreenIcon />
          </Link>
          <Button
            href={`/vendeur/${id}`}
            className="text-xs lg:text-sm h-8 px-4 py-2 max-w-24 lg:max-w-[110px]"
          >
            Voir le profil
          </Button>
        </div>
      )}
    </div>
  );
}
