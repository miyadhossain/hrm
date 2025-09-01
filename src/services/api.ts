"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    login: builder.mutation<{ token: string; user: any }, { email: string; password: string }>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
    getKpis: builder.query<any, void>({ query: () => "/kpis" }),
    getCharts: builder.query<any, void>({ query: () => "/charts" }),
    getAttendance: builder.query<any[], void>({ query: () => "/attendance" }),
    getEmployees: builder.query<any[], void>({ query: () => "/employees" }),
  }),
});

export const {
  useLoginMutation,
  useGetKpisQuery,
  useGetChartsQuery,
  useGetAttendanceQuery,
  useGetEmployeesQuery,
} = api;
