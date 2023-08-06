import { useEffect, useRef, useState } from "react";
import MainContainerWithFooter from "../Components/MainContainerWithFooter";
import ThreePhotos from "../assets/svg-icons/ThreePhotos";
import OnePhoto from "../assets/svg-icons/OnePhoto";
import axios from "axios";

function PhotosPage({ placeDoc, setPlaceDoc }) {
  const [images, setImages] = useState(placeDoc.features.photos);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadedPercentage, setUploadedPercentage] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (images && images.length < 1) setReady(true);
    for (let i = 0; i < images.length; i++) {
      axios
        .get("/image/" + images[i])
        .then(({ data }) => {
          setUploadedImages((prev) => [...prev, data]);
          if (i === images.length - 1) setReady(true);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  if (!ready) return <div></div>;

  return (
    <div className="h-full w-full flex items-center justify-center fade-in">
      <MainContainerWithFooter>
        {images.length < 1 ? (
          <UploadFileStartContent
            placeDoc={placeDoc}
            setPlaceDoc={setPlaceDoc}
            images={images}
            setImages={setImages}
            uploadedImages={uploadedImages}
            setUploadedImages={setUploadedImages}
            setUploadedPercentage={setUploadedPercentage}
          />
        ) : (
          <UploadedImagesContent
            placeDoc={placeDoc}
            setPlaceDoc={setPlaceDoc}
            images={images}
            setImages={setImages}
            uploadedImages={uploadedImages}
            setUploadedImages={setUploadedImages}
            uploadedPercentage={uploadedPercentage}
            setUploadedPercentage={setUploadedPercentage}
          />
        )}
      </MainContainerWithFooter>
    </div>
  );
}

function UploadFileStartContent({
  placeDoc,
  setPlaceDoc,
  images,
  setImages,
  uploadedImages,
  setUploadedImages,
  setUploadedPercentage,
}) {
  const inputRef = useRef();

  function handleFileUpload(ev) {
    const files = ev.target.files;
    setImages(files);
    const data = new FormData();
    for (const file of files) {
      data.append("photos", file);
    }
    data.append("placeId", placeDoc._id);
    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        if (percent < 100) setUploadedPercentage(percent);
      },
    };
    axios
      .post("/upload-photos", data, options)
      .then(({ data }) => {
        setUploadedPercentage(100);
        setUploadedImages(data);
        setUploadedPercentage(0);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="flex flex-col mt-6 justify-center items-center max-w-[640px] h-full">
      <div className="h-full">
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
        <div className="flex items-center mb-10 justify-center w-full border border-dashed border-neutral-400 h-[50vh] min-h-[250px]">
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
          <div className="flex flex-col items-center justify-center h-full">
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

function UploadedImagesContent({
  placeDoc,
  images,
  setImages,
  uploadedImages,
  setUploadedImages,
  uploadedPercentage,
  setUploadedPercentage,
}) {
  const inputRef = useRef();

  function handleFileUpload(ev) {
    const files = ev.target.files;
    setImages((prev) => [...prev, ...files]);
    const data = new FormData();
    for (const file of files) {
      data.append("photos", file);
    }
    data.append("placeId", placeDoc._id);
    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        if (percent < 100) setUploadedPercentage(percent);
      },
    };
    axios
      .post("/upload-photos", data, options)
      .then(({ data }) => {
        setUploadedPercentage(100);
        setUploadedImages((prev) => [...prev, ...data]);
        setUploadedPercentage(0);
      })
      .catch((err) => console.log(err));
  }

  function getFirstFourImages() {
    const elementArray = [];
    for (let i = 1; i < 4; i++) {
      elementArray.push(
        <div key={i} className="w-1/2 h-[213px] mb-4 px-[8px]">
          <ImageContent
            images={images}
            index={i}
            inputRef={inputRef}
            uploadedImages={uploadedImages}
            uploadedPercentage={uploadedPercentage}
          />
        </div>
      );
    }
    return elementArray;
  }

  function getExtraAddedImages() {
    const elementArray = [];
    for (let i = 4; i < images.length; i++) {
      elementArray.push(
        <div key={i} className="w-1/2 h-[213px] mb-4 px-[8px]">
          <ImageContent
            images={images}
            index={i}
            inputRef={inputRef}
            uploadedImages={uploadedImages}
            uploadedPercentage={uploadedPercentage}
          />
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
          <CoverImageContent
            images={images}
            uploadedImages={uploadedImages}
            uploadedPercentage={uploadedPercentage}
          />
        </div>

        {getFirstFourImages()}
        {images.length > 4 && getExtraAddedImages()}
        <div className="w-1/2 h-[213px] mb-4 px-[8px]">
          <AddMorePhotoContent inputRef={inputRef} />
        </div>
      </div>
    </div>
  );
}

function LoadingImageContent({ images, index, uploadedPercentage }) {
  return (
    <div className={"flex items-center relative justify-center w-full h-full"}>
      {index < images.length ? (
        <>
          <div className="absolute w-full h-full p-5 z-10">
            <div className="w-full flex justify-start">
              <svg
                role="progressbar"
                className="bg-transparent -rotate-90 border-2 rounded-full border-white"
                width={32}
                height={32}
                viewBox="0 0 32 32"
              >
                <circle
                  className="stroke-white progress-circle"
                  r={16}
                  cx={16}
                  cy={16}
                  style={{ strokeDasharray: `${uploadedPercentage}, 100` }}
                />
              </svg>
            </div>
          </div>
          <div className="absolute w-full h-full bg-white bg-opacity-50"></div>
          <img
            src={URL.createObjectURL(images[index])}
            alt=""
            className="w-full h-full"
          />
        </>
      ) : (
        <OnePhoto />
      )}
    </div>
  );
}

function CoverImageContent({ images, uploadedImages, uploadedPercentage }) {
  if (uploadedImages.length < 1)
    return (
      <LoadingImageContent
        images={images}
        index={0}
        uploadedPercentage={uploadedPercentage}
      />
    );
  return (
    <div className="relative">
      <div className="absolute w-full p-5 flex items-center justify-between">
        <div className="bg-white text-black font-semibold h-full px-2 py-1 rounded">
          Cover Photo
        </div>
        <div className="">
          <ImageOptionsButton />
        </div>
      </div>

      <div className="h-full">
        <img
          src={"http://localhost:3000/photos/" + uploadedImages[0].fileName}
          alt=""
          className="w-[720px] h-[467px]"
        />
      </div>
    </div>
  );
}

function ImageContent({
  images,
  index,
  inputRef,
  uploadedImages,
  uploadedPercentage,
}) {
  if (index < images.length && index >= uploadedImages.length)
    return (
      <LoadingImageContent
        images={images}
        index={index}
        uploadedPercentage={uploadedPercentage}
      />
    );

  const [isHovered, setIsHovered] = useState(false);

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
        "flex items-center relative justify-center w-full h-full " +
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
          <img
            src={
              "http://localhost:3000/photos/" + uploadedImages[index].fileName
            }
            alt=""
            className="w-full h-full"
          />
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
