import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { MEMBER_ENDPOINT } from "@/endpoints";
import { Member } from "./Member";

const MemberForm = () => {
  const [memberDate, setMemberDate] = useState("");
  const [memberType, setMemberType] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchMember = async () => {
        await axios
          .get<Member>(`${MEMBER_ENDPOINT}/${id}`)
          .then((res) => {
            setMemberDate(res.data.memberDate);
            setMemberType(res.data.memberType);
            setAddress(res.data.address);
            setName(res.data.name);
            setExpiryDate(res.data.expiryDate);
          })
          .catch((err) => console.log(err));
      };
      fetchMember();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      memberDate,
      memberType,
      address,
      name,
      expiryDate,
    };

    await (id
      ? axios.put(`${MEMBER_ENDPOINT}/${id}`, data)
      : axios.post(MEMBER_ENDPOINT, data)
    )
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
                defaultValue={name}
              />
            </div>
            <div>
              <Label htmlFor="title">Address</Label>
              <Input
                id="title"
                placeholder="Enter address"
                onChange={(e) => setAddress(e.target.value)}
                defaultValue={address}
              />
            </div>
            <div>
              <Label htmlFor="price">Member type</Label>
              <Input
                id="price"
                type="text"
                placeholder="Enter type"
                onChange={(e) => setMemberType(e.target.value)}
                defaultValue={memberType}
              />
            </div>
            <div>
              <Label htmlFor="avaliable">Member Date</Label>
              <Input
                id="avaliable"
                placeholder="Enter date"
                onChange={(e) => setMemberDate(e.target.value)}
                defaultValue={memberDate}
              />
            </div>
            <div>
              <Label htmlFor="avaliable">Expiry Date</Label>
              <Input
                id="avaliable"
                placeholder="Enter expiry date"
                onChange={(e) => setExpiryDate(e.target.value)}
                defaultValue={expiryDate}
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
