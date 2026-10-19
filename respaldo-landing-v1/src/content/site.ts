/**
 * Todo el contenido de la landing vive aquí.
 *
 * Fuente: setup-landing-necronet-erp.md (mensajes y estructura) contrastado con
 * erp_modular/spec/modulos (estado real del producto al 2026-10).
 *
 * Regla de la spec: no se publica nada sin confirmar.
 * Cada ítem con `pendiente` describe qué falta:
 *   - en desarrollo (`npm run dev`) se muestra con la etiqueta "Por confirmar";
 *   - en producción (`npm run build`) se oculta.
 * Cuando esté listo, borra la propiedad `pendiente` y queda publicado.
 */

export const MOSTRAR_PENDIENTES = process.env.NODE_ENV !== "production";

export type Pendiente = { pendiente?: string };

export function visibles<T extends Pendiente>(items: readonly T[]): T[] {
  return items.filter((item) => !item.pendiente || MOSTRAR_PENDIENTES);
}

/* -------------------------------------------------------------------------- */
/* Sitio                                                                       */
/* -------------------------------------------------------------------------- */

export const site = {
  nombre: "Necronet ERP", // [pendiente] nombre definitivo del producto
  empresa: "Necronet",
  // [pendiente] dominio definitivo. Defínelo en NEXT_PUBLIC_SITE_URL.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://necronet.cl").replace(/\/$/, ""),
  // [pendiente] URL de agenda (Calendly, HubSpot, etc.). Si no se define, los CTA van al formulario.
  ctaUrl: process.env.NEXT_PUBLIC_CTA_URL ?? "#demo",
  ctaTexto: "Solicitar demo",
  locale: "es_CL",
  idioma: "es-CL",

  seo: {
    titulo: "Necronet ERP: ERP modular en la nube para empresas en Chile",
    descripcion:
      "ERP hecho en Chile: inventario por bodega, ventas, compras, contabilidad, libro de compras y ventas y propuesta de F29 en un solo sistema modular.",
    ogTitulo: "Necronet ERP: inventario, ventas, compras y contabilidad en un solo sistema",
    ogDescripcion:
      "ERP modular en la nube, hecho en Chile. Libro de compras y ventas, cuadratura con el RCV y propuesta de F29 incluidos.",
  },

  // [pendiente] datos legales y de contacto. Lo que quede en null no se muestra.
  legal: {
    razonSocial: null as string | null,
    rut: null as string | null,
    direccion: null as string | null,
  },
  contacto: {
    email: null as string | null,
    telefono: null as string | null,
  },
  redes: [] as { nombre: string; url: string }[],

  // Rutas de capturas reales en /public (p. ej. "/capturas/tablero.png").
  // Mientras sean null se muestra una vista esquemática sin cifras.
  capturas: {
    tablero: null as string | null,
    movimientos: null as string | null,
    transferencias: null as string | null,
    alertas: null as string | null,
  },
} as const;

/* -------------------------------------------------------------------------- */
/* Hero                                                                        */
/* -------------------------------------------------------------------------- */

export const hero = {
  titulo: "El ERP completo para empresas que crecieron más rápido que sus planillas.",
  // Cortes de línea del titular en el hero de escultura (escritorio).
  tituloLineas: "El ERP completo para empresas\nque crecieron más rápido\nque sus planillas.",
  // Escultura de partículas (21st.dev, liquid-sculpture-hero). Imágenes del autor del componente,
  // servidas desde el CDN de 21st.dev. [pendiente] copiarlas a /public o reemplazarlas por una imagen propia.
  escultura: {
    src: "https://cdn.21st.dev/assets/mirror/ae/ae8c3de9003460e59182e950ccd345f68f27f9d0e4808b64c92c962a4eca7120.webp",
    mobileSrc: "https://cdn.21st.dev/assets/mirror/b0/b0c8d8e5d64b8cec906a3b390e3dc7c9a5af08334bf0632873c601782cb4bc46.webp",
    alt: "Escultura abstracta de filamentos metálicos que se vuelve líquida al pasar el cursor",
    pista: "Pasa el cursor sobre la forma",
    pistaTactil: "Toca la forma",
    fondo: "necronet",
    // color plano del fondo de las imágenes; si cambias la imagen, cambia también este valor
    fondoImagen: "#EAE9E5",
  },
  subtitulo:
    "Controla tus bodegas, vende, compra y lleva la contabilidad y los impuestos del mes en un solo sistema. Activas los módulos que necesitas hoy y sumas los demás cuando crezcas.",
  secundario: { texto: "Ver qué incluye", href: "#modulos" },
  datos: [
    { titulo: "Inventario", texto: "Bodegas, sub-inventarios y alertas de stock bajo" },
    { titulo: "Contabilidad", texto: "Asientos automáticos desde cada factura y cada pago" },
    { titulo: "Impuestos", texto: "Libro de compras y ventas, RCV y propuesta de F29" },
    { titulo: "Indicadores", texto: "UF, UTM y dólar del Banco Central, cada mañana" },
  ],
};

