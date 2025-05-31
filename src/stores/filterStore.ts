import { create } from 'zustand';

type FilterState = {
  verificationStatus: string;
  setVerificationStatus: (value: string) => void;

  status: string;
  setStatus: (value: string) => void;

  dateTimeLastActiveFrom: string; // ISO string
  setDateTimeLastActiveFrom: (value: string) => void;

  dateTimeLastActiveTo: string;
  setDateTimeLastActiveTo: (value: string) => void;
};


export const useFilterStore = create<FilterState>((set) => ({
  verificationStatus: '',
  setVerificationStatus: (value) => set({ verificationStatus: value }),

  status: '',
  setStatus: (value) => set({ status: value }),

  dateTimeLastActiveFrom: '',
  setDateTimeLastActiveFrom: (value) => set({ dateTimeLastActiveFrom: value }),
  
  dateTimeLastActiveTo: '',
  setDateTimeLastActiveTo: (value) => set({ dateTimeLastActiveTo: value }),
}));