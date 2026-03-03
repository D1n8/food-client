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
                <div className={styles.burgerNav}>
                    <Link className={styles.link} to={'/'}>
                        <Text onClick={() => setIsOpen(false)} view="p-16">
                            Recipes
                        </Text>
                    </Link>

                    <Link className={styles.link} to={'#'}>
                        <Text onClick={() => setIsOpen(false)} view="p-16">
                            Meals Categories
                        </Text>
                    </Link>

                    <Link className={styles.link} to={'#'}>
                        <Text onClick={() => setIsOpen(false)} view="p-16">
                            Products
                        </Text>
                    </Link>

                    <Link className={styles.link} to={'#'}>
                        <Text onClick={() => setIsOpen(false)} view="p-16">
                            Menu Items
                        </Text>
                    </Link>

                    <Link className={styles.link} to={'#'}>
                        <Text onClick={() => setIsOpen(false)} view="p-16">
                            Meal Planning
                        </Text>
                    </Link>
                </div>
            </nav>
        </>
    );
}

export default BurgerMenu;