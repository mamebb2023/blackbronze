import { hexToRgbNormalized } from '@/lib/utils';
import createGlobe from 'cobe'
import { useEffect, useMemo, useRef } from 'react'

interface GlobeProps {
  baseColor?: string;
  markerColor?: string;
  glowColor?: string;
  arcColor?: string;
  markers?: { location: [number, number]; size?: number, color?: string }[];
  arcs?: { startLat: number; startLng: number; endLat: number; endLng: number, color?: string }[];
  size?: { height: number, width: number };
}

const Globe = (
  {
    size = { height: 500, width: 500 },
    baseColor = "#ffffff",
    markerColor = "#ff9bff",
    glowColor = "#ffffff",
    arcColor = "#ff9bff",
    markers = [],
    arcs = []
  }: GlobeProps) => {
  const updatedBaseColor = hexToRgbNormalized(baseColor)
  const updatedMarkerColor = hexToRgbNormalized(markerColor)
  const updatedGlowColor = hexToRgbNormalized(glowColor)
  const updatedArcColor = hexToRgbNormalized(arcColor)

  const canvasRef = useRef<HTMLCanvasElement>(null);
  // const globeRef = useRef<any>(null);
  // const phiRef = useRef(0);
  // const thetaRef = useRef(theta);
  // const isDragging = useRef(false);
  // const lastMouseX = useRef(0);
  // const lastMouseY = useRef(0);
  // const autoRotateSpeed = 0.003;

  // useEffect(() => {
  //   // Mouse handlers
  //   const canvas = canvasRef.current;
  //   if (!canvas) return;

  //   const onMouseDown = (e: MouseEvent) => {
  //     isDragging.current = true;
  //     lastMouseX.current = e.clientX;
  //     lastMouseY.current = e.clientY;
  //     canvas.style.cursor = "grabbing";
  //   };

  //   const onMouseMove = (e: MouseEvent) => {
  //     if (isDragging.current) {
  //       const deltaX = e.clientX - lastMouseX.current;
  //       const deltaY = e.clientY - lastMouseY.current;
  //       const rotationSpeed = 0.005;

  //       phiRef.current += deltaX * rotationSpeed;
  //       thetaRef.current = Math.max(
  //         -Math.PI / 2,
  //         Math.min(Math.PI / 2, thetaRef.current - deltaY * rotationSpeed)
  //       );

  //       lastMouseX.current = e.clientX;
  //       lastMouseY.current = e.clientY;
  //     }
  //   };

  //   const onMouseUp = () => {
  //     isDragging.current = false;
  //     canvas.style.cursor = "grab";
  //   };

  //   const onMouseLeave = () => {
  //     if (isDragging.current) {
  //       isDragging.current = false;
  //       canvas.style.cursor = "grab";
  //     }
  //   };

  //   // Initialize and attach listeners
  //   initGlobe();
  //   canvas.addEventListener("mousedown", onMouseDown);
  //   canvas.addEventListener("mousemove", onMouseMove);
  //   canvas.addEventListener("mouseup", onMouseUp);
  //   canvas.addEventListener("mouseleave", onMouseLeave);

  //   const handleResize = () => {
  //     initGlobe();
  //   };
  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //     if (canvas) {
  //       canvas.removeEventListener("mousedown", onMouseDown);
  //       canvas.removeEventListener("mousemove", onMouseMove);
  //       canvas.removeEventListener("mouseup", onMouseUp);
  //       canvas.removeEventListener("mouseleave", onMouseLeave);
  //     }
  //     if (globeRef.current) {
  //       globeRef.current.destroy();
  //       globeRef.current = null;
  //     }
  //   };
  // }, [])

  const normalizedMarkers = useMemo(() => {
    return markers.map((m) => ({
      location: m.location,
      size: m.size ?? 0.08,
    }));
  }, [markers]);

  const normalizedArcs = useMemo(() => {
    return arcs.map((a) => ({
      from: [a.startLat, a.startLng] as [number, number],
      to: [a.endLat, a.endLng] as [number, number],
    }));
  }, [arcs]);

  useEffect(() => {
    let canvas = document.getElementById("cobe") as HTMLCanvasElement
    if (!canvas) return

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: 1000,
      height: 1000,
      phi: 0.1,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      scale: 1,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: updatedBaseColor,
      markerColor: updatedMarkerColor,
      glowColor: updatedGlowColor,
      offset: [0, 0],
      markers: normalizedMarkers,
      arcs: normalizedArcs,
      arcColor: updatedArcColor,
      arcWidth: 0.5,
      arcHeight: 0.3,
      markerElevation: 0.02,
      // onRender: (state) => {
      //   state.phi = phi
      //   phi += 0.01
      // },
    })

    // Animate the globe
    let phi = 0
    function animate() {
      phi -= 0.005
      globe.update({ phi })
      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  return (
    <canvas
      id="cobe"
      ref={canvasRef}
      style={{ width: size.width, height: size.height }}
      width="1000"
      height="1000"
    />
  )
}

export default Globe;