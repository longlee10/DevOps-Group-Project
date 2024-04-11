// PublisherForm.tsx

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { PUBLISHER_ENDPOINT } from '@/endpoints';

const PublisherForm = () => {
  const [address, setAddress] = useState('');
  const [pubName, setPubName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await axios
      .post(PUBLISHER_ENDPOINT, {
        address,
        pubName,
      })
      .then(() => navigate('/publishers'))
      .catch((err) => console.log(err));
  };

  return (
    <Card className="w-[350px] m-auto">
      <CardHeader>
        <CardTitle>Add A New Publisher</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-1.5 gap-3">
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                placeholder="Enter publisher address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="pubName">Publisher Name</Label>
              <Input
                id="pubName"
                placeholder="Enter publisher name"
                onChange={(e) => setPubName(e.target.value)}
              />
            </div>
          </div>
          <Button className="mt-3">Add Publisher</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PublisherForm;
