import { useEffect, useState } from "react";
import MainContainerWithFooter from "../Components/MainContainerWithFooter";

export default function LegalPage({ placeDoc, setPlaceDoc }) {
  const [securityCameras, setSecurityCameras] = useState(
    placeDoc?.reservations.legal.securityCameras || false
  );
  const [weapons, setWeapons] = useState(
    placeDoc?.reservations.legal.weapons || false
  );
  const [dangerousAnimals, setDangerousAnimals] = useState(
    placeDoc?.reservations.legal.dangerousAnimals || false
  );

  const [showMoreDetailsModal, setShowMoreDetailsModal] = useState(false);
  const [closeMoreDetailsModal, setCloseMoreDetailsModal] = useState(false);

  function handleCloseModal() {
    setCloseMoreDetailsModal(true);
    setTimeout(() => {
      setShowMoreDetailsModal(false);
    }, 400);
  }

  function handleOpenModal() {
    setShowMoreDetailsModal(true);
    setCloseMoreDetailsModal(false);
  }

  useEffect(() => {
    setPlaceDoc((prev) => {
      return {
        ...prev,
        reservations: {
          ...prev.reservations,
          legal: {
            securityCameras: securityCameras,
            weapons: weapons,
            dangerousAnimals: dangerousAnimals,
          },
        },
      };
    });
  }, [securityCameras, weapons, dangerousAnimals]);

  return (
    <>
      <div className="h-full w-full flex items-center justify-center fade-in">
        <MainContainerWithFooter>
          <div className="w-[630px] my-auto block">
            <div className="flex flex-col justify-center items-center w-full h-full">
              <div className="font-semibold text-4xl mb-8 break-words w-full">
                <h1>Just one last step!</h1>
              </div>
              <div className="pb-8 w-full border-b border-neutral-200">
                <div className="flex items-center mb-5">
                  <h2 className="text-[18px] font-semibold tracking-wide pr-2">
                    Does your place have any of these?
                  </h2>
                  <div className="h-full relative flex items-center">
                    <button
                      className="btn-hover-bg bg-transparent appearance-none relative text-black btn-click-shrink"
                      onClick={() => handleOpenModal()}
                    >
                      <span className="relative">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 12 12"
                          aria-hidden="true"
                          role="presentation"
                          focusable="false"
                          style={{
                            display: "block",
                            height: 16,
                            width: 16,
                            fill: "currentcolor",
                          }}
                        >
                          <path d="M6 0a6 6 0 1 1 0 12A6 6 0 0 1 6 0zm0 1a5 5 0 1 0 0 10A5 5 0 0 0 6 1zM4.79 4.57l2.06.06-.57 1.8-.4 1.37-.17.51-.06.14 1.32-.52-.21.8-.2.14-.27.15-.15.08-.34.16c-.29.13-.53.2-.7.2-.28 0-.5-.2-.5-.46v-.14l.02-.08.04-.22.06-.26.07-.3.15-.55.19-.63.13-.44.14-.42.1-.3.11-.25.05-.1-1.1-.06.18-.65zm2.6-2.08.04.06-.4 1.23-1.13-.06.4-1.23z" />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>

                <div className="w-full">
                  <LegalCheckBoxInput
                    title={"Security camera(s)"}
                    value={"security-cameras"}
                    isChecked={securityCameras}
                    setIsChecked={setSecurityCameras}
                  />
                  <LegalCheckBoxInput
                    title={"Weapons"}
                    value={"weapons"}
                    isChecked={weapons}
                    setIsChecked={setWeapons}
                  />
                  <LegalCheckBoxInput
                    title={"Dangerous animals"}
                    value={"dangerous-animals"}
                    isChecked={dangerousAnimals}
                    setIsChecked={setDangerousAnimals}
                  />
                </div>
              </div>
              <div className="pt-12">
                <div className="text-lg font-semibold text-neutral-500 mb-2">
                  Important things to know
                </div>
                <div className="text-[17px] text-neutral-500">
                  Be sure to comply with your{" "}
                  <span className="underline">
                    <a
                      target="_blank"
                      href="https://www.airbnb.com/help/article/3029/?locale=en-IN&country_override=IN"
                    >
                      local laws
                    </a>
                  </span>{" "}
                  and review Airbnb's{" "}
                  <span className="underline">
                    <a
                      target="_blank"
                      href="https://www.airbnb.com/help/article/2867/nondiscrimination-policy?locale=en-IN&country_override=IN"
                    >
                      nondiscrimination policy
                    </a>
                  </span>{" "}
                  and{" "}
                  <span className="underline">
                    <a
                      target="_blank"
                      href="https://www.airbnb.com/help/article/1857/what-are-airbnb-service-fees?locale=en-IN&country_override=IN"
                    >
                      guest and Host fees
                    </a>
                  </span>
                  .
                </div>
              </div>
            </div>
          </div>
        </MainContainerWithFooter>
      </div>
      {showMoreDetailsModal && (
        <MoreDetailsModal
          closeMoreDetailsModal={closeMoreDetailsModal}
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  );
}

function LegalCheckBoxInput({ title, value, isChecked, setIsChecked }) {
  const [isHovered, setIsHovered] = useState(false);

  function getCheckBoxClass(isChecked, isHovered) {
    if (isChecked) {
      return "bg-black";
    } else {
      return isHovered
        ? "bg-white border border-black"
        : "border border-neutral-400";
    }
  }
  return (
    <div className="w-full mb-6">
      <label
        htmlFor={value}
        className="flex justify-between cursor-pointer"
        onClick={() => {
          setIsChecked((prev) => !prev);
        }}
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        <div className="text-neutral-600 text-[17px]">{title}</div>
        <div>
          <span className="relative">
            <input
              type="checkbox"
              id={value}
              className="absolute opacity-0 w-[1px] outline-none"
              onClick={(ev) => ev.stopPropagation()}
            />
            <span
              className={
                "h-6 w-6 cursor-pointer rounded block " +
                getCheckBoxClass(isChecked, isHovered)
              }
            >
              {isChecked && (
                <span className="w-full h-full ml-1 pt-[2px] text-white block">
                  <CheckedIcon />
                </span>
              )}
            </span>
          </span>
        </div>
      </label>
    </div>
  );
}

function CheckedIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      aria-hidden="true"
      role="presentation"
      focusable="false"
      style={{
        display: "block",
        fill: "none",
        height: 16,
        width: 16,
        stroke: "currentcolor",
        strokeWidth: 4,
        overflow: "visible",
      }}
    >
      <path fill="none" d="m4 16.5 8 8 16-16" />
    </svg>
  );
}