/* -------------------------------------------------------------------------- */
/* Problema                                                                    */
/* -------------------------------------------------------------------------- */

export const problema = {
  titulo: "Cuando la empresa crece, las planillas dejan de alcanzar",
  dolores: [
    {
      titulo: "Varias bodegas y ninguna cifra confiable",
      texto: "Para saber cuánto queda en cada bodega, alguien tiene que ir a contar.",
    },
    {
      titulo: "Programas que no se hablan",
      texto:
        "Las ventas van en un sistema, la contabilidad en otro y el inventario en una planilla. Cada cierre de mes es un cruce manual.",
    },
    {
      titulo: "La misma venta digitada tres veces",
      texto: "En la factura, en el control de stock y en el libro contable. Cada copia es una oportunidad de error.",
    },
  ],
  cierre:
    "Y las alternativas tampoco calzan: un ERP corporativo es caro y lento de implementar, y el software local se quedó corto.",
};

/* -------------------------------------------------------------------------- */
/* Módulos                                                                     */
/* -------------------------------------------------------------------------- */

/** Módulos de negocio que se contratan por plan (spec: plataforma-saas.md). */
export type ModuloId = "inventario" | "ventas" | "compras" | "contabilidad";

export type Modulo = {
  id: ModuloId | "tablero";
  nombre: string;
  beneficio: string;
  detalle: string;
  alcance: string[];
  incluido?: boolean;
};

export const modulos: Modulo[] = [
  {
    id: "inventario",
    nombre: "Inventario",
    beneficio: "Qué hay, dónde está y qué se movió.",
    detalle:
      "Recepciones, despachos, mermas y ajustes, cada uno con su motivo. Cada bodega se divide en sub-inventarios y el stock se mueve entre ellos con historial.",
    alcance: ["Bodegas y sub-inventarios", "Transferencias", "Mermas y ajustes", "Alertas de stock bajo", "Importación desde Excel"],
  },
  {
    id: "ventas",
    nombre: "Ventas y facturación",
    beneficio: "Del presupuesto al cobro en un solo flujo.",
    detalle:
      "Cotizaciones que se envían por correo con PDF y, una vez aceptadas, se convierten en factura. Pagos parciales, notas de crédito y débito, y reportes por cliente y por producto.",
    alcance: ["Cotizaciones", "Facturación", "Notas de crédito y débito", "Pagos y cobranza", "Reportes de ventas"],
  },
  {
    id: "compras",
    nombre: "Compras",
    beneficio: "Control del gasto y del abastecimiento.",
    detalle:
      "Órdenes de compra que se envían al proveedor y, al recibirse, ingresan el stock. La factura del proveedor se crea desde la orden, con su folio y su derecho a crédito fiscal.",
    alcance: ["Proveedores", "Órdenes de compra", "Recepción", "Facturas de compra", "Pagos a proveedores"],
  },
  {
    id: "contabilidad",
    nombre: "Contabilidad e impuestos",
    beneficio: "La contabilidad al día, alimentada por la operación.",
    detalle:
      "Plan de cuentas propio y asientos que se generan al emitir facturas y registrar pagos. Libros, balances, cierre del ejercicio, proyección de caja y los impuestos del mes y del año.",
    alcance: ["Partida doble", "Libro diario y mayor", "Balance y estado de resultados", "Libro de compras y ventas", "Propuesta de F29", "Proyección de caja"],
  },
  {
    id: "tablero",
    nombre: "Tablero",
    beneficio: "Decisiones con datos del día, no con planillas del mes pasado.",
    detalle:
      "Ventas, compras, resultado, saldos por cobrar y por pagar y valor del inventario del período. Cada cifra lleva al módulo que la origina.",
    alcance: ["Ventas contra compras", "Cotizaciones por estado", "Cobranza por antigüedad", "Productos bajo el mínimo"],
    incluido: true,
  },
];

export const modulosContratables = modulos.filter((m): m is Modulo & { id: ModuloId } => m.id !== "tablero");

