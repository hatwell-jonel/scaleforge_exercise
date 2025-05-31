import { create } from 'zustand';

type FilterState = {
  verificationStatus: string;
  status: string;
  setVerificationStatus: (value: string) => void;
  setStatus: (value: string) => void;
};


export const useFilterStore = create<FilterState>((set) => ({
  verificationStatus: '',
  status: '',
  setVerificationStatus: (value) => set({ verificationStatus: value }),
  setStatus: (value) => set({ status: value }),
}));