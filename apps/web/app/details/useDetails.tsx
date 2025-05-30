import { create } from "zustand";

type Base = {
  sectionOverview?: React.RefObject<HTMLDivElement | null>;
  sectionDetails?: React.RefObject<HTMLDivElement | null>;
  activeTab?: WEB.DetailsActiveTab;
};

export const useDetails = create<
  Base & {
    set: (partial: Partial<Base>) => void;
  }
>((set) => {
  return {
    set,
  };
});
