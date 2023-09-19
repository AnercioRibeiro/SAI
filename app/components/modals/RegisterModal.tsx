'use client';
import axios from 'axios';
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { signIn } from 'next-auth/react';
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import  useRegisterModal  from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import toast from 'react-hot-toast';
import Button from '../Button';

const RegisterModal = () => {
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
        name: '',
        email: '',
        password: ''
    }
});

// const onSubmit: SubmitHandler<FieldValues> = (data) => {
//     setIsLoading(true);
//     toast.loading('Carregando...', {
//         duration: 3000, // Specify the duration in milliseconds (2 seconds in this example)
//       });
//     axios.post('/api/register', data)
//          .then(() =>{
//             registerModal.onClose();
//          })
//          .catch((error) =>{
//           toast.error('Ocorreu algum erro!!');
//          })
//          .finally(() =>{
//             setIsLoading(false);
//          })
   
// }

const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // Show a loading toast while the request is being made
    const loadingToast = toast.loading('Carregando...');
  
    try {
      const response = await axios.post('/api/register', data);
      
      // If the request succeeds, show a success toast
      if (response.status === 200) {
        toast.success('Registado com sucesso');
        registerModal.onClose();
      } else {
        // Handle other success scenarios if needed
      }
    } catch (error) {
      // If the request fails, show an error toast
      toast.error('Ocorreu um erro!');
    } finally {
      // Close the loading toast when the request is complete
      toast.dismiss(loadingToast);
      setIsLoading(false);
    }
  }

  const toggle = useCallback(()=>{
    registerModal.onClose();
    loginModal.onOpen();
}, [registerModal, loginModal]);

const bodyContent = (
    <div className="flex flex-col gap-4">
        <Heading 
            title="Seja bem vindo"
            subtitle="Crie a sua conta" />
            <Input 
                id="email"
            label="E-mail"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
                    />
             <Input 
                id="name"
            label="Nome"
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
        label="Registo com Google"
        icon={FcGoogle}
        onClick={() =>signIn('google')} 
        />
        <div className="text-neutral-500 text-center mt-4 font-light">
            <div className="justify-center flex flex-row items-center gap-2">
                <div>
                    Já tem uma conta?
                </div>
                <div onClick={toggle}
                className="text-neutral-800 cursor-pointer 
                hover:underline">
                    Entrar
                </div>
            </div>
        </div>
    
    </div>
)
    return ( 
        <Modal 
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Registar"
            actionLabel="Registar"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
     );
}
 
export default RegisterModal;