import  bcrypt  from "bcrypt";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(
    request: Request
) {
    const body = await request.json();
    const {
        email,
        name,
        password,
        userType,
    } = body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.utilizador.create({
        data: {
            email,
            name,
            hashedPassword,
            userType
        }
    });

    return NextResponse.json(user);
}