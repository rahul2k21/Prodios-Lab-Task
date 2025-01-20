import { Link, NavLink, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("UserToken");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white font-bold text-2xl">
              Simple Kanban Board
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-white hover:text-gray-300 font-bold"
              >
                Logout
              </button>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="text-white font-bold hover:text-gray-300"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="text-white hover:text-gray-300 font-bold"
                >
                  Signup
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
