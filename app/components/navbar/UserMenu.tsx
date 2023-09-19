'use client'
import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from '../Avatar';
import { useCallback, useState } from 'react';
import MenuItem from './MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { signOut } from 'next-auth/react';
import { SafeUser } from '@/app/types';

interface UserMenuProps{
   currentUser?: SafeUser | null | undefined
}


const  UserMenu: React.FC<UserMenuProps> = ({
    currentUser
}) => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    const onRent = useCallback(()=>{
        if (currentUser) {
            return loginModal.onOpen(); 
        }
        //Open Rent Modal
    },[currentUser, loginModal])

    const firstLetterOfUserName = currentUser?.name?.split("")?.[0]?.toUpperCase();

    return (  
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div onClick={onRent} className="hidden md:block text-sm 
                font-semibold py-3 px-4 rounded-full 
                hover:bg-neutral-100 transition cursor">
                    SAI, a casa 

                </div>
                <div onClick={toggleOpen} className="p-4 md:py-1 md:px-2 border-[1px]
                                                  border-neutral-200 flex flex-row items-center
                                                  gap-3 rounded-full cursor-pointer hover:shadow-md
                                                  transition">
                 <AiOutlineMenu />    
                 <div className='hidden md:block'>
                   
                  
                   
             {
                firstLetterOfUserName ?
                (
                <span className="flex justify-center items-center
                 bg-black text-white h-7 w-7 text-sm rounded-full">
                  {firstLetterOfUserName}
                </span>
                ):(
             
                    <Avatar src={currentUser?.image}/>
                )}
                </div>                               

                </div>
            </div>
            {isOpen && (
                <div className="absolute rounded-xl shadow-md
                                w-[40vw] md:w-3/4 bg-white overflow-hidden
                                right-0 top-12 text-sm">
                <div className='flex flex-col cursor-pointer'>
                    {currentUser ? (
                        <>
                            <MenuItem 
                                onClick={() => {}}
                                      label="Minhas viagens"/>
                            <MenuItem 
                                onClick={() => {}}
                                      label="lista de favoritos"/>
                            <MenuItem 
                                onClick={() => {}}
                                      label="Minhas reservas"/>
                            <MenuItem 
                                onClick={() => {}}
                                      label="Minhas propriedades"/>
                            <MenuItem 
                                onClick={() => {}}
                                      label="Minhas reservas"/>
                            <MenuItem 
                                onClick={() => {}}
                                      label="Airbnb my home"/>
                            <hr />
                            <MenuItem 
                                onClick={() => signOut()}
                                      label="Sair"/>
                        </>
                    ) : (
                        <>
                            <MenuItem 
                                onClick={loginModal.onOpen}
                                  label="Entrar"/>
                            <MenuItem 
                                onClick={registerModal.onOpen}
                                  label="Registar"/>
                        </>
                    )}
                </div>

                </div>
            )}
        </div>
    );
}
 
export default UserMenu;