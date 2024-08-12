import StarRating from "@/components/StarRating";
import AvatarDisplay from "@/components/AvatarDisplay";

export default function ReviewCard({
  avatarSrc,
  author,
  createdAt,
  rating,
  comment,
}) {
  return (
    <div className="flex border border-lighter-grey rounded-lg p-5 gap-2 w-full max-w-[420px]">
      <AvatarDisplay src={avatarSrc} className="h-10 w-10" />
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold font-mcqueen">{author}</h3>
            <p className="text-xs">
              <span>Il y a </span>
              {/* TODO add days since today */}
              {3}
              <span> jours</span>
            </p>
          </div>
          <StarRating showCount={false} rating={rating} />
        </div>
        <p className="mt-2 text-xs">{comment}</p>
      </div>
    </div>
  );
}
