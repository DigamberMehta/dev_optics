import React, { useState, useEffect, useContext } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import AuthContext from '@/context/authContext';
import { toast } from 'sonner';

// EditableField without edit icons and always enabled
const EditableField = ({ label, value, onChange, type = "text" }) => {
  return (
    <div>
      <Label>{label}</Label>
      <Input
        type={type}
        placeholder={`Enter your ${label.toLowerCase()}`}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default function UserProfile() {
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    houseNumber: '',
    buildingName: '',
    street: '',
    locality: '',
    district: '',
    state: '',
    pincode: '',
  });

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (user?.user_id) {
      setProfileData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
      }));
      fetchUserProfile(user.user_id);
    }
  }, [user]);

  const fetchUserProfile = async (userId) => {
    try {
      const response = await fetch(`${backendURL}/api/user/profile/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setProfileData(prev => ({
          ...prev,
          phone: data.phone || '',
          houseNumber: data.address?.houseNumber || '',
          buildingName: data.address?.buildingName || '',
          street: data.address?.street || '',
          locality: data.address?.locality || '',
          district: data.address?.district || '',
          state: data.address?.state || '',
          pincode: data.address?.pincode || '',
        }));
      } else {
        console.error('Failed to fetch user profile');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveProfile = async () => {
    try {
      const response = await fetch(`${backendURL}/api/user/profile/${user.user_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        toast.success('Profile updated successfully!');
      } else {
        const errorData = await response.json();
        console.error('Failed to update profile:', errorData);
        toast.error('Failed to update profile.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Error updating profile.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen pt-[80px] pb-[30px] w-[70%] mx-auto">
      <Card className="w-full p-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Profile</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-8">
          {/* Left Side: User Details */}
          <div className="flex flex-col gap-4 border p-4 rounded-lg">
            <EditableField
              label="Name"
              value={profileData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
            <EditableField
              label="Email"
              value={profileData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              type="email"
            />
            <EditableField
              label="Phone"
              value={profileData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
          </div>

          {/* Right Side: Address */}
          <div className="grid gap-2 border p-4 rounded-lg">
            <Label className="font-semibold">Address</Label>

            <div className="grid grid-cols-2 gap-2">
              <EditableField
                label="House Number"
                value={profileData.houseNumber}
                onChange={(e) => handleInputChange('houseNumber', e.target.value)}
              />
              <EditableField
                label="Building Name"
                value={profileData.buildingName}
                onChange={(e) => handleInputChange('buildingName', e.target.value)}
              />
            </div>

            <EditableField
              label="Street"
              value={profileData.street}
              onChange={(e) => handleInputChange('street', e.target.value)}
            />

            <EditableField
              label="Locality"
              value={profileData.locality}
              onChange={(e) => handleInputChange('locality', e.target.value)}
            />

            <div className="grid grid-cols-2 gap-2">
              <EditableField
                label="District"
                value={profileData.district}
                onChange={(e) => handleInputChange('district', e.target.value)}
              />
              <EditableField
                label="State"
                value={profileData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
              />
            </div>

            <EditableField
              label="Pincode"
              value={profileData.pincode}
              onChange={(e) => handleInputChange('pincode', e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className="col-span-2 flex justify-end gap-2">
            <Button variant="outline">Cancel</Button>
            <Button onClick={handleSaveProfile}>
              Save
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
