"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useTexture } from "@react-three/drei";
import { type MotionValue } from "framer-motion";
import { Suspense, useLayoutEffect, useMemo, useRef } from "react";
import {
  Group,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  SRGBColorSpace,
} from "three";
import { KTX2Loader, type GLTF } from "three-stdlib";

const PHONE_URL = "/models/phone.glb";
const BASIS_PATH = "/basis/";
/** tevy model pivots at the bottom; lift so the body sits on origin. */
const PHONE_Y_CENTER = -0.075;

type PhoneCanvasProps = {
  progress: MotionValue<number>;
  portraitSrc: string;
  alt: string;
};

type PhoneGltf = GLTF & {
  scene: GLTF["scene"];
};

function usePhoneLoader() {
  const { gl } = useThree();
  const ktx2 = useMemo(() => {
    const loader = new KTX2Loader();
    loader.setTranscoderPath(BASIS_PATH);
    loader.detectSupport(gl);
    return loader;
  }, [gl]);

  return useGLTF(PHONE_URL, true, true, (loader) => {
    loader.setKTX2Loader(ktx2);
  }) as PhoneGltf;
}

function PhoneRig({
  progress,
  portraitSrc,
}: {
  progress: MotionValue<number>;
  portraitSrc: string;
}) {
  const spin = useRef<Group>(null);
  const pop = useRef<Mesh>(null);
  const { scene } = usePhoneLoader();
  const portrait = useTexture(portraitSrc);
  const cloned = useMemo(() => scene.clone(true), [scene]);

  useLayoutEffect(() => {
    portrait.colorSpace = SRGBColorSpace;
    // PNG uploads default upright; flipY true matches Three's texture convention.
    portrait.flipY = true;
    portrait.needsUpdate = true;

    const screen = cloned.getObjectByName("screen");
    if (screen instanceof Mesh) {
      screen.material = new MeshBasicMaterial({
        map: portrait,
        toneMapped: false,
      });
    }
  }, [cloned, portrait]);

  useFrame(() => {
    const p = progress.get();
    const root = spin.current;
    if (!root) return;

    // Screen faces +Z. Y spin: back (180°) → front (360°) → back (540°).
    root.rotation.y = MathUtils.degToRad(180 + p * 360);
    root.rotation.x = MathUtils.degToRad(
      p < 0.5 ? 18 - p * 12 : 12 + (p - 0.5) * 12,
    );
    root.scale.setScalar(0.88 + Math.sin(p * Math.PI) * 0.12);

    const popMesh = pop.current;
    if (!popMesh) return;
    const front = 1 - Math.min(1, Math.abs(p - 0.5) / 0.18);
    const mat = popMesh.material as MeshBasicMaterial;
    mat.opacity = Math.max(0, front);
    popMesh.position.z = 0.01 + front * 0.04;
    popMesh.scale.setScalar(0.95 + front * 0.18);
    popMesh.visible = front > 0.02;
  });

  return (
    <group rotation={[0, 0, MathUtils.degToRad(-22)]}>
      <group ref={spin}>
        <group position={[0, PHONE_Y_CENTER, 0]}>
          <primitive object={cloned} />
          <mesh ref={pop} position={[0, 0.075, 0.01]} visible={false}>
            <planeGeometry args={[0.058, 0.12]} />
            <meshBasicMaterial
              map={portrait}
              transparent
              opacity={0}
              toneMapped={false}
              depthWrite={false}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.75} />
      <directionalLight position={[2.5, 3.5, 2.2]} intensity={1.7} />
      <directionalLight
        position={[-2.2, 1.2, -1.4]}
        intensity={0.55}
        color="#d4af37"
      />
      <directionalLight position={[0, -1.5, 2]} intensity={0.35} />
    </>
  );
}

export function PhoneCanvas({ progress, portraitSrc, alt }: PhoneCanvasProps) {
  return (
    <div
      className="relative h-[28rem] w-[20rem] sm:h-[32rem] sm:w-[24rem]"
      role="img"
      aria-label={alt}
    >
      <Canvas
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0, 0.4], fov: 32, near: 0.01, far: 4 }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Lights />
          <PhoneRig progress={progress} portraitSrc={portraitSrc} />
        </Suspense>
      </Canvas>
    </div>
  );
}
