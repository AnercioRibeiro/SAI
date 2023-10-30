import  prisma  from "@/app/libs/prismadb";

export default async function getListings() {
    try {
        const imoveis = await prisma.imovel.findMany({

            orderBy: {
                createdAt: 'desc'
            }
        });
        const safeListings = imoveis.map((imovel) => ({
            ...imovel,
            createdAt: imovel.createdAt.toISOString(),
        }));
        return safeListings;
    } catch (error: any) {
        throw new Error(error);
    }
}