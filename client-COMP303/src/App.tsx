import "./App.css";
import Book from "./components/books/Book";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./components/Home";
import ErrorPage from "./components/ErrorPage";
import BookForm from "./components/books/BookForm";
import Publisher from "./components/publishers/Publisher";
import PublisherForm from "./components/publishers/PubliserForm";
import Member from "./components/members/Member";
import MemberForm from "./components/members/MemberForm";

function App() {
  return (
    <Router>
      <Routes>
        {/* All other routes */}
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<Book />} />
        <Route path="/book/add" element={<BookForm />} />
        <Route path="publisher" element={<Publisher />} />
        <Route path="publisher/add" element={<PublisherForm />} />
        <Route path="member" element={<Member />} />
        <Route path="member/add" element={<MemberForm />} />
        <Route path="/book/:id" element={<BookForm />} />
      </Routes>
    </Router>
  );
}

export default App;
