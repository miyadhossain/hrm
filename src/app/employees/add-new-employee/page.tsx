"use client";

import Protected from "@/components/auth/Protected";
import TabNavigation from "@/components/employees/TabNavigation";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Select from "@/components/ui/Select";
import { setSubtitle, setTitle } from "@/features/ui/uiSlice";
import { useAppDispatch } from "@/lib/store";
import {
  BriefcaseBusiness,
  Camera,
  FileText,
  LockKeyhole,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const PersonalInformation = () => {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState("personal");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    emailAddress: "",
    dateOfBirth: "",
    maritalStatus: "",
    gender: "",
    nationality: "",
    address: "",
    country: "",
    state: "",
    zipCode: "",
  });

  const tabs = [
    { id: "personal", label: "Personal Information", icon: <UserRound /> },
    {
      id: "professional",
      label: "Professional Information",
      icon: <BriefcaseBusiness />,
    },
    { id: "documents", label: "Documents", icon: <FileText /> },
    { id: "account", label: "Account Access", icon: <LockKeyhole /> },
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    // Add additional logic here if needed (e.g., fetching data for the active tab)
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  useEffect(() => {
    dispatch(setTitle("Add New Employee"));
    dispatch(setSubtitle("All Employee > Add New Employee"));
  }, []);

  return (
    <Protected>
      <div className="container mx-auto p-6 bg-white dark:bg-gray-900 border border-[#EFEFFD] rounded-lg shadow-lg">
        {/* Navigation Tabs */}
        <TabNavigation
          tabs={tabs}
          activeTabId={activeTab}
          onTabChange={handleTabChange}
          className="text-base"
        />

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-24 h-24 bg-[#A2A1A833] rounded-xl flex items-center justify-center">
              <span className="text-gray-400">
                <Camera />
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>First Name</Label>
              <Input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
              />
            </div>
            <div>
              <Label>Last Name</Label>
              <Input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Mobile Number</Label>
              <Input
                type="text"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                placeholder="Mobile Number"
              />
            </div>
            <div>
              <Label>Email Address</Label>
              <Input
                type="email"
                name="emailAddress"
                value={formData.emailAddress}
                onChange={handleChange}
                placeholder="Email Address"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Date of Birth</Label>
              <Input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Marital Status</Label>
              <Select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Gender</Label>
              <Select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Select>
            </div>
            <div>
              <Label>Nationality</Label>
              <Select
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                <option value="India">India</option>
              </Select>
            </div>
          </div>

          <div>
            <Label>Address</Label>
            <Input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>Country</Label>
              <Select
                name="country"
                value={formData.country}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                <option value="India">India</option>
              </Select>
            </div>
            <div>
              <Label>State</Label>
              <Select
                name="state"
                value={formData.state}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="California">California</option>
                <option value="Texas">Texas</option>
                <option value="New York">New York</option>
              </Select>
            </div>
            <div>
              <Label>ZIP Code</Label>
              <Select
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="12345">12345</option>
                <option value="67890">67890</option>
              </Select>
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <Link
              href="/employees"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </Protected>
  );
};

export default PersonalInformation;
