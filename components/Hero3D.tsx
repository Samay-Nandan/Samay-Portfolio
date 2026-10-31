"use client";

import { useEffect, useRef } from "react";
import type * as T from "three";

type Three = typeof import("three");

// Floating dark blocks lit by a warm orb. The scene leans toward the mouse.
// Three.js is loaded after the page paints so it never blocks first render.
export default function Hero3D() {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    import("three").then((THREE) => {
      if (!cancelled && mount.current) cleanup = start(THREE, mount.current);
    });
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return <div ref={mount} className="hero3d" aria-hidden="true" />;
}

function start(THREE: Three, el: HTMLDivElement) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const small = el.clientWidth < 700;
  const dpr = window.devicePixelRatio || 1;

  // Antialiasing only on low-density screens; high-DPR screens don't need it and it's the costliest setting.
  const renderer = new THREE.WebGLRenderer({ antialias: dpr < 1.5, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(dpr, small ? 1 : 1.25));
  renderer.setSize(el.clientWidth, el.clientHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.domElement.style.opacity = "0";
  renderer.domElement.style.transition = "opacity 1.2s ease";
  el.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x15171c, 9, 24);

  const camera = new THREE.PerspectiveCamera(38, el.clientWidth / el.clientHeight, 0.1, 100);
  camera.position.set(0, 0, small ? 16 : 13);

  scene.add(new THREE.HemisphereLight(0x5a6a8a, 0x0b0c10, 0.6));
  const rim = new THREE.DirectionalLight(0x5ad4e6, 1.1);
  rim.position.set(-8, 4, -4);
  scene.add(rim);

  // The orb: a bright core, a soft sprite halo and the light that does the real work.
  const orb = new THREE.Group();
  const coreMat = new THREE.MeshBasicMaterial({ color: 0xfff4e8, toneMapped: false });
  orb.add(new THREE.Mesh(new THREE.SphereGeometry(0.36, 24, 24), coreMat));
  const haloCanvas = document.createElement("canvas");
  haloCanvas.width = haloCanvas.height = 128;
  const ctx = haloCanvas.getContext("2d")!;
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, "rgba(255,230,200,1)");
  g.addColorStop(0.18, "rgba(255,170,110,0.85)");
  g.addColorStop(0.45, "rgba(255,120,60,0.3)");
  g.addColorStop(1, "rgba(255,90,40,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  const haloTex = new THREE.CanvasTexture(haloCanvas);
  const haloMat = new THREE.SpriteMaterial({ map: haloTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false });
  const halo = new THREE.Sprite(haloMat);
  halo.scale.setScalar(5.5);
  orb.add(halo);
  orb.add(new THREE.PointLight(0xff8a3d, 90, 0, 1.7));
  orb.position.set(0.9, 2.1, 1.6);
  scene.add(orb);

  const material = new THREE.MeshStandardMaterial({ color: 0x2b303b, roughness: 0.48, metalness: 0.25 });
  const accentMat = new THREE.MeshStandardMaterial({ color: 0x8b5cf6, roughness: 0.35, metalness: 0.3, emissive: 0x2a1460 });
  const cyanMat = new THREE.MeshStandardMaterial({ color: 0x1f6f7a, roughness: 0.4, metalness: 0.3, emissive: 0x0b2a30 });

  const shapes: { mesh: T.Mesh; spin: T.Vector3; bob: number; phase: number; baseY: number }[] = [];
  const add = (geo: T.BufferGeometry, mat: T.Material, pos: [number, number, number], rot: [number, number, number]) => {
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(...pos);
    mesh.rotation.set(...rot);
    scene.add(mesh);
    shapes.push({
      mesh,
      spin: new THREE.Vector3((Math.random() - 0.5) * 0.12, (Math.random() - 0.5) * 0.16, (Math.random() - 0.5) * 0.08),
      bob: 0.15 + Math.random() * 0.2,
      phase: Math.random() * Math.PI * 2,
      baseY: pos[1],
    });
  };

  const box = (s: number) => new THREE.BoxGeometry(s, s, s);
  add(box(2.4), material, [-2.6, 1.2, -1.5], [0.4, 0.6, 0.1]);
  add(box(3.0), material, [0.6, -0.2, -0.5], [0.6, 0.8, 0.2]);
  add(box(2.0), material, [3.4, -2.3, -2], [0.3, 0.2, 0.5]);
  add(new THREE.CylinderGeometry(0.55, 0.55, 2.2, 24), material, [2.4, 1.8, -1], [1.2, 0.3, 0.6]);
  add(new THREE.CylinderGeometry(0.45, 0.45, 1.8, 24), material, [-2.2, -2.4, -0.5], [0.4, 0.2, 1.1]);
  add(new THREE.OctahedronGeometry(0.6), accentMat, [-4.6, -0.6, 0.5], [0.3, 0.3, 0]);
  add(new THREE.TorusGeometry(0.55, 0.16, 12, 40), cyanMat, [4.8, 1.2, 0.2], [0.8, 0.4, 0]);
  if (!small) {
    add(box(1.1), material, [-5.6, 2.6, -3], [0.2, 0.9, 0.3]);
    add(new THREE.IcosahedronGeometry(0.45), accentMat, [5.6, -0.4, -1.5], [0, 0, 0]);
  }

  const pointer = { x: 0, y: 0 };
  const onMove = (e: PointerEvent) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
  };
  window.addEventListener("pointermove", onMove, { passive: true });

  const resize = () => {
    renderer.setSize(el.clientWidth, el.clientHeight);
    camera.aspect = el.clientWidth / el.clientHeight;
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(el);

  // Stop rendering when the hero is scrolled away.
  let visible = true;
  const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
  io.observe(el);

  // Capped at ~40 fps: the motion is slow, so extra frames only cost battery.
  const FRAME = 1 / 40;
  const clock = new THREE.Clock();
  let t = 0;
  let acc = 0;
  let frame = 0;
  const tick = () => {
    frame = requestAnimationFrame(tick);
    const dt = Math.min(clock.getDelta(), 0.1);
    if (!visible) return;
    acc += dt;
    if (acc < FRAME) return;
    t += acc;
    for (const s of shapes) {
      s.mesh.rotation.x += s.spin.x * acc;
      s.mesh.rotation.y += s.spin.y * acc;
      s.mesh.rotation.z += s.spin.z * acc;
      s.mesh.position.y = s.baseY + Math.sin(t * 0.6 + s.phase) * s.bob;
    }
    orb.position.x = 0.9 + Math.sin(t * 0.35) * 0.6;
    orb.position.y = 2.1 + Math.cos(t * 0.5) * 0.25;
    camera.position.x += (pointer.x * 1.4 - camera.position.x) * 0.06;
    camera.position.y += (-pointer.y * 0.9 - camera.position.y) * 0.06;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
    acc = 0;
  };

  camera.lookAt(0, 0, 0);
  renderer.render(scene, camera);
  requestAnimationFrame(() => (renderer.domElement.style.opacity = "1"));
  if (!reduceMotion) tick();

  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("pointermove", onMove);
    ro.disconnect();
    io.disconnect();
    scene.traverse((o) => {
      if (o instanceof THREE.Mesh) o.geometry.dispose();
    });
    [material, accentMat, cyanMat, coreMat, haloMat].forEach((m) => m.dispose());
    haloTex.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
