import axios from "axios";
import styles from './Recipe.module.scss'
import { useEffect, useState } from "react";
import type { IFullRecipe } from "App/types/types";
import { useParams } from "react-router";
import qs from "qs";
import Text from "components/Text";
import parse from 'html-react-parser';

function Recipe() {
    const { id } = useParams()
    const [recipe, setRecipe] = useState<IFullRecipe | null>(null)

    useEffect(() => {
        const fetch = async (id: string | undefined) => {
            const data = await axios({
                method: "GET",
                url: `https://front-school-strapi.ktsdev.ru/api/recipes/${id}`,
                params: {
                    populate: ['ingradients', 'equipments', 'directions.image', 'images', 'category']
                },
                paramsSerializer: params => qs.stringify(params, { arrayFormat: 'indices' })
            })
                .then(response => response.data.data)
            setRecipe(data)
        }

        fetch(id)
    }, [])

    if (!recipe) {
        return
    }

    return (
        <div className={styles.recipePage}>
            <Text className={styles.title} tag='h2' view='title'>{recipe.name}</Text>

            <Text className={styles.descr} tag="p" view="p-16">{parse(recipe.summary)}</Text>
        </div>
    );
}

export default Recipe;