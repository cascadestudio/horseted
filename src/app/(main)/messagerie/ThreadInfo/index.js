import { useIsClickOutsideElement } from "@/utils/hooks";
import { useThreadsContext } from "@/app/(main)/messagerie/context/ThreadsContext";
import { useEffect, useRef, useState } from "react";
import { centsToEuros } from "@/utils/centsToEuros";
import { useRouter } from "next/navigation";

import ThreeDotsIcon from "@/assets/icons/ThreeDotsIcon";
import AvatarDisplay from "@/components/AvatarDisplay";
import ClientProductImage from "@/components/ClientProductImage";
import SignalementModal from "../Modals/SignalementModal";
import UserBlockModal from "../Modals/UserBlockModal";
import NextArrow from "@/assets/icons/NextArrow";
import OrderInfo from "./OrderInfo";
import Link from "next/link";
import { deleteThread } from "@/fetch/threads";
import { getBlockedUsers } from "@/fetch/users";
import Alert from "@/components/Alert";

export default function ThreadInfo({
  setIsDisputeModal
}) {
  const {
    user,
    accessToken,
    product,
    orderTracking,
    recipient,
    initThreads,
    activeThread,
    setActiveThread,
    setIsInfo,
    dispute,
    order,
    resetActiveThread
  } = useThreadsContext();

  const router = useRouter();

  const [isDropdown, setIsDropdown] = useState(false);
  const [alert, setAlert] = useState(false);
  const [isSignalementModal, setIsSignalementModal] = useState(false);
  const [isUserBlockModal, setIsUserBlockModal] = useState(false);
  const dropdownRef = useRef();
  const [isClickOutside, setIsClickOutside] =
    useIsClickOutsideElement(dropdownRef);
  const [recipientBlocked, setRecipientBlocked] = useState(null);

  useEffect(() => {
    handleBlockedRecipient();
  }, []);

  const handleBlockedRecipient = async () => {
    const blockedUsers = await getBlockedUsers(accessToken);
    const blockedUser = blockedUsers.find(
      (blockedUser) => blockedUser.blockedUserId === recipient.id
    );
    if (blockedUser) {
      setRecipientBlocked(blockedUser);
    } else {
      setRecipientBlocked(null);
    }
  };

  useEffect(() => {
    if (isClickOutside) {
      setIsDropdown(false);
      setIsClickOutside(false);
    }
  }, [isClickOutside, setIsClickOutside]);

  function handleClick() {
    setIsDropdown(!isDropdown);
    setIsClickOutside(false);
  }

  const onDeleteThread = async () => {
    await deleteThread(accessToken, activeThread.id);
    await initThreads();

    resetActiveThread(null);
    router.replace('/messagerie');
  };

  return (
    <div>
      { order?.adminStatus === 'disputed' ||
        (dispute && !dispute.sentToHorseted && !(dispute.orderRefunds?.length ?? 0)) && (
          <div className="flex items-center justify-between w-full h-[50px] px-10 bg-[#D61919]">
            <span className="font-mcqueen font-bold text-[14px] text-white">Litige en cours</span>
            <Link href="" onClick={setIsDisputeModal} className="font-mcqueen font-bold text-[14px] text-white underline">VOIR LE LITIGE</Link>
          </div>   
        )
      }
      <div className="flex flex-col w-full px-10 py-4">        
        <div className="flex items-center justify-between relative">
          <div className="flex items-center py-2 border-b w-full">
            <Link
              href={`/vendeur/${recipient.id}`}
              className="flex items-center w-full"
            >
              <AvatarDisplay
                avatar={recipient.avatar}
                size={54}
                className="flex-none mr-4"
              />
              <span className="capitalize">{recipient.username}</span>
              <NextArrow className="ml-auto mr-10" />
            </Link>
            <button className="p-2" onClick={handleClick}>
              <ThreeDotsIcon />
            </button>
          </div>
          {isDropdown && (
            <div
              ref={dropdownRef}
              className="flex flex-col items-start absolute bg-white border border-dark-grey rounded-lg p-4 font-semibold gap-3 right-0 top-14"
            >
              <button
                onClick={() => setIsSignalementModal(!isSignalementModal)}
                className="flex items-center gap-2"
              >
                <img src="/icons/signaler.svg" alt="" />
                Signaler
              </button>
              <button
                onClick={() => setIsUserBlockModal(!isUserBlockModal)}
                className="flex items-center gap-2"
              >
                <img src="/icons/bloquer.svg" alt="" />
                {recipientBlocked ? "Débloquer" : "Bloquer"}
              </button>
              {!orderTracking && (
                <button
                  onClick={onDeleteThread}
                  className="flex items-center gap-2"
                >
                  <img src="/icons/supprimer-conversation.svg" alt="" />
                  Supprimer la conversation
                </button>
              )}
            </div>
          )}
        </div>
        {!product ||
          (product.length > 0 && (
            <div className="flex items-start py-5">
              <ClientProductImage
                className="w-12 mr-4"
                product={product}
                size="small"
              />
              <Link href={`/articles/${product.id}`}>
                <h3 className="text-lg font-mcqueen font-bold capitalize">
                  {product.title}
                </h3>
                <p className="text-sm font-poppins">
                  {centsToEuros(product.price)} €
                </p>
              </Link>
            </div>
          ))}
        {orderTracking && <OrderInfo />}
      </div>
      {isSignalementModal && (
        <SignalementModal
          accessToken={accessToken}
          setIsSignalementModal={setIsSignalementModal}
          sellerId={recipient.id}
          productId={null}
        />
      )}
      {isUserBlockModal && (
        <UserBlockModal
          accessToken={accessToken}
          setIsUserBlockModal={setIsUserBlockModal}
          userId={user.id}
          recipient={recipient}
          recipientBlocked={recipientBlocked}
          setAlert={setAlert}
          handleBlockedRecipient={handleBlockedRecipient}
        />
      )}
      {alert && (
        <Alert setAlert={setAlert} type="success">
          {alert}
        </Alert>
      )}
    </div>
  );
}
