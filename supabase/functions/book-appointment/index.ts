import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

function isValidEmail(email: string): boolean {
  return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email);
}

function sanitize(str: string): string {
  return str.trim().replace(/<[^>]*>/g, "");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ success: false, message: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const body = await req.json();

    const full_name = sanitize(body.full_name || "");
    const email = sanitize(body.email || "");
    const phone = sanitize(body.phone || "");
    const service = sanitize(body.service || "");
    const appointment_date = sanitize(body.appointment_date || "");
    const appointment_time = sanitize(body.appointment_time || "");
    const notes = sanitize(body.notes || "");

    // Validate required fields
    const errors: string[] = [];
    if (!full_name) errors.push("Full name is required");
    if (!email) errors.push("Email is required");
    if (!phone) errors.push("Phone is required");
    if (!service) errors.push("Service is required");
    if (!appointment_date) errors.push("Appointment date is required");
    if (!appointment_time) errors.push("Appointment time is required");

    if (email && !isValidEmail(email)) {
      errors.push("Invalid email format");
    }

    if (errors.length > 0) {
      return new Response(
        JSON.stringify({ success: false, message: errors.join(", ") }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data, error } = await supabase
      .from("appointments")
      .insert({
        full_name,
        email,
        phone,
        service,
        appointment_date,
        appointment_time,
        notes: notes || null,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Database insert error:", error.message);
      return new Response(
        JSON.stringify({ success: false, message: "Unable to process appointment" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Appointment successfully recorded",
        appointment_id: data.id,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(
      JSON.stringify({ success: false, message: "Unable to process appointment" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
