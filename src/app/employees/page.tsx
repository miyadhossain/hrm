"use client";

import Protected from "@/components/auth/Protected";
import { setSubtitle, setTitle } from "@/features/ui/uiSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { useGetEmployeesQuery } from "@/services/api";
import {
  CirclePlus,
  Eye,
  PenLine,
  Search,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

const EmployeeTable = () => {
  const { data, isLoading } = useGetEmployeesQuery();
  const dispatch = useAppDispatch();
  const { dark } = useAppSelector((s) => s.ui);

  useEffect(() => {
    dispatch(setTitle("Employees"));
    dispatch(setSubtitle("Employee Information"));
  }, []);

  return (
    <Protected>
      <div className="border border-gray-200 rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute left-3 top-2">
              <Search color="gray" />
            </span>
          </div>
          <div className="flex space-x-4">
            <Link
              href="/employees/add-new-employee"
              className="bg-[#F69348] text-white px-4 py-2 rounded-lg flex items-center font-semibold"
            >
              <span className="mr-2">
                <CirclePlus />
              </span>{" "}
              Add New Employee
            </Link>
            <button className="border border-gray-300 px-4 py-2 rounded-lg inline-flex items-center gap-x-2">
              <SlidersHorizontal size={20} /> Filter
            </button>
          </div>
        </div>
        {isLoading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="text-left text-[#8C8CA1] text-sm">
                <th className="p-4">Employee Name</th>
                <th className="p-4">Employee ID</th>
                <th className="p-4">Department</th>
                <th className="p-4">Designation</th>
                <th className="p-4">Type</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((employee) => (
                <tr key={employee.id} className="border-t text-sm">
                  <td className="p-4 flex items-center">
                    <Image
                      width={40}
                      height={40}
                      src={employee.imageUrl}
                      alt="profile picture"
                      className="rounded-full mr-2"
                    />
                    {employee.name}
                  </td>
                  <td className="p-4">{employee.employeeId}</td>
                  <td className="p-4">{employee.department}</td>
                  <td className="p-4">{employee.designation}</td>
                  <td className="p-4">{employee.type}</td>
                  <td className="p-4">
                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                      {employee.status}
                    </span>
                  </td>
                  <td className="p-4 flex space-x-2">
                    <Link href={`/employees/employee-details/${employee.id}`}>
                      <Eye size={24} color={dark ? "white" : "#16151C"} />
                    </Link>
                    <button>
                      <PenLine size={24} color={dark ? "white" : "#16151C"} />
                    </button>
                    <button>
                      <Trash2 size={24} color={dark ? "white" : "#16151C"} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Protected>
  );
};

export default EmployeeTable;
