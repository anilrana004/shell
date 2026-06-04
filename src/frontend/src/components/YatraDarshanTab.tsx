import type { Yatra } from "@/types";

interface Props {
  yatra: Yatra;
}

const DARSHAN_DATA: Record<
  string,
  {
    temples: {
      name: string;
      summerOpen: string;
      summerClose: string;
      winterOpen: string;
      winterClose: string;
      closedMonths: string;
      peakQueue: string;
      offPeakQueue: string;
      vipDarshan: string;
      vipCost: string;
      specialPujas: {
        name: string;
        time: string;
        cost: string;
        significance: string;
      }[];
    }[];
    generalNotes: string[];
  }
> = {
  "chardham-yatra": {
    temples: [
      {
        name: "Yamunotri Temple",
        summerOpen: "6:00 AM",
        summerClose: "8:00 PM",
        winterOpen: "Closed (Nov–Apr)",
        winterClose: "Closed",
        closedMonths: "November to April",
        peakQueue: "3–5 hours (May–June, Sep–Oct)",
        offPeakQueue: "30–60 minutes",
        vipDarshan:
          "₹1,100 per person — special darshan queue with separate entry",
        vipCost: "₹1,100",
        specialPujas: [
          {
            name: "Abhishek",
            time: "6:00–7:00 AM",
            cost: "₹551",
            significance:
              "Ritual bathing of the deity with Ganga water, milk, and honey — most auspicious puja",
          },
          {
            name: "Rudrabhishek",
            time: "7:00–8:00 AM",
            cost: "₹1,100",
            significance:
              "Vedic chanting + abhishek — highly recommended for wish fulfillment",
          },
          {
            name: "Evening Aarti",
            time: "7:00–8:00 PM",
            cost: "Free",
            significance:
              "Daily sunset farewell aarti — deeply moving, no queue needed",
          },
        ],
      },
      {
        name: "Gangotri Temple",
        summerOpen: "6:15 AM",
        summerClose: "2:00 PM (break), 3:00 PM–9:00 PM",
        winterOpen: "Closed (Nov–Apr)",
        winterClose: "Closed",
        closedMonths: "November to April",
        peakQueue: "2–4 hours (May–June)",
        offPeakQueue: "20–45 minutes",
        vipDarshan:
          "₹1,500 — dedicated VIP line with 15-minute limit at sanctum",
        vipCost: "₹1,500",
        specialPujas: [
          {
            name: "Ganga Puja",
            time: "6:15 AM",
            cost: "₹251",
            significance:
              "Offering flowers and lamps to Goddess Ganga at the Bhagirathi river bank",
          },
          {
            name: "Bhagirathi Aarti",
            time: "Sunrise",
            cost: "Free",
            significance:
              "Sunrise aarti at the river ghat — the most photographed moment at Gangotri",
          },
          {
            name: "Rudrabhishek",
            time: "7:00–9:00 AM",
            cost: "₹1,100",
            significance:
              "Shiva abhishek performed by temple priests — must book 1 day in advance",
          },
        ],
      },
      {
        name: "Kedarnath Temple",
        summerOpen: "4:00 AM (Abhishek), 6:00 AM (General darshan)",
        summerClose: "9:00 PM",
        winterOpen: "Closed (Nov–Apr)",
        winterClose: "Closed",
        closedMonths: "November to April (Shivalinga shifted to Ukhimath)",
        peakQueue: "4–8 hours (May–June, Sep–Oct). Lines form from 2 AM",
        offPeakQueue: "1–2 hours",
        vipDarshan:
          "₹3,000 per person — VIP darshan through official DSGMC token system",
        vipCost: "₹3,000",
        specialPujas: [
          {
            name: "Rudra Abhishek",
            time: "4:00–6:00 AM",
            cost: "₹5,500",
            significance:
              "The most sacred puja at Kedarnath — direct abhishek of the Jyotirlinga. Book weeks in advance",
          },
          {
            name: "Rudrabhishek (Regular)",
            time: "6:00 AM onwards",
            cost: "₹2,100",
            significance:
              "Standard Shivalinga abhishek with 108 offerings — very powerful",
          },
          {
            name: "Samput Path",
            time: "By appointment",
            cost: "₹11,000",
            significance:
              "Full day Vedic recitation by 5 priests — for major life events and ancestors",
          },
          {
            name: "Bhog Aarti",
            time: "3:00–4:00 PM",
            cost: "Free (view from distance)",
            significance:
              "Bhog (food offering) aarti — one of the most devotional moments of the day",
          },
        ],
      },
      {
        name: "Badrinath Temple",
        summerOpen: "4:30 AM (Mahabhishek), 6:00 AM (General)",
        summerClose: "9:00 PM (Shayan Aarti at 8:30 PM)",
        winterOpen: "Closed (Nov–Apr)",
        winterClose: "Closed",
        closedMonths: "November to April (deity shifted to Pandukeshwar)",
        peakQueue: "3–6 hours (May–June)",
        offPeakQueue: "45–90 minutes",
        vipDarshan:
          "₹2,500 — through Badrinath-Kedarnath Temple Committee (BKTC) online portal",
        vipCost: "₹2,500",
        specialPujas: [
          {
            name: "Mahabhishek",
            time: "4:30–6:00 AM",
            cost: "₹7,500",
            significance:
              "The supreme puja at Badrinath — a full ritual bathing of the deity with 16 sacred substances. The most auspicious darshan possible",
          },
          {
            name: "Abhishek",
            time: "7:00 AM onwards",
            cost: "₹1,500",
            significance:
              "Regular deity abhishek with Tapt Kund water, Tulsi, and seasonal flowers",
          },
          {
            name: "Shayan Aarti",
            time: "8:30 PM",
            cost: "Free",
            significance:
              "The bedtime aarti of Lord Vishnu — incredibly moving ceremony, witness if possible",
          },
          {
            name: "Vishnusahastranaam",
            time: "By appointment",
            cost: "₹2,100",
            significance:
              "Recitation of the 1,000 names of Lord Vishnu by temple priests",
          },
        ],
      },
    ],
    generalNotes: [
      "Register on the Chardham Yatra official government portal before travel — mandatory since 2022",
      "Carry biometric registration slip for entry to Kedarnath and Badrinath",
      "Medical certificate required if trekking to Kedarnath on foot",
      "All pujas can be booked through Shail Hikers on your behalf — included in VIP package tier",
      "Carry exact change in ₹10–₹100 notes for donations and prasad purchases",
      "Queues are dramatically shorter in September–October vs May–June",
    ],
  },
  "do-dham-yatra": {
    temples: [
      {
        name: "Kedarnath Temple",
        summerOpen: "4:00 AM (Abhishek), 6:00 AM (General darshan)",
        summerClose: "9:00 PM",
        winterOpen: "Closed (Nov–Apr)",
        winterClose: "Closed",
        closedMonths: "November to April",
        peakQueue: "4–8 hours (peak) — arrive by 3 AM for manageable wait",
        offPeakQueue: "1–2 hours (Sep–Oct)",
        vipDarshan: "₹3,000 per person via official DSGMC queue",
        vipCost: "₹3,000",
        specialPujas: [
          {
            name: "Rudra Abhishek",
            time: "4:00–6:00 AM",
            cost: "₹5,500",
            significance:
              "Direct abhishek of the Jyotirlinga. Most auspicious. Book weeks ahead.",
          },
          {
            name: "Rudrabhishek (Regular)",
            time: "6:00 AM",
            cost: "₹2,100",
            significance: "Standard Shivalinga abhishek — 108 sacred offerings",
          },
          {
            name: "Bhog Aarti",
            time: "3:00–4:00 PM",
            cost: "Free",
            significance: "Daily afternoon food offering aarti",
          },
        ],
      },
      {
        name: "Badrinath Temple",
        summerOpen: "4:30 AM (Mahabhishek), 6:00 AM (General)",
        summerClose: "9:00 PM",
        winterOpen: "Closed (Nov–Apr)",
        winterClose: "Closed",
        closedMonths: "November to April",
        peakQueue: "3–6 hours (May–June). September queues are 30–60 min.",
        offPeakQueue: "30–90 minutes",
        vipDarshan: "₹2,500 via BKTC online portal",
        vipCost: "₹2,500",
        specialPujas: [
          {
            name: "Mahabhishek",
            time: "4:30–6:00 AM",
            cost: "₹7,500",
            significance:
              "The supreme ritual at Badrinath — bathe the deity with 16 sacred substances",
          },
          {
            name: "Abhishek",
            time: "7:00 AM",
            cost: "₹1,500",
            significance: "Regular darshan with holy water and flowers",
          },
          {
            name: "Shayan Aarti",
            time: "8:30 PM",
            cost: "Free",
            significance: "Evening farewell aarti — deeply moving",
          },
        ],
      },
    ],
    generalNotes: [
      "Government biometric registration mandatory for Kedarnath from Sonprayag",
      "For helicopter to Kedarnath: report at helipad by 5:30 AM for 6 AM slots",
      "September is ideal: post-monsoon clarity, short queues, best photography",
      "All pujas can be pre-booked through Shail Hikers 2 weeks in advance",
    ],
  },
  "rishikesh-tour": {
    temples: [
      {
        name: "Triveni Ghat Aarti",
        summerOpen: "6:00 AM (Morning Aarti)",
        summerClose: "8:00 PM (Evening Aarti)",
        winterOpen: "6:30 AM",
        winterClose: "7:30 PM",
        closedMonths: "Open year-round",
        peakQueue: "No formal queue — arrive 30 min early for front spots",
        offPeakQueue: "Walk-in",
        vipDarshan: "Not applicable — open public ghat",
        vipCost: "Free",
        specialPujas: [
          {
            name: "Evening Maha Aarti",
            time: "Sunset (5:30–6:30 PM)",
            cost: "Free",
            significance:
              "The most iconic spiritual spectacle in Rishikesh — 108 priests, fire lamps, Vedic chanting",
          },
          {
            name: "Ganga Dip",
            time: "Any morning",
            cost: "Free",
            significance:
              "Holy dip in the Ganga — believed to wash away sins and grant liberation",
          },
          {
            name: "Floating Lamp (Deepdan)",
            time: "Evening aarti",
            cost: "₹20–₹50",
            significance:
              "Release a flower lamp into the Ganga as prayer for ancestors and wishes",
          },
        ],
      },
      {
        name: "Neelkanth Mahadev",
        summerOpen: "6:00 AM",
        summerClose: "7:00 PM",
        winterOpen: "7:00 AM",
        winterClose: "6:00 PM",
        closedMonths: "Open year-round",
        peakQueue: "1–2 hours on weekends and Sawan Mondays",
        offPeakQueue: "15–30 minutes",
        vipDarshan: "Not available",
        vipCost: "N/A",
        specialPujas: [
          {
            name: "Rudrabhishek",
            time: "6:00–9:00 AM",
            cost: "₹551",
            significance: "Shiva abhishek with Ganga water and bilva leaves",
          },
          {
            name: "Sawan Monday Special",
            time: "All day during Sawan month",
            cost: "₹101",
            significance: "Most auspicious Shiva puja day — queues of 3+ hours",
          },
        ],
      },
    ],
    generalNotes: [
      "Parmarth Niketan Aarti: arrive 30 min before sunset for seated spot",
      "No entry fee at any Rishikesh ghat or temple — only puja dakshina is voluntary",
      "Rishikesh is open year-round — October–March is coolest and most comfortable",
      "Wear socks for temple visits — marble floors get cold in winter",
    ],
  },
  "mussoorie-tour": {
    temples: [
      {
        name: "Surkanda Devi Temple",
        summerOpen: "6:00 AM",
        summerClose: "8:00 PM",
        winterOpen: "7:00 AM",
        winterClose: "6:00 PM",
        closedMonths: "Open year-round",
        peakQueue: "2–3 hours during Navratri (March–April, October)",
        offPeakQueue: "15–30 minutes on weekdays",
        vipDarshan: "Not applicable",
        vipCost: "N/A",
        specialPujas: [
          {
            name: "Navratri Puja",
            time: "All day during 9 Navratri days",
            cost: "₹251",
            significance:
              "The most powerful time to visit — Goddess Durga's energy is at peak",
          },
          {
            name: "Morning Aarti",
            time: "6:00–7:00 AM",
            cost: "Free",
            significance:
              "Sunrise aarti with panoramic Himalayan backdrop — unforgettable spiritual experience",
          },
        ],
      },
    ],
    generalNotes: [
      "Trek to Surkanda Devi takes 2.5 km (45 minutes) — good footwear essential",
      "Ropeway available to Surkanda Devi (₹200 return) for elderly and children",
      "Carry prasad items (coconut, red chunri, flowers) before the climb",
    ],
  },
};

