import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <aside className="sidebar">
      <ul className="sidebar-links">
        <li>
          <Link to="/" className={isActive('/') ? 'active' : ''}>
            <span className="sidebar-link-icon">📋</span>
            <span className="sidebar-link-text">All Issues</span>
          </Link>
        </li>
        <li>
          <Link to="/add" className={isActive('/add') ? 'active' : ''}>
            <span className="sidebar-link-icon">➕</span>
            <span className="sidebar-link-text">Add Issue</span>
          </Link>
        </li>
        <li>
          <Link to="/quiz" className={isActive('/quiz') ? 'active' : ''}>
            <span className="sidebar-link-icon">🧠</span>
            <span className="sidebar-link-text">Staff Quiz</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Navbar;
