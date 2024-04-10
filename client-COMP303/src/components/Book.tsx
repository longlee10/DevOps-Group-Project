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

interface Book {
  author: string;
  title: string;
  price: number;
  availability: boolean;
}

const Book = () => {
  const tableHeads = ["AUTHOR", "TITLE", "PRICE", "AVAILABLE"];
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBook = async () => {
      await axios
        .get<Book[]>("http://localhost:8084/book")
        .then((res) => {
          setBooks(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchBook();
  }, []);

  return (
    <>
      <h1 className="text-2xl">List of Books</h1>
      <Table className="w-1/2 m-auto">
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
              <TableCell>{book.availability ? "Yes" : "No"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Book;
