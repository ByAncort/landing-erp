import { cacheLife } from "next/cache";

/** Con Cache Components, `new Date()` debe ir dentro de un ámbito cacheado. */
export async function AnioActual() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
