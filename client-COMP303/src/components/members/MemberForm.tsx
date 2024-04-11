import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MEMBER_ENDPOINT } from "@/endpoints";

const MemberForm = () => {
  const [memberDate, setMemberDate] = useState("");
  const [memberType, setMemberType] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await axios
      .post(MEMBER_ENDPOINT, {
        memberDate,
        memberType,
        address,
        name,
        expiryDate,
      })
      .then(() => navigate("/member"))
      .catch((err) => console.log(err));
  };

  return (
    <Card className="w-[350px] m-auto">
      <CardHeader>
        <CardTitle>Add A New Member</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-1.5 gap-3">
            <div>
              <Label htmlFor="author">Member Name</Label>
              <Input
                id="author"
                placeholder="Enter member name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="title">Address</Label>
              <Input
                id="title"
                placeholder="Enter address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="price">Member type</Label>
              <Input
                id="price"
                type="text"
                placeholder="Enter type"
                onChange={(e) => setMemberType(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="avaliable">Member Date</Label>
              <Input
                id="avaliable"
                placeholder="Enter date"
                onChange={(e) => setMemberDate(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="avaliable">Expiry Date</Label>
              <Input
                id="avaliable"
                placeholder="Enter expiry date"
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </div>
          </div>
          <Button className="mt-3">Submit</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default MemberForm;
