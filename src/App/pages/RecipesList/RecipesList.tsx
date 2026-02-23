import { useEffect, useState } from 'react';
import type { IRecipe } from 'App/types/types';
import styles from './RecipesList.module.scss';
import axios from 'axios';
import qs from 'qs';
import RecipeCard from './components/RecipeCard';
import Button from 'components/Button';
import Text from 'components/Text';
import { useNavigate } from 'react-router';
import MultiDropdown from 'components/MultiDropdown';
import Input from 'components/Input';
import SearchIcon from 'components/Icons/SearchIcon';
import { BASE_URL } from '../../consts';
import Clock from 'components/Icons/Clock';
import { formatIngredients, formatKcal } from 'utils/utils';
import { useFetching } from '../../hooks/hooks';
import Loader from 'components/Loader';

function RecipesList() {
    const [recipes, setRecipes] = useState<IRecipe[]>([])
    const [inputDish, setInputDish] = useState('')
    const navigate = useNavigate()

    const [fetch, isLoading, isError] = useFetching(
        async () => {
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
            if (response.data && response.data.data) {
                setRecipes(response.data.data)
            } else {
                setRecipes([])
            }
        }
    )

    useEffect(() => {
        fetch()
    }, [])

    return (
        <div className={styles.listPage}>
            <div className={styles.hero}></div>

            <section className={styles.listPageContainer}>
                <Text className={styles.subtitle} view='p-20' tag='h2'>Find the perfect food and <u>drink ideas</u> for every occasion, from <u>weeknight dinners</u> to <u>holiday feasts</u>.</Text>

                <div className={styles.inputContainer}>
                    <Input style={{ width: '100%' }} className={styles.input} value={inputDish} onChange={(value) => setInputDish(value)} placeholder='Enter dishes' />
                    <Button>
                        <SearchIcon />
                    </Button>
                </div>

                <MultiDropdown
                    className={styles.multiDropdown}
                    options={[]}
                    value={[]}
                    onChange={() => { }}
                    getTitle={() => 'Categories'} />

                {
                    isLoading && 
                    <div className={styles.loaderContainer}>
                        <Loader size='l'/>
                    </div>
                }

                <div className={styles.list}>
                    {
                        (!isLoading && !isError && recipes.length > 0) &&
                        recipes.map(recipe =>
                            <RecipeCard
                                key={recipe.id}
                                image={recipe.images[0].url}
                                title={recipe.name}
                                subtitle={formatIngredients(recipe.ingradients)}
                                captionSlot={
                                    <><Clock />{recipe.totalTime} minutes</>
                                }
                                contentSlot={<Text color='accent' view='p-18'>{formatKcal(recipe.calories)} kcal</Text>}
                                actionSlot={<Button children={'Save'} />}
                                onClick={() => navigate(`/recipes/${recipe.documentId}`)}
                            />
                        )
                    }

                    {
                        (!isLoading && isError && recipes.length === 0) && (
                            <Text view="p-18">No recipes found</Text>
                        )
                    }
                </div>
            </section>
        </div>

    );
}

export default RecipesList;