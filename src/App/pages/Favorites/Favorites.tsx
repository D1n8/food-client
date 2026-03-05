import { useCallback, useEffect, useState } from 'react';
import styles from './Favorites.module.scss';
import { observer } from 'mobx-react-lite';
import RecipeCard from 'components/RecipeCard';
import { formatKcal } from 'utils/utils';
import Clock from 'components/Icons/Clock';
import Text from 'components/Text';
import Button from 'components/Button';
import { useNavigate } from 'react-router';
import FavoritesStore from 'store/FavoritesStore';
import Loader from 'components/Loader';
import { routes } from 'config/routes';

const Favorites = observer(() => {
    const [store] = useState(() => new FavoritesStore())
    const navigate = useNavigate()

    useEffect(() => {
        store.fetchFavorites()
    }, [store])

    const removeFromFavorites = useCallback((e: React.MouseEvent, id: number) => {
        e.stopPropagation()
        store.removeFromFavorites(id)
    }, [store])

    const handleClick = useCallback((id: string) => {
        navigate(routes.recipe.create(id))
    }, [navigate])

    if (store.isLoading) {
        return (
            <div className={styles.loaderContainer}>
                <Loader size='l' />
            </div>)
    }

    return (
        <div className={styles.favoritesPage}>
            <Text tag='h2'>Your favorites recipes</Text>
            {
                <div className={styles.list}>{
                    (store.favorites.length > 0) &&
                    store.favorites.map(item => {
                        const recipeId = item.recipe.id
                        const documentId = item.recipe.documentId

                        return (
                            <RecipeCard
                                key={item.documentId}
                                image={item.recipe.images[0].url}
                                title={item.recipe.name}
                                subtitle={item.recipe.summary}
                                captionSlot={
                                    <><Clock />{item.recipe.totalTime} minutes</>
                                }
                                contentSlot={<Text color='accent' view='p-18'>{formatKcal(item.recipe.calories)} kcal</Text>}
                                actionSlot={<Button children={'Unsave'} onClick={(e) => removeFromFavorites(e, recipeId)} />}
                                onClick={() => handleClick(documentId)}
                            />
                        )
                    }

                    )}
                </div>
            }
        </div>
    );
})

export default Favorites;