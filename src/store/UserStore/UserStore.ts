import { BASE_URL } from "../../App/consts"
import axios from "axios"
import { action, computed, makeObservable, observable, runInAction } from "mobx"
import qs from "qs"
import { normalizeRecipe, type IFavoriteApi, type IFavoriteModel } from "store/models/recipe"

type PrivateFields = '_favorites'

export default class UserStore {
    private _favorites: IFavoriteModel[] = []

    constructor() {
        makeObservable<UserStore, PrivateFields>(this, {
            _favorites: observable,
            addToFavorites: action,
            loginUser: action,
            fetchFavorites: action,
            removeFromFavorites: action,
            favorites: computed
        })
    }

    get favorites(): IFavoriteModel[] {
        return this._favorites
    }

    async fetchFavorites() {
        try {
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
        } catch (error) {
            console.error(error)
        }
    }

    async addToFavorites(id: number) {
        try {
            await axios.post(`${BASE_URL}/favorites/add`,
                { recipe: id },
                { headers: { 'Authorization': `Bearer ${localStorage.getItem('jwt')}` } }
            )

            await this.fetchFavorites()
        } catch {
            console.error('Adding error')
        }
    }

    async removeFromFavorites(id: number) {
        try {
            await axios.post(`${BASE_URL}/favorites/remove`,
                { recipe: id },
                { headers: { 'Authorization': `Bearer ${localStorage.getItem('jwt')}` } }
            )
            
            await this.fetchFavorites()
        } catch {
            console.error('Removing error')
        }
    }

    async loginUser(identifier: string, password: string) {
        const response = await axios.post(`${BASE_URL}/auth/local`, {
            identifier: identifier,
            password: password
        })

        runInAction(() => {
            localStorage.setItem('jwt', response.data.jwt)
        })
    }

    async registerUser(username: string, email: string, password: string) {
        try {
            const response = await axios.post(`${BASE_URL}/auth/local/register`, {
                username: username,
                email: email,
                password: password
            })

            runInAction(() => {
                localStorage.setItem('jwt', response.data.jwt)
            })
        } catch (error) {
            console.error(error)
        }
    }
}

export const userStore = new UserStore();