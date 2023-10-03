import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "@/app/types";

import useLoginModal from "./useLoginModal";

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();

  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId.toString());
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (!currentUser) {
      return loginModal.onOpen();
    }

    let requestPromise;
    let successMessage;
    let errorMessage;

    if (hasFavorited) {
      requestPromise = axios.delete(`/api/favorites/${listingId}`);
      successMessage = 'Removido da lista de favoritos';
      errorMessage = 'Erro ao remover da lista de favoritos';
    } else {
      requestPromise = axios.post(`/api/favorites/${listingId}`);
      successMessage = 'Adicionado à lista de favoritos';
      errorMessage = 'Erro ao adicionar à lista de favoritos';
    }

    try {
      await requestPromise;
      router.refresh();
      toast.success(successMessage);
    } catch (error) {
      toast.error(errorMessage);
    }
  }, [currentUser, hasFavorited, listingId, loginModal, router]);

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
