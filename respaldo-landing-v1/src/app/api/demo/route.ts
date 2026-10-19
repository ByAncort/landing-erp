import { z } from "zod";
import { solicitudDemoSchema } from "@/lib/demo-schema";

/**
 * Recibe las solicitudes de demo.
 * Reenvía cada solicitud a DEMO_WEBHOOK_URL (CRM, n8n, Make, Zapier, Slack, etc.).
 * [pendiente] definir el destino real de los leads.
 */
export async function POST(request: Request) {
  let cuerpo: unknown;
  try {
    cuerpo = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Solicitud inválida" }, { status: 400 });
  }

  const resultado = solicitudDemoSchema.safeParse(cuerpo);
  if (!resultado.success) {
    const errores = z.flattenError(resultado.error).fieldErrors;
    // Si solo falló el honeypot, respondemos ok para no darle pistas al bot.
    if (Object.keys(errores).length === 1 && errores.sitio) return Response.json({ ok: true });
    return Response.json({ ok: false, error: "Revisa los campos marcados", errores }, { status: 422 });
  }

  const { nombre, empresa, cargo, email, telefono, empleados, modulos } = resultado.data;
  const payload = {
    nombre,
    empresa,
    cargo,
    email,
    telefono,
    empleados,
    modulos,
    origen: "landing-necronet-erp",
    recibidoEn: new Date().toISOString(),
  };
  const webhook = process.env.DEMO_WEBHOOK_URL;

  if (!webhook) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[demo] Solicitud recibida (sin DEMO_WEBHOOK_URL configurado):", payload);
      return Response.json({ ok: true });
    }
    console.error("[demo] DEMO_WEBHOOK_URL no está configurado; la solicitud no se guardó.");
    return Response.json(
      { ok: false, error: "No pudimos registrar tu solicitud. Intenta de nuevo más tarde." },
      { status: 503 },
    );
  }

  try {
    const respuesta = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });
    if (!respuesta.ok) throw new Error(`Webhook respondió ${respuesta.status}`);
  } catch (error) {
    console.error("[demo] Error al reenviar la solicitud:", error);
    return Response.json(
      { ok: false, error: "No pudimos registrar tu solicitud. Intenta de nuevo en unos minutos." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
