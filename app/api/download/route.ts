"use server";

import { unstable_noStore as noStore } from "next/cache";
import {NextResponse, NextRequest } from "next/server";
import { validToken } from "@/app/lib/getAuth";

const serverUrl = process.env.SERVER_URL as string;
const apiKey = process.env.API_KEY as string;

async function GET(req: NextRequest) {
  noStore()
  const token = new URL(req.url).searchParams.get('token')

  if (token === "") {
    return NextResponse.json(
      { value: "No Token given" },
      { status: 400, }
    );
  }
  
  if (await validToken(token!)) {
    const res = await fetch(`${serverUrl}/download`, {
      method: 'GET',
      headers: {
        'x-api-key': apiKey,
      }
    });
  
    const contentType = res.headers.get('Content-Type') || 'application/zip';
    const body = res.body;
    
    try {
      return new NextResponse(body, {
        status: 200,
        headers: {
          'Content-Type': contentType,
        }
      }
      );
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message },
        { status: 500, }
      );
    }
  }
}

export { GET };