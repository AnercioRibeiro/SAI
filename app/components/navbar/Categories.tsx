import Container from "../Container";
import { TbBeach } from "react-icons/tb";
import { GiWindmill } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md"
import CategoryBox from "../CategoryBox";

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
                            description={item.description}
                            icon={item.icon}/>
                ))}

            </div>
        </Container>
     );
}
 
export default Categories;