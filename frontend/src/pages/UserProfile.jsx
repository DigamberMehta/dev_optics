import React, { useState, useEffect, useContext } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import AuthContext from '@/context/authContext'; // Adjust the path to your AuthContext
import { toast } from 'sonner';

// Reusable component for an editable input field
const EditableField = ({ label, value, onChange, editMode, setEditMode, isHovered, setIsHovered, type = "text" }) => {
  return (
    <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <Label>{label}</Label>
      <Input
        type={type}
        placeholder={`Enter your ${label.toLowerCase()}`}
        value={value}
        onChange={onChange}
        disabled={!editMode}
      />
      {isHovered && !editMode && (
        <button
          onClick={() => setEditMode(true)}
          className="absolute top-[40px] right-2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <span><i className="fa-solid fa-pen"></i></span>
        </button>
      )}
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

  const [editMode, setEditMode] = useState({
    name: false,
    email: false,
    phone: false,
    houseNumber: false,
    buildingName: false,
    street: false,
    locality: false,
    district: false,
    state: false,
    pincode: false,
  });

  const [hovered, setHovered] = useState({
    name: false,
    email: false,
    phone: false,
    houseNumber: false,
    buildingName: false,
    street: false,
    locality: false,
    district: false,
    state: false,
    pincode: false,
  });

  // Backend server will run on localhost:3000
  const backendURL = 'http://localhost:3000/api';

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
      const response = await fetch(`${backendURL}/user/profile/${userId}`, {
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
      const response = await fetch(`${backendURL}/user/profile/${user.user_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        toast.success('Profile updated successfully!');
        // Reset all edit modes after saving
        setEditMode(prev => Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {}));
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

  const isAnyFieldInEditMode = () => {
    return Object.values(editMode).some(Boolean);
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
              editMode={editMode.name}
              setEditMode={(val) => setEditMode(prev => ({ ...prev, name: val }))}
              isHovered={hovered.name}
              setIsHovered={(val) => setHovered(prev => ({ ...prev, name: val }))}
            />
            <EditableField
              label="Email"
              value={profileData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              editMode={editMode.email}
              setEditMode={(val) => setEditMode(prev => ({ ...prev, email: val }))}
              isHovered={hovered.email}
              setIsHovered={(val) => setHovered(prev => ({ ...prev, email: val }))}
              type="email"
            />
            <EditableField
              label="Phone"
              value={profileData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              editMode={editMode.phone}
              setEditMode={(val) => setEditMode(prev => ({ ...prev, phone: val }))}
              isHovered={hovered.phone}
              setIsHovered={(val) => setHovered(prev => ({ ...prev, phone: val }))}
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
                editMode={editMode.houseNumber}
                setEditMode={(val) => setEditMode(prev => ({ ...prev, houseNumber: val }))}
                isHovered={hovered.houseNumber}
                setIsHovered={(val) => setHovered(prev => ({ ...prev, houseNumber: val }))}
              />
              <EditableField
                label="Building Name"
                value={profileData.buildingName}
                onChange={(e) => handleInputChange('buildingName', e.target.value)}
                editMode={editMode.buildingName}
                setEditMode={(val) => setEditMode(prev => ({ ...prev, buildingName: val }))}
                isHovered={hovered.buildingName}
                setIsHovered={(val) => setHovered(prev => ({ ...prev, buildingName: val }))}
              />
            </div>

            <EditableField
              label="Street"
              value={profileData.street}
              onChange={(e) => handleInputChange('street', e.target.value)}
              editMode={editMode.street}
              setEditMode={(val) => setEditMode(prev => ({ ...prev, street: val }))}
              isHovered={hovered.street}
              setIsHovered={(val) => setHovered(prev => ({ ...prev, street: val }))}
            />

            <EditableField
              label="Locality"
              value={profileData.locality}
              onChange={(e) => handleInputChange('locality', e.target.value)}
              editMode={editMode.locality}
              setEditMode={(val) => setEditMode(prev => ({ ...prev, locality: val }))}
              isHovered={hovered.locality}
              setIsHovered={(val) => setHovered(prev => ({ ...prev, locality: val }))}
            />

            <div className="grid grid-cols-2 gap-2">
              <EditableField
                label="District"
                value={profileData.district}
                onChange={(e) => handleInputChange('district', e.target.value)}
                editMode={editMode.district}
                setEditMode={(val) => setEditMode(prev => ({ ...prev, district: val }))}
                isHovered={hovered.district}
                setIsHovered={(val) => setHovered(prev => ({ ...prev, district: val }))}
              />
              <EditableField
                label="State"
                value={profileData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                editMode={editMode.state}
                setEditMode={(val) => setEditMode(prev => ({ ...prev, state: val }))}
                isHovered={hovered.state}
                setIsHovered={(val) => setHovered(prev => ({ ...prev, state: val }))}
              />
            </div>

            <EditableField
              label="Pincode"
              value={profileData.pincode}
              onChange={(e) => handleInputChange('pincode', e.target.value)}
              editMode={editMode.pincode}
              setEditMode={(val) => setEditMode(prev => ({ ...prev, pincode: val }))}
              isHovered={hovered.pincode}
              setIsHovered={(val) => setHovered(prev => ({ ...prev, pincode: val }))}
            />
          </div>
          {/* Buttons */}
          <div className="col-span-2 flex justify-end gap-2">
            <Button variant="outline">Cancel</Button>
            <Button onClick={handleSaveProfile} disabled={!isAnyFieldInEditMode()}>
              Save
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}