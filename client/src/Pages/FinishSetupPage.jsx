import MainContainerWithFooter from "../Components/MainContainerWithFooter";

export default function FinishSetupPage() {
  return (
    <div className="h-full w-full flex fade-in">
      <MainContainerWithFooter>
        <div className="flex items-center justify-center px-32 h-full w-full fade-in">
          <div className="max-w-[525px]">
            <div className="font-semibold text-xl pb-3">Step 3</div>
            <h1 className="font-semibold text-5xl pb-4">
              Finish up and publish
            </h1>
            <div className="text-lg">
              Finally, you’ll choose if you'd like to start with an experienced
              guest, then you'll set your nightly price. Answer a few quick
              questions and publish when you're ready.
            </div>
          </div>
          <div>
            <video autoPlay muted playsInline>
              <source src="https://stream.media.muscache.com/KeNKUpa01dRaT5g00SSBV95FqXYkqf01DJdzn01F1aT00vCI.mp4?v_q=high" />
            </video>
          </div>
        </div>
      </MainContainerWithFooter>
    </div>
  );
}
