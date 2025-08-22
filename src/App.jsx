import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import BookingPage from "./pages/BookingPage";
import ContactPage from "./pages/ContactPage";
import LoginModal from "./pages/LoginModal";
import TrainCarousel from "./components/TrainCarousel";
import styles from "./styles/App.module.css";
import ProtectedRoute from "./components/ProtectedRoute";

// Component to conditionally render content based on route
const RouteContentManager = () => {
  return (
    <div className={styles.mainContent}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <TrainCarousel />
            </>
          }
        />
        {/* <Route path="/trainlist" element={<TrainSearchResults />} /> */}
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
    <Router>
      <div className={styles.app}>
        <Navbar />
        <RouteContentManager />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
