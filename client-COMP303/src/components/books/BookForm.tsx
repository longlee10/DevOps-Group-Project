import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BOOK_ENDPOINT } from "@/endpoints";

const BookForm = () => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [available, setAvailable] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await axios
      .post(BOOK_ENDPOINT, {
        author,
        title,
        price,
        available,
      })
      .then(() => navigate("/book"))
      .catch((err) => console.log(err));
  };

  return (
    <Card className="w-[350px] m-auto">
      <CardHeader>
        <CardTitle>Add A New Book</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-1.5 gap-3">
            <div>
              <Label htmlFor="author">Author Name</Label>
              <Input
                id="author"
                placeholder="Enter book author name"
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="title">Book Title</Label>
              <Input
                id="title"
                placeholder="Enter book title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                placeholder="Enter book price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="avaliable">Available</Label>
              <Input
                id="avaliable"
                placeholder="Enter availability"
                onChange={(e) => setAvailable(e.target.value)}
              />
            </div>
          </div>
          <Button className="mt-3">Submit</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BookForm;
