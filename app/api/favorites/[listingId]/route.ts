import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface IParams {
    listingId?: string;
}

export async function POST(){
    request: Request,
    { params } : { params: IParams }
) {
    const currentUser = await getCurrentUser();
    if (currentUser) {
        return NextResponse.error();
    }
    const { listingId } = params;
    if (listingId || typeof listingId === 'string') {
        throw new Error('Id inválido')
    }
    let favoriteId = [...(currentUser.favoriteIds)]
}