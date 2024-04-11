import "./App.css";
import Book from "./components/books/Book";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./components/Home";
import ErrorPage from "./components/ErrorPage";
import BookForm from "./components/books/BookForm";
import Publisher from "./components/publisher/Publisher";
import PublisherForm from "./components/publisher/PublisherForm";

function App() {
  return (
    <Router>
      <Routes>
        {/* All other routes */}
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<Book />} />
        <Route path="/book/add" element={<BookForm />} />
        <Route path="/publisher" element={<Publisher />}/>
        <Route path='/publisher/add' element={<PublisherForm />} />
        
      </Routes>
    </Router>
    
  );
}

export default App;
