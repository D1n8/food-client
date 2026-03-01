import { BASE_URL } from "../../App/consts";
import axios from "axios";
import { action, computed, makeObservable, observable, runInAction } from "mobx";
import qs from "qs";
import { normalizeFullRecipe, normalizeRecipe, type IFullRecipeModel, type IRecipeApi, type IRecipeModel } from "store/models/recipe";

type Meta = 'initial' | 'loading' | 'error' | 'success'

type PrivateFields = '_list' | '_meta' | '_recipe' | '_hasMore' | '_selectedCategories'

export default class RecipeStore {
    private _list: IRecipeModel[] = []
    private _meta: Meta = 'initial'
    private _searchQuery: string = ''
    private _recipe: IFullRecipeModel | null = null
    private _page: number = 1
    private _hasMore: boolean = true
    private _pageSize: number = 6
    private _selectedCategories: string[] = []

    constructor() {
        makeObservable<RecipeStore, PrivateFields>(this, {
            _list: observable,
            _meta: observable,
            _recipe: observable,
            _hasMore: observable,
            _selectedCategories: observable,

            setList: action,
            fetchRecipeList: action,
            getFullRecipe: action,
            clearRecipe: action,
            loadMore: action,

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

    get recipe(): IFullRecipeModel | null {
        return this._recipe
    }

    get hasMore(): boolean {
        return this._hasMore
    }

    setList(list: IRecipeApi[]) {
        this._list = list.map((item) => normalizeRecipe(item))
    }

    loadMore = () => {
        this.fetchRecipeList(this._searchQuery, this._selectedCategories, true)
    }

    async fetchRecipeList(searchQuery: string = '', categories: string[] = [], isLoadMore = false) {
        if (this._meta === 'loading') return

        if (!isLoadMore) {
            this._meta = 'loading'
            this._page = 1
            this._list = []
            this._hasMore = true
            this._searchQuery = searchQuery
            this._selectedCategories = categories
        }

        const queryParams: any = {
            populate: ['images', 'ingradients'],
            pagination: {
                page: this._page,
                pageSize: this._pageSize
            },
            filters: {}
        }

        if (this._searchQuery) {
            queryParams.filters.name = { $containsi: this._searchQuery }
        }

        if (this._selectedCategories.length > 0) {
            queryParams.filters.category = {
                id: {
                    $in: this._selectedCategories
                }
            }
        }

        try {
            console.log(queryParams.filter)
            const response = await axios({
                method: "GET",
                url: `${BASE_URL}/recipes`,
                params: queryParams,
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