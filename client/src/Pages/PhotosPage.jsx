import { useRef, useState } from "react";
import MainContainerWithFooter from "../Components/MainContainerWithFooter";
import ThreePhotos from "../assets/svg-icons/ThreePhotos";
import OnePhoto from "../assets/svg-icons/OnePhoto";

function PhotosPage() {
  const [images, setImages] = useState([]);

  return (
    <div className="h-full w-full flex items-center justify-center fade-in">
      <MainContainerWithFooter>
        {images.length < 1 ? (
          <UploadFileStartContent images={images} setImages={setImages} />
        ) : (
          <UploadedImagesContent images={images} setImages={setImages} />
        )}
      </MainContainerWithFooter>
    </div>
  );
}

function UploadFileStartContent({ images, setImages }) {
  const inputRef = useRef();

  function handleFileUpload(ev) {
    console.log(Array.from(ev.target.files).map(convertToBase64));
    setImages(Array.from(ev.target.files).map(convertToBase64));
  }

  function convertToBase64(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      let base64 = "";
      reader.readAsDataURL(file);
      reader.onload = () => {
        base64 = reader.result;
        resolve(base64);
      };
      reader.onerror = (err) => {
        console.log(err);
      };
    });
  }

  return (
    <div className="flex flex-col mt-6 justify-center items-center max-w-[640px] h-full">
      <div className="">
        <div className="mb-8 break-words w-full">
          <h1 className="font-semibold text-4xl mb-4">
            Add some photos of your house
          </h1>
          <div>
            <span className="text-lg text-neutral-500">
              You'll need 5 photos to get started. You can add more or make
              changes later.
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center w-full border border-dashed border-neutral-400 h-[50vh]">
          <div className="hidden">
            <input
              type="file"
              accept="image/jpeg, image/png, image/heic"
              multiple
              ref={inputRef}
              className="appearance-none"
              onChange={handleFileUpload}
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <ThreePhotos />
            <div className="font-[700] text-xl pt-2 pb-1">
              Drag your photos here
            </div>
            <div>Choose at least 5 photos</div>
            <div className="font-semibold pt-6">
              <button
                className="underline"
                onClick={() => {
                  inputRef.current.click();
                }}
              >
                Upload from your device
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function UploadedImagesContent({ images, setImages }) {
  const inputRef = useRef();

  function handleFileUpload(ev) {
    setImages((prev) => {
      return [...prev, ...ev.target.files.map(convertToBase64)];
    });
  }

  function convertToBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      return reader.result;
    };
    reader.onerror = (err) => {
      console.log(err);
    };
  }

  function getExtraAddedImages() {
    const elementArray = [];
    for (let i = 4; i < images.length; i++) {
      elementArray.push(
        <div className="w-1/2 min-h-[213px] mb-4 px-[8px]">
          <ImageContent images={images} index={i} inputRef={inputRef} />
        </div>
      );
    }
    return elementArray;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="hidden">
        <input
          type="file"
          accept="image/jpeg, image/png, image/heic"
          multiple
          ref={inputRef}
          className="appearance-none"
          onChange={handleFileUpload}
        />
      </div>
      <div className="flex justify-between pb-6 w-[700px]">
        <div className="flex flex-col">
          <h2 className="font-semibold text-2xl">Choose at least 5 photos</h2>
          <div className="text-neutral-500">Drag to reorder</div>
        </div>
        <div>
          <button
            className="flex items-center border hover:border-black btn-click-shrink border-neutral-300 px-4 py-2 rounded-full"
            onClick={() => {
              inputRef.current.click();
            }}
          >
            <span className="mr-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.0}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </span>
            <span className="font-semibold">Add more</span>
          </button>
        </div>
      </div>
      <div className="flex flex-wrap items-stretch justify-start w-[716px]">
        <div className="w-full mb-4 px-[8px]">
          <div className="h-full">
            <img src={images[0]} alt="" className="w-[720px] h-[467px]" />
          </div>
        </div>
        <div className="w-1/2 min-h-[213px] flex items-center justify-center mb-4 px-[8px]">
          <ImageContent images={images} index={1} inputRef={inputRef} />
        </div>
        <div className="w-1/2 min-h-[213px] mb-4 px-[8px]">
          <ImageContent images={images} index={2} inputRef={inputRef} />
        </div>
        <div className="w-1/2 min-h-[213px] mb-4 px-[8px]">
          <ImageContent images={images} index={3} inputRef={inputRef} />
        </div>
        {images.length > 4 && getExtraAddedImages()}
        <div className="w-1/2 min-h-[213px] mb-4 px-[8px]">
          <AddMorePhotoContent inputRef={inputRef} />
        </div>
      </div>
    </div>
  );
}

function ImageContent({ images, index, inputRef }) {
  const [isHovered, setIsHovered] = useState(false);

  console.log(index + ": " + images[index]);

  function getBorderClass(isHovered) {
    if (index >= images.length) {
      return isHovered
        ? "border-2 border-gray-500"
        : "border border-dashed border-neutral-600";
    } else return "";
  }

  return (
    <div
      className={
        "flex items-center relative justify-center w-full min-h-[213px] " +
        getBorderClass(isHovered)
      }
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      onClick={() => {
        if (index >= images.length) inputRef.current.click();
      }}
    >
      {index < images.length ? (
        <>
          <div className="absolute w-full h-full p-5">
            <div className="w-full flex justify-end">
              <ImageOptionsButton />
            </div>
          </div>
          <img src={images[index]} alt="" className="w-full h-[213px]" />
        </>
      ) : (
        <OnePhoto />
      )}
    </div>
  );
}

function AddMorePhotoContent({ inputRef }) {
  const [isHovered, setIsHovered] = useState(false);

  function getBorderClass(isHovered) {
    return isHovered
      ? "border-2 border-gray-500"
      : "border border-dashed border-neutral-600";
  }

  return (
    <div
      className={
        "flex flex-col items-center justify-center w-full min-h-[213px] " +
        getBorderClass(isHovered)
      }
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      onClick={() => {
        inputRef.current.click();
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        aria-hidden="true"
        role="presentation"
        focusable="false"
        style={{
          display: "block",
          fill: "none",
          height: 32,
          width: 32,
          stroke: "rgb(113, 113, 113)",
          strokeWidth: 2,
          overflow: "visible",
        }}
      >
        <path d="M2 16h28M16 2v28" />
      </svg>
      <div className="font-semibold text-neutral-500">Add more</div>
    </div>
  );
}

function ImageOptionsButton() {
  return (
    <button
      className={
        "bg-white opacity-80 hover:opacity-100 hover:scale-[1.04] active:scale-100 transition-transform ease-in-out rounded-full p-2"
      }
      onMouseDown={() => setIsMouseDown(true)}
      onMouseUp={() => setIsMouseDown(false)}
      onMouseOver={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
    >
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          aria-hidden="true"
          role="presentation"
          focusable="false"
          style={{
            display: "block",
            height: 16,
            width: 16,
            fill: "rgb(34, 34, 34)",
          }}
        >
          <path d="M3 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm5 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm5 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
        </svg>
      </span>
    </button>
  );
}

export default PhotosPage;
