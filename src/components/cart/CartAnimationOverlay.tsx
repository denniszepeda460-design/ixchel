"use client";

import React, { useEffect, useState, useRef } from "react";
import { CartAnimationDetail } from "@/lib/cartAnimation";

interface FlyingCactusItem {
  id: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
}

interface FlowerParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  scale: number;
  rotation: number;
  rotSpeed: number;
  opacity: number;
  age: number;
}

interface CheckmarkBadge {
  id: number;
  x: number;
  y: number;
}

export default function CartAnimationOverlay() {
  const [flyingCacti, setFlyingCacti] = useState<FlyingCactusItem[]>([]);
  const [particles, setParticles] = useState<FlowerParticle[]>([]);
  const [checkmarks, setCheckmarks] = useState<CheckmarkBadge[]>([]);
  const particlesRef = useRef<FlowerParticle[]>([]);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const handleAddToCartEvent = (e: Event) => {
      const detail = (e as CustomEvent<CartAnimationDetail>).detail;
      const cartBtn = document.getElementById("navbar-cart-button");

      let targetX = window.innerWidth - 60;
      let targetY = 35;

      if (cartBtn) {
        const rect = cartBtn.getBoundingClientRect();
        targetX = rect.left + rect.width / 2;
        targetY = rect.top + rect.height / 2;

        // Apply bounce to cart button upon arrival (~930ms)
        setTimeout(() => {
          cartBtn.classList.remove("cart-bounce-pulse");
          void cartBtn.offsetWidth; // trigger reflow
          cartBtn.classList.add("cart-bounce-pulse");
          setTimeout(() => {
            cartBtn.classList.remove("cart-bounce-pulse");
          }, 600);
        }, 930);
      }

      const id = Date.now() + Math.random();
      const newCactus: FlyingCactusItem = {
        id,
        startX: detail.startX,
        startY: detail.startY,
        targetX,
        targetY,
      };

      setFlyingCacti((prev) => [...prev, newCactus]);

      // At 950ms: cactus lands in cart. Trigger checkmark and flower particles
      setTimeout(() => {
        // Remove this cactus from flying state
        setFlyingCacti((prev) => prev.filter((c) => c.id !== id));

        // Show checkmark near cart button
        const checkId = Date.now();
        setCheckmarks((prev) => [
          ...prev,
          { id: checkId, x: targetX, y: targetY + 28 },
        ]);
        setTimeout(() => {
          setCheckmarks((prev) => prev.filter((m) => m.id !== checkId));
        }, 1100);

        // Spawn pink cactus flower confetti particles (original arc & size, extended screen time)
        spawnFlowerConfetti(targetX, targetY);
      }, 950);
    };

    window.addEventListener("ixchel:add-to-cart", handleAddToCartEvent);
    return () => {
      window.removeEventListener("ixchel:add-to-cart", handleAddToCartEvent);
    };
  }, []);

  // Spawn flower confetti particles: original confetti burst arc and original size
  const spawnFlowerConfetti = (originX: number, originY: number) => {
    const quantity = 8;
    const newParticles: FlowerParticle[] = [];

    for (let i = 0; i < quantity; i++) {
      // Angles spreading upwards and outwards (-135 to -45 deg, confetti explosion from cart)
      const angleDeg = -135 + Math.random() * 90;
      const angleRad = (angleDeg * Math.PI) / 180;
      const speed = 70 + Math.random() * 50;

      newParticles.push({
        id: Date.now() + Math.random(),
        x: originX + (Math.random() * 12 - 6),
        y: originY + (Math.random() * 6 - 3),
        vx: Math.cos(angleRad) * speed * 0.05,
        vy: -Math.abs(Math.sin(angleRad) * speed * 0.05) - 1.5,
        scale: 0.6 + Math.random() * 0.5,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 8,
        opacity: 1,
        age: 0,
      });
    }

    particlesRef.current = [...particlesRef.current, ...newParticles];
    setParticles([...particlesRef.current]);

    if (!animFrameRef.current) {
      animateParticles();
    }
  };

  const animateParticles = () => {
    let active = false;
    const gravity = 0.12; // Original gravity

    particlesRef.current = particlesRef.current
      .map((p) => {
        const nextVy = p.vy + gravity;
        const nextX = p.x + p.vx;
        const nextY = p.y + nextVy;
        const nextRot = p.rotation + p.rotSpeed;
        const nextAge = p.age + 1;

        // Mantener opacas/visibles durante el arco ascendente y la caída (~38 fotogramas),
        // y después desvanecer gradualmente
        let nextOpacity = p.opacity;
        if (nextAge > 38) {
          nextOpacity = p.opacity - 0.025;
        }

        if (nextOpacity > 0) {
          active = true;
          return {
            ...p,
            x: nextX,
            y: nextY,
            vy: nextVy,
            rotation: nextRot,
            opacity: nextOpacity,
            age: nextAge,
          };
        }
        return null;
      })
      .filter(Boolean) as FlowerParticle[];

    setParticles([...particlesRef.current]);

    if (active && particlesRef.current.length > 0) {
      animFrameRef.current = requestAnimationFrame(animateParticles);
    } else {
      animFrameRef.current = null;
    }
  };

  return (
    <div
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
      aria-hidden="true"
    >
      {/* 1. Elemento que cae / vuela: Cactus hacia el carrito */}
      {flyingCacti.map((cactus) => {
        const dx = cactus.targetX - cactus.startX;
        const dy = cactus.targetY - cactus.startY;

        return (
          <div
            key={cactus.id}
            className="absolute top-0 left-0"
            style={
              {
                "--start-x": `${cactus.startX}px`,
                "--start-y": `${cactus.startY}px`,
                "--dx": `${dx}px`,
                "--dy": `${dy}px`,
                transform: `translate3d(${cactus.startX}px, ${cactus.startY}px, 0)`,
                animation: "flyToCartArc 950ms cubic-bezier(0.2, 0.7, 0.35, 1) forwards",
              } as React.CSSProperties
            }
          >
            {/* Pequeño Cactus Ilustrado con florecita rosada */}
            <div className="w-8 h-8 -translate-x-1/2 -translate-y-1/2 filter drop-shadow-md">
              <svg
                viewBox="0 0 40 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                {/* Florecita rosada en la punta del cactus */}
                <circle cx="20" cy="5" r="3.2" fill="#E27D8C" />
                <circle cx="17.2" cy="4" r="2.2" fill="#F472B6" />
                <circle cx="22.8" cy="4" r="2.2" fill="#F472B6" />
                <circle cx="20" cy="2.2" r="2.2" fill="#FBBF24" />

                {/* Cuerpo principal del cactus */}
                <path
                  d="M15 11C15 8.23858 17.2386 6 20 6C22.7614 6 25 8.23858 25 11V30H15V11Z"
                  fill="#447055"
                />
                {/* Brazo izquierdo del cactus */}
                <path
                  d="M10 16C10 14.8954 10.8954 14 12 14C13.1046 14 14 14.8954 14 16V22C14 23.1046 14.8954 24 16 24H17V26H16C13.7909 26 12 24.2091 12 22V20H10V16Z"
                  fill="#3A6348"
                />
                {/* Brazo derecho del cactus */}
                <path
                  d="M30 18C30 16.8954 29.1046 16 28 16C26.8954 16 26 16.8954 26 18V23C26 24.1046 25.1046 25 24 25H23V27H24C26.2091 27 28 25.2091 28 23V21H30V18Z"
                  fill="#3A6348"
                />

                {/* Rayas/costillas del cactus */}
                <path
                  d="M20 7V29M17 11V29M23 11V29"
                  stroke="#598B6D"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />

                {/* Macetita artesanal de terracota */}
                <path
                  d="M13 29H27L25 38H15L13 29Z"
                  fill="#BF692E"
                />
                <rect
                  x="12"
                  y="28"
                  width="16"
                  height="2.5"
                  rx="1"
                  fill="#A65822"
                />
              </svg>
            </div>
          </div>
        );
      })}

      {/* 2. Pequeña confirmación visual (Checkmark) debajo o cerca del ícono del carrito */}
      {checkmarks.map((chk) => (
        <div
          key={chk.id}
          className="absolute z-50 flex items-center gap-1 px-2 py-1 rounded-full bg-salvia-dark text-white text-[10px] font-bold shadow-md animate-in fade-in zoom-in-75 duration-200"
          style={{
            left: `${chk.x}px`,
            top: `${chk.y}px`,
            transform: "translate(-50%, 0)",
          }}
        >
          <svg
            viewBox="0 0 12 12"
            fill="none"
            className="w-3 h-3 stroke-white stroke-[2.2] stroke-linecap-round stroke-linejoin-round"
          >
            <path d="M2.5 6.2L4.8 8.5L9.5 3.5" />
          </svg>
          <span>Agregado</span>
        </div>
      ))}

      {/* 3. Partículas pequeñas tipo confeti: Florecitas rosadas de cactus */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute pointer-events-none"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            transform: `translate(-50%, -50%) scale(${p.scale}) rotate(${p.rotation}deg)`,
            opacity: p.opacity,
          }}
        >
          {/* Flor de cactus rosada */}
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* 5 pétalos rosados */}
            <circle cx="8" cy="4" r="2.8" fill="#F472B6" />
            <circle cx="11.8" cy="6.8" r="2.8" fill="#E27D8C" />
            <circle cx="10.3" cy="11.5" r="2.8" fill="#F472B6" />
            <circle cx="5.7" cy="11.5" r="2.8" fill="#E27D8C" />
            <circle cx="4.2" cy="6.8" r="2.8" fill="#F472B6" />
            {/* Centro dorado/amarillo */}
            <circle cx="8" cy="8" r="2.2" fill="#FBBF24" />
          </svg>
        </div>
      ))}
    </div>
  );
}
