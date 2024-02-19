import { create } from "zustand";

type MemberStore = {
  addEventOpen: boolean;
  setAddEventOpen: () => void;
};

export const useMemberStore = create<MemberStore>((set) => {
  return {
    addEventOpen: false,
    setAddEventOpen: () =>
      set((state) => ({ addEventOpen: !state.addEventOpen })),
  };
});
