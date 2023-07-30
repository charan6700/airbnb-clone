import { useEffect, useState } from "react";
import MainContainerWithFooter from "../Components/MainContainerWithFooter";
import FormInput from "../Components/FormInput";

export default function LocationPage({ placeDoc, setPlaceDoc }) {
  const [countryCode, setCountryCode] = useState(
    placeDoc?.property.location.countryCode
  );
  const [houseFlatBldg, setHouseFlatBldg] = useState(
    placeDoc?.property.location.houseFlatBldg
  );
  const [areaVillage, setAreaVillage] = useState(
    placeDoc?.property.location.areaVillage
  );
  const [streetAddress, setStreetAddress] = useState(
    placeDoc?.property.location.streetAddress
  );
  const [nearbyLandmark, setNearbyLandmark] = useState(
    placeDoc?.property.location.nearbyLandmark
  );
  const [cityTown, setCityTown] = useState(
    placeDoc?.property.location.cityTown
  );
  const [pinCode, setPinCode] = useState(placeDoc?.property.location.pinCode);
  const [countyProvince, setCountyProvince] = useState(
    placeDoc?.property.location.countyProvince
  );

  useEffect(() => {
    setPlaceDoc((prev) => {
      return {
        ...prev,
        property: {
          ...prev.property,
          location: { ...prev.property.location, countryCode: countryCode },
        },
      };
    });
  }, [countryCode]);

  useEffect(() => {
    setPlaceDoc((prev) => {
      return {
        ...prev,
        property: {
          ...prev.property,
          location: { ...prev.property.location, houseFlatBldg: houseFlatBldg },
        },
      };
    });
  }, [houseFlatBldg]);

  useEffect(() => {
    setPlaceDoc((prev) => {
      return {
        ...prev,
        property: {
          ...prev.property,
          location: { ...prev.property.location, areaVillage: areaVillage },
        },
      };
    });
  }, [areaVillage]);

  useEffect(() => {
    setPlaceDoc((prev) => {
      return {
        ...prev,
        property: {
          ...prev.property,
          location: { ...prev.property.location, streetAddress: streetAddress },
        },
      };
    });
  }, [streetAddress]);

  useEffect(() => {
    setPlaceDoc((prev) => {
      return {
        ...prev,
        property: {
          ...prev.property,
          location: {
            ...prev.property.location,
            nearbyLandmark: nearbyLandmark,
          },
        },
      };
    });
  }, [nearbyLandmark]);

  useEffect(() => {
    setPlaceDoc((prev) => {
      return {
        ...prev,
        property: {
          ...prev.property,
          location: { ...prev.property.location, cityTown: cityTown },
        },
      };
    });
  }, [cityTown]);

  useEffect(() => {
    setPlaceDoc((prev) => {
      return {
        ...prev,
        property: {
          ...prev.property,
          location: { ...prev.property.location, pinCode: pinCode },
        },
      };
    });
  }, [pinCode]);

  useEffect(() => {
    setPlaceDoc((prev) => {
      return {
        ...prev,
        property: {
          ...prev.property,
          location: {
            ...prev.property.location,
            countyProvince: countyProvince,
          },
        },
      };
    });
  }, [countyProvince]);

  return (
    <div className="h-full w-full flex items-center justify-center fade-in">
      <MainContainerWithFooter>
        <div className="flex flex-col pt-8 max-w-[635px] h-full">
          <div className="">
            <div className="break-words w-full pb-10">
              <h1 className="font-semibold text-4xl mb-4">
                Confirm your address
              </h1>
              <div>
                <span className="text-lg text-neutral-500">
                  Your address is only shared with guests after they’ve made a
                  reservation.
                </span>
              </div>
            </div>
            <div className="pb-10">
              <CountryCodeSelect
                countryCode={countryCode}
                setCountryCode={setCountryCode}
              />
              <div className="border border-neutral-400 rounded-lg">
                <FormInput
                  labelText={"House, flat, bldg, etc."}
                  inputValue={houseFlatBldg}
                  setInputValue={setHouseFlatBldg}
                />
                <FormInput
                  labelText={"Area/village (if applicable)"}
                  inputValue={areaVillage}
                  setInputValue={setAreaVillage}
                />
                <FormInput
                  labelText={"Street address"}
                  inputValue={streetAddress}
                  setInputValue={setStreetAddress}
                />
                <FormInput
                  labelText={"Nearby landmark (if applicable)"}
                  inputValue={nearbyLandmark}
                  setInputValue={setNearbyLandmark}
                />
                <FormInput
                  labelText={"City / town"}
                  inputValue={cityTown}
                  setInputValue={setCityTown}
                />
                <FormInput
                  labelText={"PIN code"}
                  inputValue={pinCode}
                  setInputValue={setPinCode}
                />
                <FormInput
                  labelText={"County / province"}
                  inputValue={countyProvince}
                  setInputValue={setCountyProvince}
                  isLast={true}
                />
              </div>
            </div>
          </div>
        </div>
      </MainContainerWithFooter>
    </div>
  );
}

