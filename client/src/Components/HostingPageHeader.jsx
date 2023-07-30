import { useContext } from "react";
import { UserContext } from "../../UserContext";

export default function HostingPageHeader() {
  const { user } = useContext(UserContext);

  function getProfileAvatar() {
    let letter = user?.name[0].toUpperCase();

    return (
      <div className="border border-neutral-200 rounded-full p-1 cursor-pointer">
        <div className="bg-black rounded-full h-8 w-8 text-center text-xs p-2 text-white">
          {letter}
        </div>
      </div>
    );
  }

  return (
    <div>
      <header className="flex justify-between items-center py-4 mx-7">
        <a href="/" className="flex logo gap-1 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8 -rotate-90 text-primary"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </a>

        <div className="flex items-center gap-1">
          <div className="font-semibold py-2 px-3 rounded-full cursor-pointer hover:bg-neutral-100">
            Today
          </div>
          <div className="py-2 px-3 rounded-full text-gray-500 font-semibold cursor-pointer hover:bg-neutral-100">
            Inbox
          </div>
          <div className="py-2 px-3 rounded-full text-gray-500 font-semibold cursor-pointer hover:bg-neutral-100">
            Calendar
          </div>
          <div className="py-2 px-3 rounded-full text-gray-500 font-semibold cursor-pointer hover:bg-neutral-100">
            Insights
          </div>
          <div className="py-2 px-3 rounded-full text-gray-500 font-semibold cursor-pointer hover:bg-neutral-100">
            Menu
          </div>
        </div>

        <div className="flex gap-6">
          <div className="border border-gray-300 rounded-full p-1 cursor-pointer hover:bg-gray-100">
            <div className="rounded-full h-8 w-8 p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                />
              </svg>
            </div>
          </div>

          {getProfileAvatar()}
        </div>
      </header>
      <div className="border border-b-0 border-gray-200"></div>
    </div>
  );
}
