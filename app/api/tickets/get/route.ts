import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  const { data, error } = await supabase
    .from("Tickets")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching tickets:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch tickets" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  if (data) {
    return new NextResponse(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else {
    return new NextResponse(JSON.stringify({ message: "No tickets found" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
