import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  let result;
  let mode;

  const origin = request.headers.get("origin");

  console.log(origin);

  try {
    const data = await request.formData();
    result = Object.fromEntries(data);

    mode = "formData";
  } catch (ex) {
    console.log("Couldn't parse form data, trying json...");
    try {
      const data = await request.json();
      result = data;
      mode = "json";
    } catch (ex) {
      return Response.json(
        {
          error: "Couldn't parse form data or json",
        },
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": origin ?? "*",
          },
        }
      );
    }
  }

  const cookiesList = cookies();

  return Response.json(
    {
      payload: result,
      cookies: cookiesList.getAll().reduce((acc, curr) => {
        return {
          ...acc,
          [curr.name]: curr.value,
        };
      }, {}),
      mode,
    },
    {
      headers: {
        "Access-Control-Allow-Origin": origin ?? "*",
      },
    }
  );
}
