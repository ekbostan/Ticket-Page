import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import sgMail from "@sendgrid/mail";

export async function GET(request: NextRequest) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const url = new URL(request.url);
  const id = url.searchParams.get('id');


  if (!id) {
    return NextResponse.json({ error: "Missing ticket ID" }, { status: 400 });
  }
  
  const { data, error } = await supabase
    .from("Tickets")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error('Error fetching ticket:', error);
    return NextResponse.json({ error: "Failed to fetch ticket" }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ message: "Ticket not found" }, { status: 404 });
  }

  return NextResponse.json(data, { status: 200 });
}

export async function POST(request: NextRequest) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: "Missing ticket ID" }, { status: 400 });
  }

  try {
    const { response, status } = await request.json();

    if (!response || !status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { data: updatedData, error: updateError } = await supabase
      .from("Tickets")
      .update({ status })
      .eq("id", id)
      .single();

    if (updateError) {
      console.error("Error updating ticket:", updateError);
      return NextResponse.json({ error: "Failed to update ticket" }, { status: 500 });
    }

    const { data: ticketData, error: fetchError } = await supabase
      .from("Tickets")
      .select("email")
      .eq("id", id)
      .single();

    if (fetchError || !ticketData) {
      console.error("Error fetching ticket email:", fetchError);
      return NextResponse.json({ error: "Failed to fetch ticket email" }, { status: 500 });
    }

    const recipientEmail = ticketData.email;

    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("SendGrid API key is missing");
    }
    sgMail.setApiKey(apiKey);

    const msg = {
      to: recipientEmail,
      from: 'erolkaanbostan2000@gmail.com',
      subject: `Ticket #${id} Status Updated`,
      text: `The status of ticket #${id} has been updated to ${status}. Response: ${response}.`,
      html: `<p>The status of ticket #${id} has been updated to <strong>${status}</strong>.</p><p>Response: ${response}</p>`,
    };

    try {
      await sgMail.send(msg);
      console.log('Email sent to', recipientEmail);
    } catch (emailError:any) {
      console.error('Error sending email:', emailError.response ? emailError.response.body : emailError.message);
      return NextResponse.json({ error: "Failed to send email notification" }, { status: 500 });
    }

    return NextResponse.json(updatedData, { status: 200 });

  } catch (err) {
    console.error("Error processing request:", err);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}