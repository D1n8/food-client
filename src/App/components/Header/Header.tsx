import Logo from "components/Logo";
import Text from "components/Text";
import Favorites from "./components/Favorites";
import User from "./components/User";
import styles from './Header.module.scss';

function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <div className={styles.headerLogo}>
                    <Logo />
                    <Text view="p-20" tag="h1" className={styles.title}>Food Client</Text>
                </div>

                <nav className={styles.nav}>

                    <ul className={styles.pageLinks}>
                        <Text tag="li" view="p-16" color="accent">Recipes</Text>
                        <Text tag="li" view="p-16">Meals Categories</Text>
                        <Text tag="li" view="p-16">Products</Text>
                        <Text tag="li" view="p-16">Menu Items</Text>
                        <Text tag="li" view="p-16">Meal Planning</Text>
                    </ul>

                    <div className={styles.userInfo}>
                        <Favorites />
                        <User />
                    </div>
                </nav>
            </div>

        </header>);
}

export default Header;