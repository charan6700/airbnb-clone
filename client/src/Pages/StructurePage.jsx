import { useEffect, useState } from "react";
import MainContainerWithFooter from "../Components/MainContainerWithFooter";
import RadioButton from "../Components/RadioButton";

export default function StructurePage({ placeDoc, setPlaceDoc }) {
  const [selectedStructure, setSelectedStructure] = useState(null);

  useEffect(() => {
    if (placeDoc) setSelectedStructure(placeDoc.property.structure);
  }, [placeDoc]);

  function handleClick(struct) {
    setSelectedStructure(struct);
    setPlaceDoc((prev) => {
      return { ...prev, property: { ...prev.property, structure: struct } };
    });
  }

  return (
    <div className="h-full w-full flex fade-in">
      <MainContainerWithFooter>
        <div className="flex flex-col justify-center items-center">
          <div className="font-semibold text-4xl max-w-[640px] mb-8 break-words">
            <h1>Which of these best describes your&nbsp;place?</h1>
          </div>
          <div
            role="radiogroup"
            className="flex max-w-[640px] w-full gap-4 flex-wrap pb-28 pt-1"
          >
            <RadioButton
              logoName="house_logo"
              name="House"
              value="house"
              selectedButton={selectedStructure}
              handleClick={handleClick}
            />
            <RadioButton
              logoName="flat-apartment_logo"
              name="Flat/apartment"
              value="flatApartment"
              selectedButton={selectedStructure}
              handleClick={handleClick}
            />
            <RadioButton
              logoName="barn_logo"
              name="Barn"
              value="barn"
              selectedButton={selectedStructure}
              handleClick={handleClick}
            />
            <RadioButton
              logoName="bread-and-breakfast_logo"
              name="Bread & breakfast"
              value="breadAndBreakfast"
              selectedButton={selectedStructure}
              handleClick={handleClick}
            />
            <RadioButton
              logoName="boat_logo"
              name="Boat"
              value="boat"
              selectedButton={selectedStructure}
              handleClick={handleClick}
            />
            <RadioButton
              logoName="cabin_logo"
              name="Cabin"
              value="cabin"
              selectedButton={selectedStructure}
              handleClick={handleClick}
            />
            <RadioButton
              logoName="campervan_logo"
              name="Campervan/motorhome"
              value="campervanMotorhome"
              selectedButton={selectedStructure}
              handleClick={handleClick}
            />
            <RadioButton
              logoName="casa-particular_logo"
              name="Casa particular"
              value="casaParticular"
              selectedButton={selectedStructure}
              handleClick={handleClick}
            />
            <RadioButton
              logoName="castle_logo"
              name="Castle"
              value="castle"
              selectedButton={selectedStructure}
              handleClick={handleClick}
            />
            <RadioButton
              logoName="cave_logo"
              name="Cave"
              value="cave"
              selectedButton={selectedStructure}
              handleClick={handleClick}
            />
            <RadioButton
              logoName="dome_logo"
              name="Dome"
              value="dome"
              selectedButton={selectedStructure}
              handleClick={handleClick}
            />
            <RadioButton
              logoName="farm_logo"
              name="Farm"
              value="farm"
              selectedButton={selectedStructure}
              handleClick={handleClick}
            />
            <RadioButton
              logoName="hotel_logo"
              name="Hotel"
              value="hotel"
              selectedButton={selectedStructure}
              handleClick={handleClick}
            />
            <RadioButton
              logoName="house-boat_logo"
              name="Houseboat"
              value="houseboat"
              selectedButton={selectedStructure}
              handleClick={handleClick}
            />
            <RadioButton
              logoName="kezhan_logo"
              name="Kezhan"
              value="kezhan"
              selectedButton={selectedStructure}
              handleClick={handleClick}
            />
            <RadioButton
              logoName="tree-house_logo"
              name="Tree house"
              value="treeHouse"
              selectedButton={selectedStructure}
              handleClick={handleClick}
            />
            <RadioButton
              logoName="windmill_logo"
              name="Windmill"
              value="windmill"
              selectedButton={selectedStructure}
              handleClick={handleClick}
            />
            <RadioButton
              logoName="yurt_logo"
              name="Yurt"
              value="yurt"
              selectedButton={selectedStructure}
              handleClick={handleClick}
            />
          </div>
        </div>
      </MainContainerWithFooter>
    </div>
  );
}
