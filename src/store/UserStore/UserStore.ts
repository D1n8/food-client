import { BASE_URL } from "../../App/consts"
import axios from "axios"
import { action, computed, makeObservable, observable, runInAction } from "mobx"
import qs from "qs"
import { normalizeRecipe, type IFavoriteApi, type IFavoriteModel } from "store/models/recipe"

type PrivateFields = '_favorites' | '_isAuth' | '_error' | '_isLoading'

export default class UserStore {
    private _favorites: IFavoriteModel[] = []
    private _isAuth: boolean = Boolean(localStorage.getItem('jwt'))
    private _error: string = ''
    private _isLoading: boolean = false

    constructor() {
        makeObservable<UserStore, PrivateFields>(this, {
            _favorites: observable,
            _isAuth: observable,
            _error: observable,
            _isLoading: observable,

            addToFavorites: action,
            fetchFavorites: action,
            removeFromFavorites: action,
            loginUser: action,
            registerUser: action,
            logoutUser: action,

            favorites: computed,
            isAuth: computed,
            error: computed,
            isLoading: computed
        })
    }

    get favorites(): IFavoriteModel[] {
        return this._favorites
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

    async fetchFavorites() {
        try {
            if (this._isAuth) {
                const response = await axios.get<IFavoriteApi[]>(`${BASE_URL}/favorites`,
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                        },
                        params: {
                            populate: ['images', 'ingradients'],
                        },
                        paramsSerializer: params => qs.stringify(params, { arrayFormat: 'indices' })
                    })
                runInAction(() => {
                    this._isAuth = true
                    this._favorites = response.data.map(
                        item => {
                            return {
                                id: item.id,
                                documentId: item.documentId,
                                originalRecipeId: item.originalRecipeId,
                                recipe: normalizeRecipe(item.recipe)
                            }
                        }
                    )
                })
            }
        } catch (error) {
            console.error(error)
        }
    }

    async addToFavorites(id: number) {
        try {
            if (this._isAuth) {
                await axios.post(`${BASE_URL}/favorites/add`,
                    { recipe: id },
                    { headers: { 'Authorization': `Bearer ${localStorage.getItem('jwt')}` } }
                )

                await this.fetchFavorites()
            }
        } catch {
            console.error('Adding error')
        }
    }

    async removeFromFavorites(id: number) {
        try {
            if (this._isAuth) {
                await axios.post(`${BASE_URL}/favorites/remove`,
                    { recipe: id },
                    { headers: { 'Authorization': `Bearer ${localStorage.getItem('jwt')}` } }
                )

                await this.fetchFavorites()
            }
        } catch {
            console.error('Removing error')
        }
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
        this._favorites = []
    }
}

export const userStore = new UserStore();