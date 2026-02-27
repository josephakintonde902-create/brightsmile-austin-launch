import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// ── Validation helpers ──────────────────────────────────────────────
function isValidEmail(email: string): boolean {
  return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email);
}

function sanitize(str: string): string {
  return str.trim().replace(/<[^>]*>/g, "");
}

// ── Email service ───────────────────────────────────────────────────
async function sendEmail(
  apiKey: string,
  from: string,
  to: string,
  subject: string,
  html: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to: [to], subject, html }),
    });
    if (!res.ok) {
      const body = await res.text();
      return { success: false, error: `Resend ${res.status}: ${body}` };
    }
    return { success: true };
  } catch (err) {
    return { success: false, error: String(err) };
  }
}

function buildPatientEmail(name: string, service: string, date: string, time: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f4f7fa;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fa;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#0e7490,#06b6d4);padding:32px 40px;text-align:center;">
            <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:700;letter-spacing:0.5px;">BrightSmile Dental Studio</h1>
            <p style="margin:6px 0 0;color:#cffafe;font-size:13px;letter-spacing:1px;text-transform:uppercase;">Your Smile, Our Priority</p>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:36px 40px 24px;">
            <p style="margin:0 0 18px;font-size:16px;color:#334155;">Dear <strong>${name}</strong>,</p>
            <p style="margin:0 0 24px;font-size:15px;color:#475569;line-height:1.7;">
              Thank you for choosing <strong>BrightSmile Dental Studio</strong>. Your appointment request has been securely recorded in our system.
            </p>
            <!-- Details card -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0fdfa;border-radius:10px;border:1px solid #ccfbf1;">
              <tr><td style="padding:24px 28px;">
                <p style="margin:0 0 14px;font-size:14px;font-weight:700;color:#0e7490;text-transform:uppercase;letter-spacing:0.5px;">Appointment Details</p>
                <table cellpadding="0" cellspacing="0" style="width:100%;">
                  <tr>
                    <td style="padding:6px 0;font-size:14px;color:#64748b;width:100px;">Service</td>
                    <td style="padding:6px 0;font-size:14px;color:#1e293b;font-weight:600;">${service}</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0;font-size:14px;color:#64748b;">Date</td>
                    <td style="padding:6px 0;font-size:14px;color:#1e293b;font-weight:600;">${date}</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0;font-size:14px;color:#64748b;">Time</td>
                    <td style="padding:6px 0;font-size:14px;color:#1e293b;font-weight:600;">${time}</td>
                  </tr>
                </table>
              </td></tr>
            </table>
            <p style="margin:24px 0 0;font-size:15px;color:#475569;line-height:1.7;">
              Our team will review your request and contact you shortly to confirm your visit.
            </p>
          </td>
        </tr>
        <!-- Contact -->
        <tr>
          <td style="padding:0 40px 32px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e2e8f0;padding-top:20px;">
              <tr><td>
                <p style="margin:0 0 4px;font-size:13px;color:#94a3b8;">Need to reach us?</p>
                <p style="margin:0;font-size:14px;color:#334155;">📞 (555) 123-4567 &nbsp;|&nbsp; ✉️ info@brightsmile.com</p>
              </td></tr>
            </table>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#f8fafc;padding:20px 40px;text-align:center;border-top:1px solid #e2e8f0;">
            <p style="margin:0;font-size:12px;color:#94a3b8;">BrightSmile Dental Studio · 123 Smile Avenue, Suite 100</p>
            <p style="margin:4px 0 0;font-size:12px;color:#94a3b8;">© ${new Date().getFullYear()} All rights reserved</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function buildAdminEmail(
  name: string,
  service: string,
  date: string,
  time: string,
  phone: string,
  email: string
): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f4f7fa;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fa;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.06);">
        <tr>
          <td style="background:#0e7490;padding:20px 32px;">
            <h2 style="margin:0;color:#fff;font-size:18px;">🦷 New Appointment Request</h2>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 32px;">
            <table cellpadding="0" cellspacing="0" style="width:100%;font-size:14px;">
              <tr><td style="padding:6px 0;color:#64748b;width:120px;">Patient</td><td style="padding:6px 0;color:#1e293b;font-weight:600;">${name}</td></tr>
              <tr><td style="padding:6px 0;color:#64748b;">Email</td><td style="padding:6px 0;color:#1e293b;">${email}</td></tr>
              <tr><td style="padding:6px 0;color:#64748b;">Phone</td><td style="padding:6px 0;color:#1e293b;">${phone}</td></tr>
              <tr><td style="padding:6px 0;color:#64748b;">Service</td><td style="padding:6px 0;color:#1e293b;font-weight:600;">${service}</td></tr>
              <tr><td style="padding:6px 0;color:#64748b;">Date</td><td style="padding:6px 0;color:#1e293b;">${date}</td></tr>
              <tr><td style="padding:6px 0;color:#64748b;">Time</td><td style="padding:6px 0;color:#1e293b;">${time}</td></tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background:#f8fafc;padding:16px 32px;text-align:center;border-top:1px solid #e2e8f0;">
            <p style="margin:0;font-size:12px;color:#94a3b8;">BrightSmile Dental Studio – Admin Notification</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ── Main handler ────────────────────────────────────────────────────
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
    if (email && !isValidEmail(email)) errors.push("Invalid email format");

    if (errors.length > 0) {
      return new Response(
        JSON.stringify({ success: false, message: errors.join(", ") }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ── 1. Insert appointment ──────────────────────────────────────
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

    // ── 2. Send emails (non-blocking) ──────────────────────────────
    const resendKey = Deno.env.get("RESEND_API_KEY");
    const fromAddress = Deno.env.get("EMAIL_FROM_ADDRESS") || "noreply@brightsmile.com";
    const adminEmail = Deno.env.get("ADMIN_EMAIL");

    if (resendKey) {
      // Patient confirmation
      const patientResult = await sendEmail(
        resendKey,
        fromAddress,
        email,
        "Your Appointment Request – BrightSmile Dental Studio",
        buildPatientEmail(full_name, service, appointment_date, appointment_time)
      );
      if (!patientResult.success) {
        console.error("Patient email failed:", patientResult.error);
      }

      // Admin notification
      if (adminEmail) {
        const adminResult = await sendEmail(
          resendKey,
          fromAddress,
          adminEmail,
          "New Appointment Request Received",
          buildAdminEmail(full_name, service, appointment_date, appointment_time, phone, email)
        );
        if (!adminResult.success) {
          console.error("Admin email failed:", adminResult.error);
        }
      }
    } else {
      console.warn("RESEND_API_KEY not set – skipping email notifications");
    }

    // ── 3. Always return success ───────────────────────────────────
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
