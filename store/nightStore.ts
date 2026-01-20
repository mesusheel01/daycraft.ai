import { Theme } from 'next-auth'
import { create } from 'zustand'

interface NightType {
    isNight: boolean;
    setIsNight: () => void;
    removeIsNight: () => void;
}
const value = localStorage.getItem('theme')
export const useNight = create<NightType>((set) => ({
    isNight: value === 'dark' ? true : false,
    setIsNight: () => set(state => ({ isNight: !state })),
    removeIsNight: () => set({ isNight: false }),
}))