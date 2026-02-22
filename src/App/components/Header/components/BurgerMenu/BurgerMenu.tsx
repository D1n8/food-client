import { useState } from 'react';
import BurgerButton from '../BurgerButton';
import styles from './BurgerMenu.module.scss'
import Text from 'components/Text';
import { Link } from 'react-router';
import classNames from 'classnames';

function BurgerMenu() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <BurgerButton onClick={() => setIsOpen(!isOpen)} />
            <nav className={classNames(styles.nav, isOpen && styles.open)}>
                <ul className={styles.burgerNav}>
                    <Text onClick={() => setIsOpen(false)} className={styles.link} tag="li" view="p-16">
                        <Link to={'/'}>Recipes</Link>
                    </Text>

                    <Text onClick={() => setIsOpen(false)} className={styles.link} tag="li" view="p-16">
                        <Link to={'#'}>Meals Categories</Link>
                    </Text>

                    <Text onClick={() => setIsOpen(false)} className={styles.link} tag="li" view="p-16">
                        <Link to={'#'}>Products</Link>
                    </Text>

                    <Text onClick={() => setIsOpen(false)} className={styles.link} tag="li" view="p-16">
                        <Link to={'#'}>Menu Items</Link>
                    </Text>

                    <Text onClick={() => setIsOpen(false)} className={styles.link} tag="li" view="p-16">
                        <Link to={'#'}>Meal Planning</Link>
                    </Text>
                </ul>
            </nav>


        </>

    );
}

export default BurgerMenu;