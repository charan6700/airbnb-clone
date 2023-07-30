import { useEffect, useState } from "react";
import MainContainerWithFooter from "../Components/MainContainerWithFooter";

export default function FloorPlanPage({ placeDoc, setPlaceDoc }) {
  const [guests, setGuests] = useState(placeDoc?.property.floorPlan.guests);

  const [bedrooms, setBedrooms] = useState(
    placeDoc?.property.floorPlan.bedrooms
  );

  const [beds, setBeds] = useState(placeDoc?.property.floorPlan.beds);

  const [bathrooms, setBathrooms] = useState(
    placeDoc?.property.floorPlan.bathrooms
  );

  useEffect(() => {
    if (!guests || guests < 1) setGuests(1);
    setPlaceDoc((prev) => {
      return {
        ...prev,
        property: {
          ...prev.property,
          floorPlan: { ...prev.property.floorPlan, guests: guests },
        },
      };
    });
  }, [guests]);

  useEffect(() => {
    if (bedrooms !== 0 && !bedrooms) setBedrooms(0);
    setPlaceDoc((prev) => {
      return {
        ...prev,
        property: {
          ...prev.property,
          floorPlan: { ...prev.property.floorPlan, bedrooms: bedrooms },
        },
      };
    });
  }, [bedrooms]);

  useEffect(() => {
    if (!beds || beds < 1) setBeds(1);
    setPlaceDoc((prev) => {
      return {
        ...prev,
        property: {
          ...prev.property,
          floorPlan: { ...prev.property.floorPlan, beds: beds },
        },
      };
    });
  }, [beds]);

  useEffect(() => {
    if (!bathrooms || bathrooms < 0.5) setBathrooms(0.5);
    setPlaceDoc((prev) => {
      return {
        ...prev,
        property: {
          ...prev.property,
          floorPlan: { ...prev.property.floorPlan, bathrooms: bathrooms },
        },
      };
    });
  }, [bathrooms]);

  return (
    <div className="h-full w-full flex items-center justify-center fade-in">
      <MainContainerWithFooter>
        <div className="flex flex-col pt-8 max-w-[635px] h-full">
          <div className="">
            <div className="break-words w-full pb-10">
              <h1 className="font-semibold text-4xl mb-4">
                Share some basics about your place
              </h1>
              <div>
                <span className="text-lg text-neutral-500">
                  You'll add more details later, such as bed types.
                </span>
              </div>
            </div>
            <div className="pb-10 flex flex-col w-full">
              <div className="flex justify-between border-b w-full py-6 border-neutral-300">
                <div className="text-lg">Guests</div>
                <div className="flex justify-between w-28 h-8 items-center">
                  <SubtractButton
                    value={guests}
                    setValue={setGuests}
                    minValue={1}
                  />
                  <div>{guests}</div>
                  <AddButton
                    value={guests}
                    setValue={setGuests}
                    maxValue={16}
                  />
                </div>
              </div>
              <div className="flex justify-between border-b w-full py-6 border-neutral-300">
                <div className="text-lg">Bedrooms</div>
                <div className="flex justify-between w-28 h-8 items-center">
                  <SubtractButton
                    value={bedrooms}
                    setValue={setBedrooms}
                    minValue={0}
                  />
                  <div>{bedrooms}</div>
                  <AddButton
                    value={bedrooms}
                    setValue={setBedrooms}
                    maxValue={50}
                  />
                </div>
              </div>
              <div className="flex justify-between border-b w-full py-6 border-neutral-300">
                <div className="text-lg">Beds</div>
                <div className="flex justify-between w-28 h-8 items-center">
                  <SubtractButton
                    value={beds}
                    setValue={setBeds}
                    minValue={1}
                  />
                  <div>{beds}</div>
                  <AddButton value={beds} setValue={setBeds} maxValue={50} />
                </div>
              </div>
              <div className="flex justify-between border-b w-full py-6 border-neutral-300">
                <div className="text-lg">Bathrooms</div>
                <div className="flex justify-between w-28 h-8 items-center">
                  <SubtractButton
                    value={bathrooms}
                    setValue={setBathrooms}
                    minValue={0.5}
                    step={0.5}
                  />
                  <div>{bathrooms}</div>
                  <AddButton
                    value={bathrooms}
                    setValue={setBathrooms}
                    maxValue={50}
                    step={0.5}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainContainerWithFooter>
    </div>
  );
}

function SubtractButton({ value, setValue, minValue, step = 1 }) {
  return (
    <button
      className={
        "rounded-full border  p-2" +
        (value > minValue
          ? " border-neutral-400 hover:border-black"
          : " border-neutral-200 cursor-not-allowed")
      }
      onClick={() => {
        if (value > minValue) setValue(value - step);
      }}
    >
      <span
        className={
          value > minValue ? "text-gray-600 hover:text-black" : "text-gray-200"
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.75}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
        </svg>
      </span>
    </button>
  );
}

function AddButton({ value, setValue, maxValue, step = 1 }) {
  return (
    <button
      className={
        "rounded-full border p-2" +
        (value < maxValue
          ? " border-neutral-400 hover:border-black"
          : " border-neutral-200 cursor-not-allowed")
      }
      onClick={() => {
        if (value < maxValue) setValue(value + step);
      }}
    >
      <span
        className={
          value < maxValue ? "text-gray-600 hover:text-black" : "text-gray-200"
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.75}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v12m6-6H6"
          />
        </svg>
      </span>
    </button>
  );
}
