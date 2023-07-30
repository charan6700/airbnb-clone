import MainContainerWithFooter from "../Components/MainContainerWithFooter";

export default function StandOutPage() {
  return (
    <div className="h-full w-full flex fade-in">
      <MainContainerWithFooter>
        <div className="flex items-center justify-center px-40 h-full w-full fade-in">
          <div className="max-w-[475px]">
            <div className="font-semibold text-xl pb-3">Step 2</div>
            <h1 className="font-semibold text-5xl pb-4">
              Make your place stand out
            </h1>
            <div className="text-lg">
              In this step, you'll add some of the amenities your place offers,
              plus 5 or more photos. Then you'll create a title and description.
            </div>
          </div>
          <div>
            <video autoPlay muted playsInline>
              <source src="https://stream.media.muscache.com/H0101WTUG2qWbyFhy02jlOggSkpsM9H02VOWN52g02oxhDVM.mp4?v_q=high" />
            </video>
          </div>
        </div>
      </MainContainerWithFooter>
    </div>
  );
}
