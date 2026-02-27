import Input from 'components/Input';
import styles from '../../RecipesList.module.scss'
import Button from 'components/Button';
import SearchIcon from 'components/Icons/SearchIcon';
import { useState } from 'react';
import { useSearchParams } from 'react-router';

function Search() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [searchValue, setSearchValue] = useState(searchParams.get('name') || '');

    const handleSearch = () => {
        if (searchValue.trim()) {
            setSearchParams({ name: searchValue });
        } else {
            setSearchParams({});
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }

    return (
        <div className={styles.inputContainer}>
            <Input
                style={{ width: '100%' }}
                className={styles.input}
                value={searchValue}
                onChange={setSearchValue}
                onKeyDown={handleKeyDown}
                placeholder='Enter dishes' />
            <Button onClick={handleSearch}>
                <SearchIcon />
            </Button>
        </div>
    );
}

export default Search;