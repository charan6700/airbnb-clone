import { useState, useEffect } from "react";
import MainContainerWithFooter from "../Components/MainContainerWithFooter";

function DescriptionPage({
  placeDoc,
  setPlaceDoc,
  descriptionFirstNextClicked,
}) {
  const [selectedUniqueAttributes, setSelectedUniqueAttributes] = useState(
    placeDoc?.features.description.unique || []
  );
  const [description, setDescription] = useState(
    placeDoc?.features.description.summary ||
      "You'll have a great time at this comfortable place to stay."
  );

  useEffect(() => {
    setPlaceDoc((prev) => {
      return {
        ...prev,
        features: {
          ...prev.features,
          description: {
            unique: selectedUniqueAttributes,
            summary: description.substring(0, 500),
          },
        },
      };
    });
  }, [selectedUniqueAttributes, description]);

  function handleClick(value) {
    if (selectedUniqueAttributes.includes(value)) {
      setSelectedUniqueAttributes((prev) => {
        return prev.filter((val) => val !== value);
      });
    } else {
      if (selectedUniqueAttributes.length === 2) {
        setSelectedUniqueAttributes((prev) => [prev[1], value]);
      } else {
        setSelectedUniqueAttributes((prev) => [...prev, value]);
      }
    }
  }

  if (descriptionFirstNextClicked) {
    return (
      <SecondPageContent
        description={description}
        setDescription={setDescription}
      />
    );
  } else {
    return (
      <FirstPageContent
        selectedButtons={selectedUniqueAttributes}
        handleClick={handleClick}
      />
    );
  }
}

function FirstPageContent({ selectedButtons, handleClick }) {
  return (
    <div className="h-full w-full flex items-center justify-center fade-in">
      <MainContainerWithFooter>
        <div className="flex flex-col m-auto mt-6 justify-center items-center w-[640px] h-full mb-[88px]">
          <div className="h-full w-full flex flex-col items-center justify-center">
            <div className="mb-8 break-words w-full">
              <h1 className="font-semibold text-4xl mb-4">
                Next, let's describe your house
              </h1>
              <div>
                <span className="text-lg text-neutral-500">
                  Choose up to 2 highlights. We'll use these to get your
                  description started.
                </span>
              </div>
            </div>
            <div
              className="flex w-full flex-wrap gap-3 items-start"
              radioGroup=""
            >
              <Button
                selectedButtons={selectedButtons}
                value={"peaceful"}
                name={"Peaceful"}
                Icon={<PeacefulIcon />}
                handleClick={handleClick}
              />
              <Button
                selectedButtons={selectedButtons}
                value={"unique"}
                name={"Unique"}
                Icon={<UniqueIcon />}
                handleClick={handleClick}
              />
              <Button
                selectedButtons={selectedButtons}
                value={"family-friendly"}
                name={"Family-friendly"}
                Icon={<FamilyFriendlyIcon />}
                handleClick={handleClick}
              />
              <Button
                selectedButtons={selectedButtons}
                value={"stylish"}
                name={"Stylish"}
                Icon={<StylishIcon />}
                handleClick={handleClick}
              />
              <Button
                selectedButtons={selectedButtons}
                value={"central"}
                name={"Central"}
                Icon={<CentralIcon />}
                handleClick={handleClick}
              />
              <Button
                selectedButtons={selectedButtons}
                value={"spacious"}
                name={"Spacious"}
                Icon={<SpaciousIcon />}
                handleClick={handleClick}
              />
            </div>
          </div>
        </div>
      </MainContainerWithFooter>
    </div>
  );
}

