import { useEffect } from 'react';
import gsap from 'gsap';

/**
 * GSAP 3D Interactive Card Tilt with lighting reflection
 * Uses gsap.quickTo for high-performance 60fps rendering without jank
 */
export function useGsapCardTilt(cardRef, maxTilt = 8) {
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Reduced motion check
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const setRotateX = gsap.quickTo(card, 'rotateX', { duration: 0.4, ease: 'power2.out' });
    const setRotateY = gsap.quickTo(card, 'rotateY', { duration: 0.4, ease: 'power2.out' });
    const setScale = gsap.quickTo(card, 'scale', { duration: 0.4, ease: 'power2.out' });

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateXVal = ((y - centerY) / centerY) * -maxTilt;
      const rotateYVal = ((x - centerX) / centerX) * maxTilt;

      setRotateX(rotateXVal);
      setRotateY(rotateYVal);
      setScale(1.015);
    };

    const handleMouseLeave = () => {
      setRotateX(0);
      setRotateY(0);
      setScale(1);
    };

    card.style.transformStyle = 'preserve-3d';
    card.style.perspective = '1000px';

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf(card);
    };
  }, [cardRef, maxTilt]);
}

/**
 * GSAP Magnetic Button Effect
 * Pulls the button towards the cursor when hovered
 */
export function useGsapMagnetic(buttonRef, strength = 0.35) {
  useEffect(() => {
    const btn = buttonRef.current;
    if (!btn) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const setX = gsap.quickTo(btn, 'x', { duration: 0.3, ease: 'power2.out' });
    const setY = gsap.quickTo(btn, 'y', { duration: 0.3, ease: 'power2.out' });

    const handleMouseMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      setX(x * strength);
      setY(y * strength);
    };

    const handleMouseLeave = () => {
      setX(0);
      setY(0);
    };

    btn.addEventListener('mousemove', handleMouseMove);
    btn.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      btn.removeEventListener('mousemove', handleMouseMove);
      btn.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf(btn);
    };
  }, [buttonRef, strength]);
}

/**
 * Monospace Hacker/Terminal Text Decode Animation
 */
export function scrambleText(element, finalText, duration = 0.8) {
  if (!element || !finalText) return;
  const chars = '0123456789ABCDEF_<>{}/*-+=~#';
  const length = finalText.length;
  let progress = 0;

  gsap.to(
    {},
    {
      duration,
      ease: 'none',
      onUpdate: function () {
        progress = this.progress();
        const revealedCount = Math.floor(progress * length);
        let result = '';

        for (let i = 0; i < length; i++) {
          if (i < revealedCount) {
            result += finalText[i];
          } else {
            result += chars[Math.floor(Math.random() * chars.length)];
          }
        }
        element.innerText = result;
      },
      onComplete: () => {
        element.innerText = finalText;
      },
    }
  );
}
