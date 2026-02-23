type Image = {
    id: number,
    url: string,
    formats: {
        medium: {
            url: string
        }
    }
}

export type Ingredient = {
    id: number,
    name: string,
    amount: number,
    unit: string
}

type Equipment = {
    id: number,
    name: string
}

type Direction = {
    id: number,
    description: string,
    image?: string
}

type Category = {
    id: number,
    documentId: string,
    title: string,
    createdAt: string,
    updatedAt: string,
    publishedAt: string
}

export interface IRecipe {
    id: number,
    documentId: string,
    calories: number,
    totalTime: number,
    rating: number,
    name: string,
    summary: string,
    images: Image[],
    ingradients: Ingredient[]
}

export interface IFullRecipe extends IRecipe{
    likes: number,
    servings: number,
    rating: number,
    preparationTime: number,
    cookingTime: number,
    ingradients: Ingredient[],
    equipments: Equipment[],
    directions: Direction[],
    category: Category
}