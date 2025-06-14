import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Admin from "@/app/models/Admin";

export const checkAuth = async (request: Request) => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      throw new Error('Unauthorized');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      username: string;
    };

    const admin = await Admin.findById(decoded.id);
    if (!admin) {
        throw new Error('Unauthorized');
    }
    return true
}