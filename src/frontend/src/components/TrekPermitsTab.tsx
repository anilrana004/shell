import type { TrekData } from "@/types";

interface Props {
  trek: TrekData;
}

export default function TrekPermitsTab({ trek }: Props) {
  return (
    <div className="py-8 space-y-10">
      <h2 className="font-display text-3xl" style={{ color: "#1A2A1E" }}>
        Permits & Regulations
      </h2>

      {/* Permits Table */}
      <section>
        <h3 className="font-display text-xl mb-5" style={{ color: "#1A2A1E" }}>
          Required Permits
        </h3>
        {trek.permits.length > 0 ? (
          <div className="space-y-4">
            {trek.permits.map((permit) => (
              <div
                key={permit.name}
                className="rounded-2xl p-6 border"
                style={{
                  background: "rgba(255,255,255,0.9)",
                  borderColor: "#4A5E5222",
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="font-semibold" style={{ color: "#1A2A1E" }}>
                    {permit.name}
                  </div>
                  <span
                    className="text-xs px-3 py-1 rounded-full"
                    style={{
                      background: "rgba(45,80,22,0.3)",
                      color: "#4A7C2F",
                    }}
                  >
                    Included in Package
                  </span>
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span style={{ color: "#4A5E52" }}>Issued by: </span>
                    <span style={{ color: "#1A2A1E" }}>{permit.issuedBy}</span>
                  </div>
                  <div>
                    <span style={{ color: "#4A5E52" }}>Cost: </span>
                    <span style={{ color: "#D4A843" }}>{permit.cost}</span>
                  </div>
                  <div className="md:col-span-2">
                    <span style={{ color: "#4A5E52" }}>How we handle it: </span>
                    <span style={{ color: "#1A2A1E" }}>{permit.handledBy}</span>
                  </div>
                  <div className="md:col-span-2">
                    <span style={{ color: "#4A5E52" }}>
                      Documents required:{" "}
                    </span>
                    {permit.documentsRequired.map((doc) => (
                      <span
                        key={doc}
                        className="ml-1 text-xs px-2 py-0.5 rounded-full"
                        style={{
                          background: "rgba(232,84,26,0.2)",
                          color: "#E8541A",
                        }}
                      >
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="rounded-2xl p-6 border"
            style={{
              background: "rgba(255,255,255,0.9)",
              borderColor: "#4A5E5222",
            }}
          >
            <div className="text-sm" style={{ color: "#1A2A1E" }}>
              No special permits required for this trek beyond standard forest
              entry fees, which are included in your package.
            </div>
          </div>
        )}
      </section>

      {/* Upload Aadhaar CTA */}
      <div
        className="rounded-2xl p-6 border"
        style={{
          background: "rgba(232,84,26,0.1)",
          borderColor: "#E8541A66",
        }}
      >
        <div className="font-semibold mb-2" style={{ color: "#1A2A1E" }}>
          Upload Your Documents Now
        </div>
        <div className="text-sm mb-4" style={{ color: "#4A5E52" }}>
          Upload your Aadhaar card and medical fitness certificate in your
          dashboard. Our team processes permits 48 hours before your trek
          departure.
        </div>
        <a
          href="/dashboard"
          className="inline-block px-5 py-2.5 rounded-xl text-sm font-semibold"
          style={{ background: "#E8541A", color: "#FFFFFF" }}
        >
          Upload Aadhaar in Dashboard
        </a>
      </div>

      {/* Foreign Nationals */}
      <section>
        <h3 className="font-display text-xl mb-4" style={{ color: "#1A2A1E" }}>
          Foreign Nationals
        </h3>
        <div
          className="rounded-2xl p-6 border"
          style={{
            background: "rgba(255,255,255,0.9)",
            borderColor: "#4A5E5222",
          }}
        >
          <div className="space-y-3 text-sm" style={{ color: "#1A2A1E" }}>
            <div className="flex items-start gap-3">
              <span style={{ color: "#D4A843" }}>01</span>
              <div>
                Valid passport required. Photocopies submitted to forest
                department.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span style={{ color: "#D4A843" }}>02</span>
              <div>
                Inner Line Permit (ILP) required for certain sanctuary zones.
                Shail Hikers arranges this on your behalf.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span style={{ color: "#D4A843" }}>03</span>
              <div>
                Process takes 5-7 business days. Please complete booking at
                least 3 weeks before trek date.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span style={{ color: "#D4A843" }}>04</span>
              <div>
                Contact us at Shailhikers@gmail.com for a customised permit
                checklist for your nationality.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Regulations */}
      <section>
        <h3 className="font-display text-xl mb-4" style={{ color: "#1A2A1E" }}>
          Trek Regulations
        </h3>
        <div className="space-y-3">
          {[
            {
              title: "Photography",
              desc: "No photography of military installations near borders. Drones require DGCA clearance - contact us 30 days ahead.",
            },
            {
              title: "Camping Zones",
              desc: "Camping only in designated zones. No random pitching. Shail Hikers selects approved campsites only.",
            },
            {
              title: "Waste Policy",
              desc: "Carry all non-biodegradable waste back to base. We conduct a trail clean-up sweep after every batch.",
            },
            {
              title: "Drone Usage",
              desc: "Drone operations require prior clearance from DGCA and forest authorities. Apply 30 days in advance.",
            },
          ].map((reg) => (
            <div
              key={reg.title}
              className="flex items-start gap-4 rounded-xl p-4 border"
              style={{
                background: "rgba(255,255,255,0.6)",
                borderColor: "#4A5E5222",
              }}
            >
              <div
                className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                style={{ background: "#E8541A" }}
              />
              <div>
                <div
                  className="font-semibold text-sm mb-1"
                  style={{ color: "#1A2A1E" }}
                >
                  {reg.title}
                </div>
                <div className="text-xs" style={{ color: "#4A5E52" }}>
                  {reg.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
