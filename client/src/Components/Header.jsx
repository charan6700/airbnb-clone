import { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";
import ProfileMenu from "./ProfileMenu";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

export default function Header() {
  const { user, ready } = useContext(UserContext);
  const [openMenu, setOpenMenu] = useState(false);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  let menuRef = useRef();

  useEffect(() => {
    let clickHandler = (ev) => {
      if (!menuRef.current.contains(ev.target)) {
        setOpenMenu(false);
      }
    };
    window.addEventListener("mousedown", clickHandler);

    return () => {
      window.removeEventListener("mousedown", clickHandler);
    };
  });

  function getProfileAvatar() {
    if (ready && user) {
      let letter = user.name[0].toUpperCase();

      return (
        <div className="bg-black rounded-full h-8 w-8 text-center text-xs p-2 text-white">
          {letter}
        </div>
      );
    } else {
      return (
        <div className="border rounded-full bg-gray-500 p-1 text-white overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 relative top-1"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      );
    }
  }

  if (!ready) return <div>Loading...</div>;

  return (
    <div>
      <header className="flex justify-between items-center p-4 mx-7">
        <a href="/" className="flex logo gap-1 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-9 h-9 -rotate-90 text-primary"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
          <span className="font-bold text-2xl text-primary">airbnb</span>
        </a>

        <div className="flex items-center border gap-2 p-2 rounded-full shadow-md shadow-gray-200">
          <div className="mx-2 font-semibold">Anywhere</div>
          <div className="border border-l-0 h-6"></div>
          <div className="mx-2 font-semibold">Any week</div>
          <span className="border h-6"></span>
          <div className="mx-2">Add guests</div>
          <button className="mx-1 bg-primary rounded-full p-2 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>

        <div ref={menuRef}>
          <div
            className={"flex items-center gap-3 py-1 px-2 border rounded-full hover:shadow-md shadow-neutral-300 cursor-pointer " + (openMenu && "shadow-md")}
            onClick={() => setOpenMenu(!openMenu)}
          >
            <div>
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
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </div>
            {getProfileAvatar()}
          </div>
          {openMenu && (
            <ProfileMenu
              setOpenMenu={setOpenMenu}
              setShowLoginModal={setShowLoginModal}
              setShowRegisterModal={setShowRegisterModal}
            />
          )}
        </div>
      </header>
      <div className="border border-gray-100"></div>
      {showLoginModal && <LoginModal showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} />}
      {showRegisterModal && (
        <RegisterModal setShowRegisterModal={setShowRegisterModal} />
      )}
    </div>
  );
}
