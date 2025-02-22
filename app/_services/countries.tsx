export { fetchCountry, UpdateCountry };

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

const UpdateCountry = async (id: string, data: any) => {
  console.log(id)
  console.log(data)

  try {
    const res = await fetch(`/api/countries/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return res;
  } catch (error) {
    console.error("Error updating countries:", error);
  }
};
