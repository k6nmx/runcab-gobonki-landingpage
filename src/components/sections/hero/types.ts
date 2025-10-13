
export type Mode = "customer" | "business";

export type ModeToggleProps = {
  mode: string;
  onModeChange: (mode: Mode) => void;
  labels: { customer: string; business: string };
  isRTL: boolean;
};

export type HeroContentProps = {
  mode: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  isRTL: boolean;
};

export type HeroImageContainerProps = {
  image: string;
  imageAlt: string;
  prefersReducedMotion: boolean;
};

export type LoadingSkeletonProps = {
  labels: { customer: string; business: string };
};

export type HeroContentShape = {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  image: string;
  imageAlt: string;
};
