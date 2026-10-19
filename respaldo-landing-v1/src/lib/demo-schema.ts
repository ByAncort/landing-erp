import { z } from "zod";
import { demo, modulosContratables } from "@/content/site";

const ids = modulosContratables.map((m) => m.id) as [string, ...string[]];

const texto = (min: number, max: number, campo: string) =>
  z
    .string({ error: `Ingresa ${campo}` })
    .trim()
    .min(min, `Ingresa ${campo}`)
    .max(max, `Máximo ${max} caracteres`);

export const solicitudDemoSchema = z.object({
  nombre: texto(2, 120, "tu nombre"),
  empresa: texto(2, 160, "el nombre de tu empresa"),
  cargo: texto(2, 120, "tu cargo"),
  email: z.email("Ingresa un correo válido").max(200),
  telefono: z.string().trim().max(30, "Máximo 30 caracteres").optional().default(""),
  empleados: z.enum(demo.rangosEmpleados, { error: "Elige un rango" }),
  modulos: z.array(z.enum(ids)).max(ids.length).default([]),
  // Honeypot: los humanos no ven este campo.
  sitio: z.string().max(0).optional().default(""),
});

export type SolicitudDemo = z.infer<typeof solicitudDemoSchema>;
