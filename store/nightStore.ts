import { create } from 'zustand'

interface NightType {
    isNight: boolean;
    setIsNight: () => void;
    removeIsNight: () => void;
}

const getInitialNightMode = () => {
    if (typeof window !== 'undefined') {
        const value = localStorage.getItem('theme')
        return value === 'dark'
    }
    return false
}

export const useNight = create<NightType>((set) => ({
    isNight: getInitialNightMode(),
    setIsNight: () => set(state => ({ isNight: !state.isNight })),
    removeIsNight: () => set({ isNight: false }),
}))