export default function YatraDarshanTab({ yatra }: Props) {
  const data = DARSHAN_DATA[yatra.slug] ?? DARSHAN_DATA["rishikesh-tour"];

  return (
    <div className="space-y-8">
      {/* General Notes */}
      <div
        className="p-5 rounded-xl"
        style={{
          background: "rgba(201,168,76,0.08)",
          border: "1px solid rgba(201,168,76,0.25)",
        }}
      >
        <h3
          className="font-bold mb-3 flex items-center gap-2"
          style={{ color: "#D4A843" }}
        >
          📋 Important Notes Before You Go
        </h3>
        <ul className="space-y-1">
          {data.generalNotes.map((note) => (
            <li
              key={note}
              className="flex items-start gap-2"
              style={{
                color: "#4A5E52",
                fontSize: "0.875rem",
                lineHeight: 1.6,
              }}
            >
              <span style={{ color: "#D4A843" }}>•</span> {note}
            </li>
          ))}
        </ul>
      </div>

      {/* Temple Cards */}
      {data.temples.map((temple) => (
        <div
          key={temple.name}
          className="rounded-xl overflow-hidden"
          style={{ border: "1px solid rgba(212,237,224,0.2)" }}
        >
          <div className="p-4" style={{ background: "rgba(232,84,26,0.15)" }}>
            <h3
              className="font-bold text-lg"
              style={{ color: "#1A2A1E", fontFamily: "var(--font-display)" }}
            >
              🛕 {temple.name}
            </h3>
          </div>
          <div className="p-5 space-y-5">
            {/* Timings */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Summer Opening", value: temple.summerOpen },
                { label: "Summer Closing", value: temple.summerClose },
                { label: "Winter Schedule", value: temple.winterOpen },
                { label: "Closed Months", value: temple.closedMonths },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-3 rounded-lg text-center"
                  style={{
                    background: "rgba(212,237,224,0.04)",
                    border: "1px solid rgba(212,237,224,0.1)",
                  }}
                >
                  <p className="text-xs mb-1" style={{ color: "#E8541A" }}>
                    {item.label}
                  </p>
                  <p className="font-bold text-sm" style={{ color: "#1A2A1E" }}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Queue Times */}
            <div className="grid md:grid-cols-2 gap-4">
              <div
                className="p-4 rounded-lg"
                style={{
                  background: "rgba(232,84,26,0.06)",
                  border: "1px solid rgba(232,84,26,0.2)",
                }}
              >
                <p
                  className="text-sm font-bold mb-1"
                  style={{ color: "#E8541A" }}
                >
                  ⏳ Peak Season Queue (Jan–Jun)
                </p>
                <p style={{ color: "#4A5E52" }}>{temple.peakQueue}</p>
              </div>
              <div
                className="p-4 rounded-lg"
                style={{
                  background: "rgba(45,80,22,0.08)",
                  border: "1px solid rgba(45,80,22,0.3)",
                }}
              >
                <p
                  className="text-sm font-bold mb-1"
                  style={{ color: "#2E7D4F" }}
                >
                  🟢 Off-Peak Queue
                </p>
                <p style={{ color: "#4A5E52" }}>{temple.offPeakQueue}</p>
              </div>
            </div>

            {/* VIP Darshan */}
            <div
              className="p-4 rounded-lg"
              style={{
                background: "rgba(201,168,76,0.08)",
                border: "1px solid rgba(201,168,76,0.25)",
              }}
            >
              <div className="flex items-start gap-2">
                <span className="text-xl">⭐</span>
                <div>
                  <p
                    className="font-bold text-sm mb-1"
                    style={{ color: "#D4A843" }}
                  >
                    VIP Darshan
                  </p>
                  <p style={{ color: "#4A5E52", fontSize: "0.875rem" }}>
                    {temple.vipDarshan}
                  </p>
                </div>
              </div>
            </div>

            {/* Special Pujas */}
            <div>
              <h4 className="font-bold mb-3" style={{ color: "#1A2A1E" }}>
                Special Pujas & Rituals
              </h4>
              <div className="space-y-3">
                {temple.specialPujas.map((puja) => (
                  <div
                    key={puja.name}
                    className="p-4 rounded-lg"
                    style={{
                      background: "rgba(212,237,224,0.03)",
                      border: "1px solid rgba(212,237,224,0.1)",
                    }}
                  >
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span
                            className="font-bold"
                            style={{ color: "#1A2A1E" }}
                          >
                            {puja.name}
                          </span>
                          <span
                            className="text-xs px-2 py-0.5 rounded"
                            style={{
                              background: "rgba(232,84,26,0.2)",
                              color: "#E8541A",
                            }}
                          >
                            {puja.time}
                          </span>
                        </div>
                        <p
                          style={{
                            color: "#4A5E52",
                            fontSize: "0.85rem",
                            lineHeight: 1.6,
                          }}
                        >
                          {puja.significance}
                        </p>
                      </div>
                      <span
                        className="font-bold whitespace-nowrap"
                        style={{ color: "#D4A843" }}
                      >
                        {puja.cost}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Book Puja CTA */}
      <div
        className="p-5 rounded-xl text-center"
        style={{
          background: "rgba(232,84,26,0.1)",
          border: "1px solid rgba(232,84,26,0.3)",
        }}
      >
        <p className="font-bold mb-1" style={{ color: "#1A2A1E" }}>
          Book Pujas in Advance
        </p>
        <p className="text-sm mb-3" style={{ color: "#4A5E52" }}>
          Shail Hikers coordinates all puja bookings on your behalf. Special
          pujas at Kedarnath and Badrinath must be booked 2–4 weeks in advance
          during peak season.
        </p>
        <a
          href="tel:+918279888470"
          data-ocid="darshan.puja_book_button"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold"
          style={{ background: "#E8541A", color: "#FFFFFF" }}
        >
          📞 Book Puja — Call +91-8279888470
        </a>
      </div>
    </div>
  );
}
