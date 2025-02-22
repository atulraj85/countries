import { apiHandler } from "@/app/_helpers/server/api";
import { updateCountry } from "@/app/_helpers/server/countries_db";
import { NextResponse } from "next/server";

// module.exports = apiHandler({
//   PUT: update,
// });

export async function PUT(req: Request, { params: { id } }: any) {
  const body = await req.json();
  console.log(body);
  console.log(id);
  const data = await updateCountry(id, body);
  return NextResponse.json(data);
}
