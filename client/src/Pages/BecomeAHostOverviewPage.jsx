import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../UserContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import MainContainer from "../Components/MainContainer";
import MainContainerWithFooter from "../Components/MainContainerWithFooter";

export default function BecomeAHostOverviewPage() {
  const { user } = useContext(UserContext);

  const { placeId } = useParams();

  const navigate = useNavigate();

  async function handleClick(ev) {
    ev.preventDefault();
    if (placeId && placeId !== "overview") {
      navigate("/become-a-host/" + placeId + "/about-your-place");
    } else {
      try {
        const { data: placeDoc } = await axios.post("/place", {
          owner: user._id,
          status: "new",
          property: {
            structure: null,
            privacyType: null,
            location: {
              countryCode: null,
              houseFlatBldg: null,
              areaVillage: null,
              streetAddress: null,
              nearbyLandmark: null,
              cityTown: null,
              pinCode: null,
              countyProvince: null,
            },
            floorPlan: {
              guests: null,
              bedrooms: null,
              beds: null,
              bathrooms: null,
            },
          },

          features: {
            amenities: {
              basic: [],
              standout: [],
              safety: [],
            },
            photos: [],
            title: null,
            description: {
              unique: [],
              myDescription: null,
            },
          },

          reservations: {
            visibility: null,
            price: null,
            discounts: {
              newListing: null,
              weekly: null,
              monthly: null,
            },
            legal: {
              securityCameras: null,
              weapons: null,
              dangerousAnimals: null,
            },
          },
        });
        console.log(placeDoc);
        navigate("/become-a-host/" + placeDoc._id + "/about-your-place");
      } catch (err) {
        alert("Unable to create place");
      }
    }
  }

  return (
    <div className="">
      <div className="fixed z-10 w-[100vw]">
        <header className="relative flex justify-between items-center pt-8 pb-0 px-12">
          <a href="/" className="flex logo gap-1 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-9 h-9 -rotate-90 text-black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </a>

          <div className="border font-semibold border-neutral-300 rounded-full px-3 py-2 cursor-pointer hover:border-black">
            Save & exit
          </div>
        </header>
      </div>

      <div className="h-full w-full flex fade-in">
        <MainContainerWithFooter>
          <FirstPlaceMainContent />
        </MainContainerWithFooter>
      </div>

      <div className="fixed bottom-0 z-10 w-full bg-white">
        <div className="flex w-full">
          <div className="h-[6px] w-full bg-neutral-200 flex-grow overflow-x-hidden"></div>
        </div>
        <div className="flex justify-end items-center px-10 py-4">
          <div>
            <button
              className="bg-primary hover:bg-primaryHover text font-semibold px-8 py-3 rounded-lg text-white btn-click-shrink"
              onClick={handleClick}
            >
              Get started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FirstPlaceMainContent() {
  return (
    <div className="flex justify-center mt-5">
      <div className="max-w-[700px] w-[50vw] mr-6 flex flex-col items-start justify-center">
        <h1 className="text-6xl font-semibold max-w-[514px] leading-[1.2]">
          It’s easy to get started on Airbnb
        </h1>
      </div>
      <div className="flex flex-col">
        <div className="flex max-w-[600px] border-b pb-8">
          <div className="text-2xl font-semibold pr-3">1</div>
          <div className="flex flex-col max-w-[448px] mr-3 px-1">
            <h2 className="text-2xl font-semibold mb-1">
              Tell us about your place
            </h2>
            <h3 className="text-lg text-neutral-500 leading-[1.43]">
              Share some basic info, such as where it is and how many guests can
              stay.
            </h3>
          </div>
          <div className="ml-auto">
            <img
              src="https://a0.muscache.com/4ea/air/v2/pictures/da2e1a40-a92b-449e-8575-d8208cc5d409.jpg"
              alt=""
              className="w-32 h-auto"
            />
          </div>
        </div>
        <div className="flex max-w-[600px] border-b py-8">
          <div className="text-2xl font-semibold pr-3">2</div>
          <div className="flex flex-col max-w-[448px] mr-3 px-1">
            <h2 className="text-2xl font-semibold mb-1">Make it stand out</h2>
            <h3 className="text-lg text-neutral-500 leading-[1.43]">
              Add 5 or more photos plus a title and description – we’ll help you
              out.
            </h3>
          </div>
          <div className="ml-auto">
            <img
              src="https://a0.muscache.com/4ea/air/v2/pictures/bfc0bc89-58cb-4525-a26e-7b23b750ee00.jpg"
              alt=""
              className="w-32 h-auto"
            />
          </div>
        </div>
        <div className="flex max-w-[600px] py-8">
          <div className="text-2xl font-semibold pr-3">3</div>
          <div className="flex flex-col max-w-[448px] mr-3 px-1">
            <h2 className="text-2xl font-semibold mb-1">
              Finish up and publish
            </h2>
            <h3 className="text-lg text-neutral-500 leading-[1.43]">
              Choose if you'd like to start with an experienced guest, set a
              starting price and publish your listing.
            </h3>
          </div>
          <div className="ml-auto">
            <img
              src="https://a0.muscache.com/4ea/air/v2/pictures/c0634c73-9109-4710-8968-3e927df1191c.jpg"
              alt=""
              className="w-32 h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
