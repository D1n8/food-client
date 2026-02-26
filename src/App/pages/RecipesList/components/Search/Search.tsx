import Input from 'components/Input';
import styles from '../../RecipesList.module.scss'
import Button from 'components/Button';
import SearchIcon from 'components/Icons/SearchIcon';
import type RecipeStore from 'store/RecipeStore';
import { useState } from 'react';

function Search({store}: {store: RecipeStore}) {
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = () => {
        store.setInput(searchValue);
        store.searchRecipeList();
    }
    return (
        <div className={styles.inputContainer}>
            <Input
                style={{ width: '100%' }}
                className={styles.input}
                value={searchValue}
                onChange={setSearchValue}
                placeholder='Enter dishes' />
            <Button onClick={handleSearch}>
                <SearchIcon />
            </Button>
        </div>
    );
}

export default Search;