function MoreDetailsModal({ closeMoreDetailsModal, handleCloseModal }) {
  return (
    <div
      className="fixed top-0 left-0 block w-full h-full z-30"
      onClick={() => handleCloseModal()}
    >
      <div
        className={
          "w-full h-full fixed top-0 left-0" +
          (closeMoreDetailsModal ? " modal-fadeOut" : " modal-background")
        }
      ></div>
      <div className="flex z-40 h-[100vh] w-[100vw] items-center justify-center p-10 fixed top-0 left-0">
        <div
          className={
            "relative flex flex-col modal-shadow rounded-xl bg-white z-50 overflow-hidden max-h-full w-[400px]" +
            (closeMoreDetailsModal ? " blowOut-animation" : " blowIn-animation")
          }
          onClick={(ev) => ev.stopPropagation()}
        >
          <div className="flex w-full py-5 bg-transparent">
            <button
              className="absolute top-4 left-4 p-2 hover:bg-neutral-100 rounded-full"
              onClick={() => handleCloseModal()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                style={{
                  display: "block",
                  fill: "none",
                  height: 16,
                  width: 16,
                  stroke: "currentcolor",
                  strokeWidth: 3,
                  overflow: "visible",
                }}
              >
                <path d="m6 6 20 20M26 6 6 26" />
              </svg>
            </button>
          </div>
          <div className="p-6 pt-4 text-[15px] leading-[20px] border-b border-neutral-200 overflow-y-auto">
            <span className="text-neutral-700">
              <span className="font-semibold text-black">
                Security camera(s)
              </span>
              <br />
              Hosts are required to disclose all security cameras and other
              recording devices in their listings. Intentionally concealed
              recording devices, or devices that observe the interior of
              bedrooms and bathrooms, are prohibited.{" "}
              <span className="underline">
                <a
                  href="https://www.airbnb.com/help/article/887/what-are-airbnbs-rules-about-security-cameras-and-other-recording-devices-in-listings?locale=en-IN&country_override=IN"
                  target="_blank"
                >
                  Learn more
                </a>
              </span>
              <br />
              <br />
              <span className="font-semibold text-black">Weapons</span>
              <br />
              All weapons at a listing must be properly disclosed, stored and
              secured.{" "}
              <span className="underline">
                <a
                  href="https://www.airbnb.com/help/article/1529/what-are-airbnbs-rules-about-weapons-in-a-listing?locale=en-IN&country_override=IN"
                  target="_blank"
                >
                  Learn more
                </a>
              </span>
              <br />
              <br />
              <span className="font-semibold text-black">
                Dangerous animals
              </span>
              <br />
              Hosts should not keep a potentially dangerous animal (one that’s
              capable of causing serious harm to humans or other animals) in a
              listing without properly disclosing its presence and securing it
              in a safe and secure accommodation.{" "}
              <span className="underline">
                <a
                  href="https://www.airbnb.com/help/article/2135/what-are-airbnbs-rules-about-potentially-dangerous-animals?locale=en-IN&country_override=IN"
                  target="_blank"
                >
                  Learn more
                </a>
              </span>
            </span>
          </div>
          <footer className="flex items-center justify-between py-4 px-6">
            <div className="ml-auto mr-0 block">
              <button
                className="rounded-lg px-[14px] py-1 btn-click-shrink bg-black text-white font-semibold"
                onClick={() => handleCloseModal()}
              >
                Done
              </button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