export const modulosSeccion = {
  titulo: "Módulos de inventario, ventas, compras y contabilidad",
  texto: "Cada plan se arma con los módulos que usa tu empresa. El tablero, los usuarios y la configuración vienen en todos.",
};

/* -------------------------------------------------------------------------- */
/* Inventario destacado                                                        */
/* -------------------------------------------------------------------------- */

export const inventario = {
  titulo: "Control de inventario por bodega y sub-inventario",
  texto:
    "Cada movimiento queda registrado con su producto, cantidad y motivo, y actualiza el stock en el momento. Las facturas de venta y las órdenes de compra recibidas generan sus despachos y recepciones sin que nadie las digite.",
  capacidades: [
    {
      titulo: "Bodegas y sub-inventarios",
      texto: "Divide cada bodega en zonas o estados del stock (Disponible, Cuarentena, Estante A) y ve cuántas unidades hay en cada uno.",
    },
    {
      titulo: "Transferencias",
      texto: "Mueve stock entre sub-inventarios en un solo paso. Quedan el usuario, la fecha, el motivo y la referencia.",
    },
    {
      titulo: "Mermas y ajustes",
      texto: "Registra lo vencido, dañado o extraviado, y los ajustes después de un conteo físico, siempre con motivo.",
    },
    {
      titulo: "Sin stock negativo",
      texto: "Si una factura dejaría un producto bajo cero, no se emite. El stock del sistema es el que hay en bodega.",
    },
    {
      titulo: "Alertas de stock bajo",
      texto: "Cuando una salida deja un producto bajo su mínimo, el sistema avisa a quien la registró.",
    },
  ],
  vistas: [
    { id: "movimientos", nombre: "Movimientos" },
    { id: "transferencias", nombre: "Transferencias" },
    { id: "alertas", nombre: "Stock bajo" },
  ] as const,
};

/* -------------------------------------------------------------------------- */
/* Todo conectado                                                              */
/* -------------------------------------------------------------------------- */

