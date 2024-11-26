import UserData from "../types/users";

export default async function getUsers(page: number, limit: number) {
  const response = await fetch(`https://frontend-test-middle.vercel.app/api/users?page=${page}&limit=${limit}`);
  return await response.json() as UserData;
}