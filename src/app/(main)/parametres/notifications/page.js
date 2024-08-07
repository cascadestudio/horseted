export default function Page() {
  return (
    <div className="flex flex-col justify-center w-full lg:pt-14">
      <h1 className="text-[24px] font-mcqueen font-bold mt-4 lg:mt-0">
        Notifications par e-mail
      </h1>
      <form className="w-full">
        <div className="flex justify-between p-5 border-b border-lighter-grey">
          <p className="font-semibold">Nouveaux messages</p>
          <label
            htmlFor="emailNotifications"
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in ml-2">
              <input
                name="emailNotifications"
                id="emailNotifications"
                type="checkbox"
                className="absolute block w-4 h-4 rounded-full bg-grey border-none appearance-none cursor-pointer top-1 checked:right-1 right-5 checked:bg-light-green"
              />
              <div className="block overflow-hidden h-6 rounded-full bg-white cursor-pointer border border-grey"></div>
            </div>
          </label>
        </div>
        <div className="flex justify-between p-5 border-b border-lighter-grey">
          <p className="font-semibold">Nouvelles évaluations</p>
          <label
            htmlFor="newReviews"
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in ml-2">
              <input
                name="newReviews"
                id="newReviews"
                type="checkbox"
                className="absolute block w-4 h-4 rounded-full bg-grey border-none appearance-none cursor-pointer top-1 checked:right-1 right-5 checked:bg-light-green"
              />
              <div className="block overflow-hidden h-6 rounded-full bg-white cursor-pointer border border-grey"></div>
            </div>
          </label>
        </div>
        <div className="flex justify-between p-5 border-b border-lighter-grey">
          <p className="font-semibold">Nouvelle vente</p>
          <label
            htmlFor="newSale"
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in ml-2">
              <input
                name="newSale"
                id="newSale"
                type="checkbox"
                className="absolute block w-4 h-4 rounded-full bg-grey border-none appearance-none cursor-pointer top-1 checked:right-1 right-5 checked:bg-light-green"
              />
              <div className="block overflow-hidden h-6 rounded-full bg-white cursor-pointer border border-grey"></div>
            </div>
          </label>
        </div>
        <div className="flex justify-between p-5 border-b border-lighter-grey">
          <p className="font-semibold">Notifications de commande</p>
          <label
            htmlFor="orderNotifications"
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in ml-2">
              <input
                name="orderNotifications"
                id="orderNotifications"
                type="checkbox"
                className="absolute block w-4 h-4 rounded-full bg-grey border-none appearance-none cursor-pointer top-1 checked:right-1 right-5 checked:bg-light-green"
              />
              <div className="block overflow-hidden h-6 rounded-full bg-white cursor-pointer border border-grey"></div>
            </div>
          </label>
        </div>
        <div className="flex justify-between p-5 border-b border-lighter-grey">
          <p className="font-semibold">Notifications de l’application</p>
          <label
            htmlFor="appNotifications"
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in ml-2">
              <input
                name="appNotifications"
                id="appNotifications"
                type="checkbox"
                className="absolute block w-4 h-4 rounded-full bg-grey border-none appearance-none cursor-pointer top-1 checked:right-1 right-5 checked:bg-light-green"
              />
              <div className="block overflow-hidden h-6 rounded-full bg-white cursor-pointer border border-grey"></div>
            </div>
          </label>
        </div>
      </form>
      <p className="font-medium italic mt-4">
        Vous pouvez personnaliser les notifications de l’application dans les
        réglages de votre application sur votre mobile.
      </p>
    </div>
  );
}
