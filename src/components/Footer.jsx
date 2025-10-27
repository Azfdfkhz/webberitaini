import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-blue-600 dark:bg-blue-800 border-t border-blue-700 dark:border-blue-900 py-8 mt-12">
      {/* Container pusat dengan max width dan padding horizontal */}
      <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Konten footer: flex responsif */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 text-white">
          {/* Branding & Deskripsi */}
          <div className="text-center md:text-left max-w-xs">
            <h2 className="text-xl font-bold mb-1">BeritaTerkini</h2>
            <p className="text-sm text-blue-200">
              Sumber berita terpercaya dan terkini, menyajikan informasi akurat setiap hari.
            </p>
          </div>

          {/* Navigasi */}
          <nav className="flex space-x-6 text-sm font-medium">
            <Link to="/" className="hover:text-blue-300 transition">
              Beranda
            </Link>
            <Link to="/about" className="hover:text-blue-300 transition">
              Tentang
            </Link>
            <Link to="/contact" className="hover:text-blue-300 transition">
              Kontak
            </Link>
            <Link to="/privacy" className="hover:text-blue-300 transition">
              Kebijakan Privasi
            </Link>
          </nav>

          {/* Sosial Media */}
          <div className="flex space-x-4">
            <a
              href="https://facebook.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-blue-300 transition"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2v-3h2v-2c0-2 1-3 3-3h2v3h-2c-.5 0-1 .5-1 1v2h3l-1 3h-2v7A10 10 0 0022 12z" />
              </svg>
            </a>
            <a
              href="https://twitter.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-blue-300 transition"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M23 3a10.9 10.9 0 01-3.14.86 4.48 4.48 0 001.98-2.48 9.14 9.14 0 01-2.88 1.1 4.52 4.52 0 00-7.7 4.12A12.8 12.8 0 013 4.15a4.52 4.52 0 001.4 6.04 4.48 4.48 0 01-2.05-.57v.06a4.52 4.52 0 003.63 4.43 4.52 4.52 0 01-2.04.08 4.52 4.52 0 004.22 3.14A9.06 9.06 0 012 19.54a12.8 12.8 0 006.92 2" />
              </svg>
            </a>
            <a
              href="https://instagram.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-blue-300 transition"
            >
              <svg className="w-6 h-6 stroke-current" fill="none" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37a4 4 0 11-4.73-4.73 4 4 0 014.73 4.73z" />
                <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-blue-300 transition"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 3a2 2 0 110 4 2 2 0 010-4z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center text-blue-200 text-sm">
          &copy; {currentYear} BeritaTerkini. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer