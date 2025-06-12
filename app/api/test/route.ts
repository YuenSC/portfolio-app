import { NextResponse } from "next/server";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

const mockUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Developer",
    createdAt: "2024-03-25T10:00:00Z",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Designer",
    createdAt: "2024-03-24T15:30:00Z",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    role: "Product Manager",
    createdAt: "2024-03-23T09:15:00Z",
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: mockUsers,
    count: mockUsers.length,
  });
}
