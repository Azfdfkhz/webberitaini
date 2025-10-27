import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDarkMode } from '../contexts/DarkModeContext';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('A-Z');
  const [menuOpen, setMenuOpen] = useState(false); 
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const isHomePage = location.pathname === '/';

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?search=${searchTerm}&sort=${filter.toLowerCase().replace('-', '')}`);
    setMenuOpen(false);
  };  

  return (
    <nav className="bg-blue-600 dark:bg-blue-800 shadow-md sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <h1 className="text-white text-xl font-bold tracking-wide">Berita Indonesia</h1>

          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center space-x-4">
            {isHomePage && (
              <form
                onSubmit={handleSearch}
                className="flex items-center bg-white dark:bg-gray-700 rounded-full shadow px-3 py-2 gap-2 transition-all duration-300"
              >
                <input
                  type="text"
                  placeholder="Cari berita..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-3 py-1 bg-transparent w-60 text-sm text-gray-700 dark:text-gray-200 focus:outline-none rounded-full"
                />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-full px-3 py-1 text-sm focus:outline-none hover:bg-gray-200 dark:hover:bg-gray-500 transition"
                >
                  <option value="A-Z">A-Z</option>
                  <option value="Z-A">Z-A</option>
                </select>
                <button
                  type="submit"
                  className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold hover:bg-blue-700 dark:hover:bg-blue-400 transition-all"
                >
                  Cari
                </button>
              </form>
            )}
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:scale-105 transition-transform shadow"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </div>

          {/* Mobile Hamburger + Dark Mode */}
          <div className="sm:hidden flex items-center gap-2">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 shadow hover:scale-105 transition-transform"
            >
              ☰
            </button>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:scale-105 transition-transform shadow"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>

        {/* Mobile menu, muncul saat hamburger di klik */}
        {menuOpen && isHomePage && (
          <div className="sm:hidden mt-2">
            <form
              onSubmit={handleSearch}
              className="flex flex-col bg-white dark:bg-gray-700 rounded-xl shadow p-4 gap-2"
            >
              <input
                type="text"
                placeholder="Cari berita..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-2 bg-transparent w-full text-sm text-gray-700 dark:text-gray-200 focus:outline-none rounded-full"
              />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-full px-3 py-2 text-sm focus:outline-none hover:bg-gray-200 dark:hover:bg-gray-500 transition"
              >
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
              </select>
              <button
                type="submit"
                className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 dark:hover:bg-blue-400 transition-all"
              >
                Cari
              </button>
            </form>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
