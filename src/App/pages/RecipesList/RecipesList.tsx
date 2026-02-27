import { useEffect, useState } from 'react';
import styles from './RecipesList.module.scss';
import RecipeCard from './components/RecipeCard';
import Button from 'components/Button';
import Text from 'components/Text';
import { useNavigate } from 'react-router';
import MultiDropdown from 'components/MultiDropdown';
import Clock from 'components/Icons/Clock';
import { formatIngredients, formatKcal } from 'utils/utils';
import Loader from 'components/Loader';
import { observer } from 'mobx-react-lite';
import RecipeStore from 'store/RecipeStore';
import Search from './components/Search';
import { toJS } from 'mobx';
import InfiniteScroll from 'react-infinite-scroll-component';

const RecipesList = observer(() => {
    const navigate = useNavigate()

    const [store] = useState(() => new RecipeStore());

    useEffect(() => {
        store.getRecipeList()
    }, [store])


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

                <Search store={store} />

                <MultiDropdown
                    className={styles.multiDropdown}
                    options={[]}
                    value={[]}
                    onChange={() => { }}
                    getTitle={() => 'Categories'} />

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
                                    key={recipe.id}
                                    image={recipe.images[0].url}
                                    title={recipe.name}
                                    subtitle={formatIngredients(recipe.ingredients)}
                                    captionSlot={
                                        <><Clock />{recipe.totalTime} minutes</>
                                    }
                                    contentSlot={<Text color='accent' view='p-18'>{formatKcal(recipe.calories)} kcal</Text>}
                                    actionSlot={<Button children={'Save'} />}
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