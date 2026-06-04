import { Layout } from "@/components/Layout";
import { Link } from "@tanstack/react-router";
import {
  HelpCircle,
  Home,
  MessageCircle,
  RefreshCw,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";

export default function PaymentFailurePage() {
  return (
    <Layout>
      <div
        className="min-h-screen flex items-center justify-center px-4 py-16"
        style={{
          background:
            "linear-gradient(135deg, #EDF7F2 0%, #FFFFFF 50%, #EDF7F2 100%)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-lg w-full rounded-2xl p-8 md:p-10 text-center"
          style={{
            background: "rgba(255,255,255,0.95)",
            border: "1px solid rgba(232,84,26,0.3)",
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.2,
            }}
            className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
            style={{
              background: "rgba(232,84,26,0.2)",
              border: "2px solid #E8541A",
            }}
          >
            <XCircle size={40} style={{ color: "#E8541A" }} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-display text-2xl md:text-3xl mb-3"
            style={{ color: "#1A2A1E" }}
          >
            Payment Failed
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-body mb-2"
            style={{ color: "#4A5E52" }}
          >
            We could not process your payment. Your booking has not been
            confirmed and no money was charged.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="font-body text-sm mb-6"
            style={{ color: "#4A5E52", opacity: 0.7 }}
          >
            This usually happens due to a network issue, expired card, or bank
            decline. Please try again with a different payment method.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="rounded-xl p-5 mb-6 text-left"
            style={{
              background: "rgba(255,255,255,0.8)",
              border: "1px solid rgba(212,237,224,0.1)",
            }}
          >
            <h3
              className="font-display text-sm mb-3"
              style={{ color: "#1A2A1E" }}
            >
              Common reasons for failure:
            </h3>
            <ul className="space-y-2">
              {[
                "Insufficient funds or card limit reached",
                "Bank declined the transaction for security",
                "Card expired or incorrect CVV entered",
                "Network timeout — try again with stable internet",
                "International transactions disabled on your card",
              ].map((reason) => (
                <li
                  key={reason}
                  className="flex items-start gap-2 font-body text-sm"
                  style={{ color: "#4A5E52" }}
                >
                  <HelpCircle
                    size={14}
                    className="mt-0.5 shrink-0"
                    style={{ color: "#E8541A" }}
                  />
                  {reason}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <button
              type="button"
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-body text-sm transition-all duration-200 hover:opacity-90"
              style={{ background: "#E8541A", color: "#FFFFFF" }}
              data-ocid="payment.retry_button"
            >
              <RefreshCw size={16} />
              Try Again
            </button>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-body text-sm transition-all duration-200 hover:opacity-90"
              style={{
                background: "rgba(212,237,224,0.1)",
                color: "#1A2A1E",
                border: "1px solid rgba(212,237,224,0.2)",
              }}
              data-ocid="payment.contact_support_button"
            >
              <MessageCircle size={16} />
              Contact Support
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-body text-sm transition-all duration-200 hover:opacity-90"
              style={{
                background: "rgba(212,237,224,0.05)",
                color: "#4A5E52",
                border: "1px solid rgba(212,237,224,0.1)",
              }}
              data-ocid="payment.go_home_button"
            >
              <Home size={16} />
              Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
}
