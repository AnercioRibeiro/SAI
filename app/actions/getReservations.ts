import { Prisma } from "@prisma/client";

interface IParams {
    imovelId?: string;
    utilizadorId?: string;
    authorId?: string;
}

export default async function getReservations(
    params: IParams
) {
    try {
    const { imovelId, utilizadorId, authorId } = params;
    const query: any = {};

    if (imovelId) {
        query.imovelId = parseInt(imovelId as string);
    }

    if (utilizadorId) {
        query.utilizadorId = parseInt(utilizadorId as string);
    }

    if (authorId) {
        query.imovel = { utilizadorId: authorId }
    }

    const alugueis = await prisma?.aluguel.findMany({
        where: query,
        include: {
            imovel: true,
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const safeReservations = alugueis?.map(
        (aluguel) => ({
            ...aluguel,
            createdAt: aluguel.createdAt.toISOString(),
            startDate: aluguel.startDate.toISOString(),
            endDate: aluguel.endDate.toISOString(),
            imovel: {
                ...aluguel.imovel,
                createdAt: aluguel.imovel.createdAt.toISOString()
            }
        })
    )
    return safeReservations;
} catch(error: any){
    throw new Error(error);
}
}

