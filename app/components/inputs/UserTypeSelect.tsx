'use client';

import useUserTypes from '@/app/hooks/useUserTypes';
import Select from 'react-select';


export type UserTypeSelectValue = {
    label: string;
    value: string;
}

interface UserTypeSelectProps {
    value?: UserTypeSelectValue;
    onChange: (value: UserTypeSelectValue) => void;
}

const UserTypeSelect: React.FC<UserTypeSelectProps> = ({
value,
onChange
}) => {
    const { getAll } = useUserTypes();
    return ( 
        <div>
            <Select
                placeholder="Tipo de utilizador" 
                isClearable options={getAll()}
                value={value}
                onChange={(value)=> onChange(value as UserTypeSelectValue)}
                formatOptionLabel={(option: any)=>(
               
<div className="flex flex-row items-center gap-3">
                        
                        <div>
                           
                            <span className="text-neutral-800 ml-1">
                                {option.label}
                            </span>
                        </div>
                    </div>
                
                )}
                classNames={{
                    // control: () => 'p-3 border-2',
                    // input: ()=> 'text-sm',
                    // option: ()=> 'text-lg'
                }}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 6,
                    colors: {
                        ...theme.colors,
                        primary: 'black',
                        primary25: '#ffe4e6'
                    }
                })}
            />


        </div>
     );
}
 
export default UserTypeSelect;