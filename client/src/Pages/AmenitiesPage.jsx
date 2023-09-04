import { useEffect, useState } from "react";
import MainContainerWithFooter from "../Components/MainContainerWithFooter";
import MultiRadioButton from "../Components/MultiRadioButton";
import {
  amenitiesList,
  standoutAmenitiesList,
  safetyAmenitiesList,
} from "../AmenitiesList";

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
            {amenitiesList.map((amenity, idx) => (
              <MultiRadioButton
                key={idx}
                Icon={amenity.icon}
                name={amenity.name}
                value={amenity.value}
                selectedButtons={selectedBasicAmenities}
                handleClick={handleBasicAmenityClick}
              />
            ))}
          </div>
          <div className="font-semibold text-lg w-full pb-5">
            Do you have any standout amenities?
          </div>
          <div
            role="radiogroup"
            className="flex w-full gap-4 flex-wrap pb-8 pt-1"
          >
            {standoutAmenitiesList.map((amenity, idx) => (
              <MultiRadioButton
                key={idx}
                Icon={amenity.icon}
                name={amenity.name}
                value={amenity.value}
                selectedButtons={selectedStandoutAmenities}
                handleClick={handleStandoutAmenityClick}
              />
            ))}
          </div>
          <div className="font-semibold text-lg pb-5 w-full">
            Do you have any of these safety items?
          </div>
          <div
            role="radiogroup"
            className="flex w-full gap-4 flex-wrap pb-8 pt-1"
          >
            {safetyAmenitiesList.map((amenity, idx) => (
              <MultiRadioButton
                key={idx}
                Icon={amenity.icon}
                name={amenity.name}
                value={amenity.value}
                selectedButtons={selectedSafetyAmenities}
                handleClick={handleSafetyAmenityClick}
              />
            ))}
          </div>
        </div>
      </MainContainerWithFooter>
    </div>
  );
}
