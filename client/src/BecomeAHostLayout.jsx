import BecomeAHostHeader from "./Components/BecomeAHostHeader";
import BecomeAHostFooter from "./Components/BecomeAHostFooter";
import { Outlet, useParams } from "react-router-dom";
import BecomeAHostOverviewPage from "./Pages/BecomeAHostOverviewPage";
import { useEffect, useState } from "react";
import axios from "axios";

export default function BecomeAHostLayout() {
  const { placeId } = useParams();

  const [placeDoc, setPlaceDoc] = useState(null);
  const [ready, setReady] = useState(false);

  const [descriptionFirstNextClicked, setDescriptionFirstNextClicked] =
    useState(false);

  useEffect(() => {
    try {
      axios.get("/place/" + placeId).then(
        ({ data }) => {
          console.log("found data in layout: " + data);
          if (!data) throw new Error("No place exists for id: ", placeId);
          setPlaceDoc(data);
          setReady(true);
        },
        (error) => {
          alert("error occurred");
          return <div style={{ color: "red" }}>Error occurred</div>;
        }
      );
    } catch (err) {
      return <div style={{ color: "red" }}>Error occurred</div>;
    }
  }, [placeId]);

  if (!ready) return <div>Loading...</div>;

  if (placeId === "overview") return <BecomeAHostOverviewPage />;
  return (
    <div>
      <BecomeAHostHeader placeDoc={placeDoc} />
      <Outlet context={[placeDoc, setPlaceDoc, descriptionFirstNextClicked]} />
      <BecomeAHostFooter descriptionFirstNextClicked={descriptionFirstNextClicked} setDescriptionFirstNextClicked={setDescriptionFirstNextClicked}/>
    </div>
  );
}
