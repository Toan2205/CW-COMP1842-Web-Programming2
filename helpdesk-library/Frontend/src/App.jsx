import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/Homepage';
import AddPage from './pages/Addpage';
import EditPage from './pages/Editpage';
import DetailPage from './pages/Detailpage';
import QuizPage from './pages/Quizpage';

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Navbar />
        <div className="main-content">
          <header className="site-header">
            <h1 className="site-title">📚 Helpdesk Library</h1>
          </header>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add" element={<AddPage />} />
            <Route path="/edit/:id" element={<EditPage />} />
            <Route path="/detail/:id" element={<DetailPage />} />
            <Route path="/quiz" element={<QuizPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
