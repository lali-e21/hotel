import { createBrowserRouter, RouterProvider, Navigate, useLocation } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import RoomDetails from './pages/RoomDetails';
import Login from './pages/Login';
import BookingFlow from './pages/BookingFlow';
import Contact from './pages/Contact';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import PaymentStatus from './pages/PaymentStatus';
import GuestDashboard from './pages/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';
import AdminRooms from './pages/admin/Rooms';
import AdminBookings from './pages/admin/Bookings';
import AdminPromos from './pages/admin/Promos';
import AdminPayments from './pages/admin/Payments';
import AdminServices from './pages/admin/Services';
import AdminGallery from './pages/admin/Gallery';
import useAuthStore from './store/authStore';
import './i18n/config';

// Protected Route Wrapper
const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) return <Navigate to="/login" state={{ from: location }} replace />;
  if (role && user?.role !== role) return <Navigate to="/" />;

  return children;
};

// Error Boundary / 404 Anomaly Component
const NotFound = () => (
  <div className="pt-40 pb-24 container mx-auto px-6 text-center space-y-12 min-h-screen bg-[#020617] flex flex-col items-center justify-center">
    <div className="w-20 h-0.5 bg-emerald-500/50 shadow-2xl emerald-glow relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#020617] border border-emerald-500 rounded-full animate-ping"></div>
    </div>
    <h1 className="text-7xl md:text-9xl font-serif text-white uppercase tracking-tighter italic leading-none transition-colors hover:text-emerald-500 cursor-default">Anomaly</h1>
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-3xl font-serif text-white italic tracking-tighter">This architectural path remains unexplored.</h2>
      <p className="text-slate-600 font-black uppercase tracking-[0.3em] text-[10px] leading-relaxed">The digital coordinates provided do not correspond to any known artifacts in the <span className="text-emerald-500">Sunrise Grand</span> registry // node_v4.2</p>
    </div>
    <div className="pt-12">
      <button
        onClick={() => window.location.href = '/'}
        className="btn-primary !px-16 !py-6 flex items-center space-x-4 shadow-[0_0_50px_rgba(16,185,129,0.1)] group relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
        <span className="text-[10px] font-black uppercase tracking-[0.4em] relative z-10">Return to Grand Lobby Portal</span>
      </button>
    </div>
  </div>
);

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/rooms', element: <Rooms /> },
      { path: '/rooms/:id', element: <RoomDetails /> },
      { path: '/login', element: <Login /> },
      { path: '/contact', element: <Contact /> },
      { path: '/services', element: <Services /> },
      { path: '/gallery', element: <Gallery /> },
      { path: '/payment-status', element: <PaymentStatus /> },
      {
        path: '/booking',
        element: (
          <ProtectedRoute>
            <BookingFlow />
          </ProtectedRoute>
        )
      },
      {
        path: '/dashboard',
        element: (
          <ProtectedRoute>
            <GuestDashboard />
          </ProtectedRoute>
        )
      }
    ]
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute role="admin">
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'rooms', element: <AdminRooms /> },
      { path: 'bookings', element: <AdminBookings /> },
      { path: 'payments', element: <AdminPayments /> },
      { path: 'promos', element: <AdminPromos /> },
      { path: 'services', element: <AdminServices /> },
      { path: 'gallery', element: <AdminGallery /> }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
