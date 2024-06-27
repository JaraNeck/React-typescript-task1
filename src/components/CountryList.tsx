import React, { useEffect, useState } from "react";
import { Country } from "../types/country";
import { getCountries } from "../api/service";
import CountryCard from "./CountryCard";

const CountryList: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const data: Country[] = await getCountries();
        setCountries(data);
      } catch (err) {
        alert(err);
      }
    };
    loadCountries();
  }, []);

  const handleSelectCountry = (country: Country): void => {
    const isSelected = selectedCountries.find(
      (selectedCountry: Country) =>
        selectedCountry.name.common === country.name.common
    );

    if (!isSelected) {
      // 나라를 선택된 목록에 추가하고 전체 목록에서 제거
      setSelectedCountries([...selectedCountries, country]);
      setCountries(
        countries.filter((c: Country) => c.name.common !== country.name.common)
      );
    } else {
      // 선택된 나라를 목록에서 제거하고 전체 목록에 다시 추가
      setSelectedCountries(
        selectedCountries.filter(
          (selectedCountry: Country) =>
            selectedCountry.name.common !== country.name.common
        )
      );
      setCountries([...countries, country]);
    }
  };

  return (
    <div>
      <h2 className="text-4xl font-bold">Favorite Countries</h2>
      <div className="selected-country-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {selectedCountries.map((country: Country) => {
          return (
            <CountryCard
              key={country.name.common}
              country={country}
              handleSelectCountry={handleSelectCountry}
            />
          );
        })}
      </div>
      <h2 className="text-4xl font-bold">Countries</h2>
      <div className="country-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {countries.map((country: Country) => {
          return (
            <CountryCard
              key={country.name.common}
              country={country}
              handleSelectCountry={handleSelectCountry}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CountryList;
