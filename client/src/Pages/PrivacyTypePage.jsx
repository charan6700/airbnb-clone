import { useEffect, useState } from "react";
import MainContainerWithFooter from "../Components/MainContainerWithFooter";
import RadioButtonMaxWidth from "../Components/RadioButtonMaxWidth";

export default function PrivacyTypePage({ placeDoc, setPlaceDoc }) {
  const [selectedPrivacyType, setSelectedPrivacyType] = useState(null);

  useEffect(() => {
    if (placeDoc) setSelectedPrivacyType(placeDoc.property.privacyType);
  }, [placeDoc]);

  function handleClick(privacy) {
    setSelectedPrivacyType(privacy);
    setPlaceDoc((prev) => {
      return { ...prev, property: { ...prev.property, privacyType: privacy } };
    });
  }

  return (
    <div className="h-full w-full flex items-center justify-center fade-in">
      <MainContainerWithFooter>
        <div className="flex flex-col justify-center items-center max-w-[640px] h-full">
          <div className="">
            <div className="font-semibold text-4xl mb-8 break-words w-full">
              <h1>What type of place will guests have?</h1>
            </div>
            <div
              role="radiogroup"
              className="flex  gap-4 flex-wrap pb-12 pt-1 w-full"
            >
              <RadioButtonMaxWidth
                logoName="house_logo"
                title="An entire place"
                description="Guests have the whole place to themselves."
                value="anEntirePlace"
                selectedButton={selectedPrivacyType}
                handleClick={handleClick}
              />
              <RadioButtonMaxWidth
                logoName="house_logo"
                title="A room"
                description="Guests have their own room in a home, plus access to shared spaces."
                value="aRoom"
                selectedButton={selectedPrivacyType}
                handleClick={handleClick}
              />
              <RadioButtonMaxWidth
                logoName="house_logo"
                title="A shared room"
                description="Guests sleep in a room or common area that maybe shared with you or others."
                value="aSharedRoom"
                selectedButton={selectedPrivacyType}
                handleClick={handleClick}
              />
            </div>
          </div>
        </div>
      </MainContainerWithFooter>
    </div>
  );
}
