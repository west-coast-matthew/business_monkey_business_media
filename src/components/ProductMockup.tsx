'use client';

import { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { useTexture, OrthographicCamera } from '@react-three/drei';
import * as THREE from 'three';
import type { ProductType } from '@/types';

// ─── T-shirt silhouette shape ─────────────────────────────────────────────────

function createShirtShape(): THREE.Shape {
  const s = new THREE.Shape();

  // Collar (small V-neck, centred)
  s.moveTo(-0.22, 0.9);
  s.bezierCurveTo(-0.1, 0.68, 0.1, 0.68, 0.22, 0.9);

  // Right collar → right shoulder
  s.lineTo(0.52, 0.96);

  // Right sleeve top edge
  s.bezierCurveTo(0.72, 0.93, 1.0, 0.86, 1.28, 0.78);

  // Right sleeve cuff
  s.lineTo(1.32, 0.54);

  // Right underarm → right body
  s.bezierCurveTo(1.08, 0.62, 0.82, 0.67, 0.56, 0.65);

  // Right body down to hem
  s.lineTo(0.52, -1.26);

  // Hem (straight)
  s.lineTo(-0.52, -1.26);

  // Left body up to underarm
  s.lineTo(-0.56, 0.65);

  // Left underarm → left sleeve cuff
  s.bezierCurveTo(-0.82, 0.67, -1.08, 0.62, -1.32, 0.54);

  // Left sleeve cuff → left sleeve top
  s.lineTo(-1.28, 0.78);

  // Left sleeve → left shoulder → left collar
  s.bezierCurveTo(-1.0, 0.86, -0.72, 0.93, -0.52, 0.96);
  s.lineTo(-0.22, 0.9);

  return s;
}

// ─── Color map ────────────────────────────────────────────────────────────────

const COLOR_MAP: Record<string, string> = {
  White: '#F7F5F0',
  'Heather Grey': '#AEAAA5',
  Black: '#1C1C1C',
  Charcoal: '#3E3D3C',
  Mauve: '#C48B90',
  'Dusty Rose': '#D49590',
  Cream: '#EDE8DC',
  'Vintage White': '#EAE6DA',
  Sage: '#8FAF8C',
  Ivory: '#F0EDE4',
  Lavender: '#B8A8CA',
  'Soft Pink': '#E8B4B8',
  'Military Green': '#4B5340',
  Sand: '#C8B898',
  'Washed Black': '#2E2C2A',
  Olive: '#6B7040',
  Rust: '#A84030',
  'Desert Tan': '#C8A878',
  'Slate Blue': '#607285',
};

function resolveColor(name?: string): string {
  return name ? (COLOR_MAP[name] ?? '#E0DDD6') : '#E0DDD6';
}

// ─── Shirt scene ──────────────────────────────────────────────────────────────

function ShirtScene({ imageUrl, color }: { imageUrl: string; color?: string }) {
  const shape = useMemo(createShirtShape, []);
  const geometry = useMemo(() => new THREE.ShapeGeometry(shape, 48), [shape]);
  const shirtColor = resolveColor(color);

  // Edge-darken plane: a slightly smaller, darker copy behind the shirt edge
  const edgeColor = useMemo(() => {
    const c = new THREE.Color(shirtColor);
    c.multiplyScalar(0.82);
    return '#' + c.getHexString();
  }, [shirtColor]);

  const tex = useTexture(imageUrl);
  useMemo(() => { tex.colorSpace = THREE.SRGBColorSpace; }, [tex]);

  return (
    <>
      {/* Subtle shadow/depth plane slightly behind */}
      <mesh geometry={geometry} position={[0.018, -0.018, -0.004]}>
        <meshBasicMaterial color="#00000033" transparent opacity={0.18} />
      </mesh>

      {/* Edge darkening — offset copy for a folded-fabric feel */}
      <mesh geometry={geometry} position={[0, 0, -0.002]}>
        <meshStandardMaterial color={edgeColor} roughness={1} metalness={0} />
      </mesh>

      {/* Shirt body */}
      <mesh geometry={geometry}>
        <meshStandardMaterial color={shirtColor} roughness={0.96} metalness={0} />
      </mesh>

      {/* Printed graphic — chest-centre area */}
      <mesh position={[0, 0.1, 0.009]}>
        <planeGeometry args={[0.64, 0.64]} />
        <meshStandardMaterial
          map={tex}
          transparent
          opacity={0.91}
          roughness={0.88}
          metalness={0}
        />
      </mesh>
    </>
  );
}

// ─── Mug scene ────────────────────────────────────────────────────────────────

function MugScene({ imageUrl }: { imageUrl: string }) {
  const tex = useTexture(imageUrl);
  useMemo(() => { tex.colorSpace = THREE.SRGBColorSpace; }, [tex]);

  // Custom D-handle path in XY plane
  const handleShape = useMemo(() => {
    const outer = new THREE.Shape();
    // D from top-right to bottom-right (right side of mug)
    outer.moveTo(0, 0.32);
    outer.bezierCurveTo(0.52, 0.32, 0.52, -0.32, 0, -0.32);
    outer.lineTo(0, -0.24);
    outer.bezierCurveTo(0.36, -0.24, 0.36, 0.24, 0, 0.24);
    outer.lineTo(0, 0.32);
    return outer;
  }, []);

  const handleGeo = useMemo(
    () => new THREE.ShapeGeometry(handleShape, 32),
    [handleShape]
  );

  return (
    <>
      {/* Mug body */}
      <mesh>
        <cylinderGeometry args={[0.46, 0.42, 1.1, 56]} />
        <meshStandardMaterial color="#F5F3EE" roughness={0.22} metalness={0.04} />
      </mesh>

      {/* Mug top cap */}
      <mesh position={[0, 0.55, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.46, 48]} />
        <meshStandardMaterial color="#ECEAE4" roughness={0.25} metalness={0.04} />
      </mesh>

      {/* Mug bottom cap */}
      <mesh position={[0, -0.55, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.42, 48]} />
        <meshStandardMaterial color="#ECEAE4" roughness={0.25} />
      </mesh>

      {/* Graphic — flat plane sitting on the front face */}
      <mesh position={[0, 0.06, 0.43]}>
        <planeGeometry args={[0.58, 0.58]} />
        <meshStandardMaterial
          map={tex}
          transparent
          opacity={0.88}
          roughness={0.55}
          metalness={0}
        />
      </mesh>

      {/* Handle — flat D-shape in XY plane, offset to the right */}
      <mesh geometry={handleGeo} position={[0.46, 0, 0.0]}>
        <meshStandardMaterial color="#ECEAE4" roughness={0.25} side={THREE.DoubleSide} />
      </mesh>

      {/* Handle edge shadow */}
      <mesh geometry={handleGeo} position={[0.462, -0.01, -0.003]}>
        <meshBasicMaterial color="#00000022" transparent opacity={0.22} side={THREE.DoubleSide} />
      </mesh>
    </>
  );
}

// ─── Sticker scene ────────────────────────────────────────────────────────────

function StickerScene({ imageUrl }: { imageUrl: string }) {
  const tex = useTexture(imageUrl);
  useMemo(() => { tex.colorSpace = THREE.SRGBColorSpace; }, [tex]);

  return (
    <>
      {/* White backing */}
      <mesh position={[0, 0, -0.003]}>
        <planeGeometry args={[1.52, 1.52]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>
      {/* Print */}
      <mesh>
        <planeGeometry args={[1.48, 1.48]} />
        <meshStandardMaterial map={tex} roughness={0.35} transparent opacity={0.96} />
      </mesh>
      {/* Subtle peel-shadow on bottom-right */}
      <mesh position={[0.03, -0.03, -0.006]}>
        <planeGeometry args={[1.52, 1.52]} />
        <meshBasicMaterial color="#00000011" transparent opacity={0.12} />
      </mesh>
    </>
  );
}

// ─── Skeleton shown while texture loads ───────────────────────────────────────

function SceneSkeleton() {
  return (
    <mesh>
      <planeGeometry args={[2.8, 2.8]} />
      <meshBasicMaterial color="#E5E5E0" transparent opacity={0.6} />
    </mesh>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export interface ProductMockupProps {
  imageUrl: string;
  color?: string;
  productType: ProductType;
}

export function ProductMockup({ imageUrl, color, productType }: ProductMockupProps) {
  const isShirt = productType === 'tshirt' || productType === 'hoodie' || productType === 'sweatshirt';
  const isMug = productType === 'mug';

  return (
    <Canvas
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
      dpr={[1, 2]}
    >
      {isShirt && (
        // Orthographic: flat, no perspective distortion — suits a 2-D silhouette
        // Shift camera down slightly so collar clears the top edge
        <OrthographicCamera makeDefault position={[0, -0.08, 10]} zoom={148} />
      )}

      {isMug && (
        // Slight elevation so the top rim is visible — reads immediately as "mug"
        <OrthographicCamera makeDefault position={[0, 0.45, 10]} zoom={230} />
      )}

      {!isShirt && !isMug && (
        // Sticker — straight-on
        <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={185} />
      )}

      {/* Key light — upper-left, warm */}
      <directionalLight position={[-2, 5, 4]} intensity={1.05} />
      {/* Fill light — lower-right, cool */}
      <directionalLight position={[3, -1, 3]} intensity={0.28} color="#e8f0ff" />
      {/* Ambient — prevents pure-black shadows */}
      <ambientLight intensity={0.6} />

      <Suspense fallback={<SceneSkeleton />}>
        {isShirt && <ShirtScene imageUrl={imageUrl} color={color} />}
        {isMug && <MugScene imageUrl={imageUrl} />}
        {!isShirt && !isMug && <StickerScene imageUrl={imageUrl} />}
      </Suspense>
    </Canvas>
  );
}
