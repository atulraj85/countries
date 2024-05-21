export { fetchCountry };

const fetchCountry = async (country: string) => {
  try {
    let url = "/api/countries/";
    // Append query parameters based on selected sorting option and search term
    let queryParams = [];

    queryParams.push(`country=${country}`);

    if (queryParams.length > 0) {
      url += `?${queryParams.join("&")}`;
    }

    const res = await fetch(url, {
      cache: "no-store",
    });
    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error fetching countries:", error);
  }
};
