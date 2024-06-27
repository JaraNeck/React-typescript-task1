import React from "react";
import { Country } from "../types/country";

interface CountryCardProps {
  country: Country;
  handleSelectCountry: (country: Country) => void;
}

const CountryCard: React.FC<CountryCardProps> = ({
  country,
  handleSelectCountry,
}) => {
  return (
    <div className="flex justify-center items-center border-solid border-2 w-72 h-44">
      <div onClick={() => handleSelectCountry(country)}>
        <img src={country.flags.svg} className="w-32 h-auto mx-auto mb-5" />
        <h3 className="font-bold">{country.name.common}</h3>
        <h3>{country.capital}</h3>
      </div>
    </div>
  );
};

export default CountryCard;
