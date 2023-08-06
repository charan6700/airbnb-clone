import { useEffect, useState } from "react";
import MainContainerWithFooter from "../Components/MainContainerWithFooter";
import { times } from "lodash";

function TitlePage({ placeDoc, setPlaceDoc }) {
  const [title, setTitle] = useState(placeDoc?.features.title || "");
  const [isTextareaActive, setIsTextareaActive] = useState(false);

  useEffect(() => {
    setPlaceDoc((prev) => {
      return {
        ...prev,
        features: {
          ...prev.features,
          title: title.substring(0, 32),
        },
      };
    });
  }, [title]);

  function getTextareaContainerClass(title, isTextareaActive) {
    if (title.length > 32) {
      return isTextareaActive
        ? "textarea-container-invalid-active"
        : "textarea-container-invalid";
    } else {
      return isTextareaActive
        ? "textarea-container-active"
        : "textarea-container";
    }
  }

  return (
    <div className="h-full w-full flex items-center justify-center fade-in">
      <MainContainerWithFooter>
        <div className="w-full h-full block">
          <div className="flex justify-center items-center h-full m-auto">
            <div className="w-full h-full flex flex-col m-auto items-center justify-center">
              <div className="h-[412px] w-[640px]">
                <div className="mb-8 break-words w-full">
                  <h1 className="font-semibold text-4xl mb-4">
                    Now, let's give your house a title
                  </h1>
                  <div>
                    <span className="text-lg text-neutral-500">
                      Short titles work best. Have fun with it – you can always
                      change it later.
                    </span>
                  </div>
                </div>
                <div
                  className={
                    "w-full rounded-lg " +
                    getTextareaContainerClass(title, isTextareaActive)
                  }
                >
                  <textarea
                    name="title"
                    id="title"
                    rows="5"
                    className="w-full p-5 text-xl outline-none bg-transparent"
                    value={title}
                    onChange={(ev) => {
                      setTitle(ev.target.value);
                    }}
                    onFocus={() => setIsTextareaActive(true)}
                    onBlur={() => setIsTextareaActive(false)}
                  ></textarea>
                </div>
                <div className="w-full pt-2">
                  <span className="font-semibold text-neutral-600">
                    {title.length}/32
                  </span>
                </div>
                <div
                  className={
                    "w-full mt-3 flex items-center text-error text-sm" +
                    (title.length < 33 ? " invisible" : "")
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
                  {title.length > 32
                    ? "The maximum number of characters allowed is 32."
                    : ""}
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainContainerWithFooter>
    </div>
  );
}

export default TitlePage;
