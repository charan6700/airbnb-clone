import { useEffect, useState } from "react";
import MainContainerWithFooter from "../Components/MainContainerWithFooter";
import axios from "axios";
import { amenitiesPreviewList } from "../AmenitiesPreviewList";

export default function ReceiptPage({ placeDoc, setPlaceDoc, user }) {
  const [ready, setReady] = useState(false);
  const [coverImageFileName, setCoverImageFileName] = useState("");

  const [showPlacePreviewModal, setShowPlacePreviewModal] = useState(false);
  const [closePlacePreviewModal, setClosePlacePreviewModal] = useState(false);

  function handleCloseModal() {
    setClosePlacePreviewModal(true);
    setTimeout(() => {
      setShowPlacePreviewModal(false);
    }, 400);
  }

  function handleOpenModal() {
    setShowPlacePreviewModal(true);
    setClosePlacePreviewModal(false);
  }

  useEffect(() => {
    axios
      .get("/image/" + placeDoc.features.photos[0])
      .then(({ data }) => {
        setCoverImageFileName(data.fileName);
        setReady(true);
      })
      .catch((err) => console.log(err));
  }, []);

  if (!ready) return <div></div>;

  function getPriceElement(placeDoc) {
    const actualPrice = placeDoc.reservations.price;
    if (placeDoc.reservations.discounts.newListing.isSet) {
      const discountPercent = placeDoc.reservations.discounts.newListing.value;
      const discountPrice = Math.round(
        (actualPrice * (100 - discountPercent)) / 100
      );
      return (
        <>
          <div className="line-through mr-1">
            ₹{actualPrice.toLocaleString()}
          </div>
          <div>
            <b>₹{discountPrice.toLocaleString()}</b> night
          </div>
        </>
      );
    } else {
      return (
        <>
          <div>
            <b>₹{actualPrice.toLocaleString()}</b> night
          </div>
        </>
      );
    }
  }

  return (
    <>
      <div className="h-full w-full flex items-center justify-center fade-in">
        <MainContainerWithFooter>
          <div className="w-[850px] my-auto block">
            <div className="flex flex-col pb-5 justify-center items-center w-full h-full">
              <div className="font-semibold text-5xl mb-6 break-words w-full">
                <h1>Review your listing</h1>
              </div>
              <div className="mb-12 w-full">
                <span className="text-lg text-neutral-500">
                  Here's what we'll show to guests. Make sure everything looks
                  good.
                </span>
              </div>
              <div className="flex w-full h-full items-center justify-center">
                <div className="w-[378px] h-[400px] relative p-4 rounded-2xl photo-container-shadow">
                  <button
                    className="absolute z-10 w-full h-full top-0 left-0"
                    onClick={() => handleOpenModal()}
                  ></button>
                  <div className="flex flex-col w-full h-full">
                    <div className="flex relative w-full h-full mb-4">
                      <div className="absolute z-10 bg-white font-semibold top-4 left-4 px-2 text-[14px] rounded">
                        Show preview
                      </div>
                      <img
                        src={
                          "http://localhost:3000/photos/" + coverImageFileName
                        }
                        className="rounded-lg object-cover w-full h-full"
                      ></img>
                    </div>
                    <div className="flex w-full justify-between">
                      <div>
                        <div className="font-semibold">
                          {placeDoc.features.title}
                        </div>
                        <div className="flex">{getPriceElement(placeDoc)}</div>
                      </div>
                      <div>New ★</div>
                    </div>
                  </div>
                </div>
                <div className="max-w-[430px] h-full flex flex-col justify-center ml-16">
                  <h2 className="text-2xl font-semibold mb-6">What's next?</h2>
                  <div className="flex items-start mb-8">
                    <div className="pt-1 mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        aria-hidden="true"
                        role="presentation"
                        focusable="false"
                        style={{
                          display: "block",
                          height: 32,
                          width: 32,
                          fill: "rgb(34, 34, 34)",
                        }}
                      >
                        <path d="M25 30H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5h5a5 5 0 0 1 8 0h5a5 5 0 0 1 5 5v18a5 5 0 0 1-5 5zM7 4a3 3 0 0 0-3 3v18a3 3 0 0 0 3 3h18a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3h-6.11l-.29-.5a3 3 0 0 0-5.2 0l-.29.5zm17.41 8L23 10.59l-9.5 9.5-4.5-4.5L7.59 17l5.91 5.91zM16 6a1 1 0 1 0-1-1 1 1 0 0 0 1 1z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">
                        Confirm a few details and publish
                      </h3>
                      <div className="leading-[18px] text-[15px]">
                        <span className="text-neutral-500">
                          We’ll let you know if you need to verify your identity
                          or register with the local government.
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start mb-8">
                    <div className="pt-1 mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        aria-hidden="true"
                        role="presentation"
                        focusable="false"
                        style={{
                          display: "block",
                          height: 32,
                          width: 32,
                          fill: "rgb(34, 34, 34)",
                        }}
                      >
                        <path d="M11.67 0v1.67h8.66V0h2v1.67h6a2 2 0 0 1 2 1.85v16.07a2 2 0 0 1-.46 1.28l-.12.13L21 29.75a2 2 0 0 1-1.24.58H6.67a5 5 0 0 1-5-4.78V3.67a2 2 0 0 1 1.85-2h6.15V0zm16.66 11.67H3.67v13.66a3 3 0 0 0 2.82 3h11.18v-5.66a5 5 0 0 1 4.78-5h5.88zm-.08 8h-5.58a3 3 0 0 0-3 2.82v5.76zm-18.58-16h-6v6h24.66v-6h-6v1.66h-2V3.67h-8.66v1.66h-2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">
                        Set up your calendar
                      </h3>
                      <div className="leading-[18px] text-[15px]">
                        <span className="text-neutral-500">
                          Choose which dates your listing is available. It will
                          be visible 24 hours after you publish.
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="pt-1 mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        aria-hidden="true"
                        role="presentation"
                        focusable="false"
                        style={{
                          display: "block",
                          height: 32,
                          width: 32,
                          fill: "rgb(34, 34, 34)",
                        }}
                      >
                        <path d="M20.8 4.8a4.54 4.54 0 0 1 6.57 6.24l-.16.17L9 29.4a2 2 0 0 1-1.24.58L7.6 30H2v-5.59a2 2 0 0 1 .47-1.28l.12-.13zM19 9.4l-15 15V28h3.59l15-15zm6.8-3.2a2.54 2.54 0 0 0-3.46-.13l-.13.13L20.4 8 24 11.59l1.8-1.8c.94-.94.98-2.45.12-3.45z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">
                        Adjust your settings
                      </h3>
                      <div className="leading-[18px] text-[15px]">
                        <span className="text-neutral-500">
                          Set house rules, select a cancellation policy, choose
                          how guests book and more.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MainContainerWithFooter>
      </div>
      {showPlacePreviewModal && (
        <PlacePreviewModal
          closePlacePreviewModal={closePlacePreviewModal}
          handleCloseModal={handleCloseModal}
          placeDoc={placeDoc}
          coverImageFileName={coverImageFileName}
          user={user}
        />
      )}
    </>
  );
}

