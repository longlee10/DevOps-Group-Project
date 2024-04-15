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
import { MEMBER_ENDPOINT } from "@/endpoints";
import { Button } from "../ui/button";
import NoData from "../NoData";

interface Member {
  memberID: string;
  memberDate: string;
  memberType: string;
  address: string;
  name: string;
  expiryDate: string;
}

const Member = () => {
  // Define the table headers based on interface Member, all uppercase
  const tableHeads = [
    "NAME",
    "ADDRESS",
    "MEMBER TYPE",
    "MEMBER DATE",
    "EXPIRY DATE",
    "ACTION",
  ];
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    const fetchBook = async () => {
      await axios
        .get<Member[]>(MEMBER_ENDPOINT)
        .then((res) => {
          setMembers(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    };
    fetchBook();
  }, []);

  const onDelete = async (id: string) => {
    await axios
      .delete(`${MEMBER_ENDPOINT}/${id}`)
      .then(() => setMembers(members.filter((m) => m.memberID !== id)))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h1 className="text-2xl mb-3">List of Members</h1>
      <Link to="/member/add">
        <Button>Add Member</Button>
      </Link>
      {members.length > 0 ? (
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
            {members.map((m) => (
              <TableRow key={m.name} className="text-lg">
                <TableCell>{m.name}</TableCell>
                <TableCell>{m.address}</TableCell>
                <TableCell>{m.memberType}</TableCell>
                <TableCell>{m.memberDate}</TableCell>

                <TableCell>{m.expiryDate}</TableCell>
                <TableCell>
                  <Button
                    className="bg-red-500 hover:bg-red-600"
                    onClick={() => onDelete(m.memberID)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <NoData data="member" />
      )}
    </>
  );
};

export default Member;
