
import CheckBox from 'components/CheckBox';
import Text from 'components/Text';
import styles from './VegetarianCheckbox.module.scss'
import { useSearchParams } from 'react-router';

function VegetarianCheckbox() {
    const [searchParams, setSearchParams] = useSearchParams()
    const isChecked = Boolean(searchParams.get('vegetarian'))

    const handleCheck = (value: boolean) => {
        const newParams = new URLSearchParams()

        if (!value) {
            newParams.delete('vegetarian')
        } else {
            newParams.set('vegetarian', 'true')
        }

        setSearchParams(newParams)
    }

    return (
        <div className={styles.vegetarian}>
            <Text color='secondary'>Vegetarian</Text>
            <CheckBox checked={isChecked} onChange={handleCheck} />
        </div>
    )
}

export default VegetarianCheckbox;