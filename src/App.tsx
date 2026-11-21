"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';

/* -------------------------------------------------------------------------- */
/* Real Project Image Assets with Guaranteed Dual-Endpoint Resolution          */
/* -------------------------------------------------------------------------- */
export const HERO_IMAGE =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_113640_ccf3cf97-d447-425b-a134-d7b09fc743fc.png&w=1280&q=85';
export const HERO_IMAGE_DIRECT =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260624_113640_ccf3cf97-d447-425b-a134-d7b09fc743fc.png';

export const SECTION2_IMAGE =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_114219_414dfe80-f15c-4e25-bf52-b13721f4bd88.png&w=1280&q=85';
export const SECTION2_IMAGE_DIRECT =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260624_114219_414dfe80-f15c-4e25-bf52-b13721f4bd88.png';

export const SECTION3_IMG1 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_115253_c19ab167-8dd5-48b4-967d-b9f0d9d6e8fb.png&w=1280&q=85';
export const SECTION3_IMG1_DIRECT =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260624_115253_c19ab167-8dd5-48b4-967d-b9f0d9d6e8fb.png';

export const SECTION3_IMG2 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_115237_fc519057-6e87-4abf-999a-9610b8b085b4.png&w=1280&q=85';
export const SECTION3_IMG2_DIRECT =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260624_115237_fc519057-6e87-4abf-999a-9610b8b085b4.png';

export const SECTION3_BG =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_114355_752ba9e6-0942-4abb-9047-5d9bb16632e9.png&w=1280&q=85';
export const SECTION3_BG_DIRECT =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260624_114355_752ba9e6-0942-4abb-9047-5d9bb16632e9.png';

export const DENTIST_PORTRAIT =
  '/assets/aistudio/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTExL3Jhd3BpeGVsX29mZmljZV8zMF95b3VuZ19kb2N0b3JfX2FfaGFsZi1ib2R5X3Bob3RvZ3JhcGhfb2ZfYV95b19lMGIwNTIyYy0yM2U0LTQ2NWMtOTM1OC1hODg2M2VkYWRhZTIucG5n_60c2075c.png';

export const CLINIC_PHONE = '+1 (201) 555-0199';
export const CLINIC_PHONE_TEL = 'tel:+12015550199';
export const CLINIC_WHATSAPP = 'https://wa.me/12015550199';
export const CLINIC_EMAIL = 'care@dentalhealthwestny.com';
export const CLINIC_ADDRESS = '5912 Bergenline Ave, West New York, NJ 07093';
export const CLINIC_MAPS_URL =
  'https://www.google.com/maps/dir/?api=1&destination=5912+Bergenline+Ave,+West+New+York,+NJ+07093';

const featureBars = ['Advanced Dentistry', 'High Quality Equipment', 'Friendly Staff'];

export interface ServiceDetail {
  id: string;
  name: string;
  displayName: string;
  title: string;
  num: string | null;
  active: boolean;
  image: string;
  fallbackImage: string;
  description: string;
  benefits: string[];
}

export const servicesData: ServiceDetail[] = [
  {
    id: 'veneers',
    name: 'Dental\nVeneers',
    displayName: 'Dental Veneers',
    title: 'Dental Veneers',
    num: '01',
    active: true,
    image: SECTION3_IMG2_DIRECT,
    fallbackImage: SECTION3_IMG2,
    description:
      'Ultra-thin, custom-crafted porcelain shells meticulously bonded to the front of teeth to correct discoloration, gaps, misalignment, or minor fractures with radiant symmetry.',
    benefits: [
      'Stain-resistant premium dental porcelain',
      'Individually matched to your skin tone and facial structure',
      'Minimally invasive preparation preserving natural tooth structure',
      'High longevity with 10–15+ years of bright, seamless smile',
    ],
  },
  {
    id: 'crowns',
    name: 'Dental\nCrowns',
    displayName: 'Dental Crowns',
    title: 'Dental Crowns',
    num: '02',
    active: false,
    image: SECTION3_IMG1_DIRECT,
    fallbackImage: SECTION3_IMG1,
    description:
      'Full-coverage protective ceramic caps designed to restore heavily decayed, fractured, or root-canal-treated teeth back to full anatomical strength and pristine appearance.',
    benefits: [
      'Restores 100% natural bite and chewing strength',
      'Color-matched translucent zirconia and porcelain aesthetics',
      'Guards weakened teeth from deep structural cracks',
      'Smooth, comfortable margin fit along gum tissue',
    ],
  },
  {
    id: 'whitening',
    name: 'Teeth\nWhitening',
    displayName: 'Teeth Whitening',
    title: 'Teeth Whitening',
    num: '03',
    active: false,
    image: HERO_IMAGE_DIRECT,
    fallbackImage: HERO_IMAGE,
    description:
      'Advanced medical-grade laser acceleration and in-clinic hydrogen peroxide formulations delivering up to 8 shades of lightening in a single comfortable session.',
    benefits: [
      'Noticeably brilliant results achieved in just 60 minutes',
      'Formulated with desensitizing agents to protect enamel',
      'Removes deep intrinsic stains from coffee, tea, and aging',
      'Includes custom touch-up trays for lasting maintenance',
    ],
  },
  {
    id: 'implants',
    name: 'Dental\nImplants',
    displayName: 'Dental Implants',
    title: 'Dental Implants',
    num: null,
    active: false,
    image: SECTION3_BG_DIRECT,
    fallbackImage: SECTION3_BG,
    description:
      'The gold standard permanent tooth restoration: biocompatible titanium posts anchored into the jawbone, topped with bespoke porcelain crowns that look and function like natural roots.',
    benefits: [
      'Prevents bone loss and preserves facial bone contours',
      'Permanent foundation with over 98% clinical success rate',
      'Eliminates the need to alter adjacent healthy teeth',
      'Brush and floss effortlessly just like natural teeth',
    ],
  },
];

export interface InfoGuide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  steps: { title: string; detail: string }[];
}

const IMPLANT_PROCESS_GUIDE: InfoGuide = {
  id: 'process',
  title: 'The Process of Installing Implants',
  subtitle: 'A Step-by-Step Overview of Permanent Tooth Replacement',
  description:
    'Our implant restorations use guided 3D CBCT imaging and minimally invasive surgical protocols to ensure optimal bone integration and lifelike aesthetics.',
  steps: [
    {
      title: '1. 3D Digital Assessment & Planning',
      detail:
        'High-resolution cone beam CT scan to evaluate bone volume, nerve positioning, and plan exact titanium post trajectory.',
    },
    {
      title: '2. Precision Implant Placement',
      detail:
        'A biocompatible titanium or ceramic post is gently anchored into the jawbone under comfortable local anesthesia or sedation.',
    },
    {
      title: '3. Osseointegration Period',
      detail:
        'Natural bone fuses securely around the implant over 8–12 weeks to form a permanent biological foundation.',
    },
    {
      title: '4. Bespoke Crown Fitting',
      detail:
        'A custom-shaded, hand-layered ceramic crown is bonded to complete your functional, radiant smile.',
    },
  ],
};

const IMPLANT_CARE_GUIDE: InfoGuide = {
  id: 'care',
  title: 'Caring for Dental Implants',
  subtitle: 'Best Practices for Lifetime Durability and Health',
  description:
    'With dedicated maintenance and regular cleanings, modern dental implants can last an entire lifetime with zero complications.',
  steps: [
    {
      title: '1. Soft-Bristled Brushing Twice Daily',
      detail:
        'Use low-abrasive tartar control toothpaste and a soft sonic or manual brush around the implant collar and crown margins.',
    },
    {
      title: '2. Dedicated Interdental Cleaning',
      detail:
        'Utilize water flossers or nylon-coated interdental brushes to keep peri-implant gums oxygenated and plaque-free.',
    },
    {
      title: '3. Routine Preventive Checkups',
      detail:
        'Professional ultrasonic scaling and peri-implant probing every six months safeguard surrounding bone density.',
    },
    {
      title: '4. Nighttime Protection',
      detail:
        'If you grind or clench teeth at night, a custom nightguard prevents excessive shear stress on implant components.',
    },
  ],
};

export interface PatientTestimonial {
  id: string;
  name: string;
  profession: string;
  rating: number;
  treatmentCategory: string;
  duration: string;
  description: string;
  image: string;
  fallbackImage: string;
}

export const TESTIMONIALS_DATA: PatientTestimonial[] = [
  {
    id: 'testimonial-1',
    name: 'Elena Vance',
    profession: 'Creative Director',
    rating: 5,
    treatmentCategory: 'Dental Veneers',
    duration: '2 Appointments • 10 Days',
    description:
      'The natural translucency and symmetry completely changed my everyday confidence. Dr. Sterling and his team made the entire veneer process seamless and gentle.',
    image: SECTION2_IMAGE_DIRECT,
    fallbackImage: SECTION2_IMAGE,
  },
  {
    id: 'testimonial-2',
    name: 'Marcus Chen',
    profession: 'Architect',
    rating: 5,
    treatmentCategory: 'Dental Implants',
    duration: 'Guided 3D Protocol',
    description:
      'Eating, laughing, and speaking feel 100% natural again. The 3D guided surgery was painless and the zirconia restoration matches my bite with zero irritation.',
    image: SECTION3_BG_DIRECT,
    fallbackImage: SECTION3_BG,
  },
  {
    id: 'testimonial-3',
    name: 'Sophia Miller',
    profession: 'Brand Strategist',
    rating: 5,
    treatmentCategory: 'Teeth Whitening',
    duration: 'Single 60-Min In-Clinic Visit',
    description:
      'Lightened 8 shades in just one sitting without any enamel sensitivity afterwards. The complimentary take-home trays have kept my smile brilliant for months.',
    image: HERO_IMAGE_DIRECT,
    fallbackImage: HERO_IMAGE,
  },
  {
    id: 'testimonial-4',
    name: 'Julian Brooks',
    profession: 'Software Engineer',
    rating: 5,
    treatmentCategory: 'Dental Crowns',
    duration: 'Precision Digital Milling',
    description:
      'The color matching with my natural teeth is indistinguishable even in bright sunlight. Truly master-level craftsmanship and compassionate staff.',
    image: SECTION3_IMG1_DIRECT,
    fallbackImage: SECTION3_IMG1,
  },
  {
    id: 'testimonial-5',
    name: 'Claire Laurent',
    profession: 'Fashion Buyer',
    rating: 5,
    treatmentCategory: 'Smile Makeover',
    duration: 'Custom Facial Blueprint',
    description:
      'They respected my natural tooth anatomy while giving me a movie-grade radiant smile. World-class technology and attentive care throughout every phase.',
    image: SECTION3_IMG2_DIRECT,
    fallbackImage: SECTION3_IMG2,
  },
];

interface CardPosition {
  x: number;
  y: number;
  sw: number;
  sh: number;
}

/* -------------------------------------------------------------------------- */
/* Typography & Animations                                                     */
/* -------------------------------------------------------------------------- */
interface AnimatedTextProps {
  text: string;
  className?: string;
  animationType?: "words" | "letters";
  duration?: number;
  delay?: number;
  staggerDelay?: number;
  initialY?: number;
}

export function AnimatedText({
  text,
  className = "",
  animationType = "words",
  duration = 0.4,
  delay = 0,
  staggerDelay = 0.06,
  initialY = 12,
}: AnimatedTextProps) {
  const reducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: reducedMotion ? 0 : staggerDelay,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: reducedMotion ? 1 : 0,
      y: reducedMotion ? 0 : initialY,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reducedMotion ? 0 : duration,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const renderWords = () => {
    const parts = text.split(/(\s+)/);

    return parts.map((part, index) => {
      if (/^\s+$/.test(part)) {
        if (part.includes('\n')) {
          return (
            <React.Fragment key={`space-${index}`}>
              {part.split('\n').map((_, nIdx) => (nIdx > 0 ? <br key={nIdx} /> : null))}
            </React.Fragment>
          );
        }
        return (
          <React.Fragment key={`space-${index}`}>
            {part}
          </React.Fragment>
        );
      }

      return (
        <motion.span
          key={`word-${index}`}
          variants={itemVariants}
          className="inline-block"
          aria-hidden="true"
        >
          {part}
        </motion.span>
      );
    });
  };

  const renderLetters = () => {
    return Array.from(text).map((char, index) => {
      if (char === " ") {
        return (
          <React.Fragment key={`space-${index}`}>
            {" "}
          </React.Fragment>
        );
      }

      return (
        <motion.span
          key={`letter-${index}`}
          variants={itemVariants}
          className="inline-block"
          aria-hidden="true"
        >
          {char}
        </motion.span>
      );
    });
  };

  return (
    <motion.span
      className={className}
      variants={containerVariants}
      initial={reducedMotion ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.3,
      }}
      aria-label={text.replace(/\n/g, ' ')}
      style={{ display: "inline" }}
    >
      {animationType === "words" ? renderWords() : renderLetters()}
    </motion.span>
  );
}

function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(max-width: 767px)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(max-width: 767px)');
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    if (mql.addEventListener) {
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    } else {
      mql.addListener(onChange);
      return () => mql.removeListener(onChange);
    }
  }, []);

  return isMobile;
}

function useScrollPosition(): number {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let animId: number;
    const handleScroll = () => {
      animId = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  return scrollY;
}

/* -------------------------------------------------------------------------- */
/* Updated Viewport Reveal (Data Attribute Based for CSS integration)          */
/* -------------------------------------------------------------------------- */
function useViewportReveal(threshold = 0.05, enabled = true) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!enabled) {
      setIsVisible(true);
      return;
    }
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: '40px 0px 40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, enabled]);

  const getRevealClass = () => (isVisible ? 'is-visible' : '');
  const getRevealStyle = (index = 0, baseDelayMs = 100): React.CSSProperties => ({
    '--reveal-delay': `${index * baseDelayMs}ms`,
  } as React.CSSProperties);

  return { containerRef, isVisible, getRevealClass, getRevealStyle };
}

