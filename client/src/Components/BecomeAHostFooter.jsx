import { useContext, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import _ from "lodash";

const stagesArray = [
  "overview",
  "about-your-place",
  "structure",
  "privacy-type",
  "location",
  "floor-plan",
  "stand-out",
  "amenities",
  "photos",
  "title",
  "description",
  "finish-setup",
  "visibility",
  "",
];

export default function BecomeAHostFooter({
  descriptionFirstNextClicked,
  setDescriptionFirstNextClicked,
}) {
  const path = useLocation().pathname;
  let currStage = path.split("/").slice(-1);
  currStage = _.kebabCase(currStage);

  const { placeId, stage } = useParams();
  currStage = _.kebabCase(stage);

  const [progress, setProgress] = useState(stagesArray.indexOf(currStage));

  const navigate = useNavigate();

  function handleNextClick() {
    if (currStage === "description" && !descriptionFirstNextClicked) {
      setDescriptionFirstNextClicked(true);
    } else {
      setProgress(progress + 1);
      navigate("/become-a-host/" + placeId + "/" + getNextStage(currStage));
    }
  }

  function handleBackClick() {
    if (currStage === "description") {
      setDescriptionFirstNextClicked(false);
    }
    setProgress(progress - 1);
    navigate("/become-a-host/" + placeId + "/" + getPreviousStage(currStage));
  }

  function getStepOneProgressPercentage(progress) {
    const value = Math.round(((progress - 1) / 5) * 100);
    return Math.min(value, 100);
  }

  function getStepTwoProgressPercentage(progress) {
    const value = Math.round(((progress - 6) / 5) * 100);
    return Math.min(value, 100);
  }

  return (
    <div className="fixed bottom-0 z-10 w-full bg-white">
      <div className="flex w-full">
        <div className="h-[6px] w-1/3 bg-neutral-200 mr-2 flex-grow overflow-x-hidden">
          <div
            style={{
              transition: "transform 600ms linear 0s",
              transform: `translateX(${getStepOneProgressPercentage(
                progress
              )}%)`,
            }}
            className="bg-black relative w-full h-full -left-full"
          ></div>
        </div>
        <div className="h-[6px] w-1/3 bg-neutral-200 mr-2 flex-grow overflow-x-hidden">
          <div
            style={{
              transition: "transform 600ms linear 0s",
              transform: `translateX(${getStepTwoProgressPercentage(
                progress
              )}%)`,
            }}
            className="bg-black relative w-full h-full -left-full"
          ></div>
        </div>
        <div className="h-[6px] w-1/3 bg-neutral-200"></div>
      </div>
      <div className="flex justify-between items-center px-10 py-4">
        <div className="">
          <button
            className="font-semibold underline py-2 px-3 rounded-xl hover:bg-neutral-100"
            onClick={handleBackClick}
          >
            Back
          </button>
        </div>
        <div>
          <button
            className="bg-slate-900 text font-semibold px-8 py-3 rounded-lg text-white hover:bg-black"
            onClick={handleNextClick}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

function getNextStage(currStage) {
  return stagesArray[stagesArray.indexOf(currStage) + 1];
}

function getPreviousStage(currStage) {
  return stagesArray[stagesArray.indexOf(currStage) - 1];
}
