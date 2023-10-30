import React, { useCallback, useState, useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import MenuItem from './MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { signOut } from 'next-auth/react';
import useRentModal from '@/app/hooks/useRentModal';
import { SafeUser } from '@/app/types';

interface UserMenuProps {
  currentUser?: SafeUser | null | undefined;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the menu
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  // Function to close the menu
  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onRent = useCallback(() => {
    if (currentUser) {
      return loginModal.onOpen();
    }
    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  const firstLetterOfUserName = currentUser?.name?.split('')?.[0]?.toUpperCase();

  const isAdmin = currentUser?.userType === 'Proprietário'; // Replace with your actual isAdmin check

  // Use localStorage to persist the menu state
  useEffect(() => {
    const storedIsOpen = localStorage.getItem('menuIsOpen');
    if (storedIsOpen === 'true') {
      setIsOpen(true);
    }
  }, []);

  // Save the menu state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('menuIsOpen', isOpen.toString());
  }, [isOpen]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor"
        >
          SAI, a sua casa
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            {firstLetterOfUserName ? (
              <span className="flex justify-center items-center bg-black text-white h-7 w-7 text-sm rounded-full">
                {firstLetterOfUserName}
              </span>
            ) : (
              <Avatar src={currentUser?.imageSrc} />
            )}
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm"
          onClick={closeMenu} // Close the menu when clicking outside of it
        >
          <div className="flex flex-col cursor-pointer" onClick={(e) => e.stopPropagation()}>
            {currentUser ? (
              <>
                {isAdmin ? (
                  <>
                    <MenuItem onClick={() => {}} label="Admin Menu Item 1" />
                    <MenuItem onClick={() => {}} label="Admin Menu Item 2" />
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
                    onClick={rentModal.onOpen}
                          label="Adicionar propriedades"/>
                    {/* Add more admin-specific menu items */}
                  </>
                ) : (
                  <>
                    <MenuItem onClick={() => {}} label="User Menu Item 1" />
                    <MenuItem onClick={() => {}} label="User Menu Item 2" />
                    {/* Add more user-specific menu items */}
                  </>
                )}
                <hr />
                <MenuItem onClick={() => signOut()} label="Sair" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Entrar" />
                <MenuItem onClick={registerModal.onOpen} label="Registar" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
