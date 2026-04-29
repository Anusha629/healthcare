import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { LogOut } from "lucide-react";
import { logoutUser } from "../firebase";
import { useAppStore } from "../store/useAppStore";

function Layout() {
  const user = useAppStore((state) => state.user);
  const logout = useAppStore((state) => state.logout);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser();
      logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <div className="brand-block">
          <div className="brand-mark">H</div>
          <div>
            <h1>HealthCore</h1>
            <p>B2B care operations</p>
          </div>
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/" end>
            Dashboard
          </NavLink>
          <NavLink to="/analytics">Analytics</NavLink>
          <NavLink to="/patients">Patients</NavLink>
        </nav>
        <div className="sidebar-footer">
          <div className="avatar-menu-container">
            <button
              className="avatar-pill-button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              title="User menu"
            >
              HC
            </button>
            {dropdownOpen && (
              <div className="avatar-dropdown">
                <button
                  className="dropdown-item logout-item"
                  onClick={handleLogout}
                >
                  <LogOut size={16} />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>
      <main className="app-main">
        <header className="topbar">
          <div>
            <p className="eyebrow">Welcome back</p>
            <h2>{user?.displayName || user?.email || "Care Team"}</h2>
          </div>
        </header>
        <section className="page-shell">
          <Outlet />
        </section>
      </main>
    </div>
  );
}

export default Layout;