function useImageWidth(src: string, sectionHeight: number): number {
  const [imageWidth, setImageWidth] = useState<number>(() => {
    const sh = sectionHeight > 0 ? sectionHeight : 800;
    return sh * 1.5;
  });

  useEffect(() => {
    if (!src) return;
    const sh = sectionHeight > 0 ? sectionHeight : typeof window !== 'undefined' ? window.innerHeight : 800;
    const img = new Image();
    img.src = src;

    const update = () => {
      if (img.naturalWidth > 0 && img.naturalHeight > 0) {
        setImageWidth(img.naturalWidth * (sh / img.naturalHeight));
      }
    };

    if (img.complete && img.naturalWidth > 0) {
      update();
    } else {
      img.onload = update;
    }
  }, [src, sectionHeight]);

  return imageWidth;
}

function useMaskPositions(
  sectionRef: React.RefObject<HTMLElement | null>,
  cardsRef: React.RefObject<(HTMLElement | null)[]>
) {
  const [positions, setPositions] = useState<CardPosition[]>(() => {
    const sw = typeof window !== 'undefined' ? window.innerWidth : 390;
    const sh = typeof window !== 'undefined' ? window.innerHeight : 844;
    return [
      { x: 12, y: 60, sw, sh },
      { x: 12, y: 160, sw, sh },
      { x: 12, y: 440, sw, sh },
      { x: 12, y: 580, sw, sh },
    ];
  });

  const calculatePositions = useCallback(() => {
    if (!sectionRef.current) return;
    const secRect = sectionRef.current.getBoundingClientRect();
    const sw = secRect.width || (typeof window !== 'undefined' ? window.innerWidth : 390);
    const sh = secRect.height || (typeof window !== 'undefined' ? window.innerHeight : 844);

    if (!cardsRef.current || cardsRef.current.length === 0) return;

    const nextPositions: CardPosition[] = cardsRef.current.map((card) => {
      if (!card) return { x: 0, y: 0, sw, sh };
      const cardRect = card.getBoundingClientRect();

      let offsetX = 0;
      let offsetY = 0;
      if (typeof window !== 'undefined') {
        const style = window.getComputedStyle(card);
        const transform = style.transform;
        if (transform && transform !== 'none') {
          try {
            const DOMMatrixConstructor = window.DOMMatrixReadOnly || window.DOMMatrix;
            if (DOMMatrixConstructor) {
              const matrix = new DOMMatrixConstructor(transform);
              offsetX = matrix.m41;
              offsetY = matrix.m42;
            }
          } catch {
            // fallback
          }
        }
      }

      return {
        x: cardRect.left - secRect.left - offsetX,
        y: cardRect.top - secRect.top - offsetY,
        sw,
        sh,
      };
    });

    setPositions(nextPositions);
  }, [sectionRef, cardsRef]);

  useEffect(() => {
    calculatePositions();

    const animFrame = requestAnimationFrame(calculatePositions);
    const t1 = setTimeout(calculatePositions, 50);
    const t2 = setTimeout(calculatePositions, 150);
    const t3 = setTimeout(calculatePositions, 400);

    const secEl = sectionRef.current;
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && secEl) {
      ro = new ResizeObserver(() => {
        calculatePositions();
      });
      ro.observe(secEl);
    }

    window.addEventListener('resize', calculatePositions);
    return () => {
      cancelAnimationFrame(animFrame);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      if (ro && secEl) ro.unobserve(secEl);
      window.removeEventListener('resize', calculatePositions);
    };
  }, [calculatePositions, sectionRef]);

  return { positions, recalculate: calculatePositions };
}

interface MaskedCardProps {
  bgImage: string;
  fallbackImage?: string;
  position?: CardPosition;
  imageWidth: number;
  focalX: number;
  className?: string;
  children?: React.ReactNode;
  cardRef?: (el: HTMLElement | null) => void;
  style?: React.CSSProperties;
  onClick?: () => void;
  role?: string;
  tabIndex?: number;
  'data-reveal'?: boolean;
}

