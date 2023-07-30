import { useContext, useEffect, useState } from "react";
import axios from "axios";
import HostingPageHeader from "../Components/HostingPageHeader";
import { UserContext } from "../../UserContext";
import { Link, Navigate, redirect, useNavigate } from "react-router-dom";
import InputRadioTab from "../Components/InputRadioTab";
import ResourceCard from "../Components/ResourceCard";

export default function HostingPage() {
  const { user, ready } = useContext(UserContext);
  const [reservationList, setReservationList] = useState("checkingOut");
  const navigate = useNavigate();

  if (!ready) return <div>Loading...</div>;

  if (user?.listings.length < 1) return <Navigate to={"/become-a-host"} />;

  function handleRadioChange() {}

  return (
    <div>
      <HostingPageHeader />

      <div className="">
        <div className="flex justify-between pt-16 px-32 items-center">
          <div>
            <h1 className="font-semibold text-4xl">
              Welcome, {user?.name.split(" ")[0]}!
            </h1>
          </div>
          <div className="">
            <button
              className="border border-black p-2 rounded-lg font-semibold hover:bg-gray-100 btn-click-shrink"
              onClick={() => {
                navigate("/become-a-host");
              }}
            >
              Complete your listing{user?.listings.length > 1 && "s"}
            </button>
          </div>
        </div>
        <div>
          <div className="flex justify-between pt-16 px-32">
            <div className="mt-0 mb-2">
              <h2 className="font-semibold text-3xl">Your reservations</h2>
            </div>
            <div className="pt-3 pb-2">
              <Link className="border border-none underline p-2 rounded-lg font-semibold hover:bg-gray-100">
                All reservations (0)
              </Link>
            </div>
          </div>

          <div className="flex flex-col justify-between pt-8 px-32 gap-8">
            <div className="whitespace-nowrap">
              <InputRadioTab
                name={"checkingOut"}
                text={"Checking out"}
                reservationList={reservationList}
                setReservationList={setReservationList}
                handleRadioChange={handleRadioChange}
              />
              <InputRadioTab
                name={"currentlyHosting"}
                text={"Currently hosting"}
                reservationList={reservationList}
                setReservationList={setReservationList}
                handleRadioChange={handleRadioChange}
              />
              <InputRadioTab
                name={"arrivingSoon"}
                text={"Arriving soon"}
                reservationList={reservationList}
                setReservationList={setReservationList}
                handleRadioChange={handleRadioChange}
              />
              <InputRadioTab
                name={"upcoming"}
                text={"Upcoming"}
                reservationList={reservationList}
                setReservationList={setReservationList}
                handleRadioChange={handleRadioChange}
              />
              <InputRadioTab
                name={"pendingReview"}
                text={"Pending review"}
                reservationList={reservationList}
                setReservationList={setReservationList}
                handleRadioChange={handleRadioChange}
              />
            </div>
            <div className="bg-neutral-100 h-48 w-full rounded-xl text-center flex">{`Content for ${reservationList}`}</div>
          </div>
          <div className="flex flex-col justify-between pt-8 px-32 gap-8 mt-20">
            <div className="font-semibold text-3xl">
              <h2>We're here to help</h2>
            </div>
            <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-4 lg:mr-60 leading-tight">
              <div className="border border-neutral-300 px-3 py-2 rounded-xl">
                <Link
                  to="https://community.withairbnb.com/t5/Get-Local/ct-p/en_clubs"
                  target="_blank"
                >
                  <div className="flex items-center gap-3">
                    <div className="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-lg">
                        Join your local Host Club
                      </div>
                      <div className="text-neutral-600">
                        Connect, collaborate and share with other hosts and
                        community members.
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="border border-neutral-300 px-3 py-2 rounded-xl">
                <Link
                  to="https://www.airbnb.co.in/help/contact-us?entry=TODAY_TAB_NHPS&role=host"
                  target="_blank"
                >
                  <div className="flex items-center gap-3">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-lg">
                        Contact specialized support
                      </div>
                      <div className="text-neutral-600">
                        As a new Host, you get one-tap access to a specially
                        trained support team.
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between pt-8 px-32 gap-8 mt-8">
            <div>
              <h2 className="font-semibold text-3xl">Resources and tips</h2>
            </div>
            <div className="flex gap-4">
              <ResourceCard
                title={"How to get paid for hosting"}
                resourceLink={
                  "https://www.airbnb.co.in/resources/hosting-homes/a/how-you-get-paid-for-hosting-20"
                }
                imgUrl={
                  "https://a0.muscache.com/im/pictures/fff5a5e8-3ab3-4970-a5fc-c51e301a9acb.jpg?im_w=480"
                }
              />
              <ResourceCard
                title={"How to set your pricing strategy"}
                resourceLink={
                  "https://www.airbnb.co.in/resources/hosting-homes/a/how-to-set-a-pricing-strategy-15"
                }
                imgUrl={
                  "https://a0.muscache.com/im/pictures/d975ffbe-0c50-4add-8372-8d05418f88ee.jpg?im_w=480"
                }
              />
              <ResourceCard
                title={"Making your home ready for guests"}
                resourceLink={
                  "https://www.airbnb.co.in/resources/hosting-homes/a/making-your-home-ready-for-guests-26"
                }
                imgUrl={
                  "https://a0.muscache.com/im/pictures/617aaec5-059f-4599-81e6-c761fd85fb36.jpg?im_w=480"
                }
              />
              <ResourceCard
                title={"How to write a listing description that works"}
                resourceLink={
                  "https://www.airbnb.co.in/resources/hosting-homes/a/writing-an-effective-description-of-your-place-13"
                }
                imgUrl={
                  "https://a0.muscache.com/im/pictures/27eb59d7-3791-48a0-b4f8-ee0ecafc9ce1.jpg?im_w=480"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
