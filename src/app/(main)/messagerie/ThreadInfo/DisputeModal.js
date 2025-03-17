import Modal from "@/components/Modal";
import { TextInput } from "@/components/input";
import fetchHorseted from "@/utils/fetchHorseted";
import { useState, useRef } from "react";
import AddReviewStarIcon from "@/assets/icons/AddReviewStarIcon";
import { useThreadsContext } from "@/app/(main)/messagerie/context/ThreadsContext";
import Button from "@/components/Button";
import TrashIcon from "@/assets/icons/TrashIcon";
import { createDispute, postDisputeDecision } from "@/fetch/disputes";
import { useRouter } from "next/navigation";

export default function DisputeModal({
  setIsDisputeModal,  
}) {
  const router = useRouter();

  const { accessToken, updateMessages, user, dispute, order, setDispute, activeThread, recipient } = useThreadsContext();

  const userRole = getUserRole();

  function getUserRole() {
    if (!order || !user) return;
    if (order.buyer.id === user.id) {
      return "buyer";
    } else if (order.seller.id === user.id) {
      return "seller";
    } else {
      return "unknown";
    }
  }

  const handleFile = (e) => {

  }

  const makeDisputeDecision = async (decision) => {    
    const response = await postDisputeDecision(accessToken, dispute.id, {action: decision})
    
    await updateMessages(activeThread.id);

    setDispute(response);
    setIsDisputeModal(false);
  }

  const handleRefundWithoutReturn = (e) => {
    makeDisputeDecision('refund_without_return');
  }

  const handleReturnAtBuyerCharge = (e) => {
    makeDisputeDecision('return_at_buyer_charge');
  }

  const handleReturnAtSellerCharge = () => {
    router.push(`/return-checkout?disputeId=${dispute.id}`)
  }

  return (
    <Modal
      onClose={() => {
        setIsDisputeModal(false);
      }}      
      title="Détails du litige"      
      isNotForm={true}
    >      
      {dispute.files && dispute.files.length && (
        <div className="mb-[35px]">
          <p className="label font-mcqueen font-semibold">Pièces jointes :</p>
          { dispute.files.map(file => <Button              
              variant="transparent-black"
              onClick={handleFile}
              className="w-full"
            >              
              {file.originalName}
            </Button>)}
        </div>        
      )}
      <p className="label font-mcqueen font-semibold">Détails du litige :</p>
      <p>{ dispute.details }</p>
      {userRole === 'seller' && !dispute.sellerDecision && (
        <div className="mt-[14px]">
          <p className="label font-mcqueen font-semibold">Actions :</p>
          <Button              
              variant="transparent-black"
              onClick={handleRefundWithoutReturn}
              className="w-full mb-[6px] mt-[6px]"
            >Rembourser {recipient.username} sans retour du colis</Button>              
          <Button              
              variant="transparent-black"
              onClick={handleReturnAtSellerCharge}
              className="w-full mb-[6px]"
            >Retour du colis à vos frais</Button>              
            <Button              
              variant="transparent-black"
              onClick={handleReturnAtBuyerCharge}
              className="w-full"
            >Retour du colis au frais de {recipient.username}</Button>
        </div>
      )}
      
      <div className="h-[19px]"></div>      
    </Modal>
  );
}
