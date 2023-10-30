import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  imovelId?: string;
}

export async function DELETE(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { imovelId } = params;

  if (!imovelId || typeof imovelId !== 'string') {
    throw new Error('Invalid ID');
  }

  const imovel = await prisma.imovel.deleteMany({
    where: {
      id: parseInt(imovelId as string),
      utilizadorId: currentUser.id
    }
  });

  return NextResponse.json(imovel);
}