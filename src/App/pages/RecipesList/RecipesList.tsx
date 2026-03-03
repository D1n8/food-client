import { useEffect, useState } from 'react';
import styles from './RecipesList.module.scss';
import RecipeCard from '../../../components/RecipeCard';
import Button from 'components/Button';
import Text from 'components/Text';
import { useNavigate, useSearchParams } from 'react-router';
import Clock from 'components/Icons/Clock';
import { formatIngredients, formatKcal } from 'utils/utils';
import Loader from 'components/Loader';
import { observer } from 'mobx-react-lite';
import RecipeStore from 'store/RecipeStore';
import Search from './components/Search';
import { toJS } from 'mobx';
import InfiniteScroll from 'react-infinite-scroll-component';
import CategoryDropdown from './components/CategoryDropdown';
import { userStore } from 'store/UserStore';

const RecipesList = observer(() => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const [store] = useState(() => new RecipeStore())
    const isAuth = userStore.isAuth

    useEffect(() => {
        const query = searchParams.get('name') || ''
        const categoriesParam = searchParams.get('categories')
        const urlCategories = categoriesParam ? categoriesParam.split(',') : []

        store.fetchRecipeList(query, urlCategories)
    }, [store, searchParams])


    const addToFavorites = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
        e.stopPropagation()
        if (!isAuth) {
            alert('You need to login')
            return
        }
        userStore.addToFavorites(id)
    }

    const isLoading = store.meta === 'loading'
    const isError = store.meta === 'error'
    const recipes = toJS(store.list)

    return (
        <div className={styles.listPage}>
            <div className={styles.hero}></div>

            <section className={styles.listPageContainer}>
                <Text
                    className={styles.subtitle}
                    view='p-20'
                    tag='h2'>Find the perfect food and <u>drink ideas</u> for every occasion, from <u>weeknight dinners</u> to <u>holiday feasts</u>.</Text>

                <Search />

                <CategoryDropdown />

                <InfiniteScroll
                    style={{ overflow: 'visible' }}
                    dataLength={recipes.length}
                    next={store.loadMore}
                    hasMore={store.hasMore}
                    loader={
                        <div className={styles.loaderContainer}>
                            <Loader size='l' />
                        </div>}
                >
                    {
                        <div className={styles.list}>{
                            (!isError && recipes.length > 0) &&
                            recipes.map(recipe =>
                                <RecipeCard
                                    key={recipe.documentId}
                                    image={recipe.images[0].url}
                                    title={recipe.name}
                                    subtitle={formatIngredients(recipe.ingredients)}
                                    captionSlot={
                                        <><Clock />{recipe.totalTime} minutes</>
                                    }
                                    contentSlot={<Text color='accent' view='p-18'>{formatKcal(recipe.calories)} kcal</Text>}
                                    actionSlot={<Button children={'Save'} onClick={(e) => addToFavorites(e, recipe.id)} />}
                                    onClick={() => navigate(`/recipes/${recipe.documentId}`)}
                                />
                            )
                        }
                        </div>
                    }

                    {
                        (!isLoading && recipes.length === 0) && (
                            <Text view="p-18">No recipes found</Text>
                        )
                    }
                </InfiniteScroll>
            </section>
        </div>

    );
})

export default RecipesList;