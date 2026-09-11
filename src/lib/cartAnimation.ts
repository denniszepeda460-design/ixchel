import React from "react";

export interface CartAnimationDetail {
  startX: number;
  startY: number;
}

export function triggerCartAnimation(
  e?: React.MouseEvent | HTMLElement | { x: number; y: number }
) {
  if (typeof window === "undefined") return;

  let startX = window.innerWidth / 2;
  let startY = window.innerHeight / 2;

  if (e) {
    if ("currentTarget" in e && e.currentTarget instanceof HTMLElement) {
      const rect = e.currentTarget.getBoundingClientRect();
      startX = rect.left + rect.width / 2;
      startY = rect.top + rect.height / 2;
    } else if ("target" in e && (e.target as any) instanceof HTMLElement) {
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      startX = rect.left + rect.width / 2;
      startY = rect.top + rect.height / 2;
    } else if (e instanceof HTMLElement) {
      const rect = e.getBoundingClientRect();
      startX = rect.left + rect.width / 2;
      startY = rect.top + rect.height / 2;
    } else if ("x" in e && "y" in e) {
      startX = (e as any).x;
      startY = (e as any).y;
    }
  }

  window.dispatchEvent(
    new CustomEvent<CartAnimationDetail>("ixchel:add-to-cart", {
      detail: { startX, startY },
    })
  );
}
