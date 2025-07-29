export interface WeddingHeaderProps {
  title?: string;
  subtitle?: string;
  date?: string;
  location?: string;
  variant?: 'hero' | 'simple' | 'elegant';
  className?: string;
}

export interface WeddingHeaderVariant {
  hero: React.ReactNode;
  simple: React.ReactNode;
  elegant: React.ReactNode;
}