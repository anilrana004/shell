import type { TrekData } from "@/types";
import { useState } from "react";
import TrekFAQsTab from "./TrekFAQsTab";
import TrekGearTab from "./TrekGearTab";
import TrekInclusionsTab from "./TrekInclusionsTab";
import TrekItineraryTab from "./TrekItineraryTab";
import TrekMapTab from "./TrekMapTab";
import TrekOverviewTab from "./TrekOverviewTab";
import TrekPermitsTab from "./TrekPermitsTab";
import TrekPhotosTab from "./TrekPhotosTab";
import TrekPricingTab from "./TrekPricingTab";
import TrekReviewsTab from "./TrekReviewsTab";
import TrekVideoTab from "./TrekVideoTab";
import TrekWeatherTab from "./TrekWeatherTab";

const TABS = [
  "Overview",
  "Itinerary",
  "Inclusions",
  "Pricing",
  "Photos",
  "Video",
  "Map & Route",
  "Weather",
  "Reviews",
  "FAQs",
  "Gear List",
  "Permits",
];

interface Props {
  trek: TrekData;
}

export default function TrekTabs({ trek }: Props) {
  const [activeTab, setActiveTab] = useState(0);

  const renderTab = () => {
    switch (activeTab) {
      case 0:
        return <TrekOverviewTab trek={trek} />;
      case 1:
        return <TrekItineraryTab trek={trek} />;
      case 2:
        return <TrekInclusionsTab trek={trek} />;
      case 3:
        return <TrekPricingTab trek={trek} />;
      case 4:
        return <TrekPhotosTab trek={trek} />;
      case 5:
        return <TrekVideoTab trek={trek} />;
      case 6:
        return <TrekMapTab trek={trek} />;
      case 7:
        return <TrekWeatherTab trek={trek} />;
      case 8:
        return <TrekReviewsTab trek={trek} />;
      case 9:
        return <TrekFAQsTab trek={trek} />;
      case 10:
        return <TrekGearTab trek={trek} />;
      case 11:
        return <TrekPermitsTab trek={trek} />;
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Sticky Tab Bar */}
      <div
        className="sticky top-0 z-20 border-b overflow-x-auto"
        style={{ background: "#EDF7F2", borderColor: "#4A5E5222" }}
      >
        <div className="flex min-w-max">
          {TABS.map((tab, i) => (
            <button
              key={tab}
              type="button"
              data-ocid={`trek.tab.${i + 1}`}
              onClick={() => setActiveTab(i)}
              className="px-5 py-4 text-sm font-medium whitespace-nowrap transition-colors relative"
              style={{ color: activeTab === i ? "#1A2A1E" : "#4A5E52" }}
            >
              {tab}
              {activeTab === i && (
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ background: "#E8541A" }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="min-h-96">{renderTab()}</div>
    </div>
  );
}
