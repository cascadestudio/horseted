import Modal from "@/components/Modal";
import { TextInput } from "@/components/input";
import fetchHorseted from "@/utils/fetchHorseted";
import { useState } from "react";
import AddReviewStarIcon from "@/assets/icons/AddReviewStarIcon";
import { useThreadsContext } from "@/app/(main)/messagerie/context/ThreadsContext";

export default function ReviewModal({ setIsReviewModal, orderId, recipient }) {
  const { accessToken, updateMessages } = useThreadsContext();

  const [review, setReview] = useState({
    comment: "",
    rating: 0,
    orderId: orderId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview((prev) => ({ ...prev, [name]: value }));
  };

  async function postReview() {
    const response = await fetchHorseted(
      `/users/${recipient.id}/reviews`,
      accessToken,
      "POST",
      review,
      true,
      true
    );
    console.log("response =>", response);
    updateMessages();
    setIsReviewModal(false);
  }

  const handleStarClick = (index) => {
    setReview((prev) => ({ ...prev, rating: index + 1 }));
  };

  return (
    <Modal
      onSubmit={postReview}
      onClose={() => {
        setIsReviewModal(false);
      }}
      title="Laisser une évaluation"
      buttonText="Valider"
    >
      <div className="flex items-center justify-center mx-auto mb-4">
        {Array.from({ length: 5 }, (_, index) => {
          return (
            <AddReviewStarIcon
              onClick={() => handleStarClick(index)}
              key={index}
              className={`cursor-pointer ${
                review.rating > index ? "fill-yellow" : "fill-lighter-grey"
              }`}
            />
          );
        })}
      </div>
      <TextInput
        label="Ajouter un message"
        type="textarea"
        value={review.comment}
        onChange={handleChange}
        name="comment"
        placeholder="Votre message"
      />
    </Modal>
  );
}
