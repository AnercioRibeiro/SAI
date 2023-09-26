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

const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }
    
    setIsLoading(true);

    axios.post('/api/listings', data)
    .then(() => {
      toast.success('Listing created!');
      router.refresh();
      reset();
      setStep(STEPS.CATEGORY)
      rentModal.onClose();
    })
    .catch(() => {
      toast.error('Something went wrong.');
    })
    .finally(() => {
      setIsLoading(false);
    })
  }

const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
        return 'Create';
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
                            onChange={(value)=> setCustomValue('guestCount', value)}
                            />
                            <hr />
                         <Counter 
                            title="Casa de banho"
                            subtitle="Número de casas de banhos"
                            value={bathroomCount}
                            onChange={(value)=> setCustomValue('guestCount', value)}
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