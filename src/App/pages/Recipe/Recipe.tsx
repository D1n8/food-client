import styles from './Recipe.module.scss'
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Text from "components/Text";
import parse from 'html-react-parser';
import Ingredient from "./components/Ingredient";
import Equipment from "./components/Equipment";
import Direction from "./components/Direction";
import ArrowBack from "components/Icons/ArrowBack";
import AboutItem from "./components/AboutItem";
import Loader from "components/Loader";
import RecipeStore from "store/RecipeStore";
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';

const Recipe = observer(() => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [store] = useState(() => new RecipeStore())

    useEffect(() => {
        if (id) {
            store.getRecipe(id)
        }

        return () => store.clearRecipe()
    }, [id, store])

    const handleBack = useCallback(() => {
        navigate(-1)
    }, [navigate])

    const isLoading = store.meta === 'loading'
    const isError = store.meta === 'error'
    const recipe = store.recipe ? toJS(store.recipe) : null

    if (isLoading) {
        return (
            <div className={styles.loaderContainer}>
                <Loader size='l' />
            </div>)
    }

    if (isError) {
        return (
            <div className={styles.recipePage}>
                <Text view="p-18" color="accent">Error loading recipe</Text>
            </div>
        )
    }

    if (!recipe) {
        return null
    }

    return (
        <div className={styles.recipePage}>
            <div className={styles.topContainer}>
                <button className={styles.btn} type="button" onClick={handleBack} >
                    <ArrowBack />
                </button>

                <Text className={styles.title} tag='h2' view='title'>{recipe.name}</Text>
            </div>

            <div className={styles.about}>
                <img
                    className={styles.aboutImg}
                    src={recipe.images[0].url}
                    alt={recipe.name} />

                <div className={styles.aboutContent}>
                    <AboutItem name='Perparation' value={`${recipe.preparationTime} minutes`} />
                    <AboutItem name='Cooking' value={`${recipe.preparationTime} minutes`} />
                    <AboutItem name='Total' value={`${recipe.preparationTime} minutes`} />
                    <AboutItem name='Likes' value={`${recipe.likes}`} />
                    <AboutItem name='Servings' value={`${recipe.servings} servings`} />
                    <AboutItem name='Ratings' value={`${recipe.rating} / 5`} />
                </div>
            </div>


            <Text className={styles.descr} tag="p" view="p-16">{parse(recipe.summary)}</Text>

            <div className={styles.thingsContainer}>
                <div className={styles.ingredients}>
                    <Text tag="h3" view='p-20' className={styles.subtitle}>Ingredients</Text>
                    <ul className={styles.ingredientsList}>
                        {
                            recipe.ingredients.map(ingredient =>
                                <Ingredient key={ingredient.id} {...ingredient} />
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
})

export default Recipe;