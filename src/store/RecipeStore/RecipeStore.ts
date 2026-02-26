import { BASE_URL } from "../../App/consts";
import axios from "axios";
import { action, computed, makeObservable, observable, runInAction } from "mobx";
import qs from "qs";
import { normalizeFullRecipe, normalizeRecipe, type IFullRecipeModel, type IRecipeApi, type IRecipeModel } from "store/models/recipe";

type Meta = 'initial' | 'loading' | 'error' | 'success'

type PrivateFields = '_list' | '_meta' | '_input' | '_recipe'

export default class RecipeStore {
    private _list: IRecipeModel[] = []
    private _meta: Meta = 'initial'
    private _input: string = ''
    private _recipe: IFullRecipeModel | null = null

    constructor() {
        makeObservable<RecipeStore, PrivateFields>(this, {
            _list: observable,
            _meta: observable,
            _input: observable,
            _recipe: observable,

            setList: action,
            setInput: action,
            getRecipeList: action,
            searchRecipeList: action,
            getFullRecipe: action,
            clearRecipe: action,

            input: computed,
            list: computed,
            meta: computed,
            recipe: computed
        })
    }

    get list(): IRecipeModel[] {
        return this._list
    }

    get meta(): Meta {
        return this._meta
    }

    get input(): string {
        return this._input
    }

    get recipe(): IFullRecipeModel | null {
        return this._recipe
    }

    setList(list: IRecipeApi[]) {
        this._list = list.map((item) => normalizeRecipe(item))
    }

    setInput(value: string) {
        this._input = value
    }

    async getRecipeList() {
        this._meta = 'loading'
        this._list = []

        try {
            const response = await axios(
                {
                    method: "GET",
                    url: `${BASE_URL}/recipes`,
                    params: {
                        populate: ['images', 'ingradients']
                    },
                    paramsSerializer: params => qs.stringify(params, { arrayFormat: 'indices' })
                }
            )

            runInAction(() => {
                if (!response.data || !response.data.data) {
                    this._meta = 'error'
                    return
                }
                this._meta = 'success'
                this.setList(response.data.data)
            })
        } catch {
            runInAction(() => {
                this._meta = 'error'
                this._list = []
            })
        }
    }

    async searchRecipeList() {
        this._meta = 'loading'
        this._list = []

        try {
            const response = await axios(
                {
                    method: "GET",
                    url: `${BASE_URL}/recipes`,
                    params: {
                        populate: ['images', 'ingradients'],
                        filters: {
                            name: {
                                $containsi: this._input,
                            },
                        }
                    },
                    paramsSerializer: params => qs.stringify(params, { arrayFormat: 'indices' })
                }
            )

            runInAction(() => {
                if (!response.data || !response.data.data) {
                    this._meta = 'error'
                    return
                }

                this._meta = 'success'
                this.setList(response.data.data)
            })
        } catch {
            this._meta = 'error'
            this._list = []
        }
    }

    async getFullRecipe(id: string) {
        this._meta = 'loading'
        this._recipe = null

        try {
            const response = await axios({
                method: "GET",
                url: `${BASE_URL}/recipes/${id}`,
                params: {
                    populate: ['ingradients', 'equipments', 'directions.image', 'images', 'category']
                },
                paramsSerializer: params => qs.stringify(params, { arrayFormat: 'indices' })
            })

            runInAction(() => {
                if (!response.data || !response.data.data) {
                    this._meta = 'error'
                    return
                }

                this._recipe = normalizeFullRecipe(response.data.data)
                this._meta = 'success'
            })
        } catch {
            runInAction(() => {
                this._meta = 'error'
                this._recipe = null
            })
        }
    }

    clearRecipe() {
        this._recipe = null
        this._meta = 'initial'
    }
}