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
import { PUBLISHER_ENDPOINT } from "@/endpoints";
import { Button } from "../ui/button";
import NoData from "../NoData";

interface Publisher {
  pubId: string;
  address: string;
  pubName: string;
}

const Publisher = () => {
  const tableHeads = ["PUBLISHER", "ADDRESS", "ACTION"];
  const [publishers, setPublisher] = useState<Publisher[]>([]);

  useEffect(() => {
    const fetchBook = async () => {
      await axios
        .get<Publisher[]>(PUBLISHER_ENDPOINT)
        .then((res) => setPublisher(res.data))
        .catch((err) => console.log(err));
    };
    fetchBook();
  }, []);

  const onDelete = async (id: string) => {
    await axios
      .delete(`${PUBLISHER_ENDPOINT}/${id}`)
      .then(() => setPublisher(publishers.filter((p) => p.pubId !== id)))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <h1 className="text-2xl mb-3">List of Publishers</h1>
      <Link to="/publisher/add">
        <Button>Add Publisher</Button>
      </Link>
      {publishers.length > 0 ? (
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
            {publishers.map((p) => (
              <TableRow key={p.pubId} className="text-lg">
                <TableCell>{p.pubName}</TableCell>
                <TableCell>{p.address}</TableCell>
                <TableCell>
                  <Button
                    className="bg-red-500 hover:bg-red-600"
                    onClick={() => onDelete(p.pubId)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <NoData data="publisher" />
      )}
    </>
  );
};

export default Publisher;
