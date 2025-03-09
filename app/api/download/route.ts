"use server";

import { unstable_noStore as noStore } from "next/cache";
import {NextResponse, NextRequest } from "next/server";
import { validToken } from "@/app/lib/getAuth";

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
    const res = await fetch(`blacklisted/download`, {
      method: 'GET',
      headers: {
        'x-api-key': 'blacklisted',
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