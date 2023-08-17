import { useEffect, useState } from "react";
import MainContainerWithFooter from "../Components/MainContainerWithFooter";

export default function DiscountPage({ placeDoc, setPlaceDoc }) {
  const [newListingDiscount, setNewListingDiscount] = useState(
    placeDoc?.reservations.discounts.newListing
  );
  const [weeklyDiscount, setWeeklyDiscount] = useState(
    placeDoc?.reservations.discounts.weekly
  );
  const [monthlyDiscount, setMonthlyDiscount] = useState(
    placeDoc?.reservations.discounts.monthly
  );

  const [showDisclaimerModal, setShowDisclaimerModal] = useState(false);
  const [closeDisclaimerModal, setCloseDisclaimerModal] = useState(false);

  const [lastActiveInputWeekly, setLastActiveInputWeekly] = useState(true);

  function handleCloseModal() {
    setCloseDisclaimerModal(true);
    setTimeout(() => {
      setShowDisclaimerModal(false);
    }, 400);
  }

  function handleOpenModal() {
    setShowDisclaimerModal(true);
    setCloseDisclaimerModal(false);
  }

  useEffect(() => {
    setPlaceDoc((prev) => {
      return {
        ...prev,
        reservations: {
          ...prev.reservations,
          discounts: {
            newListing: newListingDiscount,
            weekly: weeklyDiscount,
            monthly: monthlyDiscount,
          },
        },
      };
    });
  }, [newListingDiscount, weeklyDiscount, monthlyDiscount]);

  return (
    <>
      <div className="h-full w-full flex items-center justify-center fade-in">
        <MainContainerWithFooter>
          <div className="w-[630px] my-auto block">
            <div className="flex flex-col justify-center items-center w-full h-full">
              <div className="font-semibold text-4xl mb-4 break-words w-full">
                <h1>Add discounts</h1>
              </div>
              <div className="mb-6 w-full">
                <span className="text-lg text-neutral-500">
                  Help your place stand out to get booked faster and earn your
                  first reviews.
                </span>
              </div>
              <div className="w-full">
                <NewListingDiscountCheckBoxInput
                  discountDoc={newListingDiscount}
                  setDiscountDoc={setNewListingDiscount}
                  title={"New listing promotion"}
                  description={"Offer 20% off your first 3 bookings"}
                  value={"newListing-promotion"}
                />
                <DiscountCheckBoxInput
                  discountDoc={weeklyDiscount}
                  setDiscountDoc={setWeeklyDiscount}
                  title={"Weekly discount"}
                  description={"For stays of 7 nights or more"}
                  value={"weeklyDiscount-promotion"}
                  errorMessage={`Your weekly discount must be lower than your monthly discount of ${monthlyDiscount.value}%`}
                  showError={
                    weeklyDiscount.isSet &&
                    monthlyDiscount.isSet &&
                    lastActiveInputWeekly &&
                    weeklyDiscount.value >= monthlyDiscount.value
                  }
                  setLastActiveInputWeekly={setLastActiveInputWeekly}
                />
                <DiscountCheckBoxInput
                  discountDoc={monthlyDiscount}
                  setDiscountDoc={setMonthlyDiscount}
                  title={"Monthly discount"}
                  description={"For stays of 28 nights or more"}
                  value={"monthlyDiscount-promotion"}
                  errorMessage={`Your monthly discount must be higher than your weekly discount of ${weeklyDiscount.value}%`}
                  showError={
                    monthlyDiscount.isSet &&
                    weeklyDiscount.isSet &&
                    !lastActiveInputWeekly &&
                    weeklyDiscount.value >= monthlyDiscount.value
                  }
                  setLastActiveInputWeekly={setLastActiveInputWeekly}
                />
              </div>
              <div className="text-[12px] text-neutral-500 mb-2">
                Only one discount will be applied per stay.{" "}
                <span>
                  <button
                    className="underline"
                    onClick={() => handleOpenModal()}
                  >
                    Learn&nbsp;more
                  </button>
                </span>
              </div>
            </div>
          </div>
        </MainContainerWithFooter>
      </div>
      {showDisclaimerModal && (
        <DisclaimerModal
          closeDisclaimerModal={closeDisclaimerModal}
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  );
}

function NewListingDiscountCheckBoxInput({
  discountDoc,
  setDiscountDoc,
  title,
  description,
  value,
}) {
  return (
    <div className="flex items-center justify-between w-full mb-6 py-[34px] rounded-xl border border-neutral-300 bg-neutral-100 bg-opacity-80">
      <div className={"font-bold block basis-[54px] text-lg mx-6 min-h-[40px]"}>
        <div
          className={
            "text-center m-1" + (discountDoc.isSet ? "" : " opacity-40")
          }
        >
          {discountDoc.value}%
        </div>
      </div>
      <div className="flex flex-1 flex-col">
        <div className="text-[17px] leading-5">{title}</div>
        <div className="text-neutral-500 text-[15px] leading-4 mt-1">
          {description}
        </div>
      </div>
      <label htmlFor={value} className="ms-4 me-6">
        <span className="relative">
          <input
            type="checkbox"
            id={value}
            className="absolute opacity-0 w-[1px] outline-none"
          />
          <span
            className={
              "h-6 w-6 cursor-pointer rounded  block" +
              (discountDoc.isSet
                ? " bg-black"
                : " bg-white hover:border-black border border-neutral-400")
            }
            onClick={() => {
              setDiscountDoc((prev) => {
                return { ...prev, isSet: !prev.isSet };
              });
            }}
          >
            {discountDoc.isSet && (
              <span className="w-full h-full ml-1 pt-[2px] text-white block">
                <CheckedIcon />
              </span>
            )}
          </span>
        </span>
      </label>
    </div>
  );
}

function DiscountCheckBoxInput({
  discountDoc,
  setDiscountDoc,
  title,
  description,
  value,
  errorMessage,
  showError,
  setLastActiveInputWeekly,
}) {
  const [inputValue, setInputValue] = useState("" + discountDoc.value);
  const [inputActive, setInputActive] = useState(false);

  function getDiscountInputContainerClass(showError, inputActive) {
    if (showError) {
      return inputActive
        ? "discount-input-invalid-active"
        : "discount-input-invalid";
    } else {
      return inputActive ? "discount-input-active" : "discount-input-container";
    }
  }

  return (
    <div className="py-[34px] rounded-xl border border-neutral-300 bg-neutral-100 bg-opacity-80 mb-6 w-full">
      <div className="flex items-center justify-between w-full">
        <div
          className={"font-bold block basis-[54px] text-lg mx-6 min-h-[40px]"}
        >
          <div
            className={
              "flex relative items-center text-center w-full h-full justify-center rounded-lg" +
              (discountDoc.isSet ? " bg-white" : " opacity-20") +
              (" " + getDiscountInputContainerClass(showError, inputActive))
            }
          >
            <label
              htmlFor="weeklyDiscountPercentage-input"
              className="flex h-full relative"
            >
              <input
                type="text"
                inputMode="numeric"
                name=""
                id="weeklyDiscountPercentage-input"
                value={inputValue}
                placeholder="0"
                onChange={(ev) => {
                  let val = ev.target.value;
                  if (!val) {
                    setInputValue("");
                    setDiscountDoc((prev) => {
                      return { ...prev, value: 0 };
                    });
                    return;
                  }
                  if (!val.includes(".") && !isNaN(val)) {
                    let numberInt = parseInt(val);
                    if (numberInt < 100) {
                      setInputValue("" + numberInt);
                      setDiscountDoc((prev) => {
                        return { ...prev, value: numberInt };
                      });
                    }
                  }
                }}
                className={
                  "outline-none placeholder:text-neutral-500 m-2 pr-4 w-full h-full border-none text-center bg-transparent" +
                  (discountDoc.isSet ? "" : " cursor-not-allowed")
                }
                disabled={!discountDoc.isSet}
                onFocus={() => {
                  setInputActive(true);
                  if (value.includes("weekly")) setLastActiveInputWeekly(true);
                  else setLastActiveInputWeekly(false);
                }}
                onBlur={() => setInputActive(false)}
              />
              <div className="absolute left-0 w-full text-center py-[6px] pointer-events-none">
                <span className="invisible">{inputValue || "0"}</span>
                <span className={inputValue ? "" : "text-neutral-500"}>%</span>
              </div>
            </label>
          </div>
        </div>
        <div className="flex flex-1 flex-col">
          <div className="text-[17px] leading-5">{title}</div>
          <div className="text-neutral-500 text-[15px] leading-4 mt-1">
            {description}
          </div>
        </div>
        <label htmlFor={value} className="ms-4 me-6">
          <span className="relative">
            <input
              type="checkbox"
              id={value}
              className="absolute opacity-0 w-[1px] outline-none"
            />
            <span
              className={
                "h-6 w-6 cursor-pointer rounded  block" +
                (discountDoc.isSet
                  ? " bg-black"
                  : " bg-white hover:border-black border border-neutral-400")
              }
              onClick={() => {
                setDiscountDoc((prev) => {
                  return { ...prev, isSet: !prev.isSet };
                });
              }}
            >
              {discountDoc.isSet && (
                <span className="w-full h-full ml-1 pt-[2px] text-white block">
                  <CheckedIcon />
                </span>
              )}
            </span>
          </span>
        </label>
      </div>
      {showError && (
        <div
          className={
            "w-full mt-3 flex items-center text-error text-[13px] ms-4 me-4"
          }
        >
          <span className="mr-2 p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              aria-label="Error"
              role="img"
              focusable="false"
              style={{
                display: "block",
                height: 12,
                width: 12,
                fill: "currentcolor",
              }}
            >
              <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm0 10.2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm.8-6.6H7.2v5.2h1.6z" />
            </svg>
          </span>
          {errorMessage}
        </div>
      )}
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

function DisclaimerModal({ closeDisclaimerModal, handleCloseModal }) {
  return (
    <div
      className="fixed top-0 left-0 block w-full h-full z-30"
      onClick={() => handleCloseModal()}
    >
      <div
        className={
          "w-full h-full fixed top-0 left-0" +
          (closeDisclaimerModal ? " modal-fadeOut" : " modal-background")
        }
      ></div>
      <div className="flex z-40 h-[100vh] w-[100vw] items-center justify-center p-10 fixed top-0 left-0">
        <div
          className={
            "relative flex flex-col modal-shadow  rounded-xl bg-white z-50 w-[376px]" +
            (closeDisclaimerModal ? " slideDown-animation" : " popup-animation")
          }
          onClick={(ev) => ev.stopPropagation()}
        >
          <header className="flex w-full py-5 border-b border-neutral-200">
            <button
              className="absolute top-4 left-3 p-2 hover:bg-neutral-100 rounded-full"
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
            <div className="w-full text-center font-semibold text-[17px]">
              Discounts
            </div>
          </header>
          <div className="p-6 text-[15px] text-neutral-700 leading-5">
            <span>
              You choose your discount and you can change it at any time.
              <br />
              <br />
              Suggested discounts are based on the average for listings with
              discounts in your area (or the global average if not enough
              listings with discounts are in your area). Weekly discounts are
              for stays of 7 nights or more. Monthly discounts are for stays of
              28 nights or more.
              <br />
              <br />
              Visit the Discounts section of our Help Centre to learn more.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
