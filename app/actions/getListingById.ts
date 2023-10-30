import prisma from "@/app/libs/prismadb";

interface IParams{
    imovelId?: string;
    
}

export default async function getListingById(
    params:IParams
    
    
) {

    try {
        
        const { imovelId } = params;
        const imovel = await prisma.imovel.findUnique({
            where: {
                id: parseInt(imovelId as string),
            },
            include: {
                utilizador: true
            }
        });

        if (!imovel) {
           return null; 
        }

        return {
            ...imovel,
            createdAt: imovel.createdAt.toISOString(),
            user: {
                ...imovel.utilizador,
                createdAt: imovel.utilizador.createdAt.toISOString(),
                updatedAt: imovel.utilizador.updatedAt.toISOString(),
                emailVerified: 
                    imovel.utilizador.emailVerified?.toISOString() || null,
                
            }
        }
    } catch (error: any) {
        throw new Error(error);
    }
}