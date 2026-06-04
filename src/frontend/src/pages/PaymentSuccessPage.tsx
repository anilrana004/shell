import { Layout } from "@/components/Layout";
import { useBooking, useConfirmPayment } from "@/hooks/useBookings";
import { useAuthStatus } from "@/store/authStore";
import { useSearch } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Calendar,
  CheckCircle,
  Download,
  Home,
  Mountain,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

export default function PaymentSuccessPage() {
  const search = useSearch({ from: "/payment-success" }) as {
    bookingId?: string;
    session_id?: string;
  };
  const { isAuthenticated } = useAuthStatus();
  const [confetti, setConfetti] = useState<
    Array<{
      id: number;
      left: number;
      delay: number;
      duration: number;
      color: string;
    }>
  >([]);

  const bookingId = search.bookingId ? BigInt(search.bookingId) : null;
  const sessionId = search.session_id || "";

  const { data: booking, isLoading: bookingLoading } = useBooking(bookingId);
  const confirmPayment = useConfirmPayment();

  // Generate confetti
  useEffect(() => {
    const pieces = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 3,
      color: ["#1A2A1E", "#4A5E52", "#E8541A", "#D4A843", "#2E7D4F"][
        Math.floor(Math.random() * 5)
      ],
    }));
    setConfetti(pieces);
  }, []);

  // Auto-confirm payment on mount
  useEffect(() => {
    if (
      bookingId &&
      sessionId &&
      !confirmPayment.isPending &&
      !confirmPayment.isSuccess &&
      !confirmPayment.isError
    ) {
      confirmPayment.mutate({ bookingId, paymentId: sessionId });
    }
  }, [
    bookingId,
    sessionId,
    confirmPayment.isPending,
    confirmPayment.isSuccess,
    confirmPayment.isError,
    confirmPayment.mutate,
  ]);

  const isLoading = bookingLoading || confirmPayment.isPending;
  const isError = confirmPayment.isError;

  return (
    <Layout>
      {/* Confetti Animation */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
        {confetti.map((piece) => (
          <motion.div
            key={piece.id}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${piece.left}%`,
              backgroundColor: piece.color,
              top: -10,
            }}
            animate={{
              y: [0, window.innerHeight + 100],
              rotate: [0, 720],
              opacity: [1, 1, 0],
            }}
            transition={{
              duration: piece.duration,
              delay: piece.delay,
              ease: "linear",
              repeat: Number.POSITIVE_INFINITY,
            }}
          />
        ))}
      </div>

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
            border: "1px solid rgba(212,237,224,0.15)",
          }}
        >
          {isLoading ? (
            <div className="py-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="w-12 h-12 rounded-full border-2 border-t-transparent mx-auto mb-4"
                style={{
                  borderColor: "#1A2A1E",
                  borderTopColor: "transparent",
                }}
              />
              <p className="font-body" style={{ color: "#4A5E52" }}>
                Confirming your booking...
              </p>
            </div>
          ) : isError ? (
            <>
              <div
                className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
                style={{ background: "rgba(232,84,26,0.2)" }}
              >
                <span className="text-4xl">⚠️</span>
              </div>
              <h1
                className="font-display text-2xl md:text-3xl mb-3"
                style={{ color: "#1A2A1E" }}
              >
                Payment Received
              </h1>
              <p className="font-body mb-2" style={{ color: "#4A5E52" }}>
                Your payment was successful, but we had trouble confirming it in
                our system.
              </p>
              <p
                className="font-body text-sm mb-6"
                style={{ color: "#4A5E52", opacity: 0.7 }}
              >
                {confirmPayment.error instanceof Error
                  ? confirmPayment.error.message
                  : "Please contact support with your booking reference."}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-body text-sm transition-all duration-200 hover:opacity-90"
                  style={{ background: "#E8541A", color: "#FFFFFF" }}
                  data-ocid="payment.contact_support_button"
                >
                  Contact Support
                </Link>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-body text-sm transition-all duration-200 hover:opacity-90"
                  style={{
                    background: "rgba(212,237,224,0.1)",
                    color: "#1A2A1E",
                    border: "1px solid rgba(212,237,224,0.2)",
                  }}
                  data-ocid="payment.go_to_dashboard_button"
                >
                  <Home size={16} />
                  Go to Dashboard
                </Link>
              </div>
            </>
          ) : (
            <>
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
                  background: "rgba(45,80,22,0.3)",
                  border: "2px solid #2E7D4F",
                }}
              >
                <CheckCircle size={40} style={{ color: "#2E7D4F" }} />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-display text-2xl md:text-3xl mb-3"
                style={{ color: "#1A2A1E" }}
              >
                Booking Confirmed!
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="font-body mb-6"
                style={{ color: "#4A5E52" }}
              >
                Your Himalayan adventure is officially booked. We have sent a
                confirmation to your email with all the details.
              </motion.p>

              {booking && (
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
                  <div
                    className="flex items-center gap-3 mb-4 pb-4"
                    style={{ borderBottom: "1px solid rgba(212,237,224,0.1)" }}
                  >
                    <Mountain size={20} style={{ color: "#E8541A" }} />
                    <span
                      className="font-display text-lg"
                      style={{ color: "#1A2A1E" }}
                    >
                      Booking #{booking.id.toString()}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Calendar size={16} style={{ color: "#4A5E52" }} />
                      <span
                        className="font-body text-sm"
                        style={{ color: "#4A5E52" }}
                      >
                        Trek:{" "}
                        {booking.trekSlug
                          .replace(/-/g, " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users size={16} style={{ color: "#4A5E52" }} />
                      <span
                        className="font-body text-sm"
                        style={{ color: "#4A5E52" }}
                      >
                        Travelers: {booking.travelers.length}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className="font-body text-sm"
                        style={{ color: "#D4A843" }}
                      >
                        Total Paid: ₹
                        {Number(booking.totalAmount).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-3 justify-center"
              >
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-body text-sm transition-all duration-200 hover:opacity-90"
                  style={{ background: "#E8541A", color: "#FFFFFF" }}
                  data-ocid="payment.go_to_dashboard_button"
                >
                  <Home size={16} />
                  Go to Dashboard
                  <ArrowRight size={16} />
                </Link>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-body text-sm transition-all duration-200 hover:opacity-90"
                  style={{
                    background: "rgba(212,237,224,0.1)",
                    color: "#1A2A1E",
                    border: "1px solid rgba(212,237,224,0.2)",
                  }}
                  data-ocid="payment.download_receipt_button"
                >
                  <Download size={16} />
                  Download Receipt
                </button>
              </motion.div>

              {!isAuthenticated && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mt-6 text-sm font-body"
                  style={{ color: "#4A5E52", opacity: 0.7 }}
                >
                  <Link
                    to="/auth/login"
                    className="underline hover:opacity-80"
                    style={{ color: "#1A2A1E" }}
                  >
                    Create an account
                  </Link>{" "}
                  to manage your bookings and earn loyalty rewards.
                </motion.p>
              )}
            </>
          )}
        </motion.div>
      </div>
    </Layout>
  );
}
