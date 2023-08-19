import { useEffect, useState } from "react";
import MainContainerWithFooter from "../Components/MainContainerWithFooter";
import axios from "axios";

export default function ReceiptPage({ placeDoc, setPlaceDoc }) {
  const [ready, setReady] = useState(false);
  const [coverImageFileName, setCoverImageFileName] = useState("");

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

  return (
    <>
      <div className="h-full w-full flex items-center justify-center fade-in">
        <MainContainerWithFooter>
          <div className="w-[850px] my-auto block">
            <div className="flex flex-col justify-center items-center w-full h-full">
              <div className="font-semibold text-5xl mb-8 break-words w-full">
                <h1>Review your listing</h1>
              </div>
              <div className="mb-6 w-full">
                <span className="text-lg text-neutral-500">
                  Here's what we'll show to guests. Make sure everything looks
                  good.
                </span>
              </div>
              <div className="flex w-full">
                <div className="w-[358px]">
                  <button></button>
                  <div className="flex">
                    <div>
                      <img
                        src={
                          "http://localhost:3000/photos/" + coverImageFileName
                        }
                      ></img>
                    </div>
                    <div></div>
                  </div>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </MainContainerWithFooter>
      </div>
    </>
  );
}