function SecondPageContent({ description, setDescription }) {
  const [isTextareaActive, setIsTextareaActive] = useState(false);

  function getTextareaContainerClass(description, isTextareaActive) {
    if (description.length > 500) {
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
                    Create your description
                  </h1>
                  <div>
                    <span className="text-lg text-neutral-500">
                      Share what makes your place special.
                    </span>
                  </div>
                </div>
                <div
                  className={
                    "w-full rounded-lg " +
                    getTextareaContainerClass(description, isTextareaActive)
                  }
                >
                  <textarea
                    name="description"
                    id="description"
                    rows="7"
                    className="w-full p-5 text-xl outline-none bg-transparent"
                    value={description}
                    onChange={(ev) => {
                      setDescription(ev.target.value);
                    }}
                    onFocus={() => setIsTextareaActive(true)}
                    onBlur={() => setIsTextareaActive(false)}
                  ></textarea>
                </div>
                <div className="w-full pt-2">
                  <span className="font-semibold text-neutral-600">
                    {description.length}/500
                  </span>
                </div>
                <div
                  className={
                    "w-full mt-3 flex items-center text-error text-sm" +
                    (description.length < 501 ? " invisible" : "")
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
                  {description.length > 500
                    ? "The maximum number of characters allowed is 500."
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

function Button({ selectedButtons, value, name, Icon, handleClick }) {
  return (
    <div
      className={
        "flex flex-col btn-click-shrink rounded-full items-center justify-center"
      }
    >
      <button
        role="radio"
        aria-checked={selectedButtons.includes(value)}
        className={
          "flex justify-between items-center text-left button-unique py-3 px-5 gap-2 relative rounded-full border border-neutral-300" +
          (selectedButtons.includes(value)
            ? " twoPXExtraSize bg-neutral-100"
            : " black-border-hover")
        }
        onClick={() => {
          handleClick(value);
        }}
        selected
      >
        <div className="">{Icon}</div>
        <div className="font-semibold text-lg">{name}</div>
      </button>
    </div>
  );
}

function PeacefulIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      aria-hidden="true"
      role="presentation"
      focusable="false"
      style={{
        display: "block",
        height: 24,
        width: 24,
        fill: "currentcolor",
      }}
    >
      <path d="M22 2a7 7 0 0 1 6.98 6.52l.02.24V16a2 2 0 0 1-1.34 1.89l-.16.05-.5.13V25a5 5 0 0 1-10 .22V18h-2v7a5 5 0 0 1-10 .22v-7.16l-.5-.12A2 2 0 0 1 3 16.15V8.74a7 7 0 0 1 13-3.35A7 7 0 0 1 22 2zM10 16a6.98 6.98 0 0 0-3 .67V25a3 3 0 0 0 6 .18v-8.51a6.98 6.98 0 0 0-3-.67zm12 0a6.98 6.98 0 0 0-3 .67V25a3 3 0 0 0 6 .18v-8.51a6.97 6.97 0 0 0-3-.67zm0-4c-1.76 0-3.47.42-5 1.2v2.32l.08-.06a8.96 8.96 0 0 1 4.23-1.43l.36-.02L22 14a8.96 8.96 0 0 1 4.54 1.23l.29.17.17.12V13.2a10.95 10.95 0 0 0-5-1.2zm-12 0c-1.76 0-3.47.42-5 1.2v2.32l.17-.12a8.95 8.95 0 0 1 4.14-1.37l.34-.02L10 14c1.66 0 3.25.45 4.63 1.28l.29.18.08.06V13.2a10.95 10.95 0 0 0-5-1.2zm12-8a5 5 0 0 0-4.98 4.57L17 8.8V11a12.97 12.97 0 0 1 5-1c1.74 0 3.43.34 5 1V8.82A5 5 0 0 0 22 4zM10 4a5 5 0 0 0-4.98 4.57L5 8.8V11a12.97 12.97 0 0 1 5-1c1.74 0 3.43.34 5 1V8.8a5 5 0 0 0-4.78-4.8z" />
    </svg>
  );
}

function UniqueIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      aria-hidden="true"
      role="presentation"
      focusable="false"
      style={{ display: "block", height: 24, width: 24, fill: "currentcolor" }}
    >
      <path d="m16.6 1.2.1.08.08.1L20.48 6H22v2h-2v4h2v2h-1.76l1.65 14H26v2H6v-2h4.11l1.65-14H10v-2h2V8h-2V6h1.52l3.7-4.63a1 1 0 0 1 1.38-.17zM18.23 14h-4.46l-1.65 14h7.76zM16 23a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-9.54-4.88 1.42 1.42-2.83 2.82-1.41-1.41zm19.08 0 2.82 2.83-1.41 1.41-2.83-2.82zM18 8h-4v4h4zM5 9v2H1V9zm26 0v2h-4V9zM5.05 2.64l2.83 2.82-1.42 1.42-2.82-2.83zm21.9 0 1.41 1.41-2.82 2.83-1.42-1.42zM16 3.6 14.08 6h3.84z" />
    </svg>
  );
}

function FamilyFriendlyIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      aria-hidden="true"
      role="presentation"
      focusable="false"
      style={{ display: "block", height: 24, width: 24, fill: "currentcolor" }}
    >
      <path d="M29 2v10a2 2 0 0 1-1.66 1.97L27 14h-1.03l2.73 10.18a42.58 42.58 0 0 0 1.68-1.23l1.25 1.56A24.9 24.9 0 0 1 16 30 24.9 24.9 0 0 1 .78 24.83l-.4-.31 1.25-1.56c.61.5 1.25.95 1.91 1.38L7.45 10c-1.2 0-2.31.88-2.7 2.04L3.7 16H1.62l1.15-4.3A5 5 0 0 1 7.37 8H18.07l.04-.22a7 7 0 0 1 6.15-5.74l.25-.02.25-.02H25zM17 20v2h-2v-2h-4.1l-1.86 6.93A23.01 23.01 0 0 0 16 28a23 23 0 0 0 7.2-1.15L21.37 20zm-5-10H9.44L5.32 25.37c.6.32 1.2.6 1.83.87L9.36 18H15v-2.13a4 4 0 0 1-3-3.67zm15-6h-2.18a5 5 0 0 0-4.8 4.58L20 8.8V12a4 4 0 0 1-3 3.87V18h5.9l2.18 8.14a22.85 22.85 0 0 0 1.84-.89L23.36 12 22.3 8h2.07l1.07 4H27zm-9 6h-4v2a2 2 0 0 0 2 2c1.05 0 2-.9 2-2z" />
    </svg>
  );
}

function StylishIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      aria-hidden="true"
      role="presentation"
      focusable="false"
      style={{ display: "block", height: 24, width: 24, fill: "currentcolor" }}
    >
      <path d="m30.22.44.9 1.79L29 3.28v25.05a2 2 0 0 1-1.85 2H5a2 2 0 0 1-2-1.85V16.28l-1.22.61-.9-1.78L3 14.05V5.33h2v7.72zM27 4.28l-22 11v13.05h6v-10a2 2 0 0 1 1.85-2H19a2 2 0 0 1 2 1.85v10.15h6zm-8 14.05h-6v10h6zm3.67-7.66a1.33 1.33 0 1 1 0 2.66 1.33 1.33 0 0 1 0-2.66z" />
    </svg>
  );
}

function CentralIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      aria-hidden="true"
      role="presentation"
      focusable="false"
      style={{ display: "block", height: 24, width: 24, fill: "currentcolor" }}
    >
      <path d="M16 0a12 12 0 0 1 12 12c0 6.34-3.81 12.75-11.35 19.26l-.65.56-1.08-.93C7.67 24.5 4 18.22 4 12 4 5.42 9.4 0 16 0zm0 2C10.5 2 6 6.53 6 12c0 5.44 3.25 11.12 9.83 17.02l.17.15.58-.52C22.75 23 25.87 17.55 26 12.33V12A10 10 0 0 0 16 2zm0 5a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
    </svg>
  );
}

function SpaciousIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      aria-hidden="true"
      role="presentation"
      focusable="false"
      style={{ display: "block", height: 24, width: 24, fill: "currentcolor" }}
    >
      <path d="M22 7a5 5 0 0 1 3.4 8.67 9 9 0 0 1 5.6 8.06V24h-2a7 7 0 0 0-6-6.93v-2.24a3 3 0 1 0-4-3V12l.08.06a5 5 0 0 1 .32 7.6 9 9 0 0 1 5.6 8.07V28h-2a7 7 0 0 0-6-6.93v-2.24a3 3 0 1 0-2 0v2.24a7 7 0 0 0-6 6.69V28H7a9 9 0 0 1 5.6-8.34 4.98 4.98 0 0 1 .32-7.6L13 12a3 3 0 1 0-4 2.83v2.24a7 7 0 0 0-6 6.69V24H1a9 9 0 0 1 5.6-8.34A4.98 4.98 0 0 1 10 7a5 5 0 0 1 4.92 4.12 4.98 4.98 0 0 1 2.16 0A5 5 0 0 1 22 7z" />
    </svg>
  );
}

export default DescriptionPage;
