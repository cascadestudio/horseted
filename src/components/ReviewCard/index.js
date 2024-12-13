import StarRating from "@/components/StarRating";
import AvatarDisplay from "@/components/AvatarDisplay";
import { useEffect, useState } from "react";
import fetchHorseted from "@/utils/fetchHorseted";
import { useAuthContext } from "@/context/AuthContext";

export default function ReviewCard({ review }) {
  const { accessToken } = useAuthContext();
  const { author, comment, rating } = review;
  const [reviewer, setReviewer] = useState({});

  useEffect(() => {
    getReviewer();
  }, []);

  const getReviewer = async () => {
    const response = await fetchHorseted(`/users/${author.id}`, accessToken);
    setReviewer(response);
  };

  return (
    <div className="flex border border-lighter-grey rounded-lg p-5 gap-2 w-full max-w-[420px]">
      <AvatarDisplay size={38} avatar={reviewer.avatar} className="h-10 w-10" />
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold font-mcqueen capitalize">
              {author.username}
            </h3>
            <p className="text-xs">
              <span>Il y a </span>
              {/* TODO add days since today */}
              {3}
              <span> jours</span>
            </p>
          </div>
          <StarRating showCount={false} review={review} size="sm" />
        </div>
        <p className="mt-2 text-xs">{comment}</p>
      </div>
    </div>
  );
}
