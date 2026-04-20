import { Link, useNavigate } from "react-router";
import { signOut } from "firebase/auth";
import { useAuth } from "../context/AuthContext.jsx";
import { auth } from "../services/firebase.js";

export default function Navbar() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-slate-800">
              <span className="text-blue-600">Med</span>Compass
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
            >
              Search
            </Link>

            {currentUser ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
                >
                  My Cabinet
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-slate-100 text-slate-700 hover:bg-rose-50 hover:text-rose-600 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Log Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Log In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
