import { useEffect, useState } from "react";
import MainContainerWithFooter from "../Components/MainContainerWithFooter";

export default function VisibilityPage({ placeDoc, setPlaceDoc }) {
  const [selectedVisibility, setSelectedVisibility] = useState(
    placeDoc?.reservations.visibility
  );

  function handleClick(value) {
    setSelectedVisibility(value);
    setPlaceDoc((prev) => {
      return {
        ...prev,
        reservations: { ...prev.reservations, visibility: value },
      };
    });
    console.log(placeDoc);
  }

  return (
    <div className="h-full w-full flex items-center justify-center fade-in">
      <MainContainerWithFooter>
        <div className="flex flex-col justify-center items-center max-w-[650px] h-full">
          <div className="">
            <div className="font-semibold text-4xl mb-4 break-words w-full">
              <h1>Choose who to welcome for your first reservation</h1>
            </div>
            <div className="mb-6">
              <span className="text-lg text-neutral-500">
                After your first guest anyone can book your place.{" "}
                <span className="underline">
                  <a
                    href="https://www.airbnb.co.in/help/article/3320/?locale=en&_set_bev_on_new_domain=1691415504_NzhlY2EwOTZiYjAw"
                    target="_blank"
                  >
                    Learn more
                  </a>
                </span>
              </span>
            </div>
            <div
              role="radiogroup"
              className="flex  gap-4 flex-wrap pb-12 pt-1 w-full"
            >
              <RadioButton
                title="Any Airbnb guest"
                description={
                  <>
                    Get reservations faster when you welcome anyone from the
                    Airbnb&nbsp;community.
                  </>
                }
                value="any-guest"
                selectedVisibility={selectedVisibility}
                handleClick={handleClick}
              />
              <RadioButton
                title="An experienced guest"
                description={
                  "For your first guest, welcome someone with a good track record on Airbnb who can offer tips for how to be a great Host."
                }
                value="experienced-guest"
                selectedVisibility={selectedVisibility}
                handleClick={handleClick}
              />
            </div>
          </div>
        </div>
      </MainContainerWithFooter>
    </div>
  );
}

function RadioButton({
  title,
  description,
  value,
  selectedVisibility,
  handleClick,
}) {
  const selectedRadioClass = "border-[7px] border-black";
  const unSelectedRadioClass = "border-[1px] border-neutral-400";

  const selectedLabelClass = "border-black bg-neutral-50";
  const unSelectedLabelClass = "border-neutral-300";

  return (
    <div className="w-full">
      <label
        className={
          "flex items-start btn-click-shrink black-border-hover text-start border rounded-xl px-5 py-7 w-full cursor-pointer " +
          (selectedVisibility === value
            ? selectedLabelClass
            : unSelectedLabelClass)
        }
        onClick={() => handleClick(value)}
      >
        <span className="pr-5 pt-1 flex items-start h-[32px] text-black">
          <input
            type="radio"
            name="anyGuestVisibility"
            id="anyGuestVisibility"
            value={value}
            className={
              "cursor-pointer rounded-full bg-white outline-none appearance-none w-[22px] h-[22px] " +
              (selectedVisibility === value
                ? selectedRadioClass
                : unSelectedRadioClass)
            }
          />
        </span>
        <span className="flex flex-col">
          <span className="text-lg text-start font-semibold">{title}</span>
          <span className="text-left leading-tight text-neutral-500">
            {description}
          </span>
        </span>
      </label>
    </div>
  );
}
