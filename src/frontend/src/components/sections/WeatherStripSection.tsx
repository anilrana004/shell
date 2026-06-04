import { Cloud, CloudSnow, Sun, Thermometer, Wind } from "lucide-react";
import { motion } from "motion/react";

const BASE_CAMPS = [
  {
    name: "Sankri",
    camp: "Kedarkantha Base",
    temp: "-3°C",
    condition: "Snow",
    icon: "snow",
    humidity: "72%",
  },
  {
    name: "Govindghat",
    camp: "Valley of Flowers",
    temp: "12°C",
    condition: "Cloudy",
    icon: "cloud",
    humidity: "65%",
  },
  {
    name: "Chopta",
    camp: "Chandrashila Base",
    temp: "-8°C",
    condition: "Clear",
    icon: "clear",
    humidity: "55%",
  },
  {
    name: "Raithal",
    camp: "Dayara Base",
    temp: "-1°C",
    condition: "Snow",
    icon: "snow",
    humidity: "68%",
  },
  {
    name: "Uttarkashi",
    camp: "Har Ki Dun Hub",
    temp: "5°C",
    condition: "Sunny",
    icon: "sunny",
    humidity: "48%",
  },
  {
    name: "Jhanglik",
    camp: "Rupin Pass Base",
    temp: "2°C",
    condition: "Windy",
    icon: "wind",
    humidity: "60%",
  },
];

const WeatherIcon = ({ type }: { type: string }) => {
  const props = { size: 18, style: { color: "#2E7D4F" } };
  if (type === "snow") return <CloudSnow {...props} />;
  if (type === "sunny") return <Sun {...props} style={{ color: "#D4A843" }} />;
  if (type === "wind") return <Wind {...props} />;
  if (type === "cloud") return <Cloud {...props} />;
  return <Sun {...props} />;
};

export function WeatherStripSection() {
  return (
    <section
      data-ocid="weather_strip.section"
      style={{
        background: "#EDF7F2",
        borderTop: "1px solid rgba(232,84,26,0.15)",
        borderBottom: "1px solid rgba(232,84,26,0.15)",
      }}
      className="py-5"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap items-center gap-4 md:gap-6 justify-between">
          <p
            className="text-xs uppercase tracking-widest flex-shrink-0"
            style={{ color: "#E8541A" }}
          >
            🌡️ Live Base Camp Weather
          </p>
          <div className="flex flex-wrap gap-4 flex-1">
            {BASE_CAMPS.map((camp, i) => (
              <motion.div
                key={camp.name}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                data-ocid={`weather.camp.${i + 1}`}
                className="flex items-center gap-2 px-3 py-2 rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.6)",
                  border: "1px solid rgba(232,84,26,0.15)",
                }}
              >
                <WeatherIcon type={camp.icon} />
                <div>
                  <p
                    className="text-xs font-semibold"
                    style={{ color: "#1A2A1E" }}
                  >
                    {camp.name}
                  </p>
                  <p className="text-[10px]" style={{ color: "#4A5E5280" }}>
                    {camp.temp} · {camp.condition}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          <p
            className="text-[10px] hidden md:block flex-shrink-0"
            style={{ color: "#4A5E5250" }}
          >
            Updated hourly
          </p>
        </div>
      </div>
    </section>
  );
}