export const conectado = {
  titulo: "Qué pasa cuando emites una factura",
  texto:
    "Los módulos trabajan sobre los mismos datos. Una acción pone al día inventario, contabilidad e impuestos, y nadie vuelve a digitar lo mismo.",
  pasos: [
    { id: "cotizacion", titulo: "Cotización aceptada" },
    { id: "factura", titulo: "Factura de venta" },
    { id: "stock", titulo: "Despacho de inventario" },
    { id: "asiento", titulo: "Asiento contable" },
    { id: "libro", titulo: "Libro de ventas y F29" },
  ],
  efectos: [
    {
      accion: "Conviertes una cotización aceptada",
      resultado: "Se crea la factura en borrador con las mismas líneas, impuestos, moneda y plazo de pago.",
    },
    {
      accion: "Emites una factura de venta",
      resultado:
        "Se descuenta el stock de cada línea, se publica el asiento (Clientes contra Ventas e IVA débito) y la factura entra al libro de ventas del mes.",
    },
    {
      accion: "Marcas una orden de compra como recibida",
      resultado: "Cada línea ingresa al stock con la orden como referencia.",
    },
    {
      accion: "Emites la factura del proveedor",
      resultado: "Se publica el asiento de compra con el IVA crédito que corresponde al derecho a crédito indicado.",
    },
    {
      accion: "Registras un pago",
      resultado: "Se publica el asiento contra banco, se concilia con la factura y se actualiza el saldo por cobrar o por pagar.",
    },
    {
      accion: "Aceptas la propuesta de F29",
      resultado: "Se publica el asiento del mes y el período queda cerrado, para que nada cambie lo declarado.",
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* Inteligencia artificial                                                     */
/* -------------------------------------------------------------------------- */

export const ia = {
  titulo: "Inteligencia artificial donde ahorra digitación",
  texto: "La IA propone y una persona revisa. Nada se emite, se paga ni se contabiliza solo.",
  items: [
    {
      titulo: "Lectura de facturas",
      texto:
        "Sube el PDF o una foto de la factura del proveedor, incluso desde la cámara del teléfono. El sistema arma el borrador, busca al proveedor por su RUT y cruza cada línea con tu catálogo.",
      campos: ["Número", "Tipo de documento", "Fechas", "Moneda", "Plazo de pago", "Líneas"],
    },
    {
      titulo: "Comentarios sobre tus impuestos",
      texto:
        "En el panel contable, la IA comenta los cálculos que ya hizo el sistema y señala dónde hay montos en juego. No calcula impuestos ni agrega cifras propias.",
    },
    {
      titulo: "Tu asistente de IA conectado al ERP",
      texto:
        "Conecta Claude, ChatGPT u otro asistente compatible con MCP para preguntar por el stock bajo, la cobranza pendiente o el estado de resultados, y para dejar borradores de cotizaciones y órdenes de compra. Trabaja con los mismos permisos de tu usuario.",
      pendiente: "Servidor MCP implementado pero apagado (MCP_ENABLED=false). Activarlo exige publicar la versión 1.1 de los documentos legales",
    },
  ] satisfies ({ titulo: string; texto: string; campos?: string[] } & Pendiente)[],
};

/* -------------------------------------------------------------------------- */
/* Hecho para Chile                                                            */
/* -------------------------------------------------------------------------- */

export const chile = {
  titulo: "Contabilidad e impuestos para empresas chilenas",
  texto:
    "El módulo contable prepara lo que pide el SII cada mes y cada año a partir de lo que ya registraste. La declaración la presentas tú o tu contador; el sistema no envía nada por su cuenta.",
  items: [
    { titulo: "Libro de Compras y Ventas", texto: "Del período, en el formato que pide el SII y listo para exportar." },
    {
      titulo: "Cuadratura con el RCV",
      texto: "Cargas el registro que descargas del SII y ves qué compras no registraste, qué está solo en el ERP y qué difiere en monto.",
    },
    {
      titulo: "Propuesta de F29",
      texto: "IVA débito y crédito desde el libro, remanente del mes anterior reajustado por UTM y PPM según tu régimen.",
    },
    {
      titulo: "Renta anual",
      texto: "Renta líquida imponible, impuesto de primera categoría y proyección del F22, con el origen de cada línea.",
    },
    { titulo: "Activo fijo", texto: "Depreciación normal, acelerada o instantánea, con su asiento del ejercicio." },
    {
      titulo: "Régimen tributario",
      texto: "Pro Pyme General (14 D N°3), Pro Pyme Transparente (14 D N°8), Semi Integrado (14 A) y renta presunta.",
    },
    { titulo: "Indicadores económicos", texto: "UF, UTM, dólar observado, euro e IPC desde el Banco Central, actualizados cada mañana." },
    { titulo: "RUT en el SII", texto: "Al crear un cliente o proveedor, la razón social y los giros se traen desde el SII." },
    {
      titulo: "Facturación electrónica",
      texto: "Emisión de facturas, boletas y notas como documentos tributarios electrónicos ante el SII.",
      pendiente: "No implementado: faltan folios CAF, firma XML y envío al SII (facturacion.md)",
    },
  ] satisfies ({ titulo: string; texto: string } & Pendiente)[],
};

/* -------------------------------------------------------------------------- */
/* Implementación                                                              */
/* -------------------------------------------------------------------------- */

export const implementacion = {
  titulo: "Cómo se implementa",
  texto: "La implementación la hace el equipo de Necronet junto a tu empresa.",
  // [pendiente] plazo estimado, p. ej. "6 a 10 semanas". Si es null no se muestra.
  plazoEstimado: null as string | null,
  pasos: [
    {
      titulo: "Diagnóstico",
      texto: "Revisamos tus procesos, bodegas y sistemas actuales, y definimos qué módulos activar.",
    },
    {
      titulo: "Configuración",
      texto: "Datos de tu empresa, bodegas y sub-inventarios, roles y permisos, y tus formatos de cotización y factura.",
    },
    {
      titulo: "Carga de datos",
      texto: "Productos, clientes y proveedores desde Excel. Las fichas se completan con los datos del SII a partir del RUT.",
    },
    {
      titulo: "Puesta en marcha",
      texto: "Cada persona recibe su invitación por correo y empieza a operar con su rol.",
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* Precios                                                                     */
/* -------------------------------------------------------------------------- */

// [pendiente] precios públicos. Mientras tanto: cotización según módulos.
export const precios = {
  titulo: "Precio según módulos y uso",
  texto:
    "Cada plan define qué módulos incluye y cuántos usuarios, productos, clientes y bodegas admite. Marca los módulos que te interesan y te preparamos una cotización.",
  cta: "Cotizar estos módulos",
};

/* -------------------------------------------------------------------------- */
/* Confianza                                                                   */
/* -------------------------------------------------------------------------- */

export const confianza = {
  titulo: "Control de accesos y trazabilidad",
  items: [
    {
      titulo: "Cada empresa ve solo sus datos",
      texto: "Toda la información queda aislada por empresa. Ningún otro cliente del sistema puede consultarla.",
    },
    {
      titulo: "Roles y permisos por área",
      texto: "Defines qué puede ver, crear, editar, aprobar o exportar cada rol: ventas, bodega, contabilidad.",
    },
    {
      titulo: "Historial de cambios",
      texto: "Cada registro guarda quién lo creó o lo modificó, y todo ajuste de stock queda con su motivo.",
    },
    {
      titulo: "Tu historial disponible",
      texto: "Si la suscripción se suspende, tu equipo sigue entrando y consultando todo en modo lectura.",
    },
    {
      titulo: "Alojamiento y respaldos",
      texto: "Por definir: proveedor de nube, región y frecuencia de respaldos.",
      pendiente: "Definir y publicar alojamiento y política de respaldos",
    },
  ] satisfies ({ titulo: string; texto: string } & Pendiente)[],
};

/* -------------------------------------------------------------------------- */
/* FAQ                                                                         */
/* -------------------------------------------------------------------------- */

export const faq = {
  titulo: "Preguntas frecuentes",
  preguntas: [
    {
      pregunta: "¿Tengo que contratar todos los módulos?",
      respuesta:
        "No. El plan se arma con los módulos que usa tu empresa: inventario, ventas, compras o contabilidad. El tablero, los usuarios y la configuración vienen en todos.",
    },
    {
      pregunta: "¿Cómo cargo los datos que tengo hoy?",
      respuesta:
        "Productos, clientes y proveedores se importan desde Excel con una plantilla. Al crear un cliente o proveedor, la razón social y los giros se traen desde el SII con su RUT.",
    },
    {
      pregunta: "¿El sistema presenta el F29 por mí?",
      respuesta:
        "No. Prepara la propuesta de F29 a partir de tus documentos y, al aceptarla, contabiliza el mes. La declaración la presentas tú o tu contador.",
    },
    {
      pregunta: "¿Mi contador puede trabajar en el sistema?",
      respuesta:
        "Sí. Puedes crear un rol de contador con permisos sobre contabilidad e impuestos, sin acceso a lo que no le corresponde.",
    },
    {
      pregunta: "¿Puedo usar mis propios formatos de cotización y factura?",
      respuesta:
        "Sí. Subes tu plantilla en Word con los campos marcados y el sistema genera los PDF con tu formato. Si no subes una, usa la estándar.",
    },
    {
      pregunta: "¿Puedo vender o comprar en dólares o en UF?",
      respuesta:
        "Sí. Cada documento guarda la tasa del día que publica el Banco Central. La contabilidad y los libros se llevan en pesos con esa tasa.",
    },
    {
      pregunta: "¿Necesito instalar algo?",
      respuesta: "No. Necronet ERP funciona en la nube y se usa desde el navegador.",
    },
    {
      pregunta: "¿Qué pasa con mis datos si dejo de pagar?",
      respuesta: "La cuenta pasa a modo lectura: tu equipo sigue entrando y consultando todo el historial.",
    },
    {
      pregunta: "¿Emite facturas electrónicas ante el SII?",
      respuesta: "Por definir: hoy el timbraje electrónico (folios, firma y envío al SII) no está implementado.",
      pendiente: "Decidir cómo comunicarlo hasta que exista el timbraje",
    },
    {
      pregunta: "¿Cuánto demora la implementación?",
      respuesta: "Por definir: plazo estimado según módulos y volumen de datos.",
      pendiente: "Definir plazo estimado de implementación",
    },
    {
      pregunta: "¿Hay contrato mínimo o permanencia?",
      respuesta: "Por definir: condiciones de contrato y permanencia.",
      pendiente: "Definir condiciones comerciales",
    },
    {
      pregunta: "¿Qué soporte incluye?",
      respuesta: "Por definir: canales, horarios y tiempos de respuesta.",
      pendiente: "Definir soporte",
    },
  ] satisfies ({ pregunta: string; respuesta: string } & Pendiente)[],
};

/* -------------------------------------------------------------------------- */
/* Formulario                                                                  */
/* -------------------------------------------------------------------------- */

export const demo = {
  titulo: "Solicita una demo",
  texto:
    "Te mostramos el sistema con los módulos que te interesan y resolvemos tus dudas sobre implementación y precio. Completa el formulario y te escribimos para coordinar.",
  rangosEmpleados: ["1 a 10", "11 a 50", "51 a 200", "201 a 500", "Más de 500"] as const,
  aviso: "Usaremos estos datos solo para coordinar la demo.",
};
