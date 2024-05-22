import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase
    .from("Tickets")
    .select("*") 
    .order("created_at", { ascending: false });

  if (error) {
    console.error('Error fetching tickets:', error);
    return new NextResponse(JSON.stringify({ error: "Failed to fetch tickets" }), {
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
    return new NextResponse(JSON.stringify({ message: "No tickets found" }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }
}
