import { useState } from "react";
import MainContainerWithFooter from "../Components/MainContainerWithFooter";

export default function PricePage({ placeDoc, setPlaceDoc }) {
  const [price, setPrice] = useState(placeDoc?.reservations.price || "3,239");

  const [showPriceDivision, setShowPriceDivision] = useState(false);

  const [guestPriceExpanded, setGuestPriceExpanded] = useState(true);
  const [youEarnExpanded, setYouEarnExpanded] = useState(false);

  //guest service tax 14.1177%
  //host service fee 3%

  function handleClick() {
    setGuestPriceExpanded(!guestPriceExpanded);
    setYouEarnExpanded(!youEarnExpanded);
  }

  return (
    <div className="h-full w-full flex items-center justify-center fade-in">
      <MainContainerWithFooter>
        <div className="flex flex-col justify-center items-center max-w-[650px] h-full">
          <div className="w-[630px]">
            <div className="font-semibold text-4xl mb-4 break-words w-full">
              <h1>Now, set your price</h1>
            </div>
            <div className="mb-6">
              <span className="text-lg text-neutral-500">
                You can change it anytime.
              </span>
            </div>
            <div className="flex gap-4 flex-wrap items-center justify-center pb-6 pt-1 w-full">
              <div className="relative text-[47.9px] font-bold">
                <div className="flex h-full w-full">
                  <span>₹</span>
                  <span>{price}</span>
                </div>
                <input
                  type="text"
                  inputMode="numeric"
                  name=""
                  id=""
                  value={price}
                  onChange={(ev) => {
                    let val = ev.target.value;
                    if (val === "0" || !val) {
                      setPrice("");
                    } else {
                      let numberVal = val.replaceAll(",", "");
                      if (!numberVal.includes(".") && !isNaN(numberVal)) {
                        setPrice(parseInt(numberVal).toLocaleString());
                      }
                    }
                  }}
                  className="outline-none border-none absolute w-full text-right top-0 right-0 bg-transparent"
                />
              </div>
            </div>
            {showPriceDivision ? (
              <div className="w-full fade-in">
                <div className="w-full grid gap-y-3">
                  <ExpandablePriceDivision
                    price={price}
                    expanded={guestPriceExpanded}
                    handleClick={handleClick}
                  />
                  <ExpandablePriceDivision
                    price={price}
                    expanded={youEarnExpanded}
                    handleClick={handleClick}
                  />
                </div>
                <div className="w-full mt-5">
                  <button
                    className="w-full flex items-center justify-center"
                    onClick={() => setShowPriceDivision(false)}
                  >
                    <div className="text-neutral-600">Show less</div>
                    <CollapseIcon />
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-full">
                <button
                  className="w-full flex items-center justify-center"
                  onClick={() => setShowPriceDivision(true)}
                >
                  <div className="text-neutral-600">
                    Guest price before taxes ${price}
                  </div>
                  <ExpandIcon />
                </button>
              </div>
            )}
          </div>
        </div>
      </MainContainerWithFooter>
    </div>
  );
}

function ExpandablePriceDivision({ price, expanded, handleClick }) {
  return (
    <button
      className={
        "w-full p-4 rounded-lg" +
        (expanded ? " border-2 border-black" : " border border-neutral-400")
      }
      onClick={() => {
        if (!expanded) handleClick();
      }}
    >
      <div className="w-full">
        <div
          style={{
            height: expanded ? "64px" : "0px",
            overflow: "hidden",
            transition: "height 220ms ease 0ms",
          }}
          className={"w-full"}
        >
          <div className={"w-full pt-2" + (expanded ? "" : " hidden")}>
            <div className="flex w-full justify-between pb-1 text-neutral-700">
              <div>Base price</div>
              <div>₹{price}</div>
            </div>
            <div className="flex w-full justify-between pb-2 text-neutral-700">
              <div>Guest service fee</div>
              <div>₹{price}</div>
            </div>
          </div>
        </div>
        {expanded && (
          <div className="border border-x-0 border-t-0 border-neutral-300 pt-1 mb-3"></div>
        )}
        <div
          className={
            "flex w-full justify-between font-semibold" +
            (expanded ? " pb-2" : "")
          }
        >
          <div>Guest price before taxes</div>
          <div>₹{price}</div>
        </div>
      </div>
    </button>
  );
}

function ExpandIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      aria-hidden="true"
      role="presentation"
      focusable="false"
      style={{ display: "block", height: 12, width: 12, fill: "currentcolor" }}
      className="ml-1"
    >
      <path d="M15.71 5.41 14.3 4 8 10.3 1.72 4 .3 5.41l6.59 6.6c.58.57 1.5.6 2.12.1l.12-.1z" />
    </svg>
  );
}

function CollapseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      aria-hidden="true"
      role="presentation"
      focusable="false"
      style={{ display: "block", height: 12, width: 12, fill: "currentcolor" }}
      className="ml-1"
    >
      <path d="m15.71 11.05-1.41 1.42L8 6.17l-6.29 6.3L.3 11.05l6.59-6.59c.58-.58 1.5-.61 2.12-.1l.12.1z" />
    </svg>
  );
}
