import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  imovelId?: string;
}

export async function POST(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { imovelId } = params;

  if (!imovelId || typeof imovelId !== 'string') {
    throw new Error('Identificador inválido');
  }

  let favoritoIds = [...(currentUser.favoritoIds || [])];

  favoritoIds.push(imovelId);

  const user = await prisma.utilizador.update({
    where: {
      id: currentUser.id
    },
    data: {
      favoritoIds
    }
  });

  return NextResponse.json(user);
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
    throw new Error('Identificador inválido');
  }

  let favoritoIds = [...(currentUser.favoritoIds || [])];

  favoritoIds = favoritoIds.filter((id) => id !== imovelId);

  const user = await prisma.utilizador.update({
    where: {
      id: currentUser.id
    },
    data: {
      favoritoIds
    }
  });

  return NextResponse.json(user);
}