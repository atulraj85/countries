"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import Form from "@/app/_components/country/form";
import EntityDetails from "@/app/_components/country/country";
import { createFormData } from "@/app/_helpers/client/formData";
import { fetchCountry } from "@/app/_services/countries";
import { useCountryService } from "@/app/_services/useCountryService";

type Country = {
  country: string;
};

const Page = () => {
  const [countries, setCountries] = useState<Country[]>();
  const [formFill, setFormFill] = useState<any>(null);
  const [formData, setFormData] = useState<{ country: string }>({
    country: "",
  });
  const [countryDetails, setCountryDetails] = useState(null);

  const countryService = useCountryService();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch(`/api/countries/names`, {
          cache: "no-store",
        });
        const data = await res.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { country } = formData;
    const data: any = await fetchCountry(country);
    setCountryDetails(data);
    const formed = createFormData(data);

    setFormFill(formed);
  };

  return (
    <ScrollArea className="h-full">
      <div className="flex mt-6 justify-center items-center">
        <Card className="mx-auto max-w-sm h-52">
          <CardHeader>
            <CardTitle className="text-2xl">Global Biz</CardTitle>
            <CardDescription>
              Select the country and start your business.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div>
                  {countries && countries.length > 0 ? (
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="block w-full px-4 py-2 text-black bg-white border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600  focus:border-blue-500 focus:ring-blue-500 focus:z-10 sm:text-sm"
                    >
                      <option value="">Select a country</option>
                      {countries.map((country) => (
                        <option key={country.country} value={country.country}>
                          {country.country}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      disabled
                      className="block w-full px-4 py-2 text-black bg-white border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600  focus:border-blue-500 focus:ring-blue-500 focus:z-10 sm:text-sm"
                    >
                      <option value="">No countries available</option>
                    </select>
                  )}
                </div>

                <Button type="submit" className="w-full">
                  Start
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className=" justify-center items-center m-10">
        <Tabs defaultValue="view" className="space-y-4">
          <TabsList>
            <TabsTrigger value="view">View</TabsTrigger>
            <TabsTrigger value="edit">Edit</TabsTrigger>
          </TabsList>

          <TabsContent value="view" className="space-y-4">
            {countryDetails && <EntityDetails data={countryDetails} />}
          </TabsContent>
          <TabsContent value="edit" className="space-y-4">
            {formFill && <Form formData={countryDetails} form={formFill} />}{" "}
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
};

export default Page;

// Form.tsx
