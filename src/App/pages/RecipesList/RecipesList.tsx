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
import SearchIcon from './components/SearchIcon';

function RecipesList() {
    const [recipes, setRecipes] = useState<IRecipe[]>([])
    const [inputDish, setInputDish] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const fetch = async () => {
            const data = await axios(
                {
                    method: "GET",
                    url: "https://front-school-strapi.ktsdev.ru/api/recipes",
                    params: {
                        populate: ['images', 'ingradients']
                    },
                    paramsSerializer: params => qs.stringify(params, { arrayFormat: 'indices' })
                }
            )
                .then(response => response.data.data)
            setRecipes(data)
        }
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

                <div className={styles.list}>
                    {
                        recipes.map(recipe =>
                            <RecipeCard
                                key={recipe.id}
                                image={recipe.images[0].url}
                                title={recipe.name}
                                subtitle={recipe.ingradients.reduce((acc, curr, index) => {
                                    if (index === 0) {
                                        return acc + curr.name
                                    }
                                    return acc + ' + ' + curr.name
                                }, '')}
                                captionSlot={
                                    <>
                                        <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.9318 0.75L12.75 2.56818M10.5682 10.5682L12.0227 12.75M2.56818 0.75L0.75 2.56818M2.93182 10.5682L1.47727 12.75M6.56818 3.65909V6.93182H8.38636M12.0227 6.75C12.0227 9.66207 9.66207 12.0227 6.75 12.0227C3.83795 12.0227 1.47727 9.66207 1.47727 6.75C1.47727 3.83796 3.83795 1.47727 6.75 1.47727C9.66207 1.47727 12.0227 3.83796 12.0227 6.75Z" stroke="#B5460F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        {recipe.totalTime} minutes
                                    </>
                                }
                                contentSlot={<Text color='accent' view='p-18'>{Math.floor(recipe.calories)} kcal</Text>}
                                actionSlot={<Button children={'Save'} />}
                                onClick={() => navigate(`/recipes/${recipe.documentId}`)}
                            />
                        )
                    }
                </div>
            </section>
        </div>

    );
}

export default RecipesList;