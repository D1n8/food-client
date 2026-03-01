import Input from 'components/Input';
import styles from '../../RecipesList.module.scss'
import Button from 'components/Button';
import SearchIcon from 'components/Icons/SearchIcon';
import { useState } from 'react';
import { useSearchParams } from 'react-router';

function Search() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [searchValue, setSearchValue] = useState(searchParams.get('name') || '')

    const handleSearch = (newValue: string) => {
        const newParams = new URLSearchParams(searchParams)
        
        if (newValue.length === 0) {
            newParams.delete('name')
        } else {
            newParams.set('name', newValue)
        }
        
        setSearchParams(newParams)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch(searchValue)
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
            <Button onClick={() => handleSearch(searchValue)}>
                <SearchIcon />
            </Button>
        </div>
    );
}

export default Search;