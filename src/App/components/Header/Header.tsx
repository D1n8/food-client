import Logo from "components/Logo";
import Text from "components/Text";
import Favorites from "./components/Favorites";
import User from "./components/User";
import styles from './Header.module.scss';
import { Link } from "react-router";

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
                        <Text tag="li" view="p-16">
                            <Link className={styles.link} to={'/'}>Recipes</Link>
                        </Text>
                        <Text tag="li" view="p-16">
                            <Link className={styles.link} to={'#'}>Meals Categories</Link>
                        </Text>
                        <Text tag="li" view="p-16">
                            <Link className={styles.link} to={'#'}>Products</Link>
                        </Text>
                        <Text tag="li" view="p-16">
                            <Link className={styles.link} to={'#'}>Menu Items</Link>
                        </Text>
                        <Text tag="li" view="p-16">
                            <Link className={styles.link} to={'#'}>Meal Planning</Link>
                        </Text>
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