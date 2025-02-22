import {
  createCountry,
  getAllCountries,
  getCountry,
} from "@/app/_helpers/server/countries_db";
import { NextRequest } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await createCountry(body);

    return Response.json(res);
  } catch (error: any) {
    return Response.json({ error: error.message });
  }
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const limit = searchParams.get("limit");
  const country = searchParams.get("country");

  let res;
  try {
    if (limit) {
      res = await getAllCountries(parseInt(limit));
    }
    if (country) {
      res = await getCountry(country);
    }

    return Response.json(res);
  } catch (error: any) {
    return Response.json({ error: error.message });
  }
}
