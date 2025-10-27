import { useNavigate } from 'react-router-dom'

const NewsCard = ({ news, newsLink }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/news/${encodeURIComponent(newsLink)}`) // Encode link untuk URL safe
  }

  // Fallback gambar jika image.small tidak ada
  const cardImage =
    news.image?.small ||
    'https://via.placeholder.com/400x200?text=No+Image+Available'

  return (
    <div
      onClick={handleClick}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-700 overflow-hidden cursor-pointer border border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl dark:hover:shadow-gray-600"
    >
      {/* Gambar berita */}
      <img
        src={cardImage}
        alt={news.title}
        className="w-full h-32 object-cover"
        onError={(e) => {
          e.target.src =
            'https://via.placeholder.com/400x200?text=Image+Error'
        }}
      />

      {/* Konten berita */}
      <div className="p-3">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 line-clamp-2">
          {news.title}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {news.isoDate
            ? new Date(news.isoDate).toLocaleDateString('id-ID')
            : 'Tanggal tidak tersedia'}
        </p>
      </div>
    </div>
  )
}

export default NewsCard
