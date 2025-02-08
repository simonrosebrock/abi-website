"use server";

import { NextRequest, NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";

async function GET(req: NextRequest) {
  noStore()
  const imageUrl = new URL(req.url).searchParams.get('url')
  if (typeof imageUrl !== 'string') {
    return NextResponse.json(
      { value: "Invalid image URL" },
      { status: 400, }
    );
  }

  const res = await fetch(`http://homeapp.webredirect.org:4000${imageUrl}`, {
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

export { GET };