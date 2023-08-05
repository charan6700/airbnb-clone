import { Navigate, useOutletContext, useParams } from "react-router-dom";
import StructurePage from "../Pages/StructurePage";
import AboutYourPlace from "../Pages/AboutYourPlace";
import _ from "lodash";
import BecomeAHostOverviewPage from "../Pages/BecomeAHostOverviewPage";
import PrivacyTypePage from "../Pages/PrivacyTypePage";
import LocationPage from "../Pages/LocationPage";
import FloorPlanPage from "../Pages/FloorPlanPage";
import StandOutPage from "../Pages/StandOutPage";
import AmenitiesPage from "../Pages/AmenitiesPage";
import PhotosPage from "../Pages/PhotosPage";
import TitlePage from "../Pages/TitlePage";

export default function ModifyYourPlace() {
  const { stage } = useParams();
  const page = _.kebabCase(stage);

  const [placeDoc, setPlaceDoc] = useOutletContext();

  if (page === "overview") return <BecomeAHostOverviewPage />;
  else if (page === "structure")
    return <StructurePage placeDoc={placeDoc} setPlaceDoc={setPlaceDoc} />;
  else if (page === "about-your-place")
    return <AboutYourPlace placeDoc={placeDoc} setPlaceDoc={setPlaceDoc} />;
  else if (page === "privacy-type")
    return <PrivacyTypePage placeDoc={placeDoc} setPlaceDoc={setPlaceDoc} />;
  else if (page === "location")
    return <LocationPage placeDoc={placeDoc} setPlaceDoc={setPlaceDoc} />;
  else if (page === "floor-plan")
    return <FloorPlanPage placeDoc={placeDoc} setPlaceDoc={setPlaceDoc} />;
  else if (page === "stand-out")
    return <StandOutPage placeDoc={placeDoc} setPlaceDoc={setPlaceDoc} />;
  else if (page === "amenities")
    return <AmenitiesPage placeDoc={placeDoc} setPlaceDoc={setPlaceDoc} />;
  else if (page === "photos")
    return <PhotosPage placeDoc={placeDoc} setPlaceDoc={setPlaceDoc} />;
  else if (page === "title")
    return <TitlePage placeDoc={placeDoc} setPlaceDoc={setPlaceDoc} />;

  return <Navigate to={"/become-a-host"} />;
}
