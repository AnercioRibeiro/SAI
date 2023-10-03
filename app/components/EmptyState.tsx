'use client';
import { useRouter } from "next/navigation";
import Heading from "./Heading";
import Button from "./Button";
import { MouseEvent } from "react";

interface EmptyState{
    title?: string;
    subtitle?: string;
    showReset?: boolean;
}

const EmptyState: React.FC<EmptyState> = ({
   title = "Sem resultados",
   subtitle = "Experimente mudar o filtro de pesquisa",
   showReset
}) => {
    const router = useRouter();
      return (
        <div className="h-[60vh] flex flex-col
                        gap-2 justify-center 
                        items-center">
            <Heading 
            center 
            title={title} 
            subtitle={subtitle} 
            />
            <div className="w-48 mt-4">
                { showReset && (
                    <Button  outline label="Remover todos filtros" onClick={console.log} />
                )}
            </div>
        </div>
    )
}

export default EmptyState;