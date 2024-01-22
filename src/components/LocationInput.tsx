import React, { useMemo, useState } from "react";
import { Input } from "./ui/input";
import citiesList from "@/lib/cities-list";

interface LocationInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onLocationSelected: (location: string) => void;
}

export default React.forwardRef<HTMLInputElement, LocationInputProps>(
  function LocationInput({ onLocationSelected, ...props }, ref) {
    const [locationSearchInput, setLocationSearchInput] = useState("");
    const [focus, setFocus] = useState(false);

    // Find cities
    const cities = useMemo(() => {
      if (!locationSearchInput) return [];

      const searchWords = locationSearchInput.split(" ");

      const filteredCities = citiesList
        .map((city) => `${city.name} ${city.subcountry} ${city.country}`)
        .filter((city) => {
          return (
            city
              .toLocaleLowerCase()
              .startsWith(searchWords[0].toLocaleLowerCase()) &&
            searchWords.every((word) =>
              city.toLocaleLowerCase().includes(word.toLocaleLowerCase()),
            )
          );
        })
        .slice(0, 50);

      return filteredCities;
    }, [locationSearchInput]);

    return (
      <div className="relative">
        <Input
          {...props}
          ref={ref}
          placeholder="Search for a city"
          type="search"
          value={locationSearchInput}
          onChange={(e) => setLocationSearchInput(e.target.value)}
          onFocus={(e) => setFocus(true)}
          onBlur={(e) => setFocus(false)}
        />
        {locationSearchInput.trim() && focus && (
          <div className="absolute z-20 w-full divide-y rounded-b-lg border-x border-b bg-background shadow-xl">
            {!cities.length && <p className="p-3">No results found</p>}
            {cities?.map((city) => (
              <button
                key={city}
                className="block w-full p-2 text-start"
                onMouseDown={(e) => {
                  e.preventDefault();
                  onLocationSelected(city);
                  setLocationSearchInput("");
                }}
              >
                {city}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  },
);
