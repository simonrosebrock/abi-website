"use server";

import { unstable_noStore as noStore } from "next/cache";
import {NextResponse, NextRequest } from "next/server";
import { validToken, getUsername } from "@/app/lib/getAuth";

async function GET(req: NextRequest) {
  noStore()
  const token = new URL(req.url).searchParams.get('token')

  if (token === "") {
    return NextResponse.json(
      { value: "No Token given" },
      { status: 400, }
    );
  }
  
  if (token === "5bb13aaf-462b-42e6-8060-d01c289b8ed5" || await validToken(token!)) {
    const res = await fetch(`http://homeapp.webredirect.org:4000/download`, {
      method: 'GET',
      headers: {
        'x-api-key': 'your-secure-key',
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