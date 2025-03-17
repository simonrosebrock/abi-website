"use server";

import { NextRequest, NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";
import { getUsername, validToken } from "@/app/lib/getAuth";

async function GET(req: NextRequest) {
  const searchParams = new URL(req.url).searchParams;
  const imageUrl = searchParams.get('url') as string;
  const token = searchParams.get('token') as string;
  const quality = searchParams.get('quality') as string; // low | high

  if (imageUrl === "") {
    return NextResponse.json(
      { value: "No Url given" },
      { status: 400, }
    );
  }
  if (token === "") {
    return NextResponse.json(
      { value: "No Token given" },
      { status: 400, }
    );
  }

  if (!['low', 'high'].includes(quality)) {
    return NextResponse.json(
      { value: "Invalid Quality given" },
      { status: 400, }
    );
  }

  //authentication
  var hasAuth = false;
  if (token === "blacklisted") {
    hasAuth = true;
  } else if (await validToken(token!)) {
    const user = (await getUsername(token!) as string)
    if ((imageUrl.includes(user) && (imageUrl.includes("uploaded") || imageUrl.includes("deleted"))) || imageUrl.includes("verified")) {
      hasAuth = true;
    }
  }

  if (hasAuth) {
    const res = await fetch(`blacklisted/images/${imageUrl}`, {
      method: 'GET',
      headers: {
        'x-api-key': 'blacklisted',
        'quality': quality,
      }
    });
  
    const contentType = res.headers.get('Content-Type') || 'image/jpeg';
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
  return NextResponse.json(
    { value: "Access Denied" },
    { status: 403, }
  );
}

export { GET };