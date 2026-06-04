import { AdminRoute } from "@/components/AdminRoute";
import { Layout } from "@/components/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const queryClient = new QueryClient();

// Lazy page imports
const HomePage = lazy(() => import("@/pages/HomePage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const TreksPage = lazy(() => import("@/pages/TreksPage"));
const TrekDetailPage = lazy(() => import("@/pages/TrekDetailPage"));
const YatraDetailPage = lazy(() => import("@/pages/YatraDetailPage"));
const PackagesPage = lazy(() => import("@/pages/PackagesPage"));
const GalleryPage = lazy(() => import("@/pages/GalleryPage"));
const CorporatePage = lazy(() => import("@/pages/CorporatePage"));
const BlogPage = lazy(() => import("@/pages/BlogPage"));
const BlogPostPage = lazy(() => import("@/pages/BlogPostPage"));
const TeamPage = lazy(() => import("@/pages/TeamPage"));
const BookPage = lazy(() => import("@/pages/BookPage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const VerifyPage = lazy(() => import("@/pages/VerifyPage"));
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const ComparePage = lazy(() => import("@/pages/ComparePage"));
const TrekFinderPage = lazy(() => import("@/pages/TrekFinderPage"));
const WeatherPage = lazy(() => import("@/pages/WeatherPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const CancellationPage = lazy(() => import("@/pages/CancellationPage"));
const TermsPage = lazy(() => import("@/pages/TermsPage"));
const PrivacyPage = lazy(() => import("@/pages/PrivacyPage"));
const SitemapPage = lazy(() => import("@/pages/SitemapPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));
const AdminPage = lazy(() => import("@/pages/AdminPage"));
const PaymentSuccessPage = lazy(() => import("@/pages/PaymentSuccessPage"));
const PaymentFailurePage = lazy(() => import("@/pages/PaymentFailurePage"));

function PageFallback() {
  return (
    <div
      className="min-h-[60vh] flex items-center justify-center"
      style={{ background: "#EDF7F2" }}
    >
      <div
        className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
        style={{ borderColor: "#E8541A", borderTopColor: "transparent" }}
      />
    </div>
  );
}

function RootComponent() {
  return (
    <Layout>
      <Suspense fallback={<PageFallback />}>
        <Outlet />
      </Suspense>
    </Layout>
  );
}

// Routes
const rootRoute = createRootRoute({ component: RootComponent });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <HomePage />
    </Suspense>
  ),
});
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <AboutPage />
    </Suspense>
  ),
});
const treksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/treks",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <TreksPage />
    </Suspense>
  ),
});
const trekDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/treks/$slug",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <TrekDetailPage />
    </Suspense>
  ),
});
const yatraDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/yatras/$slug",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <YatraDetailPage />
    </Suspense>
  ),
});
const packagesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/packages",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <PackagesPage />
    </Suspense>
  ),
});
const galleryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/gallery",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <GalleryPage />
    </Suspense>
  ),
});
const corporateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/corporate",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <CorporatePage />
    </Suspense>
  ),
});
const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <BlogPage />
    </Suspense>
  ),
});
const blogPostRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog/$slug",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <BlogPostPage />
    </Suspense>
  ),
});
const teamRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/team",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <TeamPage />
    </Suspense>
  ),
});
const bookRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/book/$slug",
  component: () => (
    <ProtectedRoute>
      <Suspense fallback={<PageFallback />}>
        <BookPage />
      </Suspense>
    </ProtectedRoute>
  ),
});
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth/login",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <LoginPage />
    </Suspense>
  ),
});
const verifyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth/verify",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <VerifyPage />
    </Suspense>
  ),
});
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: () => (
    <ProtectedRoute>
      <Suspense fallback={<PageFallback />}>
        <DashboardPage />
      </Suspense>
    </ProtectedRoute>
  ),
});
const compareRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/compare",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <ComparePage />
    </Suspense>
  ),
});
const trekFinderRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/trek-finder",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <TrekFinderPage />
    </Suspense>
  ),
});
const weatherRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/weather/$slug",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <WeatherPage />
    </Suspense>
  ),
});
const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <ContactPage />
    </Suspense>
  ),
});
const cancellationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cancellation-policy",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <CancellationPage />
    </Suspense>
  ),
});
const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/terms",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <TermsPage />
    </Suspense>
  ),
});
const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/privacy",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <PrivacyPage />
    </Suspense>
  ),
});
const sitemapRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sitemap",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <SitemapPage />
    </Suspense>
  ),
});
const paymentSuccessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/payment-success",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <PaymentSuccessPage />
    </Suspense>
  ),
});
const paymentFailureRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/payment-failure",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <PaymentFailurePage />
    </Suspense>
  ),
});
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <AdminRoute>
      <Suspense fallback={<PageFallback />}>
        <AdminPage />
      </Suspense>
    </AdminRoute>
  ),
});
const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "*",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <NotFoundPage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  treksRoute,
  trekDetailRoute,
  yatraDetailRoute,
  packagesRoute,
  galleryRoute,
  corporateRoute,
  blogRoute,
  blogPostRoute,
  teamRoute,
  bookRoute,
  loginRoute,
  verifyRoute,
  dashboardRoute,
  compareRoute,
  trekFinderRoute,
  weatherRoute,
  contactRoute,
  cancellationRoute,
  termsRoute,
  privacyRoute,
  sitemapRoute,
  paymentSuccessRoute,
  paymentFailureRoute,
  adminRoute,
  notFoundRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
