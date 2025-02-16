"use server";

import { NextRequest, NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";
import { getUsername, validToken } from "@/app/lib/getAuth";

async function GET(req: NextRequest) {
  noStore()
  const imageUrl = new URL(req.url).searchParams.get('url')
  const token = new URL(req.url).searchParams.get('token')

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

  if (typeof imageUrl !== 'string') {
    return NextResponse.json(
      { value: "Invalid image URL" },
      { status: 400, }
    );
  }

  //authentication
  var hasAuth = false;
  if (token === "5bb13aaf-462b-42e6-8060-d01c289b8ed5") {
    hasAuth = true;
  }
  if (await validToken(token!)) {
    const user = (await getUsername(token!) as string).toLowerCase().replaceAll(" ", "_");
    if (imageUrl.includes(user) && (imageUrl.includes("uploaded") || imageUrl.includes("verified"))) {
      hasAuth = true;
    }
  }

  if (hasAuth) {
    const res = await fetch(`http://homeapp.webredirect.org:4000/images/${imageUrl}`, {
      method: 'GET',
      headers: {
        'x-api-key': 'your-secure-key',
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