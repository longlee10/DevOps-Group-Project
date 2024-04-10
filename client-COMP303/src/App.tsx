import "./App.css";
import Book from "./components/Book";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./components/Home";
import ErrorPage from "./components/ErrorPage";
import BookForm from "./components/BookForm";

function App() {
  return (
    <Router>
      <Routes>
        {/* All other routes */}
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<Book />} />
        <Route path="/book/add" element={<BookForm />} />
      </Routes>
    </Router>
  );
}

export default App;
