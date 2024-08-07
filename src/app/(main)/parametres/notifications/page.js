export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="text-[24px] font-mcqueen font-bold mb-4">
        Notifications par e-mail
      </h1>
      <form className="w-full">
        <div className="flex flex-col gap-4 ">
          <label
            htmlFor="emailNotifications"
            className="flex items-center gap-2 cursor-pointer"
          >
            <span className="text-sm">Nouveaux messages</span>
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
      </form>
    </div>
  );
}
