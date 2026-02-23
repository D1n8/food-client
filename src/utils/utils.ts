import type { Ingredient } from '../App/types/types'

export function formatKcal(value: number) {
    return Math.floor(value)
}

export function formatIngredients(ingredients: Ingredient[]) {
    return ingredients.reduce((acc, curr, index) => {
        if (index === 0) {
            return acc + curr.name
        }
        return acc + ' + ' + curr.name
    }, '')
}