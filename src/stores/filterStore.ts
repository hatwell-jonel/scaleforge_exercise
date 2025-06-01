import { create } from 'zustand';


type FilterSelectLists = {
  filterNameList: string[];
  filterEmailList: string[];
  filterMobileNumberList: string[];
  filterDomainList: string[];
};

type FilterState = {

  filterListData: string[];
  setFilterListData: (value: string[]) => void;

  verificationStatus: string;
  setVerificationStatus: (value: string) => void;

  status: string;
  setStatus: (value: string) => void;

  dateRegistered: {
    from: string
    to: string
  }
  setDateRegistered: (value: { from: string; to: string }) => void

  dateTimeLastActiveFrom: string; // ISO string
  setDateTimeLastActiveFrom: (value: string) => void;

  dateTimeLastActiveTo: string;
  setDateTimeLastActiveTo: (value: string) => void;

  nameList : string[];
  setNameList: (value: string[]) => void;

  emailList : string[];
  setEmailList: (value: string[]) => void;

  mobileNumberList : string[];
  setMobileNumberList: (value: string[]) => void;

  domainList : string[];
  setDomainList: (value: string[]) => void;

  // filterNameList : string[];
  // setFilterNameList: (value: string[]) => void;

  filters: FilterSelectLists;
   setFilters: (newFilters: Partial<FilterSelectLists>) => void

};


export const useFilterStore = create<FilterState>((set) => ({
  filterListData: [],
  setFilterListData: (value) => set({ filterListData: value }),

  verificationStatus: '',
  setVerificationStatus: (value) => set({ verificationStatus: value }),

  status: '',
  setStatus: (value) => set({ status: value }),

  dateRegistered: { from: '', to: '' },
  setDateRegistered: (value) => set({ dateRegistered: value }),

  dateTimeLastActiveFrom: '',
  setDateTimeLastActiveFrom: (value) => set({ dateTimeLastActiveFrom: value }),
  
  dateTimeLastActiveTo: '',
  setDateTimeLastActiveTo: (value) => set({ dateTimeLastActiveTo: value }),

  nameList: [],
  setNameList: (value) => set({ nameList: value }),

  emailList: [],
  setEmailList: (value) => set({ emailList: value }),

  mobileNumberList: [],
  setMobileNumberList: (value) => set({ mobileNumberList: value }),

  domainList: [],
  setDomainList: (value) => set({ domainList: value }),

  // filterNameList: [],
  // setFilterNameList: (value) => set({ filterNameList: value }),

  filters: {
    filterNameList: [],
    filterEmailList: [],
    filterMobileNumberList: [],
    filterDomainList: [],
  },
  setFilters: (newFilters) => set((state) => ({ filters: { ...state.filters, ...newFilters } })),
}));