import { getCountryNames } from "@/app/_helpers/server/countries_db";

export async function GET() {
  let res;
  try {
    res = await getCountryNames();
    return Response.json(res);
  } catch (error: any) {
    return Response.json({ error: error.message });
  }
}
