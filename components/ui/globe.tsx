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
  const globeRef = useRef<any>(null);
  const animationFrameRef = useRef<number>(0);

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
    let canvas = canvasRef.current;
    if (!canvas) return;

    // Destroy existing globe instance
    if (globeRef.current) {
      globeRef.current.destroy();
    }

    const globe = createGlobe(canvas, {
      devicePixelRatio: 1.5, // Reduced from 2
      width: 700, // Reduced from 1000
      height: 700, // Reduced from 1000
      phi: 0.1,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      scale: 1,
      mapSamples: 8000, // Reduced from 16000
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
    });

    globeRef.current = globe;

    // Animate the globe with proper cleanup
    let phi = 0;
    function animate() {
      if (!globeRef.current) return;

      phi -= 0.005;
      globe.update({ phi });
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    animate();

    // Cleanup function
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (globeRef.current) {
        globeRef.current.destroy();
        globeRef.current = null;
      }
    };
  }, [updatedBaseColor, updatedMarkerColor, updatedGlowColor, updatedArcColor, normalizedMarkers, normalizedArcs]);

  return (
    <canvas
      id="cobe"
      ref={canvasRef}
      style={{ width: size.width, height: size.height }}
      width="700"
      height="700"
    />
  );
}

export default Globe;