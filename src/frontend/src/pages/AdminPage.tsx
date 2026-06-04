import {
  type AnnouncementPublic,
  type BatchPublic,
  BatchStatus,
  GuideAvailability,
  type GuidePublic,
  createActor,
} from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuthStatus } from "@/store/authStore";
import { useActor } from "@caffeineai/core-infrastructure";
import {
  AlertCircle,
  Award,
  Calendar,
  CheckCircle2,
  ChevronUp,
  Clock,
  Filter,
  ListOrdered,
  Loader2,
  Mail,
  MapPin,
  Megaphone,
  Phone,
  Plus,
  Search,
  Shield,
  Star,
  Trash2,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import RichTextEditor from "../components/RichTextEditor";

// ─── Types ───────────────────────────────────────────────────────────

type TabKey = "bookings" | "guides" | "batches" | "waitlists" | "announcements";

type BookingStatus = "confirmed" | "pending" | "cancelled" | "completed";

interface Booking {
  id: string;
  trekName: string;
  customerName: string;
  email: string;
  phone: string;
  batchDate: string;
  groupSize: number;
  totalAmount: number;
  status: BookingStatus;
  paymentStatus: "paid" | "partial" | "pending";
  guideName?: string;
  bookedAt: string;
}

interface Guide {
  id: string;
  name: string;
  designation: string;
  phone: string;
  certifications: string[];
  availability: "Available" | "OnTrek" | "OnLeave";
  rating: number;
  treksLed: number;
  currentAssignment?: string;
}

interface Batch {
  id: string;
  trekName: string;
  startDate: string;
  endDate: string;
  seatsTotal: number;
  seatsBooked: number;
  price: number;
  status: "open" | "full" | "closed" | "cancelled";
  guideName?: string;
  guideId?: string;
}

interface WaitlistEntry {
  id: string;
  batchId: string;
  trekName: string;
  batchDate: string;
  name: string;
  email: string;
  phone: string;
  position: number;
  numPeople: number;
  status: "Waiting" | "Notified" | "Booked" | "Expired";
  createdAt: string;
  notifiedAt?: string;
}

// ─── Mock Data ───────────────────────────────────────────────────────

const MOCK_BOOKINGS: Booking[] = [
  {
    id: "BK-001",
    trekName: "Kedarkantha Trek",
    customerName: "Rahul Sharma",
    email: "rahul.sharma@email.com",
    phone: "+91-98765-43210",
    batchDate: "2026-01-15",
    groupSize: 4,
    totalAmount: 23996,
    status: "confirmed",
    paymentStatus: "paid",
    guideName: "Deepak Negi",
    bookedAt: "2025-12-01",
  },
  {
    id: "BK-002",
    trekName: "Har Ki Dun Trek",
    customerName: "Priya Patel",
    email: "priya.p@email.com",
    phone: "+91-98765-43211",
    batchDate: "2026-02-20",
    groupSize: 2,
    totalAmount: 15998,
    status: "pending",
    paymentStatus: "partial",
    bookedAt: "2025-12-05",
  },
  {
    id: "BK-003",
    trekName: "Valley of Flowers",
    customerName: "Amit Kumar",
    email: "amit.k@email.com",
    phone: "+91-98765-43212",
    batchDate: "2026-07-10",
    groupSize: 6,
    totalAmount: 41994,
    status: "confirmed",
    paymentStatus: "paid",
    guideName: "Suresh Bisht",
    bookedAt: "2025-11-20",
  },
  {
    id: "BK-004",
    trekName: "Bali Pass Trek",
    customerName: "Neha Gupta",
    email: "neha.g@email.com",
    phone: "+91-98765-43213",
    batchDate: "2026-05-15",
    groupSize: 1,
    totalAmount: 14999,
    status: "cancelled",
    paymentStatus: "pending",
    bookedAt: "2025-12-10",
  },
  {
    id: "BK-005",
    trekName: "Dayara Bugyal Trek",
    customerName: "Vikram Singh",
    email: "vikram.s@email.com",
    phone: "+91-98765-43214",
    batchDate: "2026-03-05",
    groupSize: 3,
    totalAmount: 17997,
    status: "confirmed",
    paymentStatus: "paid",
    guideName: "Deepak Negi",
    bookedAt: "2025-12-08",
  },
];

const _MOCK_GUIDES: Guide[] = [
  {
    id: "GD-001",
    name: "Deepak Negi",
    designation: "Senior Trek Leader",
    phone: "+91-82798-88470",
    certifications: ["UIAA", "IMF", "Wilderness First Aid"],
    availability: "OnTrek",
    rating: 4.9,
    treksLed: 156,
    currentAssignment: "Kedarkantha Trek (Jan 15)",
  },
  {
    id: "GD-002",
    name: "Suresh Bisht",
    designation: "Mountain Guide",
    phone: "+91-82798-88471",
    certifications: ["IMF", "Basic Mountaineering"],
    availability: "Available",
    rating: 4.7,
    treksLed: 89,
  },
  {
    id: "GD-003",
    name: "Anita Rawat",
    designation: "Trek Leader",
    phone: "+91-82798-88472",
    certifications: ["Wilderness First Aid", "Leave No Trace"],
    availability: "Available",
    rating: 4.8,
    treksLed: 67,
  },
  {
    id: "GD-004",
    name: "Rohit Chauhan",
    designation: "Assistant Guide",
    phone: "+91-82798-88473",
    certifications: ["Basic Mountaineering"],
    availability: "OnLeave",
    rating: 4.5,
    treksLed: 34,
  },
];

const _MOCK_BATCHES: Batch[] = [
  {
    id: "BT-001",
    trekName: "Kedarkantha Trek",
    startDate: "2026-01-15",
    endDate: "2026-01-20",
    seatsTotal: 12,
    seatsBooked: 10,
    price: 5999,
    status: "open",
    guideName: "Deepak Negi",
    guideId: "GD-001",
  },
  {
    id: "BT-002",
    trekName: "Har Ki Dun Trek",
    startDate: "2026-02-20",
    endDate: "2026-02-26",
    seatsTotal: 10,
    seatsBooked: 10,
    price: 7999,
    status: "full",
  },
  {
    id: "BT-003",
    trekName: "Valley of Flowers",
    startDate: "2026-07-10",
    endDate: "2026-07-15",
    seatsTotal: 15,
    seatsBooked: 8,
    price: 6999,
    status: "open",
    guideName: "Suresh Bisht",
    guideId: "GD-002",
  },
  {
    id: "BT-004",
    trekName: "Bali Pass Trek",
    startDate: "2026-05-15",
    endDate: "2026-05-22",
    seatsTotal: 8,
    seatsBooked: 4,
    price: 14999,
    status: "open",
  },
  {
    id: "BT-005",
    trekName: "Dayara Bugyal Trek",
    startDate: "2026-03-05",
    endDate: "2026-03-08",
    seatsTotal: 12,
    seatsBooked: 12,
    price: 5999,
    status: "full",
    guideName: "Deepak Negi",
    guideId: "GD-001",
  },
];

const MOCK_WAITLIST: WaitlistEntry[] = [
  {
    id: "WL-001",
    batchId: "BT-002",
    trekName: "Har Ki Dun Trek",
    batchDate: "2026-02-20",
    name: "Sneha Reddy",
    email: "sneha.r@email.com",
    phone: "+91-98765-43215",
    position: 1,
    numPeople: 2,
    status: "Waiting",
    createdAt: "2025-12-12",
  },
  {
    id: "WL-002",
    batchId: "BT-002",
    trekName: "Har Ki Dun Trek",
    batchDate: "2026-02-20",
    name: "Arjun Nair",
    email: "arjun.n@email.com",
    phone: "+91-98765-43216",
    position: 2,
    numPeople: 1,
    status: "Notified",
    createdAt: "2025-12-10",
    notifiedAt: "2025-12-14",
  },
  {
    id: "WL-003",
    batchId: "BT-005",
    trekName: "Dayara Bugyal Trek",
    batchDate: "2026-03-05",
    name: "Meera Iyer",
    email: "meera.i@email.com",
    phone: "+91-98765-43217",
    position: 1,
    numPeople: 3,
    status: "Waiting",
    createdAt: "2025-12-13",
  },
];

// ─── Helper Components ───────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    confirmed: "bg-[#2E7D4F] text-white",
    pending: "bg-[#FDE8DE] text-[#1A2A1E]",
    cancelled: "bg-[#E8541A] text-white",
    completed: "bg-[#2E7D4F] text-[#1A2A1E]",
    paid: "bg-[#2E7D4F] text-white",
    partial: "bg-[#FDE8DE] text-[#1A2A1E]",
    open: "bg-[#2E7D4F] text-white",
    full: "bg-[#E8541A] text-white",
    closed: "bg-[#7A8E80] text-white",
    Available: "bg-[#2E7D4F] text-white",
    OnTrek: "bg-[#2E7D4F] text-[#1A2A1E]",
    OnLeave: "bg-[#EDF7F2] text-[#1A2A1E]",
    Waiting: "bg-[#EDF7F2] text-[#1A2A1E]",
    Notified: "bg-[#FDE8DE] text-[#1A2A1E]",
    Booked: "bg-[#2E7D4F] text-white",
    Expired: "bg-[#E8541A] text-white",
  };

  return (
    <Badge
      className={`${styles[status] || "bg-[#EDF7F2] text-[#1A2A1E]"} font-medium`}
    >
      {status}
    </Badge>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
  color: string;
}) {
  return (
    <div className="rounded-xl border border-[#EDF7F2] bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-[#7A8E80]">{label}</p>
          <p className="mt-1 font-display text-2xl font-bold text-[#1A2A1E]">
            {value}
          </p>
        </div>
        <div className={`rounded-lg p-3 ${color}`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
      </div>
    </div>
  );
}

// ─── Tab: Bookings ───────────────────────────────────────────────────

function BookingsTab() {
  const [filter, setFilter] = useState<"all" | BookingStatus>("all");
  const [search, setSearch] = useState("");

  const filtered = MOCK_BOOKINGS.filter((b) => {
    const matchesFilter = filter === "all" || b.status === filter;
    const matchesSearch =
      search === "" ||
      b.customerName.toLowerCase().includes(search.toLowerCase()) ||
      b.trekName.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: MOCK_BOOKINGS.length,
    confirmed: MOCK_BOOKINGS.filter((b) => b.status === "confirmed").length,
    revenue: MOCK_BOOKINGS.filter((b) => b.paymentStatus === "paid").reduce(
      (sum, b) => sum + b.totalAmount,
      0,
    ),
    pending: MOCK_BOOKINGS.filter((b) => b.status === "pending").length,
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Bookings"
          value={stats.total.toString()}
          icon={Calendar}
          color="bg-[#E8541A]"
        />
        <StatCard
          label="Confirmed"
          value={stats.confirmed.toString()}
          icon={CheckCircle2}
          color="bg-[#2E7D4F]"
        />
        <StatCard
          label="Revenue (₹)"
          value={stats.revenue.toLocaleString()}
          icon={TrendingUp}
          color="bg-[#D4A843]"
        />
        <StatCard
          label="Pending"
          value={stats.pending.toString()}
          icon={Clock}
          color="bg-[#2E7D4F]"
        />
      </div>

      <div className="rounded-xl border border-[#EDF7F2] bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-[#EDF7F2] p-4 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="font-display text-lg font-semibold text-[#1A2A1E]">
            All Bookings
          </h3>
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7A8E80]" />
              <input
                type="text"
                placeholder="Search bookings..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="rounded-lg border border-[#EDF7F2] bg-white py-2 pl-9 pr-4 text-sm text-[#1A2A1E] placeholder:text-[#7A8E80] focus:border-[#E8541A] focus:outline-none"
              />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as typeof filter)}
              className="rounded-lg border border-[#EDF7F2] bg-white px-3 py-2 text-sm text-[#1A2A1E] focus:border-[#E8541A] focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#FEF4F0]">
                <TableHead className="text-[#1A2A1E]">Booking ID</TableHead>
                <TableHead className="text-[#1A2A1E]">Trek</TableHead>
                <TableHead className="text-[#1A2A1E]">Customer</TableHead>
                <TableHead className="text-[#1A2A1E]">Batch Date</TableHead>
                <TableHead className="text-[#1A2A1E]">Group</TableHead>
                <TableHead className="text-[#1A2A1E]">Amount</TableHead>
                <TableHead className="text-[#1A2A1E]">Status</TableHead>
                <TableHead className="text-[#1A2A1E]">Payment</TableHead>
                <TableHead className="text-[#1A2A1E]">Guide</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-mono text-sm text-[#1A2A1E]">
                    {booking.id}
                  </TableCell>
                  <TableCell className="text-[#1A2A1E]">
                    {booking.trekName}
                  </TableCell>
                  <TableCell>
                    <div className="text-[#1A2A1E]">{booking.customerName}</div>
                    <div className="text-xs text-[#7A8E80]">
                      {booking.email}
                    </div>
                  </TableCell>
                  <TableCell className="text-[#1A2A1E]">
                    {booking.batchDate}
                  </TableCell>
                  <TableCell className="text-[#1A2A1E]">
                    {booking.groupSize}
                  </TableCell>
                  <TableCell className="font-medium text-[#D4A843]">
                    ₹{booking.totalAmount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={booking.status} />
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={booking.paymentStatus} />
                  </TableCell>
                  <TableCell className="text-[#1A2A1E]">
                    {booking.guideName || "—"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

// ─── Tab: Guides ────────────────────────────────────────────────────

function GuidesTab() {
  const { actor } = useActor(createActor);
  const [guides, setGuides] = useState<GuidePublic[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<Record<string, string>>(
    {},
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchGuides = useCallback(async () => {
    if (!actor) return;
    try {
      const data = await actor.getAllGuides();
      setGuides(data);
    } catch {
      toast.error("Failed to load guides");
    } finally {
      setLoading(false);
    }
  }, [actor]);

  useEffect(() => {
    fetchGuides();
  }, [fetchGuides]);

  const handleFileSelect = async (guideId: string, file: File) => {
    // Validation
    if (!file.type.startsWith("image/")) {
      setUploadError("Please select an image file.");
      setUploadingId(guideId);
      setTimeout(() => {
        setUploadError(null);
        setUploadingId(null);
      }, 2500);
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setUploadError("File too large. Maximum 2MB.");
      setUploadingId(guideId);
      setTimeout(() => {
        setUploadError(null);
        setUploadingId(null);
      }, 2500);
      return;
    }

    setUploadError(null);
    setUploadSuccess((prev) => {
      const next = { ...prev };
      delete next[guideId];
      return next;
    });
    setUploadingId(guideId);

    try {
      const url = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.updateGuidePhoto(guideId, url);
      if (result.__kind__ === "ok") {
        setUploadSuccess((prev) => ({ ...prev, [guideId]: "✓ Photo updated" }));
        setTimeout(() => {
          setUploadSuccess((prev) => {
            const next = { ...prev };
            delete next[guideId];
            return next;
          });
        }, 3000);
        await fetchGuides();
      } else {
        setUploadError(result.err);
        setTimeout(() => setUploadError(null), 3000);
      }
    } catch {
      setUploadError("Upload failed — try again");
      setTimeout(() => setUploadError(null), 3000);
    } finally {
      setUploadingId(null);
    }
  };

  const handleAvailabilityToggle = async (guideId: string) => {
    if (!actor) return;
    const guide = guides.find((g) => g.id === guideId);
    if (!guide) return;
    const next: GuideAvailability[] = [
      GuideAvailability.Available,
      GuideAvailability.OnTrek,
      GuideAvailability.OnLeave,
    ];
    const idx = next.indexOf(guide.availability);
    const nextAvail = next[(idx + 1) % 3];
    try {
      const result = await actor.updateGuideAvailability(guideId, nextAvail);
      if (result.__kind__ === "ok") {
        toast.success("Guide availability updated");
        await fetchGuides();
      } else {
        toast.error(result.err);
      }
    } catch {
      toast.error("Failed to update availability");
    }
  };

  const availabilityLabel = (a: GuideAvailability) => {
    if (a === GuideAvailability.Available) return "Available";
    if (a === GuideAvailability.OnTrek) return "OnTrek";
    return "OnLeave";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg font-semibold text-[#1A2A1E]">
            Guide Management
          </h3>
          <p className="text-sm text-[#7A8E80]">
            {guides.length} guides ·{" "}
            {
              guides.filter(
                (g) => g.availability === GuideAvailability.Available,
              ).length
            }{" "}
            available
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-[#E8541A]" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {guides.map((guide) => (
            <div
              key={guide.id}
              className="rounded-xl border border-[#EDF7F2] bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {guide.photo ? (
                    <img
                      src={guide.photo}
                      alt={guide.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E8541A] font-display text-lg font-bold text-white">
                      {guide.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h4 className="font-display font-semibold text-[#1A2A1E]">
                      {guide.name}
                    </h4>
                    <p className="text-sm text-[#7A8E80]">
                      {guide.designation}
                    </p>
                  </div>
                </div>
                <StatusBadge status={availabilityLabel(guide.availability)} />
              </div>

              <div className="mt-2 flex items-center gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileSelect(guide.id, file);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#E8541A] text-[#E8541A] hover:bg-[#E8541A] hover:text-white text-xs h-7 px-2"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingId === guide.id}
                  data-ocid={`admin.upload_photo_button.${guide.id}`}
                >
                  {uploadingId === guide.id ? (
                    <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                  ) : (
                    <Plus className="mr-1 h-3 w-3" />
                  )}
                  Upload Photo
                </Button>
                {uploadError && uploadingId === guide.id && (
                  <span className="text-xs text-[#E8541A]">{uploadError}</span>
                )}
                {uploadSuccess[guide.id] && !uploadingId && (
                  <span className="text-xs text-[#2E7D4F]">
                    {uploadSuccess[guide.id]}
                  </span>
                )}
              </div>

              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-2 text-sm text-[#4A5E52]">
                  <Star className="h-4 w-4 text-[#2E7D4F]" />
                  {guide.yearsExperience.toString()} years exp
                </div>
                <div className="flex items-center gap-2 text-sm text-[#4A5E52]">
                  <Star className="h-4 w-4 text-[#D4A843]" />
                  {guide.rating}/5 · {Number(guide.totalTreksLed)} treks led
                </div>
                {guide.currentAssignment && (
                  <div className="flex items-center gap-2 text-sm text-[#4A5E52]">
                    <MapPin className="h-4 w-4 text-[#E8541A]" />
                    {guide.currentAssignment}
                  </div>
                )}
              </div>

              <div className="mt-3 flex flex-wrap gap-1">
                {guide.certifications.map((cert) => (
                  <Badge
                    key={cert}
                    variant="outline"
                    className="border-[#2E7D4F] text-[#1A2A1E]"
                  >
                    <Award className="mr-1 h-3 w-3 text-[#2E7D4F]" />
                    {cert}
                  </Badge>
                ))}
              </div>

              <div className="mt-4 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-[#EDF7F2] text-[#1A2A1E] hover:bg-[#FEF4F0]"
                  onClick={() => handleAvailabilityToggle(guide.id)}
                  data-ocid="admin.toggle_availability_button"
                >
                  Toggle Status
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Tab: Batches ────────────────────────────────────────────────────

function BatchesTab() {
  const { actor } = useActor(createActor);
  const [batches, setBatches] = useState<BatchPublic[]>([]);
  const [guides, setGuides] = useState<GuidePublic[]>([]);
  const [loading, setLoading] = useState(true);
  const [assigningBatch, setAssigningBatch] = useState<BatchPublic | null>(
    null,
  );
  const [selectedGuide, setSelectedGuide] = useState("");

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [editingBatchId, setEditingBatchId] = useState<bigint | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [formTrek, setFormTrek] = useState("");
  const [formStartDate, setFormStartDate] = useState("");
  const [formEndDate, setFormEndDate] = useState("");
  const [formPrice, setFormPrice] = useState("");
  const [formMaxSeats, setFormMaxSeats] = useState("");
  const [formMeetingPoint, setFormMeetingPoint] = useState("");
  const [formGuide, setFormGuide] = useState("");
  const [formStatus, setFormStatus] = useState("active");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const TREK_OPTIONS = [
    { label: "Kedarkantha", value: "kedarkantha" },
    { label: "Har Ki Dun", value: "har-ki-dun" },
    { label: "Chandernahan Lake", value: "chandernahan-lake" },
    { label: "Chaainsheel Bugyal", value: "chaainsheel-bugyal" },
    { label: "Buran Ghati", value: "buran-ghati" },
    { label: "Ruinsara Tal", value: "ruinsara-tal" },
    { label: "Rupin Pass", value: "rupin-pass" },
    { label: "Bali Pass", value: "bali-pass" },
    { label: "Dayara Bugyal", value: "dayara-bugyal" },
    { label: "Nag Tibba", value: "nag-tibba" },
    { label: "Chopta Chandrashila", value: "chopta-chandrashila" },
    { label: "Phulara Ridge", value: "phulara-ridge" },
    { label: "Borasu Pass", value: "borasu-pass" },
    { label: "Valley of Flowers", value: "valley-of-flowers" },
  ];

  const fetchBatches = useCallback(async () => {
    if (!actor) return;
    try {
      const [batchData, guideData] = await Promise.all([
        actor.getBatchesAll(),
        actor.getAllGuides(),
      ]);
      setBatches(batchData);
      setGuides(guideData);
    } catch {
      toast.error("Failed to load batches");
    } finally {
      setLoading(false);
    }
  }, [actor]);

  useEffect(() => {
    fetchBatches();
  }, [fetchBatches]);

  const resetForm = () => {
    setFormTrek("");
    setFormStartDate("");
    setFormEndDate("");
    setFormPrice("");
    setFormMaxSeats("");
    setFormMeetingPoint("");
    setFormGuide("");
    setFormStatus("active");
    setFormErrors({});
    setEditingBatchId(null);
  };

  const openCreateModal = () => {
    resetForm();
    setModalMode("create");
    setShowModal(true);
  };

  const openEditModal = (batch: BatchPublic) => {
    setModalMode("edit");
    setEditingBatchId(batch.id);
    setFormTrek(batch.trekSlug);
    setFormStartDate(batch.startDate);
    setFormEndDate(batch.endDate);
    setFormPrice(String(batch.pricePerPerson));
    setFormMaxSeats(String(batch.totalSeats));
    setFormMeetingPoint("");
    setFormGuide(batch.guideId || "");
    setFormStatus(
      batch.status === BatchStatus.Open
        ? "active"
        : batch.status === BatchStatus.Completed
          ? "completed"
          : batch.status === BatchStatus.Cancelled
            ? "cancelled"
            : "active",
    );
    setFormErrors({});
    setShowModal(true);
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formTrek) errors.trek = "Trek is required";
    if (!formStartDate) errors.startDate = "Start date is required";
    if (!formEndDate) errors.endDate = "End date is required";

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (formStartDate) {
      const sd = new Date(formStartDate);
      sd.setHours(0, 0, 0, 0);
      if (sd < today) errors.startDate = "Start date must be today or later";
    }
    if (formStartDate && formEndDate) {
      const sd = new Date(formStartDate);
      const ed = new Date(formEndDate);
      if (ed <= sd) errors.endDate = "End date must be after start date";
    }

    const price = Number(formPrice);
    if (!formPrice || price <= 0) errors.price = "Price must be greater than 0";

    const seats = Number(formMaxSeats);
    if (!formMaxSeats || seats < 1 || seats > 50)
      errors.maxSeats = "Max seats must be between 1 and 50";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!actor) return;
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const trekName =
        TREK_OPTIONS.find((t) => t.value === formTrek)?.label || formTrek;

      if (modalMode === "create") {
        const result = await actor.createBatch({
          trekSlug: formTrek,
          trekName,
          startDate: formStartDate,
          endDate: formEndDate,
          pricePerPerson: BigInt(formPrice),
          maxSeats: BigInt(formMaxSeats),
          meetingPoint: formMeetingPoint || "Dehradun ISBT",
          guideId: formGuide || undefined,
          status: formStatus,
        });
        if (result.__kind__ === "ok") {
          toast.success("Batch created successfully");
          setShowModal(false);
          resetForm();
          await fetchBatches();
        } else {
          toast.error(result.err);
        }
      } else if (modalMode === "edit" && editingBatchId !== null) {
        const input: import("@/backend").BatchUpdateInput = {
          trekSlug: formTrek,
          trekName,
          startDate: formStartDate,
          endDate: formEndDate,
          pricePerPerson: BigInt(formPrice),
          maxSeats: BigInt(formMaxSeats),
          meetingPoint: formMeetingPoint || undefined,
          guideId: formGuide || undefined,
          status: formStatus,
        };
        const result = await actor.updateBatch(editingBatchId, input);
        if (result.__kind__ === "ok") {
          toast.success("Batch updated successfully");
          setShowModal(false);
          resetForm();
          await fetchBatches();
        } else {
          toast.error(result.err);
        }
      }
    } catch {
      toast.error("Failed to save batch");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (batchId: bigint) => {
    if (!actor) return;
    if (!window.confirm("Delete this batch? This action cannot be undone."))
      return;
    try {
      const result = await actor.deleteBatch(batchId);
      if (result.__kind__ === "ok") {
        toast.success("Batch deleted");
        setBatches((prev) => prev.filter((b) => b.id !== batchId));
      } else {
        toast.error(result.err);
      }
    } catch {
      toast.error("Failed to delete batch");
    }
  };

  const handleAssignGuide = async () => {
    if (!actor || !assigningBatch || !selectedGuide) return;
    try {
      const result = await actor.assignGuideToBatch(
        String(assigningBatch.id),
        selectedGuide,
      );
      if (result.__kind__ === "ok") {
        toast.success("Guide assigned successfully");
        await fetchBatches();
      } else {
        toast.error(result.err);
      }
    } catch {
      toast.error("Failed to assign guide");
    }
    setAssigningBatch(null);
    setSelectedGuide("");
  };

  const statusBadgeClass = (status: string) => {
    const s = status.toLowerCase();
    if (s === "active" || s === "open") return "bg-[#E8541A] text-white";
    if (s === "cancelled") return "bg-red-100 text-red-700";
    if (s === "completed" || s === "full") return "bg-[#2E7D4F] text-[#1A2A1E]";
    return "bg-[#EDF7F2] text-[#1A2A1E]";
  };

  const seatsBarColor = (booked: bigint, total: bigint) => {
    const ratio = Number(booked) / Number(total);
    if (ratio > 0.8) return "#E8541A";
    if (ratio > 0.5) return "#D4A843";
    return "#2E7D4F";
  };

  const trekNameFromSlug = (slug: string) => {
    const map: Record<string, string> = {
      kedarkantha: "Kedarkantha Trek",
      "har-ki-dun": "Har Ki Dun Trek",
      "chandernahan-lake": "Chandernahan Lake Trek",
      "chaainsheel-bugyal": "Chaainsheel Bugyal Trek",
      "buran-ghati": "Buran Ghati Trek",
      "ruinsara-tal": "Ruinsara Tal Trek",
      "rupin-pass": "Rupin Pass Trek",
      "bali-pass": "Bali Pass Trek",
      "dayara-bugyal": "Dayara Bugyal Trek",
      "nag-tibba": "Nag Tibba Trek",
      "chopta-chandrashila": "Chopta Chandrashila Trek",
      "phulara-ridge": "Phulara Ridge Trek",
      "borasu-pass": "Borasu Pass Trek",
      "valley-of-flowers": "Valley of Flowers Trek",
    };
    return map[slug] || slug;
  };

  const guideName = (guideId: string) => {
    const g = guides.find((x) => x.id === guideId);
    return g?.name;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Batches"
          value={batches.length.toString()}
          icon={Calendar}
          color="bg-[#E8541A]"
        />
        <StatCard
          label="Open"
          value={batches
            .filter((b) => b.status === BatchStatus.Open)
            .length.toString()}
          icon={CheckCircle2}
          color="bg-[#2E7D4F]"
        />
        <StatCard
          label="Full"
          value={batches
            .filter((b) => b.status === BatchStatus.Full)
            .length.toString()}
          icon={AlertCircle}
          color="bg-[#D4A843]"
        />
        <StatCard
          label="With Guide"
          value={batches.filter((b) => b.guideId).length.toString()}
          icon={Users}
          color="bg-[#2E7D4F]"
        />
      </div>

      <div className="rounded-xl border border-[#EDF7F2] bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-[#EDF7F2] p-4 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="font-display text-lg font-semibold text-[#1A2A1E]">
            Batch Management
          </h3>
          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 rounded-lg bg-[#E8541A] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#C94210]"
            data-ocid="admin.create_batch_button"
          >
            <Plus className="h-4 w-4" />
            Create New Batch
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-[#E8541A]" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#FEF4F0]">
                  <TableHead className="text-[#1A2A1E]">Batch ID</TableHead>
                  <TableHead className="text-[#1A2A1E]">Trek</TableHead>
                  <TableHead className="text-[#1A2A1E]">Dates</TableHead>
                  <TableHead className="text-[#1A2A1E]">Seats</TableHead>
                  <TableHead className="text-[#1A2A1E]">Price</TableHead>
                  <TableHead className="text-[#1A2A1E]">Status</TableHead>
                  <TableHead className="text-[#1A2A1E]">Guide</TableHead>
                  <TableHead className="text-[#1A2A1E]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {batches.map((batch) => (
                  <TableRow key={String(batch.id)}>
                    <TableCell className="font-mono text-sm text-[#1A2A1E]">
                      {String(batch.id)}
                    </TableCell>
                    <TableCell className="text-[#1A2A1E]">
                      {trekNameFromSlug(batch.trekSlug)}
                    </TableCell>
                    <TableCell className="text-[#1A2A1E]">
                      <div className="text-sm">{batch.startDate}</div>
                      <div className="text-xs text-[#7A8E80]">
                        to {batch.endDate}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-16 rounded-full bg-[#EDF7F2]">
                          <div
                            className="h-2 rounded-full"
                            style={{
                              width: `${(Number(batch.bookedSeats) / Number(batch.totalSeats)) * 100}%`,
                              backgroundColor: seatsBarColor(
                                batch.bookedSeats,
                                batch.totalSeats,
                              ),
                            }}
                          />
                        </div>
                        <span className="text-sm text-[#1A2A1E]">
                          {String(batch.bookedSeats)}/{String(batch.totalSeats)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-[#D4A843]">
                      ₹{Number(batch.pricePerPerson).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`${statusBadgeClass(batch.status)} font-medium`}
                      >
                        {batch.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {guideName(batch.guideId) ? (
                        <span className="text-sm text-[#1A2A1E]">
                          {guideName(batch.guideId)}
                        </span>
                      ) : (
                        <span className="text-sm text-[#7A8E80]">
                          Unassigned
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-[#E8541A] text-[#E8541A] hover:bg-[#E8541A] hover:text-white h-7 px-2 text-xs"
                          onClick={() => {
                            setAssigningBatch(batch);
                            setSelectedGuide(batch.guideId || "");
                          }}
                          data-ocid="admin.assign_guide_button"
                        >
                          {batch.guideId ? "Reassign" : "Assign Guide"}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-[#E8541A] text-[#E8541A] hover:bg-[#E8541A] hover:text-white h-7 px-2 text-xs"
                          onClick={() => openEditModal(batch)}
                          data-ocid="admin.edit_batch_button"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700 h-7 px-2 text-xs"
                          onClick={() => handleDelete(batch.id)}
                          data-ocid="admin.delete_batch_button"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Assign Guide Dialog */}
      <Dialog
        open={!!assigningBatch}
        onOpenChange={(open) => !open && setAssigningBatch(null)}
      >
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="font-display text-[#1A2A1E]">
              Assign Guide to{" "}
              {assigningBatch ? trekNameFromSlug(assigningBatch.trekSlug) : ""}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="mb-3 text-sm text-[#4A5E52]">
              Batch: {assigningBatch?.startDate} to {assigningBatch?.endDate}
            </p>
            <label
              htmlFor="guide-select"
              className="text-sm font-medium text-[#1A2A1E]"
            >
              Select Guide
            </label>
            <select
              id="guide-select"
              value={selectedGuide}
              onChange={(e) => setSelectedGuide(e.target.value)}
              className="mt-1 w-full rounded-lg border border-[#EDF7F2] bg-white px-3 py-2 text-sm text-[#1A2A1E] focus:border-[#E8541A] focus:outline-none"
            >
              <option value="">Choose a guide...</option>
              {guides
                .filter((g) => g.availability === GuideAvailability.Available)
                .map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name} — {g.designation} ({g.rating}★)
                  </option>
                ))}
            </select>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setAssigningBatch(null)}
              className="border-[#EDF7F2] text-[#1A2A1E]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAssignGuide}
              disabled={!selectedGuide}
              className="bg-[#E8541A] text-white hover:bg-[#C94210]"
            >
              Assign Guide
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create / Edit Batch Modal */}
      <Dialog
        open={showModal}
        onOpenChange={(open) => {
          if (!open) {
            setShowModal(false);
            resetForm();
          }
        }}
      >
        <DialogContent className="bg-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-[#1A2A1E]">
              {modalMode === "create" ? "Create New Batch" : "Edit Batch"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* Trek */}
            <div>
              <label
                htmlFor="batch-trek"
                className="text-sm font-medium text-[#1A2A1E]"
              >
                Trek <span className="text-[#E8541A]">*</span>
              </label>
              <select
                id="batch-trek"
                value={formTrek}
                onChange={(e) => setFormTrek(e.target.value)}
                className="mt-1 w-full rounded-lg border border-[#EDF7F2] bg-white px-3 py-2 text-sm text-[#1A2A1E] focus:border-[#E8541A] focus:outline-none"
              >
                <option value="">Select a trek...</option>
                {TREK_OPTIONS.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
              {formErrors.trek && (
                <p className="mt-1 text-xs text-red-500">{formErrors.trek}</p>
              )}
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="batch-start"
                  className="text-sm font-medium text-[#1A2A1E]"
                >
                  Start Date <span className="text-[#E8541A]">*</span>
                </label>
                <input
                  id="batch-start"
                  type="date"
                  value={formStartDate}
                  onChange={(e) => setFormStartDate(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-[#EDF7F2] bg-white px-3 py-2 text-sm text-[#1A2A1E] focus:border-[#E8541A] focus:outline-none"
                />
                {formErrors.startDate && (
                  <p className="mt-1 text-xs text-red-500">
                    {formErrors.startDate}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="batch-end"
                  className="text-sm font-medium text-[#1A2A1E]"
                >
                  End Date <span className="text-[#E8541A]">*</span>
                </label>
                <input
                  id="batch-end"
                  type="date"
                  value={formEndDate}
                  onChange={(e) => setFormEndDate(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-[#EDF7F2] bg-white px-3 py-2 text-sm text-[#1A2A1E] focus:border-[#E8541A] focus:outline-none"
                />
                {formErrors.endDate && (
                  <p className="mt-1 text-xs text-red-500">
                    {formErrors.endDate}
                  </p>
                )}
              </div>
            </div>

            {/* Price & Seats */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="batch-price"
                  className="text-sm font-medium text-[#1A2A1E]"
                >
                  Price Per Person (₹) <span className="text-[#E8541A]">*</span>
                </label>
                <input
                  id="batch-price"
                  type="number"
                  min={0}
                  value={formPrice}
                  onChange={(e) => setFormPrice(e.target.value)}
                  placeholder="e.g. 5999"
                  className="mt-1 w-full rounded-lg border border-[#EDF7F2] bg-white px-3 py-2 text-sm text-[#1A2A1E] focus:border-[#E8541A] focus:outline-none"
                />
                {formErrors.price && (
                  <p className="mt-1 text-xs text-red-500">
                    {formErrors.price}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="batch-seats"
                  className="text-sm font-medium text-[#1A2A1E]"
                >
                  Max Seats <span className="text-[#E8541A]">*</span>
                </label>
                <input
                  id="batch-seats"
                  type="number"
                  min={1}
                  max={50}
                  value={formMaxSeats}
                  onChange={(e) => setFormMaxSeats(e.target.value)}
                  placeholder="e.g. 12"
                  className="mt-1 w-full rounded-lg border border-[#EDF7F2] bg-white px-3 py-2 text-sm text-[#1A2A1E] focus:border-[#E8541A] focus:outline-none"
                />
                {formErrors.maxSeats && (
                  <p className="mt-1 text-xs text-red-500">
                    {formErrors.maxSeats}
                  </p>
                )}
              </div>
            </div>

            {/* Meeting Point */}
            <div>
              <label
                htmlFor="batch-meeting"
                className="text-sm font-medium text-[#1A2A1E]"
              >
                Meeting Point
              </label>
              <input
                id="batch-meeting"
                type="text"
                value={formMeetingPoint}
                onChange={(e) => setFormMeetingPoint(e.target.value)}
                placeholder="e.g. Dehradun ISBT Gate 3"
                className="mt-1 w-full rounded-lg border border-[#EDF7F2] bg-white px-3 py-2 text-sm text-[#1A2A1E] focus:border-[#E8541A] focus:outline-none"
              />
            </div>

            {/* Guide & Status */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="batch-guide"
                  className="text-sm font-medium text-[#1A2A1E]"
                >
                  Guide
                </label>
                <select
                  id="batch-guide"
                  value={formGuide}
                  onChange={(e) => setFormGuide(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-[#EDF7F2] bg-white px-3 py-2 text-sm text-[#1A2A1E] focus:border-[#E8541A] focus:outline-none"
                >
                  <option value="">Unassigned</option>
                  {guides.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name} — {g.designation}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="batch-status"
                  className="text-sm font-medium text-[#1A2A1E]"
                >
                  Status
                </label>
                <select
                  id="batch-status"
                  value={formStatus}
                  onChange={(e) => setFormStatus(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-[#EDF7F2] bg-white px-3 py-2 text-sm text-[#1A2A1E] focus:border-[#E8541A] focus:outline-none"
                >
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowModal(false);
                resetForm();
              }}
              className="border-[#EDF7F2] text-[#1A2A1E]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={submitting}
              className="bg-[#E8541A] text-white hover:bg-[#C94210]"
              data-ocid="admin.submit_batch_button"
            >
              {submitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {submitting
                ? "Saving..."
                : modalMode === "create"
                  ? "Create Batch"
                  : "Update Batch"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── Tab: Waitlists ──────────────────────────────────────────────────

function WaitlistsTab() {
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>(MOCK_WAITLIST);
  const [filterBatch, setFilterBatch] = useState("all");

  const batches = Array.from(new Set(waitlist.map((w) => w.batchId))).map(
    (id) => {
      const entry = waitlist.find((w) => w.batchId === id);
      return { id, name: `${entry?.trekName} (${entry?.batchDate})` };
    },
  );

  const filtered =
    filterBatch === "all"
      ? waitlist
      : waitlist.filter((w) => w.batchId === filterBatch);

  const handlePromote = (entryId: string) => {
    setWaitlist((prev) =>
      prev.map((w) =>
        w.id === entryId
          ? {
              ...w,
              status: "Notified" as const,
              notifiedAt: new Date().toISOString().split("T")[0],
            }
          : w,
      ),
    );
    toast.success("Waitlist entry promoted and notified");
  };

  const handleNotifyNext = (batchId: string) => {
    const next = waitlist.find(
      (w) => w.batchId === batchId && w.status === "Waiting",
    );
    if (next) {
      handlePromote(next.id);
    } else {
      toast.info("No one waiting for this batch");
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="Total Waitlisted"
          value={waitlist.length.toString()}
          icon={ListOrdered}
          color="bg-[#E8541A]"
        />
        <StatCard
          label="Waiting"
          value={waitlist
            .filter((w) => w.status === "Waiting")
            .length.toString()}
          icon={Clock}
          color="bg-[#2E7D4F]"
        />
        <StatCard
          label="Notified"
          value={waitlist
            .filter((w) => w.status === "Notified")
            .length.toString()}
          icon={Mail}
          color="bg-[#D4A843]"
        />
      </div>

      <div className="rounded-xl border border-[#EDF7F2] bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-[#EDF7F2] p-4 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="font-display text-lg font-semibold text-[#1A2A1E]">
            Waitlist Entries
          </h3>
          <select
            value={filterBatch}
            onChange={(e) => setFilterBatch(e.target.value)}
            className="rounded-lg border border-[#EDF7F2] bg-white px-3 py-2 text-sm text-[#1A2A1E] focus:border-[#E8541A] focus:outline-none"
          >
            <option value="all">All Batches</option>
            {batches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#FEF4F0]">
                <TableHead className="text-[#1A2A1E]">Entry ID</TableHead>
                <TableHead className="text-[#1A2A1E]">Trek / Batch</TableHead>
                <TableHead className="text-[#1A2A1E]">Name</TableHead>
                <TableHead className="text-[#1A2A1E]">Position</TableHead>
                <TableHead className="text-[#1A2A1E]">People</TableHead>
                <TableHead className="text-[#1A2A1E]">Status</TableHead>
                <TableHead className="text-[#1A2A1E]">Created</TableHead>
                <TableHead className="text-[#1A2A1E]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="font-mono text-sm text-[#1A2A1E]">
                    {entry.id}
                  </TableCell>
                  <TableCell>
                    <div className="text-[#1A2A1E]">{entry.trekName}</div>
                    <div className="text-xs text-[#7A8E80]">
                      {entry.batchDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-[#1A2A1E]">{entry.name}</div>
                    <div className="text-xs text-[#7A8E80]">{entry.email}</div>
                  </TableCell>
                  <TableCell>
                    <span className="font-display text-lg font-bold text-[#E8541A]">
                      #{entry.position}
                    </span>
                  </TableCell>
                  <TableCell className="text-[#1A2A1E]">
                    {entry.numPeople}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={entry.status} />
                  </TableCell>
                  <TableCell className="text-sm text-[#7A8E80]">
                    {entry.createdAt}
                    {entry.notifiedAt && (
                      <div className="text-xs text-[#D4A843]">
                        Notified: {entry.notifiedAt}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {entry.status === "Waiting" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-[#2E7D4F] text-[#2E7D4F] hover:bg-[#2E7D4F] hover:text-white"
                          onClick={() => handlePromote(entry.id)}
                          data-ocid="admin.promote_waitlist_button"
                        >
                          <ChevronUp className="mr-1 h-3 w-3" />
                          Promote
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#2E7D4F] text-[#2E7D4F] hover:bg-[#2E7D4F] hover:text-white"
                        onClick={() => handleNotifyNext(entry.batchId)}
                        data-ocid="admin.notify_next_button"
                      >
                        <Mail className="mr-1 h-3 w-3" />
                        Notify Next
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

// ─── Tab: Announcements ──────────────────────────────────────────────

function AnnouncementsTab() {
  const { actor } = useActor(createActor);
  const [announcements, setAnnouncements] = useState<AnnouncementPublic[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newText, setNewText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchAll = useCallback(async () => {
    if (!actor) return;
    try {
      const data = await actor.getAllAnnouncements();
      setAnnouncements(data);
    } catch {
      toast.error("Failed to load announcements");
    } finally {
      setLoading(false);
    }
  }, [actor]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const handleToggle = async (a: AnnouncementPublic) => {
    if (!actor) return;
    try {
      const result = await actor.updateAnnouncement(a.id, a.text, !a.isActive);
      if (result.__kind__ === "ok") {
        toast.success(
          a.isActive ? "Announcement deactivated" : "Announcement activated",
        );
        setAnnouncements((prev) =>
          prev.map((item) => (item.id === a.id ? result.ok : item)),
        );
      } else {
        toast.error(result.err);
      }
    } catch {
      toast.error("Failed to update announcement");
    }
  };

  const handleDelete = async (id: string) => {
    if (!actor) return;
    try {
      const result = await actor.deleteAnnouncement(id);
      if (result.__kind__ === "ok") {
        toast.success("Announcement deleted");
        setAnnouncements((prev) => prev.filter((a) => a.id !== id));
      } else {
        toast.error(result.err);
      }
    } catch {
      toast.error("Failed to delete announcement");
    }
  };

  const handleCreate = async () => {
    if (!actor || !newText.trim()) return;
    setSubmitting(true);
    try {
      const created = await actor.createAnnouncement(newText.trim());
      toast.success("Announcement created");
      setAnnouncements((prev) => [created, ...prev]);
      setNewText("");
      setShowAddForm(false);
    } catch {
      toast.error("Failed to create announcement");
    } finally {
      setSubmitting(false);
    }
  };

  const activeCount = announcements.filter((a) => a.isActive).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg font-semibold text-[#1A2A1E]">
            Announcements
          </h3>
          <p className="text-sm text-[#7A8E80]">
            {announcements.length} total · {activeCount} active
          </p>
        </div>
        <Button
          onClick={() => setShowAddForm((v) => !v)}
          className="bg-[#E8541A] text-white hover:bg-[#C94210]"
          data-ocid="admin.add_announcement_button"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Announcement
        </Button>
      </div>

      {showAddForm && (
        <div className="rounded-xl border border-[#EDF7F2] bg-white p-5 shadow-sm">
          <label
            htmlFor="announcement-text"
            className="text-sm font-medium text-[#1A2A1E]"
          >
            Announcement Text
          </label>
          <div className="mt-2">
            <RichTextEditor
              value={newText}
              onChange={(html) => setNewText(html)}
              placeholder="e.g. 🏔 Kedarkantha Winter Batch — Jan 15 | 3 Seats Left"
            />
          </div>
          <div className="mt-3 flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setShowAddForm(false);
                setNewText("");
              }}
              className="border-[#EDF7F2] text-[#1A2A1E]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              disabled={!newText.trim() || submitting}
              className="bg-[#E8541A] text-white hover:bg-[#C94210]"
              data-ocid="admin.submit_announcement_button"
            >
              {submitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Plus className="mr-2 h-4 w-4" />
              )}
              Create
            </Button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-[#E8541A]" />
        </div>
      ) : announcements.length === 0 ? (
        <div className="rounded-xl border border-[#EDF7F2] bg-white p-8 text-center shadow-sm">
          <Megaphone className="mx-auto h-8 w-8 text-[#7A8E80]" />
          <p className="mt-3 text-sm text-[#7A8E80]">
            No announcements yet. Create one to show in the navbar ticker.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {announcements.map((a) => (
            <div
              key={a.id}
              className={`rounded-xl border bg-white p-4 shadow-sm transition-shadow hover:shadow-md ${
                a.isActive
                  ? "border-l-4 border-[#E8541A] border-t border-r border-b border-[#EDF7F2]"
                  : "border-[#EDF7F2]"
              }`}
              style={
                a.isActive
                  ? { borderLeftWidth: 4, borderLeftColor: "#E8541A" }
                  : undefined
              }
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <p
                    className={`text-sm font-medium ${
                      a.isActive ? "text-[#1A2A1E]" : "text-[#7A8E80]"
                    }`}
                  >
                    {a.text}
                  </p>
                  <div className="mt-1.5 flex items-center gap-2">
                    {a.isActive ? (
                      <Badge className="bg-[#E8541A] text-white font-medium">
                        Active
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="border-[#7A8E80] text-[#7A8E80] font-medium"
                      >
                        Inactive
                      </Badge>
                    )}
                    <span className="text-xs text-[#7A8E80] font-mono">
                      ID: {a.id}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleToggle(a)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      a.isActive
                        ? "bg-[#EDF7F2] text-[#1A2A1E] hover:bg-[#C94210] hover:text-white"
                        : "bg-[#2E7D4F] text-white hover:bg-[#1A4A2F]"
                    }`}
                    data-ocid={`admin.toggle_announcement.${a.id}`}
                  >
                    {a.isActive ? "Deactivate" : "Activate"}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(a.id)}
                    className="p-1.5 rounded-lg text-[#E8541A] hover:bg-[#E8541A] hover:text-white transition-colors"
                    aria-label="Delete announcement"
                    data-ocid={`admin.delete_announcement.${a.id}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Admin Page ─────────────────────────────────────────────────

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("bookings");
  const { actor } = useActor(createActor);
  const { principalText } = useAuthStatus();
  const [isAdminInitialized, setIsAdminInitialized] = useState<boolean | null>(
    null,
  );
  const [isInitializing, setIsInitializing] = useState(false);

  useEffect(() => {
    async function checkAdmin() {
      if (!actor) return;
      try {
        const adminPrincipal = await actor.getAdminPrincipal();
        setIsAdminInitialized(!!adminPrincipal);
      } catch {
        setIsAdminInitialized(false);
      }
    }
    checkAdmin();
  }, [actor]);

  const handleInitAdmin = async () => {
    if (!actor || !principalText) return;
    setIsInitializing(true);
    try {
      await actor.initAdmin();
      toast.success("Admin initialized successfully");
      setIsAdminInitialized(true);
    } catch (err) {
      toast.error(`Failed to initialize admin: ${String(err)}`);
    } finally {
      setIsInitializing(false);
    }
  };

  const tabs: { key: TabKey; label: string; icon: React.ElementType }[] = [
    { key: "bookings", label: "Bookings", icon: Calendar },
    { key: "guides", label: "Guides", icon: Users },
    { key: "batches", label: "Batches", icon: Calendar },
    { key: "waitlists", label: "Waitlists", icon: ListOrdered },
    { key: "announcements", label: "Announcements", icon: Megaphone },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-[#EDF7F2] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E8541A]">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold text-[#1A2A1E]">
                Admin Dashboard
              </h1>
              <p className="text-xs text-[#7A8E80]">Shail Hikers Management</p>
            </div>
          </div>
          {isAdminInitialized === false && (
            <Button
              onClick={handleInitAdmin}
              disabled={isInitializing}
              className="bg-[#E8541A] text-white hover:bg-[#C94210]"
              data-ocid="admin.init_admin_button"
            >
              {isInitializing ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Shield className="mr-2 h-4 w-4" />
              )}
              Initialize Admin
            </Button>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Mobile Tab Bar */}
        <div className="mb-6 flex overflow-x-auto border-b border-[#EDF7F2] lg:hidden">
          {tabs.map((tab) => (
            <button
              type="button"
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? "border-[#E8541A] text-[#E8541A]"
                  : "border-transparent text-[#7A8E80] hover:text-[#1A2A1E]"
              }`}
              data-ocid={`admin.tab.${tab.key}`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden w-[200px] shrink-0 lg:block">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  type="button"
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                    activeTab === tab.key
                      ? "bg-[#FEF4F0] text-[#E8541A]"
                      : "text-[#4A5E52] hover:bg-[#FEF4F0] hover:text-[#1A2A1E]"
                  }`}
                  data-ocid={`admin.sidebar.${tab.key}`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                  {tab.key === "waitlists" && (
                    <Badge className="ml-auto bg-[#E8541A] text-white">
                      {MOCK_WAITLIST.length}
                    </Badge>
                  )}
                </button>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <main className="min-w-0 flex-1">
            {activeTab === "bookings" && <BookingsTab />}
            {activeTab === "guides" && <GuidesTab />}
            {activeTab === "batches" && <BatchesTab />}
            {activeTab === "waitlists" && <WaitlistsTab />}
            {activeTab === "announcements" && <AnnouncementsTab />}
          </main>
        </div>
      </div>
    </div>
  );
}
