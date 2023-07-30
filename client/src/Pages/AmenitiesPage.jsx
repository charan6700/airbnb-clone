import { useEffect, useState } from "react";
import MainContainerWithFooter from "../Components/MainContainerWithFooter";
import MultiRadioButton from "../Components/MultiRadioButton";
import WiFi from "../assets/svg-icons/WiFi";
import TV from "../assets/svg-icons/TV";
import Kitchen from "../assets/svg-icons/Kitchen";
import WashingMachine from "../assets/svg-icons/WashingMachine";
import CarParking from "../assets/svg-icons/CarParking";
import CarPaidParking from "../assets/svg-icons/CarPaidParking";
import AirConditioning from "../assets/svg-icons/AirConditioning";
import DedicatedWorkspace from "../assets/svg-icons/DedicatedWorkspace";
import Pool from "../assets/svg-icons/Pool";
import HotTub from "../assets/svg-icons/HotTub";
import Patio from "../assets/svg-icons/Patio";
import BBQGrill from "../assets/svg-icons/BBQGrill";
import OutdoorDiningArea from "../assets/svg-icons/OutdoorDiningArea";
import FirePit from "../assets/svg-icons/FirePit";
import PoolTable from "../assets/svg-icons/PoolTable";
import IndoorFireplace from "../assets/svg-icons/IndoorFireplace";
import Piano from "../assets/svg-icons/Piano";
import ExerciseEquipment from "../assets/svg-icons/ExerciseEquipment";
import LakeAccess from "../assets/svg-icons/LakeAccess";
import BeachAccess from "../assets/svg-icons/BeachAccess";
import Ski from "../assets/svg-icons/Ski";
import OutdoorShower from "../assets/svg-icons/OutdoorShower";
import SmokeAlarm from "../assets/svg-icons/SmokeAlarm";
import FirstAidKit from "../assets/svg-icons/FirstAidKit";
import FireExtinguisher from "../assets/svg-icons/FireExtinguisher";
import CarbonMonoxideAlarm from "../assets/svg-icons/CarbonMonoxideAlarm";

