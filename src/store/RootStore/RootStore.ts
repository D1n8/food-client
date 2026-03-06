import { createContext, useContext } from "react";
import UIStore from "../UIStore";
import UserStore from "../UserStore";

 class RootStore {
    uiStore: UIStore
    userStore: UserStore

    constructor() {
        this.uiStore = new UIStore()
        this.userStore = new UserStore()
    }
}

const rootStore = new RootStore()
const RootStoreContext = createContext(rootStore)

export const useRootStore = () => useContext(RootStoreContext)