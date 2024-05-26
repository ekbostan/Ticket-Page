import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  try {
    const { data, error } = await supabase
      .from("Tickets")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching tickets:", error);
      return NextResponse.json(
        { error: "Failed to fetch tickets" },
        { status: 500 }
      );
    }

    if (data.length === 0) {
      return NextResponse.json(
        { message: "No tickets found" },
        { status: 404 }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("Error processing request:", err);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  try {
    const data = await request.json();
    const { name, email, description } = data;

    const { data: insertedData, error } = await supabase
      .from("Tickets")
      .insert([{ name, email, description, status: "pending" }]);

    if (error) {
      console.error("Error inserting ticket:", error);
      return NextResponse.json(
        { error: "Failed to submit ticket" },
        { status: 500 }
      );
    }

    return NextResponse.json(insertedData, { status: 201 });
  } catch (err) {
    console.error("Error processing request:", err);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
