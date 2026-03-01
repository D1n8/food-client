import { BASE_URL } from "../../App/consts";
import axios from "axios";
import { computed, makeObservable, observable, runInAction } from "mobx";
import type { Category } from "store/models/recipe";

type Meta = 'initial' | 'loading' | 'error' | 'success'
type PrivateFields = '_list' | '_meta'

export default class CategoryStore {
    private _list: Category[] = []
    private _meta: Meta = 'initial'

    constructor() {
        makeObservable<CategoryStore, PrivateFields>(this, {
            _list: observable,
            _meta: observable,
            list: computed,
            meta: computed
        })
    }

    get list() {
        return this._list
    }

    get meta() {
        return this._meta
    }

    async fetchCategoryList() {
        this._meta = 'loading'
        try {
            const response = await axios({
                method: "GET",
                url: `${BASE_URL}/meal-categories`
            })

            runInAction(() => {
                if (!response.data || !response.data.data) {
                    this._meta = 'error'
                    return
                }

                this._list = [...response.data.data]
                this._meta = 'success'
            })
        } catch {
            this._meta = 'error'
        }
    }
}