import { create } from 'zustand';

// interface de nuestro estado global
interface State{
    isSideMenuOpen: boolean;

    // acciones
    openSideMenu: () => void;
    closeSideMenu: () => void;
}

export const useUIStore = create<State>()((set) => ({
  isSideMenuOpen: false,

  openSideMenu: () => set({ isSideMenuOpen: true }),
  closeSideMenu: () => set({ isSideMenuOpen: false }),
}))


