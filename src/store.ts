import { create } from "zustand";

type StateStore = {
  addEventOpen: boolean;
  setAddEventOpen: () => void;
  longitude: number;
  setLongitude: (longitude: number) => void;
  latitude: number;
  setLatitude: (latitude: number) => void;
};

export const useStateStore = create<StateStore>((set) => {
  return {
    addEventOpen: false,
    setAddEventOpen: () =>
      set((state) => ({ addEventOpen: !state.addEventOpen })),
    longitude: 0,
    setLongitude: (longitude: number) => set({ longitude }),
    latitude: 0,
    setLatitude: (latitude: number) => set({ latitude }),
  };
});
