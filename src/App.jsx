import { Routes, Route } from 'react-router-dom'
import { DarkModeProvider } from './contexts/DarkModeContext'
import Navbar from './components/Navbar'
import NewsList from './pages/NewsList'
import DetailNews from './pages/DetailNews'
import Footer from './components/Footer'

function App() {
  return (
    <DarkModeProvider>
      {/* Container utama dengan gradasi background */}
      <div
        className={`min-h-screen
          text-gray-900 dark:text-gray-100
          flex flex-col
          bg-[linear-gradient(to_right,_#dbeafe_0%,_#93c5fd_20%,_#3b82f6_50%,_#3b82f6_50%,_#93c5fd_80%,_#dbeafe_100%)]
          dark:bg-[linear-gradient(to_right,_#2E3B4E_0%,_#111827_20%,_#0f172a_50%,_#111827_80%,__#2E3B4E_100%)]
          transition-colors duration-300 ease-in-out
        `}
      >
        <Navbar />
        {/* Main content dengan container dan padding */}
        <main className="container mx-auto p-4 flex-grow transition-colors duration-300 ease-in-out bg-transparent">
          <Routes>
            <Route path="/" element={<NewsList />} />
            <Route path="/news/:newsLink" element={<DetailNews />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </DarkModeProvider>
  )
}

export default App