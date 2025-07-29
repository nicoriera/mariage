import React from 'react';
import { Heading, Text } from './ui/Typography';

interface WeddingSimpleHeaderProps {
  title: string;
  subtitle: string;
  date: string;
  location: string;
}

const WeddingSimpleHeader = React.memo<WeddingSimpleHeaderProps>(({
  title,
  subtitle,
  date,
  location,
}) => (
  <div className="bg-june-surface py-16">
    <div className="container-june text-center">
      <Heading level={2} variant="elegant" className="mb-4">
        {title}
      </Heading>

      <Text size="lg" variant="muted" className="mb-6">
        {subtitle}
      </Text>

      <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-12">
        <div className="text-center">
          <Text variant="accent" className="font-medium">
            {date}
          </Text>
        </div>

        <div className="hidden sm:block w-px h-8 bg-june-olive" />

        <div className="text-center">
          <Text variant="muted">{location}</Text>
        </div>
      </div>
    </div>
  </div>
));

WeddingSimpleHeader.displayName = 'WeddingSimpleHeader';

export default WeddingSimpleHeader;