function CountryCodeSelect({ countryCode, setCountryCode }) {
  if (!countryCode) setCountryCode("IN");
  return (
    <div className="relative h-full mb-5">
      <label htmlFor="countryCode relative h-full">
        <div className="text-xs absolute top-[0.35rem] left-3 text-neutral-500">
          Country/Region
        </div>
        <div className="flex justify-center h-full">
          <select
            name="countryCode"
            id="countryCode"
            value={countryCode}
            className="w-full pl-3 pt-5 pb-3 appearance-none border border-neutral-400 rounded-lg"
            onChange={(ev) => {
              setCountryCode(ev.target.value);
            }}
          >
            <option value="AF">Afghanistan - AF</option>
            <option value="AX">Åland Islands - AX</option>
            <option value="AL">Albania - AL</option>
            <option value="DZ">Algeria - DZ</option>
            <option value="AS">American Samoa - AS</option>
            <option value="AD">Andorra - AD</option>
            <option value="AO">Angola - AO</option>
            <option value="AI">Anguilla - AI</option>
            <option value="AG">Antigua &amp; Barbuda - AG</option>
            <option value="AR">Argentina - AR</option>
            <option value="AM">Armenia - AM</option>
            <option value="AW">Aruba - AW</option>
            <option value="AU">Australia - AU</option>
            <option value="AT">Austria - AT</option>
            <option value="AZ">Azerbaijan - AZ</option>
            <option value="BS">Bahamas - BS</option>
            <option value="BH">Bahrain - BH</option>
            <option value="BD">Bangladesh - BD</option>
            <option value="BB">Barbados - BB</option>
            <option value="BY">Belarus - BY</option>
            <option value="BE">Belgium - BE</option>
            <option value="BZ">Belize - BZ</option>
            <option value="BJ">Benin - BJ</option>
            <option value="BM">Bermuda - BM</option>
            <option value="BT">Bhutan - BT</option>
            <option value="BO">Bolivia - BO</option>
            <option value="BA">Bosnia &amp; Herzegovina - BA</option>
            <option value="BW">Botswana - BW</option>
            <option value="BR">Brazil - BR</option>
            <option value="IO">British Indian Ocean Territory - IO</option>
            <option value="VG">British Virgin Islands - VG</option>
            <option value="BN">Brunei - BN</option>
            <option value="BG">Bulgaria - BG</option>
            <option value="BF">Burkina Faso - BF</option>
            <option value="BI">Burundi - BI</option>
            <option value="KH">Cambodia - KH</option>
            <option value="CM">Cameroon - CM</option>
            <option value="CA">Canada - CA</option>
            <option value="CV">Cape Verde - CV</option>
            <option value="BQ">Bonaire, Sint Eustatius and Saba - BQ</option>
            <option value="KY">Cayman Islands - KY</option>
            <option value="CF">Central African Republic - CF</option>
            <option value="TD">Chad - TD</option>
            <option value="CL">Chile - CL</option>
            <option value="CN">China - CN</option>
            <option value="CX">Christmas Island - CX</option>
            <option value="CC">Cocos (Keeling) Islands - CC</option>
            <option value="CO">Colombia - CO</option>
            <option value="KM">Comoros - KM</option>
            <option value="CG">Congo - CG</option>
            <option value="CK">Cook Islands - CK</option>
            <option value="CR">Costa Rica - CR</option>
            <option value="HR">Croatia - HR</option>
            <option value="CU">Cuba - CU</option>
            <option value="CW">Curaçao - CW</option>
            <option value="CY">Cyprus - CY</option>
            <option value="CZ">Czechia - CZ</option>
            <option value="CD">Democratic Republic of the Congo - CD</option>
            <option value="DK">Denmark - DK</option>
            <option value="DJ">Djibouti - DJ</option>
            <option value="DM">Dominica - DM</option>
            <option value="DO">Dominican Republic - DO</option>
            <option value="TL">Timor-Leste - TL</option>
            <option value="EC">Ecuador - EC</option>
            <option value="EG">Egypt - EG</option>
            <option value="SV">El Salvador - SV</option>
            <option value="GQ">Equatorial Guinea - GQ</option>
            <option value="ER">Eritrea - ER</option>
            <option value="EE">Estonia - EE</option>
            <option value="ET">Ethiopia - ET</option>
            <option value="FK">Falkland Islands (Islas Malvinas) - FK</option>
            <option value="FO">Faroe Islands - FO</option>
            <option value="FJ">Fiji - FJ</option>
            <option value="FI">Finland - FI</option>
            <option value="FR">France - FR</option>
            <option value="GF">French Guiana - GF</option>
            <option value="PF">French Polynesia - PF</option>
            <option value="GA">Gabon - GA</option>
            <option value="GM">Gambia - GM</option>
            <option value="GE">Georgia - GE</option>
            <option value="DE">Germany - DE</option>
            <option value="GH">Ghana - GH</option>
            <option value="GI">Gibraltar - GI</option>
            <option value="GR">Greece - GR</option>
            <option value="GL">Greenland - GL</option>
            <option value="GD">Grenada - GD</option>
            <option value="GP">Guadeloupe - GP</option>
            <option value="GU">Guam - GU</option>
            <option value="GT">Guatemala - GT</option>
            <option value="GG">Guernsey - GG</option>
            <option value="GN">Guinea - GN</option>
            <option value="GW">Guinea-Bissau - GW</option>
            <option value="GY">Guyana - GY</option>
            <option value="HT">Haiti - HT</option>
            <option value="HN">Honduras - HN</option>
            <option value="HK">Hong Kong - HK</option>
            <option value="HU">Hungary - HU</option>
            <option value="IS">Iceland - IS</option>
            <option value="IN">India - IN</option>
            <option value="ID">Indonesia - ID</option>
            <option value="IQ">Iraq - IQ</option>
            <option value="IE">Ireland - IE</option>
            <option value="IM">Isle of Man - IM</option>
            <option value="IL">Israel - IL</option>
            <option value="IT">Italy - IT</option>
            <option value="CI">Côte d’Ivoire - CI</option>
            <option value="JM">Jamaica - JM</option>
            <option value="JP">Japan - JP</option>
            <option value="JE">Jersey - JE</option>
            <option value="JO">Jordan - JO</option>
            <option value="KZ">Kazakhstan - KZ</option>
            <option value="KE">Kenya - KE</option>
            <option value="KI">Kiribati - KI</option>
            <option value="XK">Kosovo - XK</option>
            <option value="KW">Kuwait - KW</option>
            <option value="KG">Kyrgyzstan - KG</option>
            <option value="LA">Laos - LA</option>
            <option value="LV">Latvia - LV</option>
            <option value="LB">Lebanon - LB</option>
            <option value="LS">Lesotho - LS</option>
            <option value="LR">Liberia - LR</option>
            <option value="LY">Libya - LY</option>
            <option value="LI">Liechtenstein - LI</option>
            <option value="LT">Lithuania - LT</option>
            <option value="LU">Luxembourg - LU</option>
            <option value="MO">Macau - MO</option>
            <option value="MK">Macedonia - MK</option>
            <option value="MG">Madagascar - MG</option>
            <option value="MW">Malawi - MW</option>
            <option value="MY">Malaysia - MY</option>
            <option value="MV">Maldives - MV</option>
            <option value="ML">Mali - ML</option>
            <option value="MT">Malta - MT</option>
            <option value="MH">Marshall Islands - MH</option>
            <option value="MQ">Martinique - MQ</option>
            <option value="MR">Mauritania - MR</option>
            <option value="MU">Mauritius - MU</option>
            <option value="YT">Mayotte - YT</option>
            <option value="MX">Mexico - MX</option>
            <option value="FM">Micronesia - FM</option>
            <option value="MD">Moldova - MD</option>
            <option value="MC">Monaco - MC</option>
            <option value="MN">Mongolia - MN</option>
            <option value="ME">Montenegro - ME</option>
            <option value="MS">Montserrat - MS</option>
            <option value="MA">Morocco - MA</option>
            <option value="MZ">Mozambique - MZ</option>
            <option value="MM">Myanmar - MM</option>
            <option value="NA">Namibia - NA</option>
            <option value="NR">Nauru - NR</option>
            <option value="NP">Nepal - NP</option>
            <option value="NL">Netherlands - NL</option>
            <option value="NC">New Caledonia - NC</option>
            <option value="NZ">New Zealand - NZ</option>
            <option value="NI">Nicaragua - NI</option>
            <option value="NE">Niger - NE</option>
            <option value="NG">Nigeria - NG</option>
            <option value="NU">Niue - NU</option>
            <option value="NF">Norfolk Island - NF</option>
            <option value="MP">Northern Mariana Islands - MP</option>
            <option value="NO">Norway - NO</option>
            <option value="OM">Oman - OM</option>
            <option value="PK">Pakistan - PK</option>
            <option value="PW">Palau - PW</option>
            <option value="PS">Palestinian Territories - PS</option>
            <option value="PA">Panama - PA</option>
            <option value="PG">Papua New Guinea - PG</option>
            <option value="PY">Paraguay - PY</option>
            <option value="PE">Peru - PE</option>
            <option value="PH">Philippines - PH</option>
            <option value="PN">Pitcairn Islands - PN</option>
            <option value="PL">Poland - PL</option>
            <option value="PT">Portugal - PT</option>
            <option value="PR">Puerto Rico - PR</option>
            <option value="QA">Qatar - QA</option>
            <option value="RE">Réunion - RE</option>
            <option value="RO">Romania - RO</option>
            <option value="RU">Russia - RU</option>
            <option value="RW">Rwanda - RW</option>
            <option value="BL">St Barthélemy - BL</option>
            <option value="SH">St Helena - SH</option>
            <option value="KN">St Kitts &amp; Nevis - KN</option>
            <option value="LC">St Lucia - LC</option>
            <option value="MF">St Martin - MF</option>
            <option value="PM">St Pierre &amp; Miquelon - PM</option>
            <option value="VC">St Vincent &amp; Grenadines - VC</option>
            <option value="WS">Samoa - WS</option>
            <option value="SM">San Marino - SM</option>
            <option value="ST">São Tomé &amp; Príncipe - ST</option>
            <option value="SA">Saudi Arabia - SA</option>
            <option value="SN">Senegal - SN</option>
            <option value="RS">Serbia - RS</option>
            <option value="SC">Seychelles - SC</option>
            <option value="SL">Sierra Leone - SL</option>
            <option value="SG">Singapore - SG</option>
            <option value="SX">Sint Maarten - SX</option>
            <option value="SK">Slovakia - SK</option>
            <option value="SI">Slovenia - SI</option>
            <option value="SB">Solomon Islands - SB</option>
            <option value="SO">Somalia - SO</option>
            <option value="ZA">South Africa - ZA</option>
            <option value="GS">
              South Georgia &amp; South Sandwich Islands - GS
            </option>
            <option value="KR">South Korea - KR</option>
            <option value="SS">South Sudan - SS</option>
            <option value="ES">Spain - ES</option>
            <option value="LK">Sri Lanka - LK</option>
            <option value="SD">Sudan - SD</option>
            <option value="SR">Suriname - SR</option>
            <option value="SJ">Svalbard &amp; Jan Mayen - SJ</option>
            <option value="SZ">Eswatini - SZ</option>
            <option value="SE">Sweden - SE</option>
            <option value="CH">Switzerland - CH</option>
            <option value="TW">Taiwan - TW</option>
            <option value="TJ">Tajikistan - TJ</option>
            <option value="TZ">Tanzania - TZ</option>
            <option value="TH">Thailand - TH</option>
            <option value="TG">Togo - TG</option>
            <option value="TK">Tokelau - TK</option>
            <option value="TO">Tonga - TO</option>
            <option value="TT">Trinidad &amp; Tobago - TT</option>
            <option value="TN">Tunisia - TN</option>
            <option value="TR">Turkey - TR</option>
            <option value="TM">Turkmenistan - TM</option>
            <option value="TC">Turks &amp; Caicos Islands - TC</option>
            <option value="TV">Tuvalu - TV</option>
            <option value="VI">US Virgin Islands - VI</option>
            <option value="UG">Uganda - UG</option>
            <option value="UA">Ukraine - UA</option>
            <option value="AE">United Arab Emirates - AE</option>
            <option value="GB">United Kingdom - GB</option>
            <option value="US">United States - US</option>
            <option value="UY">Uruguay - UY</option>
            <option value="UZ">Uzbekistan - UZ</option>
            <option value="VU">Vanuatu - VU</option>
            <option value="VA">Vatican City - VA</option>
            <option value="VE">Venezuela - VE</option>
            <option value="VN">Vietnam - VN</option>
            <option value="WF">Wallis &amp; Futuna - WF</option>
            <option value="EH">Western Sahara - EH</option>
            <option value="YE">Yemen - YE</option>
            <option value="ZM">Zambia - ZM</option>
            <option value="ZW">Zimbabwe - ZW</option>
          </select>
          <div className="absolute pr-3 right-0 h-full flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        </div>
      </label>
    </div>
  );
}
