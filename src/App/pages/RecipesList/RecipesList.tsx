import { useCallback, useEffect, useState } from 'react';
import styles from './RecipesList.module.scss';
import RecipeCard from '../../../components/RecipeCard';
import Button from 'components/Button';
import Text from 'components/Text';
import { useNavigate, useSearchParams } from 'react-router';
import Clock from 'components/Icons/Clock';
import { formatIngredients, formatKcal } from 'utils/utils';
import Loader from 'components/Loader';
import { observer } from 'mobx-react-lite';
import RecipeListStore from 'store/RecipeListStore';
import Search from './components/Search';
import { toJS } from 'mobx';
import InfiniteScroll from 'react-infinite-scroll-component';
import CategoryDropdown from './components/CategoryDropdown';
import { userStore } from 'store/UserStore';
import FavoritesStore from 'store/FavoritesStore';
import { routes } from 'config/routes';

const RecipesList = observer(() => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const [recipeListStore] = useState(() => new RecipeListStore())
    const [favoritesStore] = useState(() => new FavoritesStore())
    const { isAuth } = userStore

    useEffect(() => {
        const query = searchParams.get('name') || ''
        const categoriesParam = searchParams.get('categories')
        const urlCategories = categoriesParam ? categoriesParam.split(',') : []

        recipeListStore.fetchRecipeList(query, urlCategories)

        if (isAuth) {
            favoritesStore.fetchFavorites()
        }
    }, [recipeListStore, searchParams, isAuth, favoritesStore])

    const favoritesRecipesDocIds = new Set(favoritesStore.favorites.map(item => item.recipe.documentId))

    const handleClick = useCallback((id: string) => {
        navigate(routes.recipe.create(id))
    }, [navigate])

    const handleFavoriteClick = (e: React.MouseEvent, docId: string, actionId: number) => {
        e.stopPropagation()

        if (!isAuth) {
            navigate(routes.login.mask)
            return
        }

        if (favoritesRecipesDocIds.has(docId)) {
            favoritesStore.removeFromFavorites(actionId)
        } else{ 
            favoritesStore.addToFavorites(actionId)
        }
    }

    const isLoading = recipeListStore.meta === 'loading'
    const isError = recipeListStore.meta === 'error'
    const recipes = toJS(recipeListStore.list)

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
                    next={recipeListStore.loadMore}
                    hasMore={recipeListStore.hasMore}
                    loader={
                        <div className={styles.loaderContainer}>
                            <Loader size='l' />
                        </div>}
                >
                    {
                        <div className={styles.list}>{
                            (!isError && recipes.length > 0) &&
                            recipes.map(recipe => {
                                const isFavorite = favoritesRecipesDocIds.has(recipe.documentId)

                                return (<RecipeCard
                                    key={recipe.documentId}
                                    image={recipe.images[0].url}
                                    title={recipe.name}
                                    subtitle={formatIngredients(recipe.ingredients)}
                                    captionSlot={
                                        <><Clock />{recipe.totalTime} minutes</>
                                    }
                                    contentSlot={<Text color='accent' view='p-18'>{formatKcal(recipe.calories)} kcal</Text>}
                                    actionSlot={<Button children={isFavorite ? 'Unsave' : 'Save'} onClick={(e) => handleFavoriteClick(e, recipe.documentId, recipe.id)} />}
                                    onClick={() => handleClick(recipe.documentId)}
                                />
                                )
                            })
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