const MaskedCard: React.FC<MaskedCardProps> = ({
  bgImage,
  fallbackImage,
  position,
  imageWidth,
  focalX,
  className = '',
  children,
  cardRef,
  style = {},
  onClick,
  role,
  tabIndex,
  'data-reveal': dataReveal,
}) => {
  const [resolvedSrc, setResolvedSrc] = useState<string>(bgImage);

  useEffect(() => {
    setResolvedSrc(bgImage);
    if (fallbackImage) {
      const test = new Image();
      test.src = bgImage;
      test.onerror = () => {
        setResolvedSrc(fallbackImage);
      };
    }
  }, [bgImage, fallbackImage]);

  let maskStyle: React.CSSProperties = {};

  if (position && position.sh > 0) {
    const sw = position.sw > 0 ? position.sw : typeof window !== 'undefined' ? window.innerWidth : 390;
    const sh = position.sh;
    const effectiveWidth = imageWidth > 0 ? imageWidth : sw * 1.5;
    const overflow = effectiveWidth > sw ? effectiveWidth - sw : 0;
    const focalOffset = overflow * focalX;

    maskStyle = {
      backgroundImage: `url("${resolvedSrc}")`,
      backgroundSize: `auto ${sh}px`,
      backgroundPosition: `-${position.x + focalOffset}px -${position.y}px`,
      backgroundRepeat: 'no-repeat',
    };
  } else {
    maskStyle = {
      backgroundImage: `url("${resolvedSrc}")`,
      backgroundSize: 'cover',
      backgroundPosition: `${focalX * 100}% center`,
      backgroundRepeat: 'no-repeat',
    };
  }

  return (
    <div
      ref={cardRef}
      role={role}
      tabIndex={tabIndex}
      onClick={onClick}
      data-reveal={dataReveal}
      className={`bg-stone-100 ${className}`}
      style={{
        ...maskStyle,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Splash Screen                                                               */
/* -------------------------------------------------------------------------- */
interface SplashScreenProps {
  onComplete: () => void;
  onExitStart: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete, onExitStart }) => {
  const [count, setCount] = useState<number>(0);
  const [exiting, setExiting] = useState<boolean>(false);

  useEffect(() => {
    const intervalTime = 16;
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (count === 100) {
      const exitTimer = setTimeout(() => {
        setExiting(true);
        onExitStart();
      }, 100);

      const completeTimer = setTimeout(() => {
        onComplete();
      }, 700);

      return () => {
        clearTimeout(exitTimer);
        clearTimeout(completeTimer);
      };
    }
  }, [count, onComplete, onExitStart]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-white flex items-end justify-start transition-opacity duration-700 pointer-events-none select-none ${
        exiting ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="text-7xl md:text-9xl font-bold tabular-nums p-6 md:p-10 leading-none text-black">
        {count}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Shared Modal Animation Variants                                             */
/* -------------------------------------------------------------------------- */
const modalOverlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.38,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const modalContentVariants = {
  hidden: {
    opacity: 0,
    y: 26,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1] as const,
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    y: 22,
    scale: 0.97,
    transition: {
      duration: 0.38,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const modalChildVariants = {
  hidden: {
    opacity: 0,
    y: 14,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.42,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 0.28,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

/* -------------------------------------------------------------------------- */
/* Modals & Dialogs                                                            */
/* -------------------------------------------------------------------------- */
interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTreatment?: string;
}

const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialTreatment = 'General Consultation',
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('10:00 AM');
  const [treatment, setTreatment] = useState(initialTreatment);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTreatment(initialTreatment);
      setSubmitted(false);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const iso = tomorrow.toISOString().split('T')[0];
      setDate(iso);
    }
  }, [isOpen, initialTreatment]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="booking-modal-overlay"
          variants={modalOverlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 will-change-[opacity]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-modal-title"
        >
          <motion.div
            key="booking-modal-content"
            variants={modalContentVariants}
            className="bg-white rounded-2xl md:rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative max-h-[92vh] overflow-y-auto will-change-[transform,opacity]"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-5 right-5 w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border border-black/20 flex items-center justify-center text-black hover:bg-black hover:text-white focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-none transition-colors cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            {submitted ? (
              <div className="py-8 text-center flex flex-col items-center">
                <motion.div
                  variants={modalChildVariants}
                  className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center mb-6"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.div>
                <motion.h3
                  variants={modalChildVariants}
                  id="booking-modal-title"
                  className="text-2xl md:text-3xl font-bold text-black mb-2"
                >
                  Appointment Requested
                </motion.h3>
                <motion.p
                  variants={modalChildVariants}
                  className="text-sm text-neutral-600 mb-6 max-w-sm"
                >
                  Thank you, <span className="font-semibold text-black">{name}</span>. Our clinic
                  coordinator will contact you at <span className="font-semibold text-black">{phone}</span> to
                  confirm your {treatment} session on {date} at {time}.
                </motion.p>
                <motion.div variants={modalChildVariants} className="flex flex-col sm:flex-row gap-3 w-full">
                  <a
                    href={CLINIC_PHONE_TEL}
                    className="flex-1 min-h-[44px] px-6 py-3.5 bg-neutral-100 text-black rounded-full font-semibold text-sm text-center flex items-center justify-center hover:bg-neutral-200 focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-none transition-colors dentiva-anim-button"
                  >
                    Call Clinic Now
                  </a>
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 min-h-[44px] px-6 py-3.5 bg-black text-white rounded-full font-semibold text-sm flex items-center justify-center hover:bg-neutral-800 focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-none transition-colors cursor-pointer dentiva-anim-button"
                  >
                    Done
                  </button>
                </motion.div>
              </div>
            ) : (
              <>
                <motion.div variants={modalChildVariants} className="mb-6">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-500 block mb-1">
                    Quality Healthcare
                  </span>
                  <h3 id="booking-modal-title" className="text-2xl md:text-3xl font-extrabold tracking-tight text-black leading-tight">
                    Request an Appointment
                  </h3>
                  <p className="text-xs md:text-sm text-neutral-600 mt-1">
                    Reserve your consultation with our West New York dental specialists.
                  </p>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <motion.div variants={modalChildVariants}>
                    <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 min-h-[44px] rounded-xl border border-neutral-300 text-black text-sm focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition"
                    />
                  </motion.div>

                  <motion.div variants={modalChildVariants}>
                    <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(201) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 min-h-[44px] rounded-xl border border-neutral-300 text-black text-sm focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition"
                    />
                  </motion.div>

                  <motion.div variants={modalChildVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1.5">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-4 py-3 min-h-[44px] rounded-xl border border-neutral-300 text-black text-sm focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1.5">
                        Preferred Time
                      </label>
                      <select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full px-4 py-3 min-h-[44px] rounded-xl border border-neutral-300 text-black text-sm focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition bg-white"
                      >
                        <option value="09:00 AM">09:00 AM (Morning)</option>
                        <option value="10:30 AM">10:30 AM (Morning)</option>
                        <option value="01:00 PM">01:00 PM (Afternoon)</option>
                        <option value="03:30 PM">03:30 PM (Afternoon)</option>
                        <option value="05:00 PM">05:00 PM (Evening)</option>
                      </select>
                    </div>
                  </motion.div>

                  <motion.div variants={modalChildVariants}>
                    <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-1.5">
                      Treatment / Service
                    </label>
                    <select
                      value={treatment}
                      onChange={(e) => setTreatment(e.target.value)}
                      className="w-full px-4 py-3 min-h-[44px] rounded-xl border border-neutral-300 text-black text-sm focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition bg-white"
                    >
                      <option value="Free Consultation">Free Consultation</option>
                      <option value="Consultation with Dr. Sterling">Consultation with Dr. Sterling</option>
                      <option value="Dental Veneers">Dental Veneers</option>
                      <option value="Dental Crowns">Dental Crowns</option>
                      <option value="Teeth Whitening">Teeth Whitening</option>
                      <option value="Dental Implants">Dental Implants</option>
                      <option value="Dental Restoration Services">Dental Restoration Services</option>
                      <option value="Dental Emergency">Dental Emergency</option>
                      <option value="General Consultation">General Consultation</option>
                    </select>
                  </motion.div>

                  <motion.div variants={modalChildVariants} className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 min-h-[44px] bg-black rounded-full text-white text-sm font-bold hover:bg-neutral-800 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:outline-none transition-all duration-300 uppercase tracking-wider cursor-pointer dentiva-anim-button"
                    >
                      Request Appointment
                    </button>
                  </motion.div>

                  <motion.p variants={modalChildVariants} className="text-[11px] text-center text-neutral-500 pt-1">
                    Prefer to speak directly? Call{' '}
                    <a href={CLINIC_PHONE_TEL} className="underline text-black font-semibold focus-visible:ring-2 focus-visible:ring-black rounded-xs">
                      {CLINIC_PHONE}
                    </a>
                  </motion.p>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface TreatmentModalProps {
  service: ServiceDetail | null;
  isOpen: boolean;
  onClose: () => void;
  onBook: (serviceName: string) => void;
}

const TreatmentModal: React.FC<TreatmentModalProps> = ({
  service,
  isOpen,
  onClose,
  onBook,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && service && (
        <motion.div
          key="treatment-modal-overlay"
          variants={modalOverlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 will-change-[opacity]"
        >
          <motion.div
            key="treatment-modal-content"
            variants={modalContentVariants}
            className="bg-white rounded-2xl md:rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl relative max-h-[92vh] flex flex-col will-change-[transform,opacity]"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-black/20 flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            <motion.div
              variants={modalChildVariants}
              className="relative h-48 md:h-56 w-full bg-neutral-200 overflow-hidden shrink-0"
            >
              <img
                src={service.image}
                onError={(e) => {
                  if (service.fallbackImage && e.currentTarget.src !== service.fallbackImage) {
                    e.currentTarget.src = service.fallbackImage;
                  }
                }}
                alt={service.displayName}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6">
                <div>
                  {service.num && (
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-white text-black text-xs font-bold mb-2">
                      Service {service.num}
                    </span>
                  )}
                  <h3 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                    {service.displayName}
                  </h3>
                </div>
              </div>
            </motion.div>

            <div className="p-6 md:p-8 overflow-y-auto space-y-6">
              <motion.div variants={modalChildVariants}>
                <h4 className="text-xs uppercase font-bold tracking-wider text-neutral-500 mb-2">
                  Clinical Overview
                </h4>
                <p className="text-sm md:text-base text-neutral-700 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>

              <motion.div variants={modalChildVariants}>
                <h4 className="text-xs uppercase font-bold tracking-wider text-neutral-500 mb-3">
                  Key Advantages & Benefits
                </h4>
                <div className="space-y-2.5">
                  {service.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-neutral-100 text-black flex items-center justify-center shrink-0 mt-0.5">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2.5 6.5l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-neutral-800 leading-snug">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={modalChildVariants} className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onBook(service.displayName);
                  }}
                  className="flex-1 py-4 bg-black rounded-full text-white text-sm font-bold hover:bg-neutral-800 transition-all duration-300 uppercase tracking-wider text-center cursor-pointer dentiva-anim-button"
                >
                  Book Consultation
                </button>
                <a
                  href={CLINIC_PHONE_TEL}
                  className="px-6 py-4 rounded-full border border-black text-black font-semibold text-sm hover:bg-black hover:text-white transition-colors text-center"
                >
                  Call Us
                </a>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface GuideModalProps {
  guide: InfoGuide | null;
  isOpen: boolean;
  onClose: () => void;
  onBook: (treatment: string) => void;
}

const GuideModal: React.FC<GuideModalProps> = ({ guide, isOpen, onClose, onBook }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isOpen]);

  if (!isOpen || !guide) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 transition-all duration-300"
    >
      <div className="bg-white rounded-2xl md:rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl relative max-h-[92vh] overflow-y-auto transform transition-all duration-300 scale-100 opacity-100">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close guide modal"
          className="absolute top-5 right-5 w-10 h-10 rounded-full border border-black/20 flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors cursor-pointer"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <div className="mb-6 pr-8">
          <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-500 block mb-1">
            Clinical Guide
          </span>
          <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-black leading-tight">
            {guide.title}
          </h3>
          <p className="text-xs md:text-sm text-neutral-600 mt-1">{guide.subtitle}</p>
        </div>

        <p className="text-sm text-neutral-700 leading-relaxed mb-6 bg-neutral-50 p-4 rounded-xl border border-neutral-200">
          {guide.description}
        </p>

        <div className="space-y-4 mb-8">
          {guide.steps.map((st, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-neutral-100 bg-white hover:border-neutral-300 transition-colors shadow-2xs"
            >
              <h4 className="text-sm font-bold text-black mb-1">{st.title}</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">{st.detail}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => {
              onClose();
              onBook('Dental Implants');
            }}
            className="flex-1 py-4 bg-black rounded-full text-white text-sm font-bold hover:bg-neutral-800 transition-all duration-300 uppercase tracking-wider text-center cursor-pointer dentiva-anim-button"
          >
            Book Consultation
          </button>
          <a
            href={CLINIC_PHONE_TEL}
            className="px-6 py-4 rounded-full border border-black text-black font-semibold text-sm hover:bg-black hover:text-white transition-colors text-center"
          >
            Call Us
          </a>
        </div>
      </div>
    </div>
  );
};

interface DoctorProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBook: (treatment: string) => void;
}

const DoctorProfileModal: React.FC<DoctorProfileModalProps> = ({ isOpen, onClose, onBook }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isOpen]);

  const expertiseList = [
    'Digital Smile Design (DSD)',
    '3D Guided Implant Surgery',
    'Biomimetic Ceramic Veneers',
    'Full Arch Zirconia Rehabilitation',
    'Minimally Invasive Enamel Prep',
    'Soft Tissue Aesthetics & Contouring',
  ];

  const treatmentsPerformed = [
    'Porcelain Veneers',
    'Dental Implants',
    'Zirconia Crowns',
    'Laser Teeth Whitening',
    'Full Mouth Makeovers',
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="doctor-profile-modal-overlay"
          variants={modalOverlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          className="fixed inset-0 z-[130] bg-black/60 backdrop-blur-md flex items-center justify-center p-0 md:p-6 will-change-[opacity]"
        >
          <motion.div
            key="doctor-profile-modal-content"
            variants={modalContentVariants}
            className="bg-white w-full h-full md:h-auto md:max-h-[92vh] md:max-w-4xl md:rounded-3xl shadow-2xl relative overflow-y-auto flex flex-col will-change-[transform,opacity]"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Doctor Profile"
              className="fixed md:absolute top-4 right-4 z-30 w-11 h-11 rounded-full bg-white/90 backdrop-blur-md border border-black/15 flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors cursor-pointer shadow-md"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-full">
              <motion.div
                variants={modalChildVariants}
                className="lg:col-span-5 bg-stone-100 flex flex-col justify-between p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-neutral-200"
              >
                <div>
                  <div className="w-full aspect-[4/5] rounded-2xl bg-neutral-200 mb-6 shadow-xs relative dentiva-image-frame">
                    <img
                      src={DENTIST_PORTRAIT}
                      alt="Dr. Julian Sterling"
                      className="w-full h-full object-cover object-top select-none dentiva-anim-image"
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 block mb-0.5">
                        Lead Prosthodontist
                      </span>
                      <h3 className="text-xl font-bold leading-tight">Dr. Julian Sterling, DDS</h3>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3.5 bg-white rounded-xl border border-neutral-200 shadow-2xs">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] uppercase font-extrabold tracking-wider text-black">
                          Clinical Experience
                        </span>
                      </div>
                      <p className="text-xl font-black text-black">15+ Years</p>
                      <p className="text-[11px] text-neutral-500">Prosthodontics & Guided Implantology</p>
                    </div>

                    <div className="p-3.5 bg-white rounded-xl border border-neutral-200 shadow-2xs">
                      <span className="text-[10px] uppercase font-extrabold tracking-wider text-neutral-500 block mb-1">
                        Board Certifications
                      </span>
                      <p className="text-xs font-bold text-black leading-snug">
                        Fellow, American Academy of Cosmetic Dentistry (AACD)
                      </p>
                      <p className="text-[11px] text-neutral-500 mt-1">
                        Diplomate, International Congress of Oral Implantologists (ICOI)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-neutral-200">
                  <p className="text-[10px] uppercase font-extrabold tracking-widest text-neutral-500 mb-1">
                    Clinic Location
                  </p>
                  <p className="text-xs font-bold text-black">West New York Dental Practice</p>
                  <p className="text-xs text-neutral-600 mt-0.5">5912 Bergenline Ave, West New York, NJ 07093</p>
                  <a href={CLINIC_PHONE_TEL} className="text-xs font-bold text-black underline block mt-2 hover:opacity-75">
                    {CLINIC_PHONE}
                  </a>
                </div>
              </motion.div>

              <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
                <div>
                  <motion.div variants={modalChildVariants} className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] uppercase font-extrabold tracking-[0.25em] text-neutral-500">
                      DOCTOR PROFILE
                    </span>
                    <span className="text-neutral-300">•</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-600">
                      Accepting New Patients
                    </span>
                  </motion.div>

                  <motion.h2
                    variants={modalChildVariants}
                    className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black tracking-tight leading-tight mb-2"
                  >
                    Dr. Julian Sterling, DDS
                  </motion.h2>
                  <motion.p
                    variants={modalChildVariants}
                    className="text-xs sm:text-sm font-semibold text-neutral-600 mb-6"
                  >
                    Lead Prosthodontist & Implant Surgeon • Columbia University CDM
                  </motion.p>

                  <motion.div
                    variants={modalChildVariants}
                    className="space-y-3 text-neutral-700 text-xs sm:text-sm leading-relaxed mb-6 font-normal"
                  >
                    <p>
                      Dr. Julian Sterling has dedicated the last 15+ years to the art and science of biomimetic smile reconstruction and 3D computer-guided implantology. Believing that dental aesthetics must never compromise biological preservation, his custom treatments are engineered to mirror natural tooth biomechanics and facial harmony.
                    </p>
                    <p className="text-neutral-600">
                      After completing his advanced residency in prosthodontics at Columbia University, Dr. Sterling pioneered the integration of high-resolution CBCT digital planning with ultra-thin porcelain veneers, transforming thousands of smiles throughout the New York and New Jersey metropolitan areas.
                    </p>
                  </motion.div>

                  <motion.div variants={modalChildVariants} className="mb-6">
                    <h4 className="text-xs uppercase font-extrabold tracking-wider text-neutral-400 mb-3">
                      Education & Qualifications
                    </h4>
                    <div className="space-y-2.5">
                      <div className="flex items-start gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-black mt-1.5 shrink-0" />
                        <div>
                          <p className="text-xs sm:text-sm font-bold text-black">Doctor of Dental Surgery (DDS)</p>
                          <p className="text-xs text-neutral-500">Columbia University College of Dental Medicine</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-black mt-1.5 shrink-0" />
                        <div>
                          <p className="text-xs sm:text-sm font-bold text-black">
                            Advanced Specialty Certificate in Prosthodontics
                          </p>
                          <p className="text-xs text-neutral-500">New York Presbyterian Hospital / Columbia University</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-black mt-1.5 shrink-0" />
                        <div>
                          <p className="text-xs sm:text-sm font-bold text-black">
                            Fellowship in Guided Bone Regeneration & Implantology
                          </p>
                          <p className="text-xs text-neutral-500">American Academy of Implant Dentistry (AAID)</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div variants={modalChildVariants} className="mb-6">
                    <h4 className="text-xs uppercase font-extrabold tracking-wider text-neutral-400 mb-2.5">
                      Clinical Expertise
                    </h4>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {expertiseList.map((item, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 bg-neutral-100 rounded-full text-xs font-semibold text-neutral-800"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div variants={modalChildVariants} className="mb-6">
                    <h4 className="text-xs uppercase font-extrabold tracking-wider text-neutral-400 mb-2.5">
                      Primary Treatments
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {treatmentsPerformed.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-md border border-neutral-300 text-xs font-medium text-black"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>

                <motion.div variants={modalChildVariants} className="pt-4 border-t border-neutral-200 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onBook('Consultation with Dr. Sterling');
                    }}
                    className="flex-1 py-4 bg-black rounded-full text-white text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-neutral-800 transition-all text-center cursor-pointer dentiva-anim-button"
                  >
                    Book Appointment
                  </button>
                  <a
                    href={CLINIC_PHONE_TEL}
                    className="px-6 py-4 rounded-full border border-black text-black font-semibold text-xs sm:text-sm hover:bg-black hover:text-white transition-colors text-center cursor-pointer"
                  >
                    Call Office
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* -------------------------------------------------------------------------- */
/* 1. Navbar                                                                   */
/* -------------------------------------------------------------------------- */
interface NavbarProps {
  onOpenBooking: (treatment?: string) => void;
  startAnimation: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, startAnimation }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);
  const scrollY = useScrollPosition();

  useEffect(() => {
    if (mobileMenuOpen || desktopMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen, desktopMenuOpen]);

  const navItems = [
    { label: 'Home', targetId: 'home' },
    { label: 'Gallery', targetId: 'gallery' },
    { label: 'Implant Services', targetId: 'services' },
    { label: 'Treatments', targetId: 'treatments' },
    { label: 'About', targetId: 'about' },
    { label: 'Testimonials', targetId: 'results' },
    { label: 'Contact', targetId: 'contact' },
  ];

  const handleScrollTo = (targetId: string) => {
    setMobileMenuOpen(false);
    setDesktopMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isScrolled = scrollY > 20;

  return (
    <>
      <nav
        style={{
          opacity: startAnimation ? 1 : 0.95,
          transform: startAnimation ? 'translate3d(0, 0, 0)' : 'translate3d(0, -6px, 0)',
          transition:
            'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
        }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-6 py-2.5 md:py-3 transition-colors duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-black/5 shadow-xs'
            : 'bg-white/80 backdrop-blur-sm'
        }`}
      >
        <div onClick={() => handleScrollTo('home')} className="flex flex-col cursor-pointer select-none group">
          <span className="text-xl md:text-2xl font-extrabold uppercase tracking-tight leading-none text-black group-hover:opacity-75 transition-opacity duration-200">
            Dental
          </span>
          <span className="text-xl md:text-2xl font-extrabold uppercase tracking-tight leading-none text-black -mt-1.5 md:-mt-2 group-hover:opacity-75 transition-opacity duration-200">
            Health
          </span>
          <span className="text-[8px] md:text-[9px] font-medium leading-none mt-1 md:mt-2 uppercase tracking-wider text-black">
            quality healthcare
          </span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <a
            href={CLINIC_PHONE_TEL}
            className="text-sm font-semibold text-black cursor-pointer hover:opacity-75 focus-visible:ring-2 focus-visible:ring-black rounded-full px-3 py-2 min-h-[44px] transition-opacity flex items-center gap-2 group"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse group-hover:scale-125 transition-transform" />
            Dental Emergency
          </a>
          <button
            type="button"
            onClick={() => setDesktopMenuOpen(!desktopMenuOpen)}
            className="px-6 py-3 min-h-[44px] bg-white rounded-full border border-black text-sm font-semibold text-black hover:bg-black hover:text-white focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-none transition-all duration-200 cursor-pointer shadow-2xs hover:shadow-xs active:scale-95"
            aria-expanded={desktopMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {desktopMenuOpen ? 'Close' : 'Menu'}
          </button>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          aria-expanded={mobileMenuOpen}
          className="md:hidden w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center relative focus-visible:ring-2 focus-visible:ring-black rounded-lg cursor-pointer"
        >
          <span
            className={`absolute h-0.5 w-6 bg-black rounded-full transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${
              mobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
            }`}
          />
          <span
            className={`absolute h-0.5 w-6 bg-black rounded-full transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${
              mobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
            }`}
          />
          <span
            className={`absolute h-0.5 w-6 bg-black rounded-full transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${
              mobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
            }`}
          />
        </button>
      </nav>

      {/* Desktop Menu Drawer */}
      <div
        className={`hidden md:block fixed inset-0 z-40 transition-opacity duration-300 ${
          desktopMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-black/30 backdrop-blur-xs" onClick={() => setDesktopMenuOpen(false)} />
        <div
          className={`absolute top-0 right-0 h-full w-[420px] bg-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] flex flex-col justify-between p-10 ${
            desktopMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="pt-16">
            <span className="text-xs uppercase font-bold tracking-widest text-neutral-400 block mb-6">
              Navigation
            </span>
            <div className="flex flex-col gap-4">
              {navItems.map((item, i) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleScrollTo(item.targetId)}
                  style={{ transitionDelay: desktopMenuOpen ? `${100 + i * 45}ms` : '0ms' }}
                  className="text-left text-3xl font-extrabold text-black hover:text-neutral-500 hover:translate-x-2 transition-all duration-300 cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-neutral-200 space-y-4">
            <div>
              <p className="text-xs uppercase font-bold text-neutral-500 tracking-wider mb-1">
                Emergency & Support
              </p>
              <a href={CLINIC_PHONE_TEL} className="text-lg font-bold text-black hover:underline block">
                {CLINIC_PHONE}
              </a>
              <p className="text-xs text-neutral-500 mt-0.5">West New York Dental Practice</p>
            </div>

            <button
              type="button"
              onClick={() => {
                setDesktopMenuOpen(false);
                onOpenBooking('General Consultation');
              }}
              className="w-full py-4 bg-black rounded-full text-white text-sm font-semibold hover:bg-neutral-800 transition-all duration-200 text-center cursor-pointer dentiva-anim-button"
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-black/20 backdrop-blur-xs" onClick={() => setMobileMenuOpen(false)} />
        <div
          className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] flex flex-col justify-center px-8 gap-1 ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {navItems.map((item, i) => (
            <button
              key={item.label}
              type="button"
              onClick={() => handleScrollTo(item.targetId)}
              style={{ transitionDelay: mobileMenuOpen ? `${100 + i * 50}ms` : '0ms' }}
              className={`text-left text-4xl font-bold text-black hover:text-neutral-500 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] cursor-pointer ${
                mobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
            >
              {item.label}
            </button>
          ))}

          <div
            style={{ transitionDelay: mobileMenuOpen ? '450ms' : '0ms' }}
            className={`mt-8 pt-8 border-t border-neutral-200 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
              mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <a href={CLINIC_PHONE_TEL} className="text-sm font-semibold text-black mb-4 block hover:underline">
              Dental Emergency: {CLINIC_PHONE}
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking('General Consultation');
              }}
              className="w-full px-6 py-4 bg-black rounded-full text-white text-sm font-semibold hover:bg-neutral-800 transition-colors duration-200 text-center cursor-pointer dentiva-anim-button"
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

/* -------------------------------------------------------------------------- */
/* 2. Section 1 - Hero                                                         */
/* -------------------------------------------------------------------------- */
interface Section1Props {
  isMobile: boolean;
  startAnimation: boolean;
  onOpenBooking: (treatment?: string) => void;
}

const Section1: React.FC<Section1Props> = ({ isMobile, startAnimation, onOpenBooking }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  const { positions, recalculate } = useMaskPositions(sectionRef, cardsRef);
  const [sectionHeight, setSectionHeight] = useState(0);

  useEffect(() => {
    if (sectionRef.current) {
      setSectionHeight(sectionRef.current.offsetHeight);
      recalculate();
    }
  }, [recalculate]);

  useEffect(() => {
    const timer = setTimeout(recalculate, 150);
    return () => clearTimeout(timer);
  }, [startAnimation, recalculate]);

  const imageWidth = useImageWidth(HERO_IMAGE_DIRECT, sectionHeight);
  const focalX = isMobile ? 0.7 : 0.8;

  const setCombinedRef = useCallback((el: HTMLElement | null) => {
    sectionRef.current = el;
    if (el) {
      setSectionHeight(el.offsetHeight);
    }
  }, []);

  return (
    <section
      id="home"
      ref={setCombinedRef}
      className="h-[100dvh] max-h-[100dvh] md:max-h-none md:h-screen w-full overflow-hidden flex flex-col pt-[54px] sm:pt-[60px] md:pt-24 px-2.5 sm:px-3 md:px-5 pb-1.5 md:pb-2 gap-1.5 md:gap-2 box-border relative"
    >
      {featureBars.map((bar, i) => (
        <MaskedCard
          key={bar}
          bgImage={HERO_IMAGE_DIRECT}
          fallbackImage={HERO_IMAGE}
          position={positions[i]}
          imageWidth={imageWidth}
          focalX={focalX}
          cardRef={(el) => {
            cardsRef.current[i] = el;
          }}
          style={{
            opacity: startAnimation ? 1 : 0.95,
            transform: startAnimation ? 'translate3d(0, 0, 0)' : 'translate3d(0, 16px, 0)',
            transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${
              180 + i * 110
            }ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${180 + i * 110}ms`,
            willChange: 'opacity, transform',
          }}
          className="w-full h-11 sm:h-12 md:h-20 shrink-0 rounded-xl md:rounded-2xl overflow-hidden relative shadow-2xs group transition-shadow duration-300 hover:shadow-xs"
        >
          <span className="flex items-center justify-center h-full text-black text-sm sm:text-base md:text-3xl font-bold text-center relative z-10 px-4 select-none tracking-tight">
            {bar}
          </span>
        </MaskedCard>
      ))}

      <MaskedCard
        bgImage={HERO_IMAGE_DIRECT}
        fallbackImage={HERO_IMAGE}
        position={positions[3]}
        imageWidth={imageWidth}
        focalX={focalX}
        cardRef={(el) => {
          cardsRef.current[3] = el;
        }}
        style={{
          opacity: startAnimation ? 1 : 0.95,
          transform: startAnimation
            ? 'translate3d(0, 0, 0) scale(1)'
            : 'translate3d(0, 20px, 0) scale(0.98)',
          transition:
            'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 480ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 480ms',
          willChange: 'opacity, transform',
        }}
        className="w-full flex-1 min-h-[380px] sm:min-h-[420px] md:min-h-0 rounded-2xl md:rounded-2xl overflow-hidden relative shadow-2xs group"
      >
        <div
          style={{
            opacity: startAnimation ? 1 : 0.95,
            transform: startAnimation ? 'translate3d(0, 0, 0)' : 'translate3d(0, 10px, 0)',
            transition:
              'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) 600ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 600ms',
          }}
          className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 md:top-7 md:left-7 text-black text-[11px] sm:text-xs md:text-sm font-semibold leading-[1.3] md:leading-5 max-w-[195px] sm:max-w-[210px] md:max-w-[300px] z-10 drop-shadow-2xs select-none"
        >
          <AnimatedText
            text={'We wish to provide professional\ndental services\nthat match the current\ntechnologies'}
            delay={0.5}
          />
        </div>

        <div
          style={{
            opacity: startAnimation ? 1 : 0.95,
            transition: 'opacity 0.4s ease 550ms',
          }}
          className="absolute bottom-3 left-3 sm:bottom-4 sm:left-3.5 md:bottom-8 md:left-4 z-10 select-none"
        >
          <span className="block text-black text-[11px] sm:text-xs md:text-sm font-bold mb-0.5 md:mb-2 drop-shadow-2xs">
            Trusted Dentist in West New York
          </span>

          <AnimatedText
            text={'Dental\nCare'}
            delay={0.6}
            className="text-black text-[clamp(2.75rem,12.5vw,11rem)] font-bold leading-[0.8] tracking-tight m-0 p-0 drop-shadow-2xs select-none"
          />
        </div>

        <button
          type="button"
          onClick={() => onOpenBooking('Free Consultation')}
          style={{
            opacity: startAnimation ? 1 : 0.95,
            transform: startAnimation ? 'translate3d(0, 0, 0)' : 'translate3d(0, 10px, 0)',
            transition:
              'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) 750ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 750ms',
          }}
          className="absolute bottom-3.5 right-3.5 sm:bottom-4 sm:right-4 md:bottom-10 md:right-8 text-white text-xs md:text-sm font-semibold z-10 select-none cursor-pointer hover:underline transition-all drop-shadow-sm p-0 bg-transparent border-0 md:bg-black/50 md:hover:bg-black md:backdrop-blur-md md:px-4 md:py-2 md:rounded-full dentiva-anim-button"
        >
          <AnimatedText text="Free Consultation" delay={0.7} />
        </button>
      </MaskedCard>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/* 3. Section 2 - Smile Gallery                                                */
/* -------------------------------------------------------------------------- */
interface Section2Props {
  isMobile: boolean;
  onOpenBooking: (treatment?: string) => void;
  onSelectService: (service: ServiceDetail) => void;
}

const Section2: React.FC<Section2Props> = ({ isMobile, onSelectService, onOpenBooking }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  const { positions, recalculate } = useMaskPositions(sectionRef, cardsRef);
  const [sectionHeight, setSectionHeight] = useState(0);

  const s2Reveal = useViewportReveal(0.05, true);

  useEffect(() => {
    if (sectionRef.current) {
      setSectionHeight(sectionRef.current.offsetHeight);
      recalculate();
    }
  }, [recalculate]);

  useEffect(() => {
    const timer = setTimeout(recalculate, 120);
    return () => clearTimeout(timer);
  }, [recalculate]);

  const imageWidth = useImageWidth(SECTION2_IMAGE_DIRECT, sectionHeight);
  const focalX = isMobile ? 0.64 : 0.8;

  const setCombinedRef = useCallback(
    (el: HTMLElement | null) => {
      sectionRef.current = el;
      s2Reveal.containerRef.current = el;
      if (el) {
        setSectionHeight(el.offsetHeight);
      }
    },
    [s2Reveal.containerRef]
  );

  return (
    <section
      id="gallery"
      ref={setCombinedRef}
      className="h-[100dvh] max-h-[100dvh] md:max-h-none md:h-screen w-full overflow-hidden flex flex-col pt-1.5 md:pt-2 px-2.5 sm:px-3 md:px-5 pb-1.5 md:pb-2 gap-1.5 md:gap-2 box-border relative"
    >
      <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 grid-rows-[0.8fr_2fr_1fr_1.6fr] md:grid-rows-[1fr_1fr_0.8fr] gap-1.5 md:gap-2">
        <MaskedCard
          bgImage={SECTION2_IMAGE_DIRECT}
          fallbackImage={SECTION2_IMAGE}
          position={positions[0]}
          imageWidth={imageWidth}
          focalX={focalX}
          cardRef={(el) => {
            cardsRef.current[0] = el;
          }}
          data-reveal
          className={`rounded-xl md:rounded-2xl overflow-hidden relative group transition-all duration-300 ${s2Reveal.getRevealClass()}`}
          style={s2Reveal.getRevealStyle(0, 100)}
        >
          <p className="absolute bottom-3 left-4 md:bottom-6 md:left-7 text-white md:text-black text-xs md:text-sm font-semibold z-10 m-0 drop-shadow-xs">
            Our cosmetic dental work
          </p>
        </MaskedCard>

        <MaskedCard
          bgImage={SECTION2_IMAGE_DIRECT}
          fallbackImage={SECTION2_IMAGE}
          position={positions[1]}
          imageWidth={imageWidth}
          focalX={focalX}
          cardRef={(el) => {
            cardsRef.current[1] = el;
          }}
          data-reveal
          className={`md:row-span-2 rounded-xl md:rounded-2xl overflow-hidden relative group ${s2Reveal.getRevealClass()}`}
          style={s2Reveal.getRevealStyle(1, 100)}
        >
          <div className="absolute bottom-4 left-4 md:bottom-20 md:left-7 text-white text-[11px] sm:text-xs md:text-sm font-semibold leading-[1.3] md:leading-5 z-10 max-w-[190px] sm:max-w-[210px] md:max-w-none drop-shadow-xs">
            If you want a gorgeous smile,
            <br />
            call us to ask about a smile makeover.
          </div>
          <button
            onClick={() => onOpenBooking('Smile Makeover')}
            className="absolute bottom-3.5 right-3.5 md:bottom-6 md:right-6 px-5 py-2.5 md:px-8 md:py-5 bg-white rounded-full text-black text-xs sm:text-sm md:text-xl font-bold z-10 cursor-pointer dentiva-anim-button"
          >
            <AnimatedText text="Call Us" delay={0.2} />
          </button>
        </MaskedCard>

        <MaskedCard
          bgImage={SECTION2_IMAGE_DIRECT}
          fallbackImage={SECTION2_IMAGE}
          position={positions[2]}
          imageWidth={imageWidth}
          focalX={focalX}
          cardRef={(el) => {
            cardsRef.current[2] = el;
          }}
          data-reveal
          className={`rounded-xl md:rounded-2xl overflow-hidden relative group ${s2Reveal.getRevealClass()}`}
          style={s2Reveal.getRevealStyle(2, 100)}
        >
          <AnimatedText
            text={'Smile\nmakeover'}
            className="absolute top-2.5 left-4 md:top-6 md:left-7 text-white md:text-black text-[clamp(2.75rem,8.5vw,6rem)] font-bold leading-[0.88] z-10 m-0 select-none drop-shadow-xs"
          />
        </MaskedCard>

        <MaskedCard
          bgImage={SECTION2_IMAGE_DIRECT}
          fallbackImage={SECTION2_IMAGE}
          position={positions[3]}
          imageWidth={imageWidth}
          focalX={focalX}
          cardRef={(el) => {
            cardsRef.current[3] = el;
          }}
          data-reveal
          className={`col-span-1 md:col-span-2 rounded-xl md:rounded-2xl overflow-hidden relative ${s2Reveal.getRevealClass()}`}
          style={s2Reveal.getRevealStyle(3, 100)}
        >
          <div className="absolute inset-0 z-10 grid grid-cols-2 grid-rows-2 md:flex md:flex-nowrap gap-1.5 md:gap-2 p-1.5 md:p-2.5">
            {servicesData.map((svc) => (
              <div
                key={svc.id}
                onClick={() => onSelectService(svc)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    onSelectService(svc);
                  }
                }}
                className={`rounded-xl md:rounded-2xl p-2.5 sm:p-3 md:p-5 flex flex-col justify-between cursor-pointer select-none dentiva-anim-card ${
                  svc.active
                    ? 'bg-[#f7f4ee]/95 backdrop-blur-md shadow-xs'
                    : 'bg-white/25 backdrop-blur-md hover:bg-white/35'
                }`}
              >
                <h3
                  className={`text-base sm:text-lg md:text-3xl font-bold leading-[1.08] whitespace-pre-line m-0 ${
                    svc.active ? 'text-black' : 'text-white'
                  }`}
                >
                  {svc.name}
                </h3>
                {svc.num ? (
                  <div
                    className={`self-end w-6 h-6 sm:w-7 sm:h-7 md:w-11 md:h-11 rounded-full border flex items-center justify-center text-[10px] sm:text-xs md:text-sm font-semibold select-none ${
                      svc.active ? 'border-black text-black' : 'border-white text-white'
                    }`}
                  >
                    {svc.num}
                  </div>
                ) : (
                  <div className="self-end w-6 h-6 sm:w-7 sm:h-7 md:w-11 md:h-11 rounded-full border border-white/40 flex items-center justify-center text-white/80 text-[10px] sm:text-xs">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 6h8m0 0L7 3m3 3L7 9"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </MaskedCard>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/* 4. Section 3 - Implant Dentistry                                           */
/* -------------------------------------------------------------------------- */
interface Section3Props {
  onOpenBooking: (treatment?: string) => void;
  onOpenGuide: (guide: InfoGuide) => void;
}

const Section3: React.FC<Section3Props> = ({ onOpenBooking, onOpenGuide }) => {
  const s3Reveal = useViewportReveal(0.05, true);

  return (
    <section
      id="services"
      ref={s3Reveal.containerRef as React.RefObject<HTMLElement>}
      className="min-h-screen md:h-screen w-full overflow-hidden flex flex-col pt-1.5 md:pt-2 px-2.5 sm:px-3 md:px-5 pb-1.5 md:pb-2 gap-1.5 md:gap-2 box-border relative"
    >
      <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 gap-1.5 md:gap-2">
        <div className="flex flex-col gap-1.5 md:gap-2">
          <div
            data-reveal
            className={`rounded-xl md:rounded-2xl bg-stone-50 p-5 md:p-7 flex flex-col justify-between flex-[1.2] min-h-[170px] md:min-h-0 ${s3Reveal.getRevealClass()}`}
            style={s3Reveal.getRevealStyle(0, 100)}
          >
            <AnimatedText
              text={'Implant\nDentistry'}
              className="text-[clamp(2.75rem,7vw,6.5rem)] font-bold leading-[0.95] text-black m-0"
            />
            <p className="text-xs md:text-sm font-semibold text-black m-0">
              Restore Missing Teeth
            </p>
          </div>

          <div
            data-reveal
            className={`flex gap-1.5 md:gap-2 flex-1 min-h-[140px] md:min-h-0 ${s3Reveal.getRevealClass()}`}
            style={s3Reveal.getRevealStyle(1, 100)}
          >
            <div className="flex-1 rounded-xl md:rounded-2xl bg-neutral-200 relative shadow-2xs dentiva-image-frame">
              <img
                src={SECTION3_IMG1_DIRECT}
                onError={(e) => {
                  if (e.currentTarget.src !== SECTION3_IMG1) {
                    e.currentTarget.src = SECTION3_IMG1;
                  }
                }}
                alt="Dental implant procedure"
                className="w-full h-full object-cover dentiva-anim-image"
                loading="lazy"
              />
            </div>
            <div className="flex-1 rounded-xl md:rounded-2xl bg-neutral-200 relative shadow-2xs dentiva-image-frame">
              <img
                src={SECTION3_IMG2_DIRECT}
                onError={(e) => {
                  if (e.currentTarget.src !== SECTION3_IMG2) {
                    e.currentTarget.src = SECTION3_IMG2;
                  }
                }}
                alt="Dental restoration"
                className="w-full h-full object-cover dentiva-anim-image"
                loading="lazy"
              />
            </div>
          </div>

          <div
            data-reveal
            className={`rounded-xl md:rounded-2xl bg-zinc-200 p-5 md:p-7 flex items-end justify-between flex-[0.8] min-h-[150px] md:min-h-0 transition-all duration-300 hover:shadow-2xs ${s3Reveal.getRevealClass()}`}
            style={s3Reveal.getRevealStyle(2, 100)}
          >
            <div className="flex flex-col">
              <p className="text-xs md:text-sm font-semibold text-black mb-2 md:mb-3">
                Consultation
              </p>
              <h3 className="text-xl md:text-3xl font-bold text-black leading-6 md:leading-8 m-0">
                Dental
                <br />
                Restoration
                <br />
                Services
              </h3>
            </div>
            <button
              type="button"
              onClick={() => onOpenBooking('Dental Restoration Services')}
              className="px-5 py-3 md:px-8 md:py-5 bg-white rounded-full text-black text-sm md:text-xl font-bold cursor-pointer dentiva-anim-button"
            >
              <AnimatedText text="Book Online" delay={0.2} />
            </button>
          </div>
        </div>

        <div
          data-reveal
          className={`rounded-xl md:rounded-2xl relative min-h-[350px] md:min-h-0 bg-neutral-200 shadow-2xs dentiva-image-frame ${s3Reveal.getRevealClass()}`}
          style={s3Reveal.getRevealStyle(3, 100)}
        >
          <img
            src={SECTION3_BG_DIRECT}
            onError={(e) => {
              if (e.currentTarget.src !== SECTION3_BG) {
                e.currentTarget.src = SECTION3_BG;
              }
            }}
            alt="Smiling patient with healthy dental restoration"
            className="w-full h-full object-cover dentiva-anim-image"
            loading="lazy"
          />

          <div className="absolute bottom-3 left-3 right-3 md:bottom-5 md:left-5 md:right-5 flex gap-1.5 md:gap-2 z-20">
            <div
              onClick={() => onOpenGuide(IMPLANT_PROCESS_GUIDE)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onOpenGuide(IMPLANT_PROCESS_GUIDE);
                }
              }}
              className="flex-1 bg-white rounded-xl md:rounded-2xl p-3 md:p-5 flex flex-col justify-between h-36 md:h-52 cursor-pointer dentiva-anim-card group/btn"
            >
              <h4 className="text-base sm:text-lg md:text-2xl font-bold text-black leading-5 md:leading-7 m-0">
                The Process
                <br />
                of Installing
                <br />
                Implants
              </h4>
              <button
                type="button"
                aria-label="The Process of Installing Implants"
                className="self-end w-8 h-8 md:w-12 md:h-12 rounded-full border border-black flex items-center justify-center transition-all duration-300 group-hover/btn:bg-black group-hover/btn:text-white cursor-pointer"
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="rotate-[-45deg] transition-transform duration-300 group-hover/btn:rotate-0"
                >
                  <path
                    d="M1 7h12m0 0L8 2m5 5L8 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div
              onClick={() => onOpenGuide(IMPLANT_CARE_GUIDE)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onOpenGuide(IMPLANT_CARE_GUIDE);
                }
              }}
              className="flex-1 bg-white/25 backdrop-blur-xl rounded-xl md:rounded-2xl p-3 md:p-5 flex flex-col justify-between h-36 md:h-52 cursor-pointer border border-white/20 dentiva-anim-card group/care"
            >
              <h4 className="text-base sm:text-lg md:text-2xl font-bold text-white leading-5 md:leading-7 m-0 drop-shadow-xs">
                Caring
                <br />
                for Dental
                <br />
                Implants
              </h4>
              <button
                type="button"
                aria-label="Caring for Dental Implants"
                className="self-end w-8 h-8 md:w-12 md:h-12 rounded-full border border-white text-white flex items-center justify-center transition-all duration-300 group-hover/care:bg-white group-hover/care:text-black cursor-pointer shadow-2xs"
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="rotate-[-45deg] text-white group-hover/care:text-black transition-transform duration-300 group-hover/care:rotate-0"
                >
                  <path
                    d="M1 7h12m0 0L8 2m5 5L8 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/* 5. Treatments / Services - Optimized TreatmentCardStack                    */
/* -------------------------------------------------------------------------- */
const POSITIONS = [
  { x: 0, y: 0, scale: 1, rotate: 0, z: 40, opacity: 1 },
  { x: 86, y: 12, scale: 0.88, rotate: 5, z: 30, opacity: 1 },
  { x: 145, y: 28, scale: 0.76, rotate: 9, z: 20, opacity: 0.95 },
  { x: -86, y: 12, scale: 0.88, rotate: -5, z: 30, opacity: 1 },
  { x: -145, y: 28, scale: 0.76, rotate: -9, z: 20, opacity: 0.95 },
];

interface TreatmentCardItemProps {
  treatment: ServiceDetail;
  isCenter: boolean;
  pos: typeof POSITIONS[0];
  zIndex: number;
  xOffset: number;
  onCardClick: () => void;
  onBookClick: (e: React.MouseEvent) => void;
}

const TreatmentCardItem = React.memo<TreatmentCardItemProps>(({
  treatment,
  isCenter,
  pos,
  zIndex,
  xOffset,
  onCardClick,
  onBookClick,
}) => {
  return (
    <article
      onClick={onCardClick}
      className={`
        absolute
        left-1/2
        top-1/2
        w-[270px]
        sm:w-[320px]
        cursor-pointer
        overflow-hidden
        rounded-[28px]
        border
        border-black/10
        bg-white
        shadow-[0_20px_60px_rgba(0,0,0,0.12)]
        will-change-transform
        ${isCenter ? 'ring-2 ring-black/15 shadow-[0_28px_70px_rgba(0,0,0,0.18)]' : 'hover:border-black/30'}
      `}
      style={{
        transform: `translate3d(calc(-50% + ${xOffset}px), calc(-50% + ${pos.y}px), 0) scale(${pos.scale}) rotate(${pos.rotate}deg)`,
        zIndex,
        opacity: pos.opacity,
        transformStyle: 'preserve-3d',
        transition: 'transform 700ms cubic-bezier(0.22, 1, 0.36, 1), opacity 700ms cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
        <img
          src={treatment.image}
          onError={(e) => {
            if (treatment.fallbackImage && e.currentTarget.src !== treatment.fallbackImage) {
              e.currentTarget.src = treatment.fallbackImage;
            }
          }}
          alt={treatment.title}
          className="h-full w-full object-cover"
          style={{
            transform: isCenter ? 'scale(1)' : 'scale(1.04)',
            transition: 'transform 700ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
          draggable={false}
          loading="lazy"
        />

        {treatment.num && (
          <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-md text-[10px] md:text-xs font-bold text-black select-none shadow-xs">
            {treatment.num}
          </div>
        )}

        <div className="absolute inset-0 bg-black/[0.03]" />
      </div>

      <div className="p-5 sm:p-6 flex flex-col justify-between">
        <div>
          <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
            Dental Treatment
          </p>

          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-black leading-tight">
            {treatment.title}
          </h3>

          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-neutral-600 line-clamp-2">
            {treatment.description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
          <span className="text-xs font-bold text-black uppercase tracking-wider group-hover:underline">
            Explore Details →
          </span>
          <button
            type="button"
            onClick={onBookClick}
            className="px-3.5 py-1.5 rounded-full bg-stone-100 text-black text-[11px] font-bold uppercase hover:bg-black hover:text-white transition-colors"
          >
            Book
          </button>
        </div>
      </div>
    </article>
  );
});
TreatmentCardItem.displayName = 'TreatmentCardItem';

interface TreatmentsSectionProps {
  isMobile: boolean;
  onSelectService: (service: ServiceDetail) => void;
  onOpenBooking: (treatment?: string) => void;
}

const TreatmentsSection: React.FC<TreatmentsSectionProps> = ({
  isMobile,
  onSelectService,
  onOpenBooking,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const tReveal = useViewportReveal(0.15, true);
  const total = servicesData.length;

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInViewRef = useRef(true);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting;
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (total <= 1) return;

    const interval = setInterval(() => {
      if (isInViewRef.current && !isHoveredRef.current) {
        setActiveIndex((current) => (current + 1) % total);
      }
    }, 2600);

    return () => clearInterval(interval);
  }, [total]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    },
    [handlePrev, handleNext]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleMouseEnter = useCallback(() => {
    isHoveredRef.current = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    isHoveredRef.current = false;
  }, []);

  const visibleCards = useMemo(() => {
    const visibleCount = Math.min(total, 5);
    const cards = [];
    for (let relIdx = 0; relIdx < visibleCount; relIdx++) {
      const actualIndex = (activeIndex + relIdx) % total;
      const treatment = servicesData[actualIndex];
      const pos = POSITIONS[relIdx] ?? POSITIONS[4];
      const isCenter = relIdx === 0;
      const xOffset = isMobile ? pos.x * 0.72 : pos.x;

      cards.push({
        treatment,
        actualIndex,
        isCenter,
        pos,
        zIndex: total - relIdx,
        xOffset,
      });
    }
    return cards;
  }, [activeIndex, total, isMobile]);

  const activeTreatment = servicesData[activeIndex];

  return (
    <section
      id="treatments"
      ref={tReveal.containerRef as React.RefObject<HTMLElement>}
      className="min-h-screen w-full overflow-hidden flex flex-col justify-between pt-16 md:pt-20 px-3 md:px-6 pb-8 box-border bg-stone-50/70 relative select-none"
    >
      <div className="text-center max-w-2xl mx-auto pt-4 md:pt-6">
        <span className="text-[10px] md:text-xs uppercase font-extrabold tracking-widest text-neutral-500 block mb-1">
          Specialized Clinical Care
        </span>

        <AnimatedText
          text="Featured Treatments"
          className="text-3xl md:text-5xl font-extrabold text-black tracking-tight leading-none mb-2"
        />

        <p className="text-xs md:text-sm text-neutral-600 font-medium max-w-md mx-auto">
          Explore our tailored dental solutions combining precision engineering with aesthetic perfection.
        </p>
      </div>

      <div
        ref={sectionRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="w-full flex-1 flex flex-col items-center justify-center my-4 md:my-6 relative"
      >
        <div
          className="relative mx-auto flex h-[460px] sm:h-[500px] md:h-[520px] w-full max-w-[460px] items-center justify-center"
          style={{ perspective: '1200px' }}
        >
          {visibleCards.map(({ treatment, actualIndex, isCenter, pos, zIndex, xOffset }) => (
            <TreatmentCardItem
              key={treatment.id}
              treatment={treatment}
              isCenter={isCenter}
              pos={pos}
              zIndex={zIndex}
              xOffset={xOffset}
              onCardClick={() => {
                if (!isCenter) {
                  setActiveIndex(actualIndex);
                } else {
                  onSelectService(treatment);
                }
              }}
              onBookClick={(e) => {
                e.stopPropagation();
                onOpenBooking(treatment.title);
              }}
            />
          ))}
        </div>

        <div className="flex items-center gap-4 mt-4 z-30">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Treatment"
            className="group w-10 h-10 md:w-11 md:h-11 rounded-full border border-black/20 bg-white/95 backdrop-blur-md flex items-center justify-center text-black hover:bg-black hover:text-white transition-all duration-300 shadow-2xs cursor-pointer dentiva-anim-button"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="transition-transform duration-300 group-hover:-translate-x-0.5"
            >
              <path d="M10 13L5 8L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/5 backdrop-blur-sm">
            {servicesData.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to ${s.displayName}`}
                className={`transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] rounded-full cursor-pointer ${
                  idx === activeIndex
                    ? 'w-7 h-2 bg-black shadow-2xs'
                    : 'w-2 h-2 bg-black/25 hover:bg-black/60'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Treatment"
            className="group w-10 h-10 md:w-11 md:h-11 rounded-full border border-black/20 bg-white/95 backdrop-blur-md flex items-center justify-center text-black hover:bg-black hover:text-white transition-all duration-300 shadow-2xs cursor-pointer dentiva-anim-button"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            >
              <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className="max-w-xl mx-auto w-full text-center px-4 pt-1 z-30">
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => onSelectService(activeTreatment)}
            className="px-6 py-3 md:px-8 md:py-3.5 bg-black rounded-full text-white text-xs md:text-sm font-bold uppercase tracking-wider cursor-pointer dentiva-anim-button"
          >
            <AnimatedText text="View Treatment Details" delay={0.15} />
          </button>
          <button
            type="button"
            onClick={() => onOpenBooking(activeTreatment.displayName)}
            className="px-6 py-3 md:px-8 md:py-3.5 rounded-full border border-black text-black text-xs md:text-sm font-bold uppercase tracking-wider hover:bg-black hover:text-white cursor-pointer dentiva-anim-button"
          >
            <AnimatedText text="Book Now" delay={0.2} />
          </button>
        </div>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/* 6. About Dentist Section                                                    */
/* -------------------------------------------------------------------------- */
interface AboutDentistSectionProps {
  onOpenBooking: (treatment?: string) => void;
  onOpenDoctorProfile: () => void;
}

const AboutDentistSection: React.FC<AboutDentistSectionProps> = ({
  onOpenDoctorProfile,
}) => {
  const aboutReveal = useViewportReveal(0.05, true);

  return (
    <section
      id="about"
      ref={aboutReveal.containerRef as React.RefObject<HTMLElement>}
      className="w-full overflow-hidden flex flex-col pt-1.5 md:pt-2 px-2.5 sm:px-3 md:px-5 pb-1.5 md:pb-2 box-border relative"
    >
      <div className="w-full bg-stone-50 rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 border border-neutral-200/60 shadow-xs relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5 relative w-full flex flex-col">
            <div
              onClick={onOpenDoctorProfile}
              className="w-full h-[360px] sm:h-[430px] md:h-[480px] lg:h-[540px] rounded-2xl bg-neutral-200 relative group shadow-md cursor-pointer dentiva-image-frame"
            >
              <img
                src={DENTIST_PORTRAIT}
                alt="Dr. Julian Sterling"
                className="w-full h-full object-cover object-top select-none pointer-events-none dentiva-anim-image"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-black text-[11px] font-bold shadow-md">
                  View Full Profile ↗
                </span>
              </div>
            </div>

            <div
              onClick={onOpenDoctorProfile}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onOpenDoctorProfile();
              }}
              className="-mt-12 sm:-mt-14 md:-mt-16 lg:mt-0 lg:absolute lg:-bottom-5 lg:-right-6 z-20 mx-3 sm:mx-4 lg:mx-0 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-black/10 shadow-xl lg:max-w-[320px] cursor-pointer dentiva-anim-card"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-500">
                  Lead Prosthodontist & Surgeon
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-black leading-tight mb-1">
                Dr. Julian Sterling, DDS
              </h3>
              <p className="text-xs text-neutral-600 font-medium leading-relaxed">
                Columbia University Graduate • Fellow of the American Academy of Cosmetic Dentistry
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between pt-2 lg:pt-0 lg:pl-2">
            <div>
              <span className="text-[10px] md:text-xs uppercase font-extrabold tracking-[0.25em] text-neutral-500 block mb-2">
                CLINICAL MASTERY & ARTISTRY
              </span>

              <AnimatedText
                text={'About Your\nDentist'}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-black tracking-tight leading-[0.98] mb-4"
              />

              <div className="space-y-3 max-w-xl text-neutral-700 text-xs sm:text-sm md:text-base leading-relaxed font-normal">
                <p>
                  Combining microsurgical precision with an artist’s eye for natural symmetry, Dr. Julian Sterling delivers bespoke aesthetic transformations and permanent implant restorations designed around individual facial harmony.
                </p>
                <p className="hidden sm:block text-neutral-600">
                  Every smile is designed utilizing 3D CBCT digital planning, biomimetic ceramic layering, and tissue-preserving protocols to ensure lifelike radiance and durability.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-4 py-5 md:py-6 my-4 border-y border-neutral-200/90">
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl md:text-4xl font-black text-black tracking-tight leading-none mb-1">
                  15+
                </span>
                <span className="text-[11px] sm:text-xs font-bold text-black leading-tight">
                  Years of Practice
                </span>
                <span className="text-[9px] sm:text-[10px] text-neutral-500 mt-0.5 leading-tight">
                  Prosthodontics
                </span>
              </div>

              <div className="flex flex-col border-x border-neutral-200/80 px-2 sm:px-4">
                <span className="text-2xl sm:text-3xl md:text-4xl font-black text-black tracking-tight leading-none mb-1">
                  4.8k+
                </span>
                <span className="text-[11px] sm:text-xs font-bold text-black leading-tight">
                  Smiles Restored
                </span>
                <span className="text-[9px] sm:text-[10px] text-neutral-500 mt-0.5 leading-tight">
                  Veneers & Implants
                </span>
              </div>

              <div className="flex flex-col pl-2 sm:pl-0">
                <span className="text-2xl sm:text-3xl md:text-4xl font-black text-black tracking-tight leading-none mb-1">
                  99.4%
                </span>
                <span className="text-[11px] sm:text-xs font-bold text-black leading-tight">
                  Clinical Success
                </span>
                <span className="text-[9px] sm:text-[10px] text-neutral-500 mt-0.5 leading-tight">
                  Guided 3D Protocol
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-1">
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 mb-0.5">
                  Direct Specialist Consultation
                </p>
                <p className="text-xs md:text-sm font-semibold text-black">
                  West New York Private Practice
                </p>
              </div>

              <button
                type="button"
                onClick={onOpenDoctorProfile}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4 bg-black rounded-full text-white text-xs md:text-sm font-bold uppercase tracking-wider cursor-pointer select-none dentiva-anim-button"
              >
                <AnimatedText text="Meet The Dentist" delay={0.15} />
                <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/* 7. Testimonials (Fixed CSS transform stacked cards)                         */
/* -------------------------------------------------------------------------- */
export const ReviewStars: React.FC<{ rating: number; maxRating?: number; className?: string }> = ({
  rating,
  maxRating = 5,
  className = '',
}) => {
  const filledStars = Math.floor(rating);
  const fractionalPart = rating - filledStars;
  const emptyStars = maxRating - filledStars - (fractionalPart > 0 ? 1 : 0);

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center">
        {[...Array(filledStars)].map((_, index) => (
          <svg
            key={`filled-${index}`}
            className="w-4 h-4 text-amber-500 fill-current"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
          </svg>
        ))}
        {fractionalPart > 0 && (
          <svg className="w-4 h-4 text-amber-500 fill-current" viewBox="0 0 20 20">
            <defs>
              <linearGradient id="half">
                <stop offset={`${fractionalPart * 100}%`} stopColor="currentColor" />
                <stop offset={`${fractionalPart * 100}%`} stopColor="#e5e7eb" />
              </linearGradient>
            </defs>
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z"
              fill="url(#half)"
            />
          </svg>
        )}
        {[...Array(emptyStars)].map((_, index) => (
          <svg
            key={`empty-${index}`}
            className="w-4 h-4 text-neutral-300 fill-current"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
          </svg>
        ))}
      </div>
      <span className="text-xs font-bold text-neutral-800">{rating.toFixed(1)}</span>
    </div>
  );
};

interface ResultsSectionProps {
  onOpenBooking: (treatment?: string) => void;
  onSelectServiceByName: (serviceName: string) => void;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({
  onOpenBooking,
  onSelectServiceByName,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile();
  const totalCards = TESTIMONIALS_DATA.length;

  const handleManualSelect = (idx: number) => {
    setActiveIndex(idx);
  };

  const handleNext = () => setActiveIndex((p) => (p + 1) % totalCards);
  const handlePrev = () => setActiveIndex((p) => (p - 1 + totalCards) % totalCards);

  // Swipe support
  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => (touchStartX.current = e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartX.current) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) handleNext();
    else if (diff < -40) handlePrev();
    touchStartX.current = null;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'ArrowLeft') handlePrev();
  };

  return (
    <section
      id="results"
      className="relative w-full bg-stone-50/70 select-none py-14 sm:py-16 md:py-24 overflow-x-clip flex flex-col items-center justify-center gap-8 sm:gap-10 md:gap-12"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="relative text-center max-w-3xl mx-auto px-4 shrink-0 z-30">
        <div className="inline-flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-[10px] md:text-xs uppercase font-extrabold tracking-[0.25em] text-neutral-500">
            PATIENT EXPERIENCES
          </span>
        </div>

        <AnimatedText
          text={'Smiles That Speak\nFor Themselves.'}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-black tracking-tight leading-[1.02] mb-2"
        />

        <p className="text-xs md:text-sm text-neutral-600 font-medium max-w-md mx-auto leading-relaxed">
          Real stories from our patients experiencing life-changing precision dentistry and facial harmony.
        </p>
      </div>

      <div
        className="relative isolate z-10 w-full max-w-[540px] mx-auto px-4 sm:px-0 pt-6 pb-10 sm:pb-12 grid place-items-stretch"
        style={{ perspective: '1100px' }}
      >
        {TESTIMONIALS_DATA.map((testimonial, index) => {
          let diff = index - activeIndex;
          // Circular stack indexing so cards cycle smoothly
          if (diff < -Math.floor(totalCards / 2)) diff += totalCards;
          if (diff > Math.floor(totalCards / 2)) diff -= totalCards;

          const isPassed = diff < 0;
          const isActive = diff === 0;

          // Clean pixel offsets keep back cards neatly peeking underneath without colliding with controls
          const stepY = isMobile ? 14 : 18;
          const yPx = isPassed ? -28 : diff * stepY;
          const dynamicScale = isPassed ? 0.96 : Math.max(1 - diff * 0.045, 0.88);
          const opacity = isPassed ? 0 : Math.max(1 - diff * 0.18, 0.55);
          const zIndex = isPassed ? 0 : 30 - diff * 10;

          return (
            <div
              key={testimonial.id}
              role="article"
              aria-hidden={!isActive}
              aria-label={`Testimonial from ${testimonial.name}`}
              onClick={() => {
                if (isPassed) return;
                if (isActive) onSelectServiceByName(testimonial.treatmentCategory);
                else handleManualSelect(index);
              }}
              style={{
                zIndex,
                transform: `translate3d(0, ${yPx}px, 0) scale(${dynamicScale})`,
                opacity,
                pointerEvents: isPassed ? 'none' : 'auto',
                transition: 'transform 500ms cubic-bezier(0.22, 1, 0.36, 1), opacity 420ms ease',
                willChange: 'transform, opacity',
              }}
              className={`col-start-1 row-start-1 w-full rounded-3xl border bg-white p-5 sm:p-7 md:p-8 flex flex-col justify-between cursor-pointer shadow-xl ${
                isActive
                  ? 'border-neutral-200/90 hover:border-black/30'
                  : 'border-neutral-200/70 hover:border-black/25'
              }`}
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-stone-100 border border-neutral-200 text-[10px] md:text-xs font-bold uppercase tracking-wider text-black transition-colors hover:bg-neutral-200">
                    {testimonial.treatmentCategory}
                  </span>
                  <span className="text-[10px] md:text-xs font-bold text-neutral-400">
                    {testimonial.duration}
                  </span>
                </div>

                <ReviewStars rating={testimonial.rating} className="mb-4" />

                <blockquote className="text-sm sm:text-base md:text-lg text-neutral-800 font-medium leading-relaxed italic mb-6">
                  "{testimonial.description}"
                </blockquote>
              </div>

              <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 pt-4 border-t border-neutral-100 group">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 border-white shadow-sm bg-neutral-200 shrink-0 dentiva-image-frame">
                    <img
                      src={testimonial.image}
                      onError={(e) => {
                        if (testimonial.fallbackImage && e.currentTarget.src !== testimonial.fallbackImage) {
                          e.currentTarget.src = testimonial.fallbackImage;
                        }
                      }}
                      alt={testimonial.name}
                      className="w-full h-full object-cover dentiva-anim-image"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm sm:text-base font-bold text-black leading-tight truncate">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs text-neutral-500 font-medium truncate">
                      {testimonial.profession}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-black uppercase tracking-wider group-hover:underline shrink-0">
                  <span>Explore Treatment</span>
                  <span className="text-sm transform group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="relative shrink-0 flex flex-col items-center gap-4 z-30 pt-2">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Testimonial"
            className="w-9 h-9 rounded-full flex items-center justify-center border border-black/10 bg-white shadow-sm hover:bg-black hover:text-white transition-colors cursor-pointer"
          >
            ←
          </button>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 backdrop-blur-md">
            {TESTIMONIALS_DATA.map((t, idx) => (
              <button
                key={t.id}
                type="button"
                onClick={() => handleManualSelect(idx)}
                aria-label={`Go to testimonial by ${t.name}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  idx === activeIndex
                    ? 'w-7 h-2 bg-black shadow-xs'
                    : 'w-2 h-2 bg-black/25 hover:bg-black/60'
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Testimonial"
            className="w-9 h-9 rounded-full flex items-center justify-center border border-black/10 bg-white shadow-sm hover:bg-black hover:text-white transition-colors cursor-pointer"
          >
            →
          </button>
        </div>

        <button
          type="button"
          onClick={() => onOpenBooking('Smile Makeover')}
          className="px-6 py-2.5 sm:px-8 sm:py-3 rounded-full bg-black text-white text-xs sm:text-sm font-bold uppercase tracking-wider cursor-pointer dentiva-anim-button"
        >
          <AnimatedText text="Book Your Transformation" delay={0.15} />
        </button>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/* 8. Contact Section (Compact on mobile)                                      */
/* -------------------------------------------------------------------------- */
const ContactSection: React.FC = () => {
  const contactReveal = useViewportReveal(0.05, true);

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [treatment, setTreatment] = useState('Dental Veneers');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) return;
    setSubmitted(true);
  };

  const contactHighlights = [
    'Same-Day Emergency',
    '3D CBCT Scans',
    'Private Suite Care',
    'Flexible Financing',
  ];

  return (
    <section
      id="contact"
      ref={contactReveal.containerRef as React.RefObject<HTMLElement>}
      className="w-full overflow-hidden flex flex-col pt-1.5 md:pt-2 px-2.5 sm:px-3 md:px-5 pb-1.5 md:pb-2 box-border relative"
    >
      <div className="w-full bg-[#f1f1ef] rounded-2xl md:rounded-[2.5rem] p-3.5 sm:p-6 md:p-8 lg:p-12 border border-neutral-200/80 shadow-xs relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4 sm:space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] md:text-xs uppercase font-extrabold tracking-[0.25em] text-neutral-500">
                  GET IN TOUCH • WEST NEW YORK
                </span>
              </div>

              <AnimatedText
                text={'Ready for a\nhealthier smile?'}
                className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-black tracking-tight leading-[0.98] mb-2 sm:mb-4"
              />

              <p className="text-xs sm:text-sm md:text-base text-neutral-600 font-normal leading-relaxed max-w-lg mb-3 sm:mb-6">
                From advanced porcelain veneers and computer-guided implants to preventive smile architecture, our dental team delivers world-class precision tailored to your facial harmony.
              </p>

              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-6">
                {contactHighlights.map((chip, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/80 border border-neutral-300/80 text-[10px] sm:text-[11px] md:text-xs font-semibold text-neutral-800 shadow-2xs backdrop-blur-xs select-none transition-all duration-200 hover:border-black/50"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2.5 sm:space-y-4 pt-3 sm:pt-4 border-t border-neutral-300/60">
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <a
                  href={CLINIC_PHONE_TEL}
                  className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/90 border border-neutral-200/90 group flex flex-col dentiva-anim-card"
                >
                  <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-neutral-400 group-hover:text-black transition-colors">
                    Phone Call
                  </span>
                  <span className="text-xs sm:text-base font-bold text-black mt-0.5 truncate">
                    {CLINIC_PHONE}
                  </span>
                </a>

                <a
                  href={CLINIC_WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/90 border border-neutral-200/90 group flex flex-col dentiva-anim-card"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-neutral-400 group-hover:text-black transition-colors">
                      WhatsApp
                    </span>
                    <span className="text-[11px] sm:text-xs font-bold text-black">↗</span>
                  </div>
                  <span className="text-xs sm:text-base font-bold text-black mt-0.5 truncate">
                    Chat Reception
                  </span>
                </a>
              </div>

              <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/70 border border-neutral-200/70 text-[11px] sm:text-xs text-neutral-600 space-y-0.5 sm:space-y-1">
                <p className="font-bold text-black">{CLINIC_ADDRESS}</p>
                <p className="text-neutral-500 text-[10px] sm:text-xs">
                  Mon – Fri: 8:00 AM – 6:00 PM • Sat: 9:00 AM – 2:00 PM (Emergency 24/7)
                </p>
              </div>

              <div className="flex items-center gap-2 sm:gap-2.5 pt-0.5 sm:pt-1">
                <a
                  href={CLINIC_PHONE_TEL}
                  aria-label="Call clinic"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-black/20 bg-white flex items-center justify-center text-black hover:bg-black hover:text-white cursor-pointer dentiva-anim-button"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </a>

                <a
                  href={CLINIC_WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Message on WhatsApp"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-black/20 bg-white flex items-center justify-center text-black hover:bg-black hover:text-white cursor-pointer dentiva-anim-button"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </a>

                <a
                  href={`mailto:${CLINIC_EMAIL}`}
                  aria-label="Send Email"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-black/20 bg-white flex items-center justify-center text-black hover:bg-black hover:text-white cursor-pointer dentiva-anim-button"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white rounded-xl sm:rounded-2xl md:rounded-3xl p-3.5 sm:p-8 lg:p-10 shadow-2xs border border-neutral-200/90 flex flex-col justify-between">
            {submitted ? (
              <div className="py-8 sm:py-12 text-center flex flex-col items-center justify-center my-auto">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-black text-white flex items-center justify-center mb-4 sm:mb-6 shadow-md">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="sm:w-6 sm:h-6">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-emerald-600 mb-1">
                  Request Confirmed
                </span>
                <h3 className="text-xl sm:text-3xl font-extrabold text-black mb-2 sm:mb-3">
                  Thank You, {fullName}!
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 max-w-sm mb-4 sm:mb-6 leading-relaxed">
                  Our clinical patient coordinator will call you at <span className="font-semibold text-black">{phone}</span> to finalize your <span className="font-semibold text-black">{treatment}</span> consultation.
                </p>
                <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 w-full max-w-xs">
                  <a
                    href={CLINIC_PHONE_TEL}
                    className="flex-1 py-2.5 sm:py-3 bg-neutral-100 text-black rounded-full font-bold text-xs uppercase tracking-wider text-center cursor-pointer dentiva-anim-button"
                  >
                    Call Clinic
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFullName('');
                      setPhone('');
                      setEmail('');
                      setMessage('');
                    }}
                    className="flex-1 py-2.5 sm:py-3 bg-black text-white rounded-full font-bold text-xs uppercase tracking-wider text-center cursor-pointer dentiva-anim-button"
                  >
                    New Request
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-3 sm:mb-6">
                  <span className="text-[9px] sm:text-[10px] uppercase font-extrabold tracking-widest text-neutral-400 block mb-0.5 sm:mb-1">
                    APPOINTMENT DESK
                  </span>
                  <h3 className="text-xl sm:text-3xl font-black tracking-tight text-black leading-tight">
                    Book Your Consultation
                  </h3>
                  <p className="text-[11px] sm:text-xs text-neutral-500 mt-0.5 sm:mt-1">
                    Leave your details and our team will get back to you within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3.5">
                    <div>
                      <label className="block text-[10px] sm:text-[11px] font-extrabold text-black uppercase tracking-wider mb-1 sm:mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Elena Vance"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-3 py-2 sm:px-4 sm:py-3 min-h-[44px] rounded-lg sm:rounded-xl border border-neutral-300 text-black text-xs sm:text-sm focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition-all duration-200 bg-stone-50/50 hover:border-neutral-400"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] sm:text-[11px] font-extrabold text-black uppercase tracking-wider mb-1 sm:mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="(201) 555-0199"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 sm:px-4 sm:py-3 min-h-[44px] rounded-lg sm:rounded-xl border border-neutral-300 text-black text-xs sm:text-sm focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition-all duration-200 bg-stone-50/50 hover:border-neutral-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3.5">
                    <div>
                      <label className="block text-[10px] sm:text-[11px] font-extrabold text-black uppercase tracking-wider mb-1 sm:mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 sm:px-4 sm:py-3 min-h-[44px] rounded-lg sm:rounded-xl border border-neutral-300 text-black text-xs sm:text-sm focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition-all duration-200 bg-stone-50/50 hover:border-neutral-400"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] sm:text-[11px] font-extrabold text-black uppercase tracking-wider mb-1 sm:mb-1.5">
                        Select Treatment
                      </label>
                      <select
                        value={treatment}
                        onChange={(e) => setTreatment(e.target.value)}
                        className="w-full px-3 py-2 sm:px-4 sm:py-3 min-h-[44px] rounded-lg sm:rounded-xl border border-neutral-300 text-black text-xs sm:text-sm focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition-all duration-200 bg-white hover:border-neutral-400"
                      >
                        <option value="Dental Veneers">Dental Veneers</option>
                        <option value="Dental Implants">Dental Implants</option>
                        <option value="Dental Crowns">Dental Crowns</option>
                        <option value="Teeth Whitening">Teeth Whitening</option>
                        <option value="Smile Makeover">Full Smile Makeover</option>
                        <option value="Emergency Consultation">Dental Emergency</option>
                        <option value="General Consultation">General Consultation</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-extrabold text-black uppercase tracking-wider mb-1 sm:mb-1.5">
                      Your Message / Notes
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Tell us about your dental goals, previous treatments, or preferred schedule..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl border border-neutral-300 text-black text-xs sm:text-sm focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition-all duration-200 bg-stone-50/50 hover:border-neutral-400 resize-none"
                    />
                  </div>

                  <div className="pt-1 sm:pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 sm:py-4 min-h-[44px] bg-black rounded-full text-white text-xs sm:text-sm font-bold uppercase tracking-wider cursor-pointer dentiva-anim-button"
                    >
                      <AnimatedText text="Book Appointment" delay={0.15} />
                    </button>
                  </div>

                  <p className="text-[9px] sm:text-[10px] text-center text-neutral-400 pt-0.5 sm:pt-1">
                    Your personal health information is strictly confidential. Direct assistance:{' '}
                    <a href={CLINIC_PHONE_TEL} className="underline text-black font-semibold focus-visible:ring-2 focus-visible:ring-black rounded-xs">
                      {CLINIC_PHONE}
                    </a>
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/* 9. Footer Section                                                           */
/* -------------------------------------------------------------------------- */
interface FooterProps {
  onSelectServiceByName: (serviceName: string) => void;
  onOpenBooking: (treatment?: string) => void;
}

const FooterSection: React.FC<FooterProps> = ({ onSelectServiceByName, onOpenBooking }) => {
  const [mobileQuickLinksOpen, setMobileQuickLinksOpen] = useState(false);
  const [mobileTreatmentsOpen, setMobileTreatmentsOpen] = useState(false);

  const footerReveal = useViewportReveal(0.05, true);

  const handleScrollTo = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickLinks = [
    { label: 'Home', targetId: 'home' },
    { label: 'Smile Gallery', targetId: 'gallery' },
    { label: 'Implant Services', targetId: 'services' },
    { label: 'Featured Treatments', targetId: 'treatments' },
    { label: 'About Doctor', targetId: 'about' },
    { label: 'Patient Testimonials', targetId: 'results' },
    { label: 'Contact Desk', targetId: 'contact' },
  ];

  const treatmentsList = [
    'Dental Veneers',
    'Dental Crowns',
    'Teeth Whitening',
    'Dental Implants',
    'Smile Makeover',
    'Dental Emergency',
  ];

  return (
    <footer
      id="footer"
      ref={footerReveal.containerRef as React.RefObject<HTMLElement>}
      className="w-full overflow-hidden flex flex-col pt-1.5 md:pt-2 px-2.5 sm:px-3 md:px-5 pb-3 sm:pb-6 box-border relative bg-white"
    >
      <div className="w-full bg-[#f1f1ef] rounded-2xl md:rounded-[2.5rem] p-3 sm:p-6 md:p-8 lg:p-12 border border-neutral-200/80 shadow-xs relative overflow-hidden">
        <div className="w-full bg-white rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-8 md:p-10 lg:p-12 shadow-2xs border border-neutral-200/90 relative z-10 flex flex-col justify-between">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-12 pb-4 sm:pb-10 md:pb-12">
            <div className="lg:col-span-5 flex flex-col justify-between space-y-3 sm:space-y-6">
              <div>
                <div onClick={() => handleScrollTo('home')} className="flex flex-col cursor-pointer select-none group w-fit mb-2 sm:mb-4">
                  <span className="text-xl sm:text-2xl md:text-3xl font-extrabold uppercase tracking-tight leading-none text-black group-hover:opacity-75 transition-opacity">
                    Dental
                  </span>
                  <span className="text-xl sm:text-2xl md:text-3xl font-extrabold uppercase tracking-tight leading-none text-black -mt-1 md:-mt-2 group-hover:opacity-75 transition-opacity">
                    Health
                  </span>
                  <span className="text-[8px] md:text-[10px] font-bold leading-none mt-1 sm:mt-2 uppercase tracking-widest text-neutral-500">
                    quality healthcare
                  </span>
                </div>

                <p className="text-[11px] sm:text-sm text-neutral-600 font-normal leading-relaxed max-w-sm mb-2.5 sm:mb-6">
                  Providing modern biomimetic restorations, guided 3D implantology, and bespoke aesthetic transformations engineered around individual facial harmony in West New York.
                </p>

                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-stone-100 border border-neutral-200 text-[10px] sm:text-xs font-semibold text-black">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Accepting New Patients & Emergency Cases
                </div>
              </div>

              <div className="pt-0.5 sm:pt-2">
                <button
                  type="button"
                  onClick={() => onOpenBooking('General Consultation')}
                  className="px-5 py-2.5 sm:px-6 sm:py-3.5 bg-black rounded-full text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider cursor-pointer inline-flex items-center gap-2 group dentiva-anim-button"
                >
                  <span>Book Appointment</span>
                  <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col gap-3 sm:grid sm:grid-cols-3 sm:gap-8">
              <div className="border-b border-neutral-100 pb-2 sm:border-b-0 sm:pb-0">
                <button
                  type="button"
                  onClick={() => setMobileQuickLinksOpen(!mobileQuickLinksOpen)}
                  className="w-full flex items-center justify-between sm:pointer-events-none cursor-pointer sm:cursor-default"
                >
                  <span className="text-[11px] uppercase font-extrabold tracking-wider text-black block sm:mb-4">
                    Quick Links
                  </span>
                  <span className="sm:hidden text-xs text-neutral-500 font-bold transition-transform duration-200">
                    {mobileQuickLinksOpen ? '−' : '+'}
                  </span>
                </button>
                <ul
                  className={`space-y-1.5 sm:space-y-2.5 transition-all duration-300 overflow-hidden sm:!block sm:!opacity-100 sm:!max-h-none ${
                    mobileQuickLinksOpen ? 'max-h-64 opacity-100 mt-2' : 'max-h-0 opacity-0 sm:max-h-none'
                  }`}
                >
                  {quickLinks.map((link) => (
                    <li key={link.label}>
                      <button
                        type="button"
                        onClick={() => handleScrollTo(link.targetId)}
                        className="text-[11px] sm:text-xs md:text-sm text-neutral-600 hover:text-black font-medium transition-colors text-left cursor-pointer hover:translate-x-0.5"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-b border-neutral-100 pb-2 sm:border-b-0 sm:pb-0">
                <button
                  type="button"
                  onClick={() => setMobileTreatmentsOpen(!mobileTreatmentsOpen)}
                  className="w-full flex items-center justify-between sm:pointer-events-none cursor-pointer sm:cursor-default"
                >
                  <span className="text-[11px] uppercase font-extrabold tracking-wider text-black block sm:mb-4">
                    Treatments
                  </span>
                  <span className="sm:hidden text-xs text-neutral-500 font-bold transition-transform duration-200">
                    {mobileTreatmentsOpen ? '−' : '+'}
                  </span>
                </button>
                <ul
                  className={`space-y-1.5 sm:space-y-2.5 transition-all duration-300 overflow-hidden sm:!block sm:!opacity-100 sm:!max-h-none ${
                    mobileTreatmentsOpen ? 'max-h-64 opacity-100 mt-2' : 'max-h-0 opacity-0 sm:max-h-none'
                  }`}
                >
                  {treatmentsList.map((treatmentName) => (
                    <li key={treatmentName}>
                      <button
                        type="button"
                        onClick={() => onSelectServiceByName(treatmentName)}
                        className="text-[11px] sm:text-xs md:text-sm text-neutral-600 hover:text-black font-medium transition-colors text-left cursor-pointer hover:translate-x-0.5"
                      >
                        {treatmentName}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-1 sm:pt-0">
                <span className="text-[11px] uppercase font-extrabold tracking-wider text-black block mb-2 sm:mb-4">
                  Contact & Location
                </span>
                <div className="space-y-2 sm:space-y-3 text-[11px] sm:text-xs md:text-sm">
                  <div>
                    <p className="text-[9px] sm:text-[10px] uppercase font-bold text-neutral-400">Phone</p>
                    <a href={CLINIC_PHONE_TEL} className="font-semibold text-black hover:underline block mt-0.5">
                      {CLINIC_PHONE}
                    </a>
                  </div>

                  <div>
                    <p className="text-[9px] sm:text-[10px] uppercase font-bold text-neutral-400">Practice Address</p>
                    <p className="font-semibold text-black mt-0.5 leading-snug">{CLINIC_ADDRESS}</p>
                  </div>

                  <div className="w-full h-24 sm:h-32 md:h-36 rounded-xl overflow-hidden border border-neutral-200 bg-stone-100 relative shadow-2xs mt-1 sm:mt-2">
                    <iframe
                      title="Dental Health Clinic Google Map"
                      src="https://maps.google.com/maps?q=5912+Bergenline+Ave,+West+New+York,+NJ+07093&t=&z=15&ie=UTF8&iwloc=&output=embed"
                      className="w-full h-full border-0 filter grayscale hover:grayscale-0 transition-all duration-300"
                      loading="lazy"
                      aria-label="Clinic Google Map location"
                    />
                  </div>

                  <div className="pt-1">
                    <a
                      href={CLINIC_MAPS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full border border-black/25 text-black cursor-pointer group dentiva-anim-button"
                    >
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">Get Directions</span>
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 14 14"
                        fill="none"
                        className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      >
                        <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-neutral-200/90 my-1.5 sm:my-2" />

          <div className="pt-3 sm:pt-6 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4 text-[10px] sm:text-xs text-neutral-500 font-medium">
            <div>
              © {new Date().getFullYear()} Dental Health Practice. All rights reserved.
            </div>

            <div className="flex items-center gap-4 sm:gap-6">
              <a href="#footer" className="hover:text-black transition-colors">
                Terms of Service
              </a>
              <span className="text-neutral-300">•</span>
              <a href="#footer" className="hover:text-black transition-colors">
                Privacy Policy
              </a>
              <span className="text-neutral-300">•</span>
              <a href="#footer" className="hover:text-black transition-colors">
                HIPAA Notice
              </a>
            </div>
          </div>
        </div>

        <div className="mt-3 sm:mt-6 md:mt-10 text-center select-none pointer-events-none overflow-hidden">
          <span className="text-[clamp(1.75rem,8vw,8.5rem)] font-black uppercase tracking-tighter text-neutral-300/40 leading-none block whitespace-nowrap">
            DENTAL HEALTH
          </span>
        </div>
      </div>
    </footer>
  );
};

/* -------------------------------------------------------------------------- */
/* 10. Main App Component                                                      */
/* -------------------------------------------------------------------------- */
export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [animationStarted, setAnimationStarted] = useState(false);
  const isMobile = useIsMobile();

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedBookingTreatment, setSelectedBookingTreatment] = useState('General Consultation');

  const [treatmentModalOpen, setTreatmentModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);

  const [guideModalOpen, setGuideModalOpen] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState<InfoGuide | null>(null);

  const [doctorProfileOpen, setDoctorProfileOpen] = useState(false);

  useEffect(() => {
    // Add motion-ready class for the smooth animation system
    document.documentElement.classList.add('motion-ready');
    return () => {
      document.documentElement.classList.remove('motion-ready');
    };
  }, []);

  useEffect(() => {
    const fontHref1 =
      'https://db.onlinewebfonts.com/c/1cd1e7d71e048159076fd90b39846902?family=Open+Sauce+One';
    const fontHref2 =
      'https://db.onlinewebfonts.com/c/42acf9aa4a6dc2f2886a3f682e337ead?family=Open+Sauce+One+Bold';

    if (!document.querySelector(`link[href="${fontHref1}"]`)) {
      const link1 = document.createElement('link');
      link1.href = fontHref1;
      link1.rel = 'stylesheet';
      document.head.appendChild(link1);
    }

    if (!document.querySelector(`link[href="${fontHref2}"]`)) {
      const link2 = document.createElement('link');
      link2.href = fontHref2;
      link2.rel = 'stylesheet';
      document.head.appendChild(link2);
    }
  }, []);

  const handleOpenBooking = (treatmentName?: string) => {
    if (treatmentName) {
      setSelectedBookingTreatment(treatmentName);
    }
    setBookingModalOpen(true);
  };

  const handleSelectService = (service: ServiceDetail) => {
    setSelectedService(service);
    setTreatmentModalOpen(true);
  };

  const handleSelectServiceByName = (serviceName: string) => {
    const matched = servicesData.find(
      (s) =>
        s.displayName.toLowerCase().includes(serviceName.toLowerCase()) ||
        serviceName.toLowerCase().includes(s.displayName.toLowerCase())
    );
    if (matched) {
      handleSelectService(matched);
    } else {
      handleOpenBooking(serviceName);
    }
  };

  const handleOpenGuide = (guide: InfoGuide) => {
    setSelectedGuide(guide);
    setGuideModalOpen(true);
  };

  const handleOpenDoctorProfile = () => {
    setDoctorProfileOpen(true);
  };

  return (
    <div
      className="bg-white min-h-screen text-black antialiased selection:bg-black selection:text-white"
      style={{
        fontFamily: "'Open Sauce One', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <style dangerouslySetInnerHTML={{
        __html: `
/* =====  SMOOTH ANIMATIONS ===== */
html.motion-ready [data-reveal] {
  opacity: 0;
  transform: translate3d(0, 24px, 0);
  transition: opacity 750ms cubic-bezier(0.22, 1, 0.36, 1), transform 750ms cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--reveal-delay, 0ms);
}
html.motion-ready [data-reveal].is-visible {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}
.dentiva-anim-button {
  transition: transform 250ms ease, box-shadow 250ms ease;
}
.dentiva-anim-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.12);
}
.dentiva-image-frame {
  overflow: hidden;
  border-radius: inherit;
}
.dentiva-anim-image {
  display: block;
  transition: transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
}
.dentiva-image-frame:hover .dentiva-anim-image {
  transform: scale(1.035);
}
.dentiva-anim-card {
  transition: transform 300ms ease, box-shadow 300ms ease;
}
@media (hover: hover) {
  .dentiva-anim-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.08);
  }
}
@media (prefers-reduced-motion: reduce) {
  html.motion-ready [data-reveal],
  html.motion-ready [data-reveal].is-visible {
    opacity: 1;
    transform: none;
    transition: none;
  }
  .dentiva-anim-button,
  .dentiva-anim-card,
  .dentiva-anim-image {
    transition: none !important;
  }
  .dentiva-anim-button:hover,
  .dentiva-anim-card:hover,
  .dentiva-image-frame:hover .dentiva-anim-image {
    transform: none;
    box-shadow: none;
  }
}
        `
      }} />

      {showSplash && (
        <SplashScreen
          onExitStart={() => setAnimationStarted(true)}
          onComplete={() => setShowSplash(false)}
        />
      )}

      <Navbar startAnimation={animationStarted} onOpenBooking={handleOpenBooking} />

      <Section1
        isMobile={isMobile}
        startAnimation={animationStarted}
        onOpenBooking={handleOpenBooking}
      />

      <Section2
        isMobile={isMobile}
        onOpenBooking={handleOpenBooking}
        onSelectService={handleSelectService}
      />

      <Section3
        onOpenBooking={handleOpenBooking}
        onOpenGuide={handleOpenGuide}
      />

      <TreatmentsSection
        isMobile={isMobile}
        onSelectService={handleSelectService}
        onOpenBooking={handleOpenBooking}
      />

      <AboutDentistSection
        onOpenBooking={handleOpenBooking}
        onOpenDoctorProfile={handleOpenDoctorProfile}
      />

      <ResultsSection
        onOpenBooking={handleOpenBooking}
        onSelectServiceByName={handleSelectServiceByName}
      />

      <ContactSection />

      <FooterSection
        onSelectServiceByName={handleSelectServiceByName}
        onOpenBooking={handleOpenBooking}
      />

      <DoctorProfileModal
        isOpen={doctorProfileOpen}
        onClose={() => setDoctorProfileOpen(false)}
        onBook={handleOpenBooking}
      />

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialTreatment={selectedBookingTreatment}
      />

      <TreatmentModal
        service={selectedService}
        isOpen={treatmentModalOpen}
        onClose={() => setTreatmentModalOpen(false)}
        onBook={handleOpenBooking}
      />

      <GuideModal
        guide={selectedGuide}
        isOpen={guideModalOpen}
        onClose={() => setGuideModalOpen(false)}
        onBook={handleOpenBooking}
      />

      <Analytics />
    </div>
  );
}
