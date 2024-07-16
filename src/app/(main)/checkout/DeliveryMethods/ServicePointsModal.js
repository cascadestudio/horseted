import Modal from "@/components/Modal";

export default function ServicePointsModal({
  servicePoints,
  setActiveServicePoint,
  setIsServicePointsModal,
}) {
  return (
    <Modal
      title="Choix du point relai"
      onClose={() => setIsServicePointsModal(false)}
    >
      {servicePoints.map((servicePoint) => {
        return (
          <button
            onClick={() => setActiveServicePoint(servicePoint)}
            key={servicePoint.id}
          >
            {servicePoint.name}
          </button>
        );
      })}
    </Modal>
  );
}
