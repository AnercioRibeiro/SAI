'use client';

import { signIn } from 'next-auth/react';
import axios from 'axios';
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import  useRegisterModal  from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import toast from 'react-hot-toast';
import Button from '../Button';
import { useRouter } from 'next/navigation';

const LoginModal = () => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);
    const { 
        register, 
        handleSubmit, 
        formState: {
            errors,
    } 
} = useForm<FieldValues>({
    defaultValues: {
        email: '',
        password: ''
    }
});

// const onSubmit: SubmitHandler<FieldValues> = (data) => {
//     setIsLoading(true);
//     toast.loading('Carregando...');
//     signIn('credentials', {
//         ...data,
//         redirect: false,
//     })
//     .then((callBack) => {
//       setIsLoading(false);

//       if (callBack?.ok) {
//         toast.success('Seja Bem-vindo');
//         router.refresh();
//         loginModal.onClose();
//       }

//       if (callBack?.error) {
//         toast.error(callBack.error);
//       }
//     })
// }

const onSubmit: SubmitHandler<FieldValues> = async (data) => {
  // Show a loading toast while the request is being made
  const loadingToast = toast.loading('Carregando...');

  try {
    const callBack = await signIn('credentials', {
      ...data,
      redirect: false,
    });

    // If the request succeeds, show a success toast
    if (callBack?.ok) {
      toast.success('Seja Bem-vindo');
      router.refresh();
      loginModal.onClose();
    }

    // If the request fails, show an error toast
    if (callBack?.error) {
      toast.error(callBack.error);
    }
  } catch (error) {
    // Handle other error scenarios if needed
    toast.error('Ocorreu um erro!');
  } finally {
    // Close the loading toast when the request is complete
    toast.dismiss(loadingToast);
    setIsLoading(false);
  }
}

const toggle = useCallback(()=>{
    loginModal.onClose();
    registerModal.onOpen();
}, [loginModal, registerModal]);

const bodyContent = (
    <div className="flex flex-col gap-4">
        <Heading 
            title="Bem vindo de volta"
            subtitle="Acesse a sua conta!" />
            <Input 
                id="email"
            label="E-mail"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
                    />
            <Input 
                id="password"
            type="password"
            label="Palavra passe"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
                    />
    </div>
);

const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
        <hr />
        <Button 
        outline
        label="Entre com a sua conta Google"
        icon={FcGoogle}
        onClick={() =>signIn('google')} 
        />
        <div className="text-neutral-500 text-center mt-4 font-light">
            <div className="justify-center flex flex-row items-center gap-2">
                <div>
                    Primeira vez ?
                </div>
                <div onClick={toggle}
                className="text-neutral-800 cursor-pointer 
                hover:underline">
                    Faça o seu registo
                </div>
            </div>
        </div>
    
    </div>
)
    return ( 
        <Modal 
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Entrar"
            actionLabel="Entrar"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
     );
}
 
export default LoginModal;