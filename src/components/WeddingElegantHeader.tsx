import React from 'react';
import { Heading, Text } from './ui/Typography';

interface WeddingElegantHeaderProps {
  title: string;
  subtitle: string;
  date: string;
  location: string;
}

const WeddingElegantHeader = React.memo<WeddingElegantHeaderProps>(({
  title,
  subtitle,
  date,
  location,
}) => (
  <div className="bg-white py-20">
    <div className="container-june">
      <div className="max-w-3xl mx-auto text-center">
        <div className="mb-8">
          <Text
            size="sm"
            variant="muted"
            className="tracking-widest uppercase mb-4">
            {subtitle}
          </Text>

          <Heading level={1} variant="default" className="mb-6">
            {title}
          </Heading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-center p-6 bg-white rounded-xl shadow-june-md hover-june transition-june">
            <Text
              variant="accent"
              size="lg"
              className="font-medium mb-2 text-june-olive">
              Date
            </Text>
            <Text variant="muted">{date}</Text>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-june-md hover-june transition-june">
            <Text
              variant="accent"
              size="lg"
              className="font-medium mb-2 text-june-olive">
              Lieu
            </Text>
            <Text variant="muted">{location}</Text>
          </div>
        </div>
      </div>
    </div>
  </div>
));

WeddingElegantHeader.displayName = 'WeddingElegantHeader';

export default WeddingElegantHeader;