function PlacePreviewModal({
  closePlacePreviewModal,
  handleCloseModal,
  placeDoc,
  coverImageFileName,
  user,
}) {
  return (
    <div
      className="fixed top-0 left-0 block w-full h-full z-30"
      onClick={() => handleCloseModal()}
    >
      <div
        className={
          "w-full h-full fixed top-0 left-0" +
          (closePlacePreviewModal ? " modal-fadeOut" : " modal-background")
        }
      ></div>
      <div className="flex z-40 h-[100vh] w-[100vw] items-center justify-center p-10 fixed top-0 left-0">
        <div
          className={
            "relative flex flex-col modal-shadow rounded-xl bg-white z-50 overflow-clip max-h-full w-[1032px]" +
            (closePlacePreviewModal
              ? " slideDown-animation"
              : " popup-animation")
          }
          onClick={(ev) => ev.stopPropagation()}
        >
          <div className="absolute top-4 left-4 flex w-full bg-transparent">
            <button
              className="p-2 hover:bg-neutral-100 rounded-full"
              onClick={() => handleCloseModal()}
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
                  height: 16,
                  width: 16,
                  stroke: "currentcolor",
                  strokeWidth: 3,
                  overflow: "visible",
                }}
              >
                <path d="m6 6 20 20M26 6 6 26" />
              </svg>
            </button>
          </div>
          <header className="w-full flex items-center justify-center py-5 border-b border-neutral-200">
            <div className="font-semibold">Full Preview</div>
          </header>
          <div className="w-full p-6 overflow-y-auto h-full">
            <div className="flex w-full h-full relative">
              <div className="w-1/2 p-6">
                <div className="flex h-[422px]">
                  <img
                    src={"http://localhost:3000/photos/" + coverImageFileName}
                    className="rounded-lg object-cover w-full"
                  ></img>
                </div>
              </div>
              <div className="w-1/2 h-[calc(100%+48px)] absolute -top-6 bottom-0 pt-12 pb-2 px-6 left-1/2 right-0 overflow-scroll no-scrollbar">
                <h1 className="font-semibold text-3xl mb-6">
                  {placeDoc.features.title}
                </h1>
                <div className="flex justify-between border-b border-neutral-200 pb-8">
                  <div className="max-w-[70%]">
                    <div className="font-semibold text-2xl mb-2">
                      Entire home hosted by {user?.name.split(" ")[0]}
                    </div>
                    <div className="text-[17px] leading-5 font-[350]">
                      {placeDoc.property.floorPlan.guests} guests ·{" "}
                      {placeDoc.property.floorPlan.bedrooms} bedrooms ·{" "}
                      {placeDoc.property.floorPlan.beds} beds ·{" "}
                      {placeDoc.property.floorPlan.bathrooms} bathrooms
                    </div>
                  </div>
                  <div className="flex items-center justify-center rounded-full full w-14 h-14 font-semibold bg-black text-white">
                    {user?.name[0].toUpperCase()}
                  </div>
                </div>
                <div className="py-8 border-b border-neutral-200 text-[17px] font-[350]">
                  {placeDoc.features.description.summary}
                </div>
                <AmenitiesSection placeDoc={placeDoc} />
                <div className="pt-8 pb-10">
                  <h2 className="font-semibold text-[17px]">Location</h2>
                  <h3 className="mt-5">
                    <span className="">
                      {placeDoc.property.location.cityTown},{" "}
                      {placeDoc.property.location.countyProvince}{" "}
                      {placeDoc.property.location.pinCode},{" "}
                      {placeDoc.property.location.countryCode}
                    </span>
                  </h3>
                  <div className="leading-3 mt-2">
                    <span className="text-[12px]  text-neutral-500">
                      We’ll only share your address with guests who are booked
                      as outlined in our{" "}
                      <span className="underline">
                        <a
                          href="https://www.airbnb.com/help/article/2855/privacy-policy?locale=en-IN&country_override=IN"
                          target="_blank"
                        >
                          Privacy&nbsp;Policy
                        </a>
                      </span>
                      .
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AmenitiesSection({ placeDoc }) {
  const totalAvailableAmenitiesList = [
    ...placeDoc.features.amenities.basic,
    ...placeDoc.features.amenities.standout,
    ...placeDoc.features.amenities.safety,
  ];

  if (totalAvailableAmenitiesList.length < 1) return <></>;

  let availableAmenities = [];

  amenitiesPreviewList.forEach((amenity) => {
    if (totalAvailableAmenitiesList.includes(amenity.value)) {
      availableAmenities.push(amenity);
    }
  });

  availableAmenities.splice(5);

  const extraAmenitiesCount = totalAvailableAmenitiesList.length - 5;

  return (
    <div className="py-8 border-b border-neutral-200">
      <h2 className="font-semibold text-[17px] mb-2">Amenities</h2>
      {availableAmenities.map((e, idx) => (
        <div
          key={idx}
          className={
            "flex justify-between w-full" +
            (extraAmenitiesCount <= 0 && idx === availableAmenities.length - 1
              ? " pt-4"
              : " py-4 border-b border-neutral-200")
          }
        >
          <div className="font-[350]">{e.name}</div>
          <div>{e.icon}</div>
        </div>
      ))}
      {extraAmenitiesCount > 0 && (
        <div className="mt-3 text-neutral-600 font-[350]">
          +{extraAmenitiesCount} more
        </div>
      )}
    </div>
  );
}
