"use client";
import { useFetch } from "../_helpers/client";
import { useState } from "react";

export { useCountryService };

// user state store
const initialState = {
  countries: undefined,
  country: undefined,
};

function useCountryService(): ICountryService {
  const fetch = useFetch();
  const [countries, setCountries] = useState<any>([]);
  const [countryDetails, setCountryDetails] = useState<any>();

  return {
    countries,
    countryDetails,
    fetchCountry: async (country) => {
      try {
        let url = "/api/countries/";
        // Append query parameters based on selected sorting option and search term
        let queryParams = [];

        queryParams.push(`country=${country}`);

        if (queryParams.length > 0) {
          url += `?${queryParams.join("&")}`;
        }

        const res = await fetch.post(url);
        const data = await res.json();
        setCountryDetails(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    },

    getAllCountry: async () => {
      try {
        const res = await fetch(`/api/countries/names`, {
          cache: "no-store",
        });
        const data = await res.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    },
  };
}

interface ICountryService {
  countryDetails: {};
  countries: [];
  fetchCountry: (country: string) => Promise<void>;
  getAllCountry: () => Promise<void>;
}
