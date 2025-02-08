"use server";

import { NextRequest, NextResponse } from "next/server";

async function POST(req: NextRequest) {
    try {
        if (!req.headers.get("student")) {
            return NextResponse.json({ error: "No student name given" }, { status: 400 });
        }

        // Parse the form data
        const formData = await req.formData();
        console.log("formData", formData)
        const student = (req.headers.get("student") as string)

        const res = await fetch('http://homeapp.webredirect.org:4000/upload', {
            method: 'POST',
            body: formData,
            headers: {
                'x-api-key': 'your-secure-key',
                'folder-name': student,
            }
        });

        return NextResponse.json({ message: "Files uploaded successfully" });
    } catch (error) {
        console.error("Error handling file upload:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export { POST };