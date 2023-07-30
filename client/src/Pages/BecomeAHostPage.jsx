import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../UserContext";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import MainContainer from "../Components/MainContainer";
import MainContainerWithFooter from "../Components/MainContainerWithFooter";

export default function BecomeAHostPage() {
  const { user, ready } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.listings.length < 1) navigate("/become-a-host/overview");
  }, [user]);

  if (!ready) return <div>Loading...</div>;
  if (user && user.listings.length < 1)
    return <Navigate to="/become-a-host/overview" />;

  return (
    <div className="h-[100vh]">
      <div className="fixed z-10 w-[100vw]">
        <header className="relative flex justify-between items-center pt-8 pb-0 px-12">
          <a href="/" className="flex logo gap-1 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-9 h-9 -rotate-90 text-black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </a>

          <div className="flex gap-4">
            <div className="border font-semibold border-neutral-300 rounded-full px-4 py-2 cursor-pointer hover:border-black hover-animation">
              Questions?
            </div>
            <div className="border font-semibold border-neutral-300 rounded-full px-4 py-2 cursor-pointer hover:border-black hover-animation">
              Exit
            </div>
          </div>
        </header>
      </div>

      <div className="h-full w-full flex">
        <MainContainer>
          <ExistingPlacesMainContent user={user} />
        </MainContainer>
      </div>
    </div>
  );
}

function ExistingPlacesMainContent({ user }) {
  const navigate = useNavigate();

  function handleCreateANewListing() {
    navigate("/become-a-host/overview");
  }

  return (
    <div className="w-[623px] flex-col h-full">
      <div className="mb-7">
        <h1 className="text-4xl font-semibold">
          Welcome back, {user?.name.split(" ")[0]}
        </h1>
      </div>
      <div className="pb-12">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">Finish your listing</h2>
        </div>
        <div className="">
          {user?.listings.map((placeDoc, idx) => (
            <div key={idx} className="pb-4">
              <button
                onClick={() => {
                  navigate(
                    "/become-a-host/" + placeDoc.placeId + "/about-your-place"
                  );
                }}
                className="font-semibold border border-neutral-300 rounded-xl w-full text-left py-6 px-4 btn-click-shrink hover:border hover:border-black hover:bg-neutral-100"
              >
                <span className="flex items-center gap-3">
                  <span className="p-3 rounded-lg bg-neutral-200 opacity-80">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                      <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                    </svg>
                  </span>
                  <span className="">
                    Your listing started on{" "}
                    {new Date(placeDoc.createdAt).toDateString()}
                  </span>
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="pb-12">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">Start a new listing</h2>
        </div>
        <div className="pb-4 w-full flex">
          <div className="flex items-center border-b border-neutral-300 w-full text-left py-5 px-4">
            <div className="pr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 opacity-75"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="w-full">
              <button className="w-full" onClick={handleCreateANewListing}>
                <span className="flex justify-between">
                  <div className="text-lg text-gray-600">
                    Create a new listing
                  </div>
                  <span>
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
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="pb-4 w-full flex">
          <div className="flex items-center border-b border-neutral-300 w-full text-left py-5 px-4">
            <div className="pr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 opacity-75"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                />
              </svg>
            </div>
            <div className="w-full">
              <button className="w-full">
                <span className="flex justify-between">
                  <div className="text-lg text-gray-600">
                    Duplicate an existing listing
                  </div>
                  <span>
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
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
