import Container from "../Container";
import { TbBeach } from "react-icons/tb";
import { GiWindmill } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md"
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