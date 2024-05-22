// pages/api/tickets.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  if (request.method !== 'POST') {
    return new NextResponse("Method Not Allowed", { status: 405 });
  }

  const data = await request.json();
  const { name, email, description } = data;

  const { data: insertedData, error } = await supabase
    .from("Tickets")
    .insert([
      { name, email, description, status: "pending"}
    ]);

  if (error) {
    console.error('Error inserting ticket:', error);
    return new NextResponse(JSON.stringify({ error: "Failed to submit ticket" }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  return new NextResponse(JSON.stringify(insertedData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
