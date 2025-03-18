import Modal from "@/components/Modal";
import { TextInput } from "@/components/input";
import fetchHorseted from "@/utils/fetchHorseted";
import { useState, useRef } from "react";
import AddReviewStarIcon from "@/assets/icons/AddReviewStarIcon";
import { useThreadsContext } from "@/app/(main)/messagerie/context/ThreadsContext";
import Button from "@/components/Button";
import TrashIcon from "@/assets/icons/TrashIcon";
import { createDispute, postDisputeDecision, sendToHorseted, postReturnDeliveryConfirmation } from "@/fetch/disputes";
import { useRouter } from "next/navigation";
import { downloadDocument } from "@/utils/downloadDocument";
import moment from "moment";
import Link from "next/link";
import { getParcelById } from "@/fetch/parcels";

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

  const handleFile = async (file) => {    
    const data = await fetchHorseted(
      `/medias/${file.fileName}`,
      accessToken
    );

    if (data) {      
      downloadDocument(data, file.originalName);
    }
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

  const handleCheckout = () => {
    router.push(`/return-checkout?disputeId=${dispute.id}`)
  }

  const handleSendToHorseted = async () => {
    const res = await sendToHorseted(accessToken, dispute.id);    
    await updateMessages(activeThread.id);

    setDispute(res);    
    setIsDisputeModal(false);
  }

  const handleConfirmReturnDelivery = async () => {
    const res = await postReturnDeliveryConfirmation(accessToken, dispute.id);    
    await updateMessages(activeThread.id);
    
    setDispute(res);    
    setIsDisputeModal(false);
  }

  const handleReturnTracking = async () => {
    const res = await getParcelById(accessToken, dispute.returnParcelId);    
    window.open(res.trackingUrl, '_blank');
  }


  const getDecisionMessage = () => {
    const decision = dispute.horsetedDecision ?? dispute.sellerDecision

    if (decision === 'refund_without_return') {
      return `La commande a été remboursé sans retour`
    } else if ((decision === 'return_at_buyer_charge' && userRole === 'seller')
              || (decision === 'return_at_seller_charge' && userRole === 'buyer')
    ) {
      return `Retour du colis aux frais de ${recipient.username}`;
    } else if ((decision === 'return_at_seller_charge' && userRole === 'seller')
              || (decision === 'return_at_buyer_charge' && userRole === 'buyer' )) {
      return `Retour du colis à vos frais`
    } else if (decision === 'return_at_horseted_charge') {
      return `Retour aux frais d'horseted`;
    }
  }

  const getFooterButtons = () => {
    const decision = dispute.horsetedDecision ?? dispute.sellerDecision;
    
    if (dispute.sentToHorseted && !dispute.horsetedDecision) {
      return <p className="font-mcqueen font-semibold text-[16px] mt-[35px] text-center" style={{color: "#D61919"}}>Horseted va traiter le litige</p>
    } else if (dispute.returnParcelId) {
      return <div className="w-full flex flex-col items-stretch mt-[35px]">
        <Button variant={'transparent-green'} onClick={handleReturnTracking}>Suivre le retour</Button>
        { !dispute.returnDeliveryConfirmedAt && userRole === 'seller' && dispute.returnDeliveredAt &&
          <Button className="mt-[6px]" variant={'green'} onClick={handleConfirmReturnDelivery}>Confirmer le retour</Button>
        }
        { !dispute.returnDeliveryConfirmedAt && userRole === 'seller' &&
          <center><Link className="text-dark-green text-xs underline mt-[6px]" onClick={() => {}} href=''>Ouvrir un litige sur le retour</Link></center>
        }        
      </div>;
    } else if (      
        ((decision == 'return_at_seller_charge' && userRole === 'seller')
          || (decision == 'return_at_buyer_charge' && userRole === 'buyer'))              
       && !dispute.returnPaymentId
    ) {
      return <div className="w-full flex flex-col items-stretch mt-[35px]">
        <Button variant={'green'} onClick={handleCheckout}>Payer le retour</Button>
        { !dispute.sentToHorseted && userRole === 'buyer' (
          <center className="mt-[6px]">
            <Link className="text-dark-green text-xs underline" onClick={handleSendToHorseted} href=''>Envoyer le litige à l'équipe Horseted</Link>
          </center>          
        )}        
      </div>
    } else if (!decision && userRole === 'buyer') {
      return <div className="mt-[35px]">
        { moment().subtract(72, 'hours').isBefore(dispute.createdAt)
            ? <p className="font-raleway text-[14px] font-medium text-center" style={{color:"#00000080"}}>Vous pouvez envoyer le litige à l'équipe Horseted, sans réponse du vendeur après 72h</p>
            : <center><Link className="text-dark-green text-xs underline" onClick={handleSendToHorseted} href=''>Envoyer le litige à l'équipe Horseted</Link></center>
        }
      </div>
    } else {
      return <></>
    }
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
          { dispute.files.map((file, index) => <Button              
              variant="transparent-black"
              onClick={() => handleFile(file)}
              className="w-full mt-[6px]"
            >              
              {file.originalName}
            </Button>)}
        </div>        
      )}
      <p className="label font-mcqueen font-semibold">Détails du litige :</p>
      <p>{ dispute.details }</p>
      {userRole === 'seller' && !dispute.sellerDecision && !dispute.sentToHorseted && (
        <div className="mt-[14px]">
          <p className="label font-mcqueen font-semibold">Actions :</p>
          <Button              
              variant="transparent-black"
              onClick={handleRefundWithoutReturn}
              className="w-full mb-[6px] mt-[6px]"
            >Rembourser {recipient.username} sans retour du colis</Button>              
          <Button              
              variant="transparent-black"
              onClick={handleCheckout}
              className="w-full mb-[6px]"
            >Retour du colis à vos frais</Button>              
            <Button              
              variant="transparent-black"
              onClick={handleReturnAtBuyerCharge}
              className="w-full"
            >Retour du colis au frais de {recipient.username}</Button>
        </div>
      )}      
      { (dispute.sellerDecision || dispute.horsetedDecision) && 
        (<p className="font-mcqueen font-semibold text-[16px] mt-[16px] text-center " style={{color: "#D61919"}}>{getDecisionMessage()}</p>)
      }
      { getFooterButtons() }      
    </Modal>
  );
}
