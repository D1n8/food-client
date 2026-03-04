import Logo from "components/Logo";
import Text from "components/Text";
import Favorites from "components/Icons/Favorites";
import User from "components/Icons/User";
import styles from './Header.module.scss';
import BurgerMenu from "./components/BurgerMenu";
import { Link } from "react-router";
import { observer } from "mobx-react-lite";
import { userStore } from "store/UserStore";

const Header = observer(() => {
    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <BurgerMenu />
                <div className={styles.headerLogo}>
                    <Logo />
                    <Text view="p-20" tag="h1" className={styles.title}>Food Client</Text>
                </div>

                <nav className={styles.nav}>

                    <ul className={styles.pageLinks}>
                        <Text tag="li" view="p-16">
                            <Link className={styles.link} to={'/'}>Recipes</Link>
                        </Text>
                    </ul>

                    <div className={styles.userInfo}>
                        <Link to={'/favorites'}>
                            <Favorites />
                        </Link>
                        <Link to={userStore.isAuth ? '/profile' : '/login'}>
                            <User />
                        </Link>
                    </div>
                </nav>
            </div>

        </header>);
})

export default Header;