export default function AmenitiesPage({ placeDoc, setPlaceDoc }) {
  const [selectedBasicAmenities, setSelectedBasicAmenities] = useState(
    placeDoc?.features.amenities.basic
  );
  const [selectedStandoutAmenities, setSelectedStandoutAmenities] = useState(
    placeDoc?.features.amenities.standout
  );
  const [selectedSafetyAmenities, setSelectedSafetyAmenities] = useState(
    placeDoc?.features.amenities.safety
  );

  useEffect(() => {
    setPlaceDoc((prev) => {
      return {
        ...prev,
        features: {
          ...prev.features,
          amenities: {
            ...prev.features.amenities,
            basic: selectedBasicAmenities,
          },
        },
      };
    });
  }, [selectedBasicAmenities]);

  useEffect(() => {
    setPlaceDoc((prev) => {
      return {
        ...prev,
        features: {
          ...prev.features,
          amenities: {
            ...prev.features.amenities,
            standout: selectedStandoutAmenities,
          },
        },
      };
    });
  }, [selectedStandoutAmenities]);

  useEffect(() => {
    setPlaceDoc((prev) => {
      return {
        ...prev,
        features: {
          ...prev.features,
          amenities: {
            ...prev.features.amenities,
            safety: selectedSafetyAmenities,
          },
        },
      };
    });
  }, [selectedSafetyAmenities]);

  function handleBasicAmenityClick(amenity) {
    if (selectedBasicAmenities.includes(amenity)) {
      setSelectedBasicAmenities((prev) => {
        return prev.filter((val) => val !== amenity);
      });
    } else {
      setSelectedBasicAmenities((prev) => {
        return [...prev, amenity];
      });
    }
  }

  function handleStandoutAmenityClick(amenity) {
    if (selectedStandoutAmenities.includes(amenity)) {
      setSelectedStandoutAmenities((prev) => {
        return prev.filter((val) => val !== amenity);
      });
    } else {
      setSelectedStandoutAmenities((prev) => {
        return [...prev, amenity];
      });
    }
  }

  function handleSafetyAmenityClick(amenity) {
    if (selectedSafetyAmenities.includes(amenity)) {
      setSelectedSafetyAmenities((prev) => {
        return prev.filter((val) => val !== amenity);
      });
    } else {
      setSelectedSafetyAmenities((prev) => {
        return [...prev, amenity];
      });
    }
  }

  return (
    <div className="h-full w-full flex fade-in">
      <MainContainerWithFooter>
        <div className="flex flex-col justify-center items-center w-full max-w-[640px]">
          <div className="font-semibold text-4xl w-full break-words mb-4">
            <h1>Tell guests what your place has to offer</h1>
          </div>
          <div className="text-left text-lg text-neutral-500 mb-8 w-full">
            You can add more amenities after you publish your listing.
          </div>
          <div
            role="radiogroup"
            className="flex w-full gap-4 flex-wrap pb-8 pt-1"
          >
            <MultiRadioButton
              Icon={<WiFi />}
              name="Wifi"
              value="wifi"
              selectedButtons={selectedBasicAmenities}
              handleClick={handleBasicAmenityClick}
            />
            <MultiRadioButton
              Icon={<TV />}
              name="TV"
              value="tv"
              selectedButtons={selectedBasicAmenities}
              handleClick={handleBasicAmenityClick}
            />
            <MultiRadioButton
              Icon={<Kitchen />}
              name="Kitchen"
              value="kitchen"
              selectedButtons={selectedBasicAmenities}
              handleClick={handleBasicAmenityClick}
            />
            <MultiRadioButton
              Icon={<WashingMachine />}
              name="Washing machine"
              value="washing-machine"
              selectedButtons={selectedBasicAmenities}
              handleClick={handleBasicAmenityClick}
            />
            <MultiRadioButton
              Icon={<CarParking />}
              name="Free parking on premises"
              value="free-car-parking"
              selectedButtons={selectedBasicAmenities}
              handleClick={handleBasicAmenityClick}
            />
            <MultiRadioButton
              Icon={<CarPaidParking />}
              name="Paid parking on premises"
              value="paid-car-parking"
              selectedButtons={selectedBasicAmenities}
              handleClick={handleBasicAmenityClick}
            />
            <MultiRadioButton
              Icon={<AirConditioning />}
              name="Air conditioning"
              value="air-conditioning"
              selectedButtons={selectedBasicAmenities}
              handleClick={handleBasicAmenityClick}
            />
            <MultiRadioButton
              Icon={<DedicatedWorkspace />}
              name="Dedicated workspace"
              value="dedicated-workspace"
              selectedButtons={selectedBasicAmenities}
              handleClick={handleBasicAmenityClick}
            />
          </div>
          <div className="font-semibold text-lg w-full pb-5">
            Do you have any standout amenities?
          </div>
          <div
            role="radiogroup"
            className="flex w-full gap-4 flex-wrap pb-8 pt-1"
          >
            <MultiRadioButton
              Icon={<Pool />}
              name="Pool"
              value="pool"
              selectedButtons={selectedStandoutAmenities}
              handleClick={handleStandoutAmenityClick}
            />
            <MultiRadioButton
              Icon={<HotTub />}
              name="HotTub"
              value="hot-tub"
              selectedButtons={selectedStandoutAmenities}
              handleClick={handleStandoutAmenityClick}
            />
            <MultiRadioButton
              Icon={<Patio />}
              name="Patio"
              value="patio"
              selectedButtons={selectedStandoutAmenities}
              handleClick={handleStandoutAmenityClick}
            />
            <MultiRadioButton
              Icon={<BBQGrill />}
              name="BBQ grill"
              value="bbq-grill"
              selectedButtons={selectedStandoutAmenities}
              handleClick={handleStandoutAmenityClick}
            />
            <MultiRadioButton
              Icon={<OutdoorDiningArea />}
              name="Outdoor dining area"
              value="outdoor-dining-area"
              selectedButtons={selectedStandoutAmenities}
              handleClick={handleStandoutAmenityClick}
            />
            <MultiRadioButton
              Icon={<FirePit />}
              name="Fire pit"
              value="fire-pit"
              selectedButtons={selectedStandoutAmenities}
              handleClick={handleStandoutAmenityClick}
            />
            <MultiRadioButton
              Icon={<PoolTable />}
              name="Pool table"
              value="pool-table"
              selectedButtons={selectedStandoutAmenities}
              handleClick={handleStandoutAmenityClick}
            />
            <MultiRadioButton
              Icon={<IndoorFireplace />}
              name="Indoor fireplace"
              value="indoor-fireplace"
              selectedButtons={selectedStandoutAmenities}
              handleClick={handleStandoutAmenityClick}
            />
            <MultiRadioButton
              Icon={<Piano />}
              name="Piano"
              value="piano"
              selectedButtons={selectedStandoutAmenities}
              handleClick={handleStandoutAmenityClick}
            />
            <MultiRadioButton
              Icon={<ExerciseEquipment />}
              name="Exercise equipment"
              value="exercise-equipment"
              selectedButtons={selectedStandoutAmenities}
              handleClick={handleStandoutAmenityClick}
            />
            <MultiRadioButton
              Icon={<LakeAccess />}
              name="Lake access"
              value="lake-access"
              selectedButtons={selectedStandoutAmenities}
              handleClick={handleStandoutAmenityClick}
            />
            <MultiRadioButton
              Icon={<BeachAccess />}
              name="Beach access"
              value="beach-access"
              selectedButtons={selectedStandoutAmenities}
              handleClick={handleStandoutAmenityClick}
            />
            <MultiRadioButton
              Icon={<Ski />}
              name="Ski-in/Ski-out"
              value="ski-in-ski-out"
              selectedButtons={selectedStandoutAmenities}
              handleClick={handleStandoutAmenityClick}
            />
            <MultiRadioButton
              Icon={<OutdoorShower />}
              name="Outdoor shower"
              value="outdoor-shower"
              selectedButtons={selectedStandoutAmenities}
              handleClick={handleStandoutAmenityClick}
            />
          </div>
          <div className="font-semibold text-lg pb-5 w-full">
            Do you have any of these safety items?
          </div>
          <div
            role="radiogroup"
            className="flex w-full gap-4 flex-wrap pb-8 pt-1"
          >
            <MultiRadioButton
              Icon={<SmokeAlarm />}
              name="Smoke alarm"
              value="smoke-alarm"
              selectedButtons={selectedSafetyAmenities}
              handleClick={handleSafetyAmenityClick}
            />
            <MultiRadioButton
              Icon={<FirstAidKit />}
              name="First aid kit"
              value="first-aid-kit"
              selectedButtons={selectedSafetyAmenities}
              handleClick={handleSafetyAmenityClick}
            />
            <MultiRadioButton
              Icon={<FireExtinguisher />}
              name="Fire extinguisher"
              value="fire-extinguisher"
              selectedButtons={selectedSafetyAmenities}
              handleClick={handleSafetyAmenityClick}
            />
            <MultiRadioButton
              Icon={<CarbonMonoxideAlarm />}
              name="Carbon monoxide alarm"
              value="carbon-monoxide-alarm"
              selectedButtons={selectedSafetyAmenities}
              handleClick={handleSafetyAmenityClick}
            />
          </div>
        </div>
      </MainContainerWithFooter>
    </div>
  );
}
