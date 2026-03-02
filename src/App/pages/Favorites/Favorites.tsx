import { useEffect } from 'react';
import styles from './Favorites.module.scss';
import { observer } from 'mobx-react-lite';
import { userStore } from 'store/UserStore';
import RecipeCard from 'components/RecipeCard';
import { formatKcal } from 'utils/utils';
import Clock from 'components/Icons/Clock';
import Text from 'components/Text';
import Button from 'components/Button';
import { useNavigate } from 'react-router';

const Favorites = observer(() => {
    useEffect(() => {
        userStore.fetchFavorites()
    }, [])

    const navigate = useNavigate()

    const removeFromFavorites = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
        e.stopPropagation()
        userStore.removeFromFavorites(id)
    }

    return (
        <div className={styles.favoritesPage}>
            <Text tag='h2'>Your favorites recipes</Text>
            {
                <div className={styles.list}>{
                    (userStore.favorites.length > 0) &&
                    userStore.favorites.map(item => {
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
                                onClick={() => navigate(`/recipes/${documentId}`)}
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