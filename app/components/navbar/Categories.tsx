'use client';

import Container from "../Container";
import { IoDiamond } from 'react-icons/io5';
import { FaSkiing } from 'react-icons/fa';
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import { BsSnow } from "react-icons/bs";
import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
    {
        label: 'Praia',
        icon: TbBeach,
        description: 'Propriedade próxima a praia.'
    },
    {
        label: 'Resort',
        icon: GiWindmill,
        description: 'Propriedade próxima a um resort.'
    },
    {
        label: 'Moderna',
        icon: MdOutlineVilla,
        description: 'Propriedade próxima a um resort.'
    },
    {
        label: 'Countryside',
        icon: TbMountain,
        description: 'Propriedade próxima a um resort.'
    },
    {
        label: 'Piscinas',
        icon: TbPool,
        description: 'Propriedade próxima a um resort.'
    },
    {
        label: 'Ilhas',
        icon: GiIsland,
        description: 'Propriedade próxima a um resort.'
    },
    {
        label: 'Lago',
        icon: GiBoatFishing,
        description: 'Propriedade junto a um lago.'
    },
    {
        label: 'Castelos',
        icon: GiCastle,
        description: 'Propriedade junto a um lago.'
    },
    {
        label: 'Campismo',
        icon: GiForestCamp,
        description: 'Propriedade junto a um lago.'
    }
    ,
    {
        label: 'Neve',
        icon: BsSnow,
        description: 'Propriedade junto a um lago.'
    },
    {
        label: 'Cavernas',
        icon: GiCaveEntrance,
        description: 'Propriedade junto a um lago.'
    },
    {
        label: 'Deserto',
        icon: GiCactus,
        description: 'Propriedade junto a um lago.'
    }
    ,
    {
        label: 'Celeiro',
        icon: GiBarn,
        description: 'Propriedade junto a um lago.'
    },
    {
        label: 'Luxuoso',
        icon: IoDiamond,
        description: 'Propriedade junto a um lago.'
    }
]

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();

    const isMainPage = pathname === '/';

    if (!isMainPage) {
        return null;
    }
    return ( 
        <Container>
            <div 
            className="pt-4 
            flex flex-row items-center 
            justify-between
            overflow-x-auto">
                {categories.map((item) => (
                    <CategoryBox 
                            key={item.label}
                            label={item.label}
                            selected={category === item.label}
                            icon={item.icon}/>
                ))}

            </div>
        </Container>
     );
}
 
export default Categories;