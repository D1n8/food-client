import { BASE_URL } from "../../App/consts"
import axios from "axios"
import { action, computed, makeObservable, observable, runInAction } from "mobx"

type PrivateFields = '_isAuth' | '_error' | '_isLoading'

export default class UserStore {
    private _isAuth: boolean = Boolean(localStorage.getItem('jwt'))
    private _error: string = ''
    private _isLoading: boolean = false

    constructor() {
        makeObservable<UserStore, PrivateFields>(this, {
            _isAuth: observable,
            _error: observable,
            _isLoading: observable,

            loginUser: action,
            registerUser: action,
            logoutUser: action,

            isAuth: computed,
            error: computed,
            isLoading: computed
        })
    }

    get isAuth(): boolean {
        return this._isAuth
    }

    get error(): string {
        return this._error
    }

    get isLoading(): boolean {
        return this._isLoading
    }

    

    async loginUser(identifier: string, password: string) {
        this._error = ''
        this._isLoading = true

        try {
            const response = await axios.post(`${BASE_URL}/auth/local`, {
                identifier: identifier,
                password: password
            })

            runInAction(() => {
                this._isAuth = true
                this._isLoading = false
                localStorage.setItem('jwt', response.data.jwt)
            })
        } catch (error) {
            runInAction(() => {
                if (axios.isAxiosError(error)) {
                    if (error.response) {
                        this._error = error.response.data?.error?.message || 'Login failed'
                    } else {
                        this._error = 'Network error. Please try again later'
                    }
                } else {
                    this._error = 'An unexpected error occurred'
                }
                this._isLoading = false
                this.logoutUser()
            })
        }
    }

    async registerUser(username: string, email: string, password: string) {
        this._error = ''
        this._isLoading = true

        try {
            const response = await axios.post(`${BASE_URL}/auth/local/register`, {
                username: username,
                email: email,
                password: password
            })

            runInAction(() => {
                this._isAuth = true
                this._isLoading = false
                localStorage.setItem('jwt', response.data.jwt)
            })
        } catch (error) {
            runInAction(() => {
                if (axios.isAxiosError(error)) {
                    if (error.response) {
                        this._error = error.response.data?.error?.message || 'Registration failed';
                    } else {
                        this._error = 'Network error';
                    }
                }
                this._isLoading = false
                this.logoutUser()
            })
        }
    }

    logoutUser() {
        localStorage.removeItem('jwt')
        this._isAuth = false
    }
}

export const userStore = new UserStore();