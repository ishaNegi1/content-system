import { NextRequest, NextResponse } from "next/server";
import { sanityClient } from "@/lib/sanity";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { title, description } = body;

    if (!title?.trim() || !description?.trim()) {
      return NextResponse.json(
        {
          message: "Title and description are required.",
        },
        {
          status: 400,
        }
      );
    }

    const document = await sanityClient.create({
      _type: "content",
      title: title.trim(),
      description: description.trim(),
      published: true,
    });

    // Trigger revalidation on the content website
    const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL;
    if (websiteUrl) {
      try {
        await fetch(`${websiteUrl}/api/revalidate`, {
          method: "POST",
        });
      } catch (revalidateError) {
        console.error("Revalidation failed:", revalidateError);
      }
    }

    return NextResponse.json({
      success: true,
      id: document._id,
    });
  } catch (error) {
    console.error("Publish error:", error);

    return NextResponse.json(
      {
        message: "Failed to publish content.",
      },
      {
        status: 500,
      }
    );
  }
}