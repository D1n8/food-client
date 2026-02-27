import { BASE_URL } from "../../App/consts";
import axios from "axios";
import { action, computed, makeObservable, observable, runInAction } from "mobx";
import qs from "qs";
import { normalizeFullRecipe, normalizeRecipe, type IFullRecipeModel, type IRecipeApi, type IRecipeModel } from "store/models/recipe";

type Meta = 'initial' | 'loading' | 'error' | 'success'

type PrivateFields = '_list' | '_meta' | '_input' | '_recipe' | '_hasMore'

export default class RecipeStore {
    private _list: IRecipeModel[] = []
    private _meta: Meta = 'initial'
    private _input: string = ''
    private _recipe: IFullRecipeModel | null = null
    private _page: number = 1
    private _hasMore: boolean = true
    private readonly _pageSize: number = 6

    constructor() {
        makeObservable<RecipeStore, PrivateFields>(this, {
            _list: observable,
            _meta: observable,
            _input: observable,
            _recipe: observable,
            _hasMore: observable,

            setList: action,
            setInput: action,
            getRecipeList: action,
            searchRecipeList: action,
            getFullRecipe: action,
            clearRecipe: action,
            loadMore: action,

            input: computed,
            list: computed,
            meta: computed,
            recipe: computed,
            hasMore: computed
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

    get hasMore(): boolean {
        return this._hasMore
    }

    setList(list: IRecipeApi[]) {
        this._list = list.map((item) => normalizeRecipe(item))
    }

    setInput(value: string) {
        this._input = value
    }

    loadMore = () => {
        if (this._input) {
            this.searchRecipeList(true)
        } else {
            this.getRecipeList(true)
        }
    }

    private resetPagination() {
        this._page = 1
        this._list = []
        this._hasMore = true
    }

    async getRecipeList(isLoadMore = false) {
        if (this._meta === 'loading') return

        if (!isLoadMore) {
            this._meta = 'loading'
            this.resetPagination()
        }

        try {
            const response = await axios({
                method: "GET",
                url: `${BASE_URL}/recipes`,
                params: {
                    populate: ['images', 'ingradients'],
                    pagination: {
                        page: this._page,
                        pageSize: this._pageSize
                    }
                },
                paramsSerializer: params => qs.stringify(params, { arrayFormat: 'indices' })
            })

            runInAction(() => {
                if (!response.data || !response.data.data) {
                    this._meta = 'error'
                    return
                }

                const newRecipes = response.data.data.map((item: IRecipeApi) => normalizeRecipe(item))
                
                if (newRecipes.length < this._pageSize) {
                    this._hasMore = false
                }

                this._meta = 'success'
                
                if (isLoadMore) {
                    this._list = [...this._list, ...newRecipes]
                } else {
                    this._list = newRecipes
                }
                
                this._page += 1
            })
        } catch {
            runInAction(() => {
                this._meta = 'error'
                if (!isLoadMore) this._list = []
            })
        }
    }

    async searchRecipeList(isLoadMore = false) {
        if (this._meta === 'loading') return

        if (!isLoadMore) {
            this._meta = 'loading'
            this.resetPagination()
        }

        try {
            const response = await axios({
                method: "GET",
                url: `${BASE_URL}/recipes`,
                params: {
                    populate: ['images', 'ingradients'],
                    filters: {
                        name: {
                            $containsi: this._input,
                        },
                    },
                    pagination: {
                        page: this._page,
                        pageSize: this._pageSize
                    }
                },
                paramsSerializer: params => qs.stringify(params, { arrayFormat: 'indices' })
            })

            runInAction(() => {
                if (!response.data || !response.data.data) {
                    this._meta = 'error'
                    return
                }

                const newRecipes = response.data.data.map((item: IRecipeApi) => normalizeRecipe(item))

                if (newRecipes.length < this._pageSize) {
                    this._hasMore = false
                }

                this._meta = 'success'

                if (isLoadMore) {
                    this._list = [...this._list, ...newRecipes]
                } else {
                    this._list = newRecipes
                }
                
                this._page += 1
            })
        } catch {
            runInAction(() => {
                this._meta = 'error'
                if (!isLoadMore) this._list = []
            })
        }
    }

    async getFullRecipe(id: string) {
        this._meta = 'loading'
        this._recipe = null
        try {
            const response = await axios({
                 method: "GET",
                 url: `${BASE_URL}/recipes/${id}`,
                 params: { populate: ['ingradients', 'equipments', 'directions.image', 'images', 'category'] },
                 paramsSerializer: params => qs.stringify(params, { arrayFormat: 'indices' })
            })
            runInAction(() => {
                this._recipe = normalizeFullRecipe(response.data.data)
                this._meta = 'success'
            })
        } catch {
            this._meta = 'error'
        }
    }

    clearRecipe() {
        this._recipe = null
        this._meta = 'initial'
    }
}