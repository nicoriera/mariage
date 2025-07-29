import React from 'react';
import { Heading, Text } from './ui/Typography';

interface WeddingHeroHeaderProps {
  title: string;
  subtitle: string;
  date: string;
  location: string;
}

const WeddingHeroHeader = React.memo<WeddingHeroHeaderProps>(({
  title,
  subtitle,
  date,
  location,
}) => (
  <div className="relative min-h-screen flex items-center justify-center bg-june-hero-lines overflow-hidden">
    <div className="relative z-10 text-center px-4">
      <div className="max-w-4xl mx-auto">
        <Text
          size="lg"
          variant="muted"
          className="mb-4 tracking-widest uppercase font-sans">
          {subtitle}
        </Text>

        <div className="mb-6">
          <div className="save-the-date mb-4">save the date</div>
          <Heading level={1} variant="elegant" className="font-heading font-semibold text-4xl md:text-5xl">
            {title}
          </Heading>
        </div>

        <div className="space-y-4">
          <Text size="xl" variant="accent" className="font-heading font-medium">
            {date}
          </Text>

          <Text size="lg" variant="muted" className="font-sans">
            {location}
          </Text>
        </div>
      </div>
    </div>
  </div>
));

WeddingHeroHeader.displayName = 'WeddingHeroHeader';

export default WeddingHeroHeader;