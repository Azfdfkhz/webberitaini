import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import NewsCard from '../components/NewsCard'

const DetailNews = () => {
  const { newsLink } = useParams()
  const navigate = useNavigate()
  const [news, setNews] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null) // Tambah state error

  const [relatedNews, setRelatedNews] = useState([])
  const [loadingRelated, setLoadingRelated] = useState(true)

  useEffect(() => {
    const fetchNewsDetail = async () => {
      setLoading(true)
      setError(null) // Reset error saat mulai fetch
      try {
        const apiUrl = '/api/proxy-news'
        const response = await fetch(apiUrl)
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        const responseData = await response.json()
        let articles = responseData.data || responseData || []
        if (!Array.isArray(articles)) articles = []

        const decodedLink = decodeURIComponent(newsLink)
        const detailIndex = articles.findIndex(item => item.link === decodedLink)
        const detail = articles[detailIndex] || null

        if (detail) setNews(detail)
        else setNews(null)

        if (detailIndex !== -1) {
          const related = []

          for (let i = detailIndex - 2; i < detailIndex; i++) {
            if (i >= 0) related.push(articles[i])
          }

          for (let i = detailIndex + 1; i <= detailIndex + 2; i++) {
            if (i < articles.length) related.push(articles[i])
          }

          setRelatedNews(related)
        } else {
          setRelatedNews([])
        }
      } catch (error) {
        console.error('Error fetching news detail:', error)
        setNews(null)
        setRelatedNews([])
        setError('Gagal memuat detail berita. Silakan coba lagi nanti.')
      } finally {
        setLoading(false)
        setLoadingRelated(false)
      }
    }

    if (newsLink) fetchNewsDetail()
  }, [newsLink])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 mb-88">
        <p className="text-lg text-gray-800 dark:text-gray-200 animate-pulse">
          Loading detail berita...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64 mb-88">
        <p className="text-lg text-red-600 dark:text-red-400">{error}</p>
      </div>
    )
  }

  if (!news) {
    return (
      <div className="flex justify-center items-center h-64 bg-gray-100 dark:bg-gray-900">
        <p className="text-lg text-gray-800 dark:text-gray-200">
          Berita tidak ditemukan.{' '}
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 dark:text-blue-400 underline hover:opacity-80 transition"
          >
            Kembali
          </button>
        </p>
      </div>
    )
  }

  const detailImage =
    news.image?.large || news.image?.small || 'https://via.placeholder.com/800x400?text=No+Image+Available'

  return (
    <div className="border border-gray-300 dark:border-gray-800 rounded-2xl shadow-lg max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-900 duration-300 ease-in-out">
      {/* Tombol back */}
      <button
        onClick={() => navigate('/')}
        className="mb-6 inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300"
      >
        ← Kembali ke Daftar Berita
      </button>

      <article className="bg-white dark:bg-gray-800 rounded-xl shadow-xl dark:shadow-gray-700 overflow-hidden border border-gray-200 dark:border-gray-700 transition-opacity duration-700 opacity-100">
        {/* Hero image */}
        <div className="relative overflow-hidden">
          <img
            src={detailImage}
            alt={news.title}
            className="w-full h-72 sm:h-96 object-cover transform transition-transform duration-500 hover:scale-105"
            onError={(e) => { e.target.src = 'https://via.placeholder.com/800x400?text=Image+Error' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <h1 className="absolute bottom-4 left-4 text-white text-3xl sm:text-4xl font-extrabold drop-shadow-lg">
            {news.title}
          </h1>
        </div>

        {/* Konten berita */}
        <div className="p-6 space-y-4 transition-opacity duration-300 ease-in-out opacity-100">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {news.isoDate ? new Date(news.isoDate).toLocaleDateString('id-ID') : 'Tanggal tidak tersedia'}
          </p>

          <p className="text-gray-700 dark:text-gray-300 duration-300 ease-in-out text-base sm:text-lg ">
            {news.contentSnippet || 'Deskripsi tidak tersedia'}
          </p>

          <div className="prose max-w-none dark:prose-invert">
            <p>
              <strong className="text-gray-800 dark:text-gray-200 duration-300 ease-in-out">Konten Singkat:</strong>{' '}
              {news.contentSnippet || 'Konten tidak tersedia'}
            </p>

            {news.link && (
              <p className="mt-4">
                <a
                  href={news.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                >
                  Baca Artikel Lengkap di CNN Indonesia →
                </a>
              </p>
            )}
          </div>
        </div>
      </article>

      {/* 4 NewsCard kecil berdasarkan index */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
          Berita Terkait
        </h2>

        {loadingRelated ? (
          <p className="text-center text-gray-500 dark:text-gray-400">Loading berita terkait...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedNews.map((item) => (
              <NewsCard key={item.link} news={item} newsLink={item.link} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default DetailNews