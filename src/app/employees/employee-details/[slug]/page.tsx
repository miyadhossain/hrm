"use client";

import Protected from "@/components/auth/Protected";
import TabNavigation from "@/components/employees/TabNavigation";
import Button from "@/components/ui/Button";
import { setSubtitle, setTitle } from "@/features/ui/uiSlice";
import { useAppDispatch } from "@/lib/store";
import {
  BookText,
  BriefcaseBusiness,
  CalendarCheck,
  FileText,
  LockKeyhole,
  Mail,
  PencilLine,
  SquareChartGantt,
  User,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const EmployeeDetailItem = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div className="border-b">
      <p className="text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
};

const EmployeeDetails = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const dispatch = useAppDispatch();
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

  const employeeData = [
    { label: "First Name", value: "Brooklyn" },
    { label: "Last Name", value: "Simmons" },
    { label: "Mobile Number", value: "(702) 555-0122" },
    { label: "Email Address", value: "brooklyn.s@example.com" },
    { label: "Date of Birth", value: "July 14, 1985" },
    { label: "Marital Status", value: "Married" },
    { label: "Gender", value: "Female" },
    { label: "Nationality", value: "America" },
    { label: "Address", value: "2464 Royal Ln, Meso, New Jersey" },
    { label: "City", value: "Calty" },
    { label: "State", value: "United State" },
    { label: "Zip Code", value: "35624" },
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    // Add additional logic here if needed (e.g., fetching data for the active tab)
  };

  useEffect(() => {
    dispatch(setTitle("Alex Johnson"));
    dispatch(setSubtitle("Employees > Alex Johnson"));
  }, []);
  return (
    <Protected>
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Image
              width={96}
              height={96}
              src="https://i.pravatar.cc/150?img=1"
              alt="Profile"
              className="rounded-md"
            />
            <div className="flex flex-col">
              <h2 className="text-2xl font-semibold">Brooklyn Simmons</h2>
              <p className="inline-flex items-center gap-x-2">
                <BriefcaseBusiness size={20} /> Project Manager
              </p>
              <p className="inline-flex items-center gap-x-2">
                <Mail size={20} /> brooklyn.s@example.com
              </p>
            </div>
          </div>
          <Button className="inline-flex items-center gap-x-2">
            <PencilLine size={20} /> Edit Profile
          </Button>
        </div>
        <hr className="my-3" />
        <div className="flex space-x-6">
          <div className="w-1/4 h-56 border rounded-xl bg-white dark:bg-gray-800 shadow-md">
            <ul className="flex flex-col space-y-6">
              <li className="text-white bg-brand inline-flex items-center gap-x-2 rounded-t-xl px-5 py-3 font-semibold">
                <User size={20} /> Profile
              </li>
              <li className="inline-flex items-center gap-x-2 px-5">
                <CalendarCheck size={20} /> Attendance
              </li>
              <li className="inline-flex items-center gap-x-2 px-5">
                <SquareChartGantt size={20} /> Projects
              </li>
              <li className="inline-flex items-center gap-x-2 px-5">
                <BookText size={20} /> Leave
              </li>
            </ul>
          </div>
          <div className="w-3/4">
            {/* Navigation Tabs */}
            <TabNavigation
              tabs={tabs}
              activeTabId={activeTab}
              onTabChange={handleTabChange}
              className="text-xs"
            />
            <div className="grid grid-cols-2 gap-4">
              {employeeData.map((item, index) => (
                <EmployeeDetailItem
                  key={index}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Protected>
  );
};

export default EmployeeDetails;
