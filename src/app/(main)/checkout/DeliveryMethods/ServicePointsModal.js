import Modal from "@/components/Modal";

export default function ServicePointsModal({
  servicePoints,
  setActiveServicePointId,
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
            onClick={() => setActiveServicePointId(servicePoint.id)}
            key={servicePoint.id}
          >
            {servicePoint.name}
          </button>
        );
      })}
    </Modal>
  );
}
