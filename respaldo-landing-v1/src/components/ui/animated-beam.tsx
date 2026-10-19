"use client";

/**
 * Animated Beam, de Magic UI vía 21st.dev (@dillionverma/animated-beam).
 * Adaptado: el gradiente se anima con SMIL nativo en vez de framer-motion (≈65 KB menos de JS
 * en móvil), refs de React 19, duración fija (sin Math.random en render), eje vertical
 * para móvil y respeto a prefers-reduced-motion.
 */

import { type RefObject, useEffect, useId, useState } from "react";
import { cn } from "@/lib/utils";

function useReducirMovimiento() {
  const [reducir, setReducir] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const actualizar = () => setReducir(mq.matches);
    actualizar();
    mq.addEventListener("change", actualizar);
    return () => mq.removeEventListener("change", actualizar);
  }, []);
  return reducir;
}

export interface AnimatedBeamProps {
  className?: string;
  containerRef: RefObject<HTMLElement | null>;
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  curvature?: number;
  reverse?: boolean;
  /** Eje en que viaja el brillo: "vertical" para flujos apilados (móvil). */
  vertical?: boolean;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  delay?: number;
  duration?: number;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
}

export function AnimatedBeam({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  vertical = false,
  duration = 4,
  delay = 0,
  pathColor = "#94a3b8",
  pathWidth = 2,
  pathOpacity = 0.25,
  gradientStartColor = "#14b8a6",
  gradientStopColor = "#3b63f5",
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}: AnimatedBeamProps) {
  const id = useId();
  const reducir = useReducirMovimiento();
  const [pathD, setPathD] = useState("");
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

  const avance = reverse ? { a: "90%;-10%", b: "100%;0%" } : { a: "10%;110%", b: "0%;100%" };
  const [eje1, eje2] = vertical ? ["y1", "y2"] : ["x1", "x2"];

  useEffect(() => {
    const updatePath = () => {
      if (!containerRef.current || !fromRef.current || !toRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const rectA = fromRef.current.getBoundingClientRect();
      const rectB = toRef.current.getBoundingClientRect();

      setSvgDimensions({ width: containerRect.width, height: containerRect.height });

      const startX = rectA.left - containerRect.left + rectA.width / 2 + startXOffset;
      const startY = rectA.top - containerRect.top + rectA.height / 2 + startYOffset;
      const endX = rectB.left - containerRect.left + rectB.width / 2 + endXOffset;
      const endY = rectB.top - containerRect.top + rectB.height / 2 + endYOffset;

      const controlY = startY - curvature;
      setPathD(`M ${startX},${startY} Q ${(startX + endX) / 2},${controlY} ${endX},${endY}`);
    };

    const resizeObserver = new ResizeObserver(updatePath);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    updatePath();

    return () => resizeObserver.disconnect();
  }, [containerRef, fromRef, toRef, curvature, startXOffset, startYOffset, endXOffset, endYOffset]);

  return (
    <svg
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn("pointer-events-none absolute top-0 left-0 transform-gpu stroke-2", className)}
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
    >
      <path d={pathD} stroke={pathColor} strokeWidth={pathWidth} strokeOpacity={pathOpacity} strokeLinecap="round" />
      {!reducir && (
        <>
          <path d={pathD} strokeWidth={pathWidth} stroke={`url(#${id})`} strokeOpacity="1" strokeLinecap="round" />
          <defs>
            <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="0%" x2="0%" y1="0%" y2="0%">
              {[
                [eje1, avance.a],
                [eje2, avance.b],
              ].map(([atributo, valores]) => (
                <animate
                  key={atributo}
                  attributeName={atributo}
                  values={valores}
                  dur={`${duration}s`}
                  begin={`${delay}s`}
                  repeatCount="indefinite"
                  calcMode="spline"
                  keyTimes="0;1"
                  keySplines="0.16 1 0.3 1"
                />
              ))}
              <stop stopColor={gradientStartColor} stopOpacity="0" />
              <stop stopColor={gradientStartColor} />
              <stop offset="32.5%" stopColor={gradientStopColor} />
              <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
            </linearGradient>
          </defs>
        </>
      )}
    </svg>
  );
}
