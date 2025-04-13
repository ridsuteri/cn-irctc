import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import BookingPage from "./pages/BookingPage";
import ContactPage from "./pages/ContactPage";
import LoginModal from "./pages/LoginModal";
import TrainCarousel from "./components/TrainCarousel";
import styles from "./styles/App.module.css";
import TrainSearchResults from "./pages/TrainSearchResults";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Test from "./components/Test";

// Component to conditionally render content based on route
const RouteContentManager = () => {
  const location = useLocation();

  return (
    <div className={styles.mainContent}>
      {location.pathname === "/" && (
        <>
          <Home />
          <TrainCarousel />
        </>
      )}
      <Routes>
        <Route path="/" element={null} />
        <Route path='/test' element={<Test/> } />
        <Route path="/Trainlist" element={<TrainSearchResults />} />
        <Route
          path="/booking"
          element={
            <ProtectedRoute>
              <BookingPage />
            </ProtectedRoute>
          }
        />
        <Route path="/contact" element={<ContactPage />} />
        <Route
          path="/login"
          element={
            <LoginModal
              isOpen={true}
              onClose={() => window.history.back()}
              onLogin={() => {}}
              switchToRegister={() => {}}
            />
          }
        />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      {" "}
      {/* Wrap the entire app with AuthProvider */}
      <Router>
        <div className={styles.app}>
          <Navbar />
          <RouteContentManager />
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
export default App;
