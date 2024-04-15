import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BOOK_ENDPOINT } from "@/endpoints";
import { Button } from "../ui/button";
import NoData from "../NoData";

export interface Book {
  bookId: string;
  author: string;
  title: string;
  price: number;
  available: boolean;
}

const Book = () => {
  const tableHeads = ["AUTHOR", "TITLE", "PRICE", "AVAILABLE", "ACTION"];
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBook = async () => {
      await axios
        .get<Book[]>(BOOK_ENDPOINT)
        .then((res) => setBooks(res.data))
        .catch((err) => console.log(err));
    };
    fetchBook();
  }, []);

  const onDelete = async (id: string) => {
    await axios
      .delete(`${BOOK_ENDPOINT}/${id}`)
      .then(() => setBooks(books.filter((book) => book.bookId !== id)))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h1 className="text-2xl mb-3">List of Books</h1>
      <Link to="/book/add">
        <Button>Add Book</Button>
      </Link>
      {books.length > 0 ? (
        <Table className="w-1/2 m-auto mt-3">
          <TableHeader>
            <TableRow>
              {tableHeads.map((head) => (
                <TableHead className="text-center font-bold" key={head}>
                  {head}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.title} className="text-lg">
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.title}</TableCell>
                <TableCell>{`$${book.price}`}</TableCell>
                <TableCell>{book.available ? "Yes" : "No"}</TableCell>
                <TableCell className="flex gap-3">
                  <Link to={`/book/${book.bookId}`}>
                    <Button>Edit</Button>
                  </Link>
                  <Button
                    className="bg-red-500 hover:bg-red-600"
                    onClick={() => onDelete(book.bookId)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <NoData data="book" />
      )}
    </>
  );
};

export default Book;
