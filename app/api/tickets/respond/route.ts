import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  if (request.method !== "POST") {
    return new NextResponse("Method Not Allowed", { status: 405 });
  }

  const data = await request.json();
  const { id, response, status } = data;

  if (!id || !response || !status) {
    return new NextResponse(
      JSON.stringify({ error: "Missing required fields" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const { data: updatedData, error } = await supabase
    .from("Tickets")
    .update({ status })
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error updating ticket:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to update ticket" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  return new NextResponse(JSON.stringify(updatedData), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
