// Publisher.tsx

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '../ui/button';
import { PUBLISHER_ENDPOINT } from '@/endpoints';

interface Publisher {
  pubId: string;
  address: string;
  pubName: string;
}

const Publisher = () => {
  const tableHeads = ["PUBLISHER ID", "ADDRESS", "PUBLISHER NAME"];
  const [publishers, setPublishers] = useState<Publisher[]>([]);

  useEffect(() => {
    const fetchPublishers = async () => {
      await axios
        .get<Publisher[]>(PUBLISHER_ENDPOINT)
        .then((res) => setPublishers(res.data))
        .catch((err) => console.log(err));
    };
    fetchPublishers();
  }, []);

  return (
    <>
      <h1 className="text-2xl mb-3">List of Publishers</h1>
      <Link to="/publisher/add">
        <Button>Add Publisher</Button>
      </Link>

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
          {publishers.map((publisher) => (
            <TableRow key={publisher.pubId} className="text-lg">
              <TableCell>{publisher.address}</TableCell>
              <TableCell>{publisher.pubName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Publisher;
