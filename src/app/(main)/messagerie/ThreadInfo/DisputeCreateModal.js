import Modal from "@/components/Modal";
import { TextInput } from "@/components/input";
import fetchHorseted from "@/utils/fetchHorseted";
import { useState, useRef } from "react";
import AddReviewStarIcon from "@/assets/icons/AddReviewStarIcon";
import { useThreadsContext } from "@/app/(main)/messagerie/context/ThreadsContext";
import Button from "@/components/Button";
import TrashIcon from "@/assets/icons/TrashIcon";
import { createDispute } from "@/fetch/disputes";

export default function DisputeCreateModal({
  setIsDisputeCreateModal,
  orderId,
}) {
  const hiddenFileInput = useRef(null);

  const { accessToken, updateMessages, setDispute, activeThread } = useThreadsContext();

  const [disputeFormData, setDisputeFormData] = useState({
    details: "",
    files:[]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDisputeFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {    
    if (e.target.files && e.target.files[0]) {      
      setDisputeFormData((prev) => ({ ...prev, files: [...disputeFormData.files, e.target.files[0]] }));      
    }
  }

  async function postDispute() {    
    const formData = new FormData();
    formData.append('orderId', orderId);
    formData.append('details', disputeFormData.details.trim());

    console.log(disputeFormData.files.length);
    if (disputeFormData.files.length) {      
      disputeFormData.files.map((file, index) => {
        formData.append('files', file, file.name);
      });
    }

    const dispute = await createDispute(accessToken, formData);
    
    setDispute(dispute);    
    updateMessages(activeThread.id);
    setIsDisputeCreateModal(false);
  }

  const handleAddFile = (e) => {
    hiddenFileInput.current.click();
  }

  const handleRemoveFile = (index) => {
    const files = disputeFormData.files;
    files.splice(index, 1);

    setDisputeFormData(prev => ({ ...prev, files }))
  }

  return (
    <Modal
      disabled={!disputeFormData.details.trim().length}
      onClose={() => {
        setIsDisputeCreateModal(false);
      }}
      onSubmit={postDispute}
      title="Détails du litige"
      buttonText="Envoyer"
      isNotForm={true}
    >
      <TextInput
        label="Détails du litige*"
        type="textarea"
        value={disputeFormData.details}
        onChange={handleChange}
        name="details"
        placeholder="Dites nous en plus sur le problème rencontré. Ajoutez le plus d'informations possibles"
      />
      <div
        style={{
          marginTop: 39
        }}
      >
          <p className="label font-mcqueen font-semibold">Pièces jointes :</p>
          <p className="font-raleway text-[14px]" style={{color:"#ADA89F"}}>
            Max 20Mo - 3 Fichiers
          </p>
          <div className="mt-[15px]">
            <Button
              disabled={disputeFormData.files.length == 3}
              variant="transparent-green"
              onClick={handleAddFile}
              className="w-full"
            >              
              Télécharger un document
            </Button>    
            <input
              onChange={handleFileChange}
              type="file"
              ref={hiddenFileInput}              
              className="hidden"
              accept="image/jpeg, image/png, application/pdf"
            />            
          </div>
          { disputeFormData.files.length > 0 && (
            <div className="mt-[19px]">
              {disputeFormData.files.map((file, index) => {
                return <div className="lg:flex lg:flex-row">
                  <button onClick={() => handleRemoveFile(index)}>
                    <TrashIcon/>
                  </button>                  
                  <p className="ml-[10px] font-raleway text-[14px] font-semibold">{file.name}</p>
                </div>                
              })}
            </div>
          )}
          <div className="h-[19px]"></div>
      </div>      
    </Modal>
  );
}
