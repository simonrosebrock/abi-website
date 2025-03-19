"use server";

import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";
import { validToken, getUsername } from "@/app/lib/getAuth";
import { deleteBlobs } from "@/app/lib/blobHandling";

async function POST(req: NextRequest) {
    try {
        const searchParams = new URL(req.url).searchParams;
        const token = searchParams.get('token') as string;
        const filename = searchParams.get('filename') as string;
        if (token === "") {
            return NextResponse.json({ error: "No token given" }, { status: 400 });
        }

        if (token === "blacklisted") {
            if (!req.body) {
                return NextResponse.json({ error: "No file given" }, { status: 400 });
            }
            if (filename === "") {
                return NextResponse.json({ error: "No filename given" }, { status: 400 });
            }

            deleteBlobs(filename)
            
            const file = req.body
            const contentType = req.headers.get('content-type') || 'text/plain'

            const blob = await put(filename, file, {
                contentType,
                access: 'public',
            })

            return NextResponse.json({ message: "Files uploaded successfully" }, {status: 200});
        }
        return NextResponse.json({ error: "Access Denied" }, { status: 403 });

        
    } catch (error) {
        console.error("Error handling file upload:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export { POST };