import Modal from "@/components/Modal";
import { TextInput } from "@/components/input";
import fetchHorseted from "@/utils/fetchHorseted";
import { useState } from "react";
import { useAuthContext } from "@/context/AuthContext";

export default function ReviewModal({ setIsReviewModal, orderId, recipient }) {
  const { accessToken } = useAuthContext();
  const [review, setReview] = useState({
    comment: "",
    rating: 4,
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
  }

  return (
    <Modal
      onSubmit={postReview}
      onClose={() => {
        setIsReviewModal(false);
      }}
      title="Laisser une évaluation"
      buttonText="Valider"
    >
      <TextInput
        type="textarea"
        value={review.comment}
        onChange={handleChange}
        name="comment"
        placeholder="Votre message"
      />
    </Modal>
  );
}
