import { makeAutoObservable, reaction } from "mobx";

export default class UIStore {
    theme = localStorage.getItem('app-theme') || 'light'

    constructor() {
        makeAutoObservable(this);

        document.body.setAttribute('data-theme', this.theme)

        reaction(
            () => this.theme,
            (theme) => {
                localStorage.setItem('app-theme', theme)
                document.body.setAttribute('data-theme', theme)
            }
        )
    }

    toggleTheme = () => {
        this.theme = this.theme === 'light' ? 'dark' : 'light'
    }
    
    get isDark() {
        return this.theme === 'dark'
    }
}