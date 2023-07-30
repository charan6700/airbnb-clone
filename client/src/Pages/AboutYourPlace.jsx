import { useContext } from "react";
import MainContainerWithFooter from "../Components/MainContainerWithFooter";

export default function AboutYourPlace() {
  return (
    <div className="h-full w-full flex fade-in">
      <MainContainerWithFooter>
        <div className="flex items-center justify-center px-32 h-full w-full fade-in">
          <div className="max-w-[525px]">
            <div className="font-semibold text-xl pb-3">Step 1</div>
            <h1 className="font-semibold text-5xl pb-4">
              Tell us about your place
            </h1>
            <div className="text-lg">
              In this step, we'll ask you which type of property you have and if
              guests will book the entire place or just a room. Then let us know
              the location and how many guests can stay.
            </div>
          </div>
          <div>
            <video autoPlay muted playsInline>
              <source src="https://stream.media.muscache.com/zFaydEaihX6LP01x8TSCl76WHblb01Z01RrFELxyCXoNek.mp4?v_q=high" />
            </video>
          </div>
        </div>
      </MainContainerWithFooter>
    </div>
  );
}
