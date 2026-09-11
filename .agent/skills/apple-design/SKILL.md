---
name: apple-design
description: Apple design philosophy reference for clarity, hierarchy, typography, spatial restraint, tactile microinteractions, and seamless responsive design.
---

# Apple Design Philosophy Reference

Use this reference to break ties and establish the baseline of visual hierarchy, restraint, and intentionality.

## Core Pillars

1. **Clarity (Claridad):**
   - Text is legible at every size.
   - Icons are precise and universally understood.
   - Ornaments are eliminated unless they directly serve communication.
   - High contrast ratios (WCAG AA minimum: 4.5:1 for body text, 3:1 for large display).

2. **Deference (Deferencia al Contenido):**
   - The interface recedes; the product/craft is the hero.
   - Ample white space (breathing room) so products feel curated and precious.
   - Avoid visual clutter, heavy borders, or gratuitous boxes.

3. **Depth & Tactility (Profundidad y Tacto):**
   - Realistic, physical feedback on interaction (`scale(0.97)` on press/active).
   - Natural spring physics: `type: "spring", duration: 0.5, bounce: 0.15`.
   - Subtle, realistic shadows tinted to the background tone, never flat black halos.

4. **Ruthless Hierarchy:**
   - One primary action per view.
   - Single-line navigation on desktop (height capped at 64–72px).
   - Display typography balances scale with breathing room; hero headline max 2 lines.

5. **Responsiveness:**
   - Mobile-first layout mechanics.
   - Minimum touch target: 44×44px.
   - No layout jumps (`min-h-[100dvh]` rather than `h-screen`).
