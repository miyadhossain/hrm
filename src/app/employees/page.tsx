"use client";

import Protected from "@/components/auth/Protected";
import { useGetEmployeesQuery } from "@/services/api";
import { CirclePlus, Search, SlidersHorizontal } from "lucide-react";

const EmployeeTable = () => {
  const { data, isLoading } = useGetEmployeesQuery();

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
            <button className="bg-[#F69348] text-white px-4 py-2 rounded-lg flex items-center font-semibold">
              <span className="mr-2">
                <CirclePlus />
              </span>{" "}
              Add New Employee
            </button>
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
              <tr className="text-left text-gray-600">
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
                <tr key={employee.id} className="border-t">
                  <td className="p-4 flex items-center">
                    <img
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
                    <button className="text-gray-500 hover:text-gray-700">
                      👁️
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                      ✏️
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                      🗑️
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
