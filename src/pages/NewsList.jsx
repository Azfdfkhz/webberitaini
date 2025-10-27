import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import NewsCard from '../components/NewsCard';
import Footer from '../components/Footer';

const NewsList = () => {
  const [allNewsData, setAllNewsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Tambah state error
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const searchTerm = searchParams.get('search') || '';
  const sortOrder = searchParams.get('sort') || 'az';
  const pageFromUrl = parseInt(searchParams.get('page')) || 1;

  const ITEMS_PER_PAGE = 9;
  const MAX_PAGES = 10;

  useEffect(() => {
  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/proxy-news');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();
      let articles = responseData.data || responseData || [];
      if (!Array.isArray(articles)) {
        articles = [];
      }

        let filteredData = articles;
        if (searchTerm) {
          filteredData = articles.filter(item =>
            item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.contentSnippet?.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        filteredData.sort((a, b) => {
          const titleA = a.title?.toLowerCase() || '';
          const titleB = b.title?.toLowerCase() || '';
          return sortOrder === 'az'
            ? titleA.localeCompare(titleB)
            : titleB.localeCompare(titleA);
        });

        const limitedFullData = filteredData.slice(0, MAX_PAGES * ITEMS_PER_PAGE);
        setAllNewsData(limitedFullData);

        if (searchTerm || sortOrder !== 'az') {
          setCurrentPage(1);
          setSearchParams({ search: searchTerm, sort: sortOrder, page: '1' });
        }
      } catch (error) {
        console.error('Error fetching news:', error);
        setAllNewsData([]);
        setError('Gagal memuat berita. Silakan coba lagi nanti.');
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [searchTerm, sortOrder, setSearchParams]);

  useEffect(() => {
    if (!loading && (searchTerm || sortOrder !== 'az')) return;
    setCurrentPage(pageFromUrl);
  }, [pageFromUrl, loading, searchTerm, sortOrder]);

  const totalPages = Math.ceil(allNewsData.length / ITEMS_PER_PAGE);
  const totalPagesToShow = Math.min(totalPages, MAX_PAGES);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageData = allNewsData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleHeroClick = useCallback(() => {
    if (!pageData || pageData.length === 0) return;
    if (activeImageIndex >= pageData.length || !pageData[activeImageIndex]) return;
    const activeNews = pageData[activeImageIndex];
    if (!activeNews.link) return;
    navigate(`/news/${encodeURIComponent(activeNews.link)}`);
  }, [activeImageIndex, navigate, pageData.length]);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    setSearchParams({ search: searchTerm, sort: sortOrder, page: page.toString() });
  }, [searchTerm, sortOrder, setSearchParams]);

  useEffect(() => {
    if (pageData.length === 0) {
      setActiveImageIndex(0);
      return;
    }
    const maxIndex = Math.min(3, pageData.length) - 1;
    const interval = setInterval(() => {
      setActiveImageIndex(prev => (prev + 1) % (maxIndex + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [pageData.length]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 mb-88">
        <p className="text-lg text-gray-800 dark:text-gray-200 animate-pulse">Loading berita...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64 mb-88">
        <p className="text-lg text-red-600 dark:text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="border border-gray-300 dark:border-gray-800 
      rounded-2xl shadow-lg max-w-7xl mx-auto py-8 px-4 sm:px-6 
      lg:px-8 bg-gray-100 dark:bg-gray-900 duration-300 ease-in-out">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
          Daftar Berita Terbaru
        </h2>

        {/* Hero + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {pageData.length > 0 && (
            <div
              onClick={handleHeroClick}
              className="lg:col-span-2 relative rounded-xl overflow-hidden shadow-lg 
              aspect-w-16 aspect-h-9 bg-white dark:bg-gray-800 rounded-lg shadow-md 
              dark:shadow-gray-700 overflow-hidden cursor-pointer border border-gray-200 
              dark:border-gray-700 transition-all duration-300 ease-in-out hover:scale-105 
              hover:shadow-xl dark:hover:shadow-gray-600"
            >
              <img
                src={pageData[activeImageIndex]?.image?.small || 'https://via.placeholder.com/800x400?text=No+Image'}
                alt={pageData[activeImageIndex]?.title || 'News Image'}
                className="w-full h-full object-cover transition-opacity duration-1000"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/800x400?text=Image+Error' }}
              />
              <div className="absolute bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6 w-full">
                <h3 className="text-2xl font-bold text-white mb-2 line-clamp-2">
                  {pageData[activeImageIndex]?.title || 'Loading...'}
                </h3>
                <p className="text-gray-200 line-clamp-3">
                  {pageData[activeImageIndex]?.contentSnippet || 'Deskripsi tidak tersedia'}
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4">
            {pageData.slice(1, 3).map(news => (
              <NewsCard key={news.link} news={news} newsLink={news.link} />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {pageData.slice(3).map(news => (
            <NewsCard key={news.link} news={news} newsLink={news.link} />
          ))}
        </div>

        {pageData.length === 0 && !loading && !error && (
          <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
            Tidak ada berita ditemukan. Cek koneksi atau API.
          </p>
        )}

        {/* Pagination */}
        {totalPagesToShow > 1 && (
          <div className="grid grid-cols-5 sm:flex sm:flex-row sm:flex-wrap justify-center items-center gap-2 mt-8">
            {Array.from({ length: totalPagesToShow }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`w-full sm:w-auto px-3 py-2 rounded-md text-sm font-medium transition-colors text-center ${
                  currentPage === pageNum
                    ? 'bg-blue-500 dark:bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                }`}
              >
                {pageNum}
              </button>
            ))}
          </div>
        )}

        <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-4">
          Halaman {currentPage} dari {totalPagesToShow}
        </p>
      </div>
    </div>
  );
}

export default NewsList;