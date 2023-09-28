'use client';
import { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/input";
// import Map from "../Map";


enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
}

const RentModal = () => {
    const router = useRouter();
    const rentModal = useRentModal();

const [isLoading, setIsLoading] = useState(false);
const [step, setStep] = useState(STEPS.CATEGORY);

const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
        errors,
    },
    reset,
} = useForm<FieldValues>({
    defaultValues: {
        category: '',
        location: null,
        guestCount: 1,
        roomCount: 1,
        bathroomCount: 1,
        imageSrc: '',
        price: 1,
        title: '',
        description: ''  
    }
});

const location = watch('location');
const category = watch('category');
const guestCount = watch('guestCount');
const roomCount = watch('roomCount');
const bathroomCount = watch('bathroomCount');
const imageSrc = watch('imageSrc');

const Map = useMemo(() => dynamic(() => import('../Map'), {
    ssr: false
}), [location]);

const setCustomValue = (id: string, value: any) =>{
    setValue(id, value, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true

    })
}

const onBack = () => {
    setStep((value) => value - 1);
}

const onNext = () => {
   setStep((value) => value + 1)
}

const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }
    const loadingToast = toast.loading('Carregando...');
    try{
        const response = await axios.post('/api/listings', data);
        
        if (response.status === 200) {
            toast.success('Registado com sucesso');
            router.refresh();
            reset();
            setStep(STEPS.CATEGORY)
            rentModal.onClose();
        } else {
            toast.error('Não foi possível completar pedido');
        } 
    } catch(error){
        toast.error('Ocorreu um erro');
    } finally {
        toast.dismiss(loadingToast);
        setIsLoading(false);
    }
}    

const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
        return 'Registar';
    }

    return 'Próximo'
}, [step]);

const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
        return undefined;
    }

    return 'Anterior'
},[step]);

let bodyContent = (
    <div className="flex flex-col gap-8">
        <Heading 
            title="Como descreverias a tua propriedade?"
            subtitle="Escolha uma categoria"
        />
        <div
            className="grid grid-cols-1 md:grid-cols-2 gap-3 
                       max-h-[50vh] overflow-y-auto">
                        {categories.map((item) => (
                            <div key={item.label} className="col-span-1">
                                <CategoryInput
                                onClick={(category) => 
                                setCustomValue('category', category)}
                                selected={category === item.label}
                                label={item.label}
                                icon={item.icon}/>
                            </div>
                        ))}
        </div>
    </div>
)

if (step === STEPS.LOCATION) {
    bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading 
                 title="Onde a sua propriedade está localizada?"
                 subtitle="Ajude os hóspedes a encontrar!"
                 />
            <CountrySelect 
                    value={location} onChange={(value) => setCustomValue('location', value)} 
        />
        <Map 
            center={location?.latlng}
            />
        </div>
    )
}

if (step === STEPS.INFO) {
    bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading 
                    title="Informações sobre o imóvel"
                    subtitle="Dê alguns detalhes sobre o seu imóvel."
                    />
                    
                    <Counter 
                            title="Hóspedes"
                            subtitle="Número de hóspedes"
                            value={guestCount}
                            onChange={(value)=> setCustomValue('guestCount', value)}
                            />
                            <hr />
                    <Counter 
                            title="Quartos"
                            subtitle="Número de quartos"
                            value={roomCount}
                            onChange={(value)=> setCustomValue('roomCount', value)}
                            />
                            <hr />
                    <Counter 
                            title="Casa de banho"
                            subtitle="Número de casas de banhos"
                            value={bathroomCount}
                            onChange={(value)=> setCustomValue('bathroomCount', value)}
                            />
        </div>
    )
}
if (step === STEPS.IMAGES) {
    bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading 
                title="Adicionar fotografias do imóvel"
                subtitle="Partilhe fotografias que mostrem o imóvel detalhadamente."
            />
            <ImageUpload 
            value={imageSrc}
            onChange={(value) => setCustomValue('imageSrc', value)}
            />
        </div>
    )
}

if (step === STEPS.DESCRIPTION) {
    bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading 
                title="Descrição do imóvel"
                subtitle="Descreva o seu imóvel, Apartamento, vivenda e tipologia"
            />
            <Input 
                id="title"
                label="Título"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <hr />
            <Input 
                id="description"
                label="Descrição"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )
}

if (step === STEPS.PRICE) {
    bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Preço"
                subtitle="Adicione o custo de hospedagem por noite "
            />
            <Input
                id="price"
                label="Preço"
                formatPrice
                type="number"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                />
        </div>
    )
}

    return (
        <Modal
            disabled={isLoading}
            isOpen={rentModal.isOpen}
            title='A sua casa'
            actionLabel={actionLabel}
            onSubmit={handleSubmit(onSubmit)}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            onClose={rentModal.onClose}
            body={bodyContent}
        />
    );
}

export default RentModal;