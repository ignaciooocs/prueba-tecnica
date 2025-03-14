import { dealers } from "@/utils/dealers";
import { create } from "zustand";

export interface DealersProps {
    latitude: number;
    longitude: number;
    name: string;
    image: string;
    id: number,
    icon: string
}

interface DealerState {
    dealers: DealersProps[];
    setDealers: (dealers: DealersProps[]) => void;
}

export const useDealerStore = create<DealerState>((set) => ({
    dealers: [ ...dealers ],
    setDealers: (dealers) => set({ dealers }),
}));