"use client";

import React from "react";
import WeddingHeroHeader from "./WeddingHeroHeader";
import WeddingSimpleHeader from "./WeddingSimpleHeader";
import WeddingElegantHeader from "./WeddingElegantHeader";
import type { WeddingHeaderProps } from "../types/wedding";

const WeddingHeader = React.memo<WeddingHeaderProps>(
  ({
    title = "Sandra & Nicolas",
    subtitle = "Nous nous marions",
    date = "15 Juin 2024",
    location = "Château de la Côte Landaise",
    variant = "hero",
    className,
  }) => {
    const commonProps = { title, subtitle, date, location };

    const renderVariant = () => {
      switch (variant) {
        case "hero":
          return <WeddingHeroHeader {...commonProps} />;
        case "simple":
          return <WeddingSimpleHeader {...commonProps} />;
        case "elegant":
          return <WeddingElegantHeader {...commonProps} />;
        default:
          return <WeddingHeroHeader {...commonProps} />;
      }
    };

    return <div className={className}>{renderVariant()}</div>;
  }
);

WeddingHeader.displayName = "WeddingHeader";

export default WeddingHeader;
