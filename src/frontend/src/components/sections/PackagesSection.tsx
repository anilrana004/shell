import { PackageCard } from "@/components/PackageCard";
import { HOMEPAGE_PACKAGES } from "@/data/packages";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

export function PackagesSection() {
  return (
    <section
      data-ocid="packages.section"
      className="py-20 bg-sh-green-ultra border-t-4 border-sh-orange"
      style={{
        background:
          "linear-gradient(180deg, var(--sh-green-ultra) 0%, var(--sh-green-pale) 55%, var(--sh-green-ultra) 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div className="text-center md:text-left">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs uppercase tracking-[0.3em] mb-3 text-sh-orange font-semibold"
            >
              Bundle & Save
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-semibold text-sh-ink"
              style={{ fontFamily: "var(--font-display)" }}
            >
              EXCLUSIVE PACKAGES
            </motion.h2>
            <p className="mt-3 text-sm max-w-lg text-sh-graphite mx-auto md:mx-0">
              Multi-trek & yatra bundles with bundled pricing — hotels, meals,
              guides & transport included
            </p>
          </div>
          <Link
            to="/packages"
            data-ocid="packages.view_all"
            className="hidden md:flex items-center gap-2 text-sm font-semibold text-sh-green transition-colors hover:text-sh-orange shrink-0"
          >
            View All Packages →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {HOMEPAGE_PACKAGES.map((pkg, i) => (
            <PackageCard key={pkg.id} pkg={pkg} index={i} />
          ))}
        </div>

        <div className="mt-6 flex justify-center md:hidden">
          <Link
            to="/packages"
            data-ocid="packages.view_all_mobile"
            className="px-6 py-3 rounded-xl text-sm font-semibold tracking-wide border border-sh-orange/40 text-sh-orange hover:bg-sh-orange-pale transition-colors"
          >
            View All Packages →
          </Link>
        </div>
      </div>
    </section>
  );
}
