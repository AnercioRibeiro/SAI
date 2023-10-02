'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from 'date-fns';

import useCountries from "@/app/hooks/useCountries";
import { 
//   SafeListing, 
//   SafeReservation, 
  SafeUser 
} from "@/app/types";

import HeartButton from "../HeartButton";
import Button from "../Button";
import ClientOnly from "../ClientOnly";
import { Listing, Reservation } from "@prisma/client";
import { GiBathtub, GiBed, GiHouse } from "react-icons/gi";

interface ListingCardProps {
  data: Listing;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null
};

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (disabled) {
      return;
    }

    onAction?.(actionId)
  }, [disabled, onAction, actionId]);

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }
  
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }, [reservation]);

  return (
    
    <div 
    onClick={() => router.push(`/listings/${data.id}`)}
    className="col-span-1 cursor-pointer group"
    >
        <div className="w-full h-3/4 flex flex-col gap-2">
            <div className="aspect-square 
            relative overflow-hidden
            rounded-t-lg w-full">
                <Image fill 
                        alt="Propriedades"
                             src={data.imageSrc} className="object-cover 
                                                h-3/4
                                                w-full 
                                                group-hover:scale-110
                                                transition"/>
                    <div className="absolute top-3 right-3">
                        <HeartButton 
                            listingId={data.id}
                            currentUser={currentUser}
                            />

                    </div>
                    <div className="font-bold text-white absolute bottom-2 left-3">
                 {price} Akz / Mês
            </div>
            </div>
            <div className="font-semibold text-sm">
                    {location?.region}, {location?.label}
            </div>
            <div className="
                            grid 
                            grid-cols-7 
                            grid-rows-1 
                            gap-4 
                          bg-slate-300 
                            py-2 px-2 
                          text-black
                          rounded-b-lg">
                <span className="col-span-3 text-sm">
                    {data.title}
                </span>
                <span className="col-span-1">
                    <GiBed className="text-right" size={20} /> 
                </span>
                <span className="col-span-1 text-sm">
                    {data.bathroomCount}
                </span>
                 {/* <span className="col-span-1">
                    <GiHouse size={20} /> 
                </span>
                {/* <span className="col-span-1 text-sm">
                    182m2 
                </span> */}
                <span className="col-span-1">
                    <GiBathtub size={20} /> 
                </span> 
                <span className="text-right text-sm">
                    {data.bathroomCount}
                </span>
            </div>
            {/* <div className="font-light text-neutral-500">
                {reservationDate || data.category}
            </div> */}
            {/* <div className="flex flex-row items-center gap-1">
            
            { reservation && (
                <div className="font-light"> Diária</div>
            )}
            </div> */}
        
        </div>
    </div>

   );
}
 
export default ListingCard;