import axios from "axios";
import styles from './Recipe.module.scss'
import { useEffect, useState } from "react";
import type { IFullRecipe } from "App/types/types";

function Recipe(id: string) {
    const [recipe, setRecipe] = useState<IFullRecipe | null>(null)

useEffect(() => {
    const fetch = async (id: string) => {
        const data = await axios.get(`https://front-school-strapi.ktsdev.ru/api/recipes/${id}?populate[0]=ingradients&populate[1]=equipments&populate[2]=directions.image&populate[3]=images&populate[4]=category`)
            .then(response => response.data.data)

        setRecipe(data)
    }

    fetch(id)
}, [])

    if (!recipe) {
        return
    }

    return ( 
        <section className={styles.recipePage}>
            {recipe.name}
        </section>
     );
}

export default Recipe;