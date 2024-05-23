
import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  if (!id) {
    return new NextResponse(JSON.stringify({ error: "Missing ticket ID" }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  const { data, error } = await supabase
    .from("Tickets")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error('Error fetching ticket:', error);
    return new NextResponse(JSON.stringify({ error: "Failed to fetch ticket" }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  if (data) {
    return new NextResponse(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      }
    });
  } else {
    return new NextResponse(JSON.stringify({ message: "Ticket not found" }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }
}
