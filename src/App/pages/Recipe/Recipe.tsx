import axios from "axios";
import styles from './Recipe.module.scss'
import { useEffect, useState } from "react";
import type { IFullRecipe } from "App/types/types";
import { useNavigate, useParams } from "react-router";
import qs from "qs";
import Text from "components/Text";
import parse from 'html-react-parser';
import Ingradient from "./components/Ingradient";
import Equipment from "./components/Equipment";
import Direction from "./components/Direction";
import ArrowBack from "components/Icons/ArrowBack";
import AboutItem from "./components/AboutItem";

function Recipe() {
    const { id } = useParams()
    const navigate = useNavigate()
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
            <div className={styles.topContainer}>
                <button className={styles.btn} type="button" onClick={() => navigate(-1)} >
                    <ArrowBack />
                </button>

                <Text className={styles.title} tag='h2' view='title'>{recipe.name}</Text>
            </div>

            <div className={styles.about}>
                <img className={styles.aboutImg} src={recipe.images[0].formats.medium.url} alt={recipe.name} />

                <div className={styles.aboutContent}>
                    <AboutItem name='Perparation' value={`${recipe.preparationTime} minutes`}/>
                    <AboutItem name='Cooking' value={`${recipe.preparationTime} minutes`}/>
                    <AboutItem name='Total' value={`${recipe.preparationTime} minutes`}/>
                    <AboutItem name='Likes' value={`${recipe.likes}`}/>
                    <AboutItem name='Servings' value={`${recipe.servings} servings`}/>
                    <AboutItem name='Ratings' value={`${recipe.rating} / 5`}/>
                </div>
            </div>


            <Text className={styles.descr} tag="p" view="p-16">{parse(recipe.summary)}</Text>

            <div className={styles.thingsContainer}>
                <div className={styles.ingradients}>
                    <Text tag="h3" view='p-20' className={styles.subtitle}>Ingradients</Text>
                    <ul className={styles.ingradientsList}>
                        {
                            recipe.ingradients.map(ingradient =>
                                <Ingradient key={ingradient.id} {...ingradient} />
                            )
                        }
                    </ul>
                </div>

                <div className={styles.equipments}>
                    <Text tag="h3" view='p-20' className={styles.subtitle}>Equipment</Text>
                    <ul className={styles.equipmentsList}>
                        {
                            recipe.equipments.map(equipment =>
                                <Equipment key={equipment.id} {...equipment} />
                            )
                        }
                    </ul>
                </div>
            </div>

            <div className={styles.directions}>
                <Text tag="h3" view='p-20' className={styles.subtitle}>Directions</Text>
                <ul className={styles.directionsList}>
                    {
                        recipe.directions.map((direction, index) =>
                            <Direction key={direction.id} step={index + 1} text={direction.description} />
                        )
                    }
                </ul>
            </div>
        </div>
    );
}

export default Recipe;