import { routes } from "config/routes"
import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { useNavigate } from "react-router"
import { userStore } from "store/UserStore"
import styles from './Auth.module.scss'
import Loader from "components/Loader"

export const withAuthProtected = <T extends object>(Component: React.ComponentType<T>) => {
    const wrapped = observer((props: T) => {
        const { isAuth, isLoading } = userStore

        const navigate = useNavigate()

        useEffect(() => {
            if (isAuth) {
                navigate(routes.profile.mask)
            }
        }, [isAuth, navigate])

        if (isLoading) {
            return (
                <div className={styles.loaderContainer}>
                    <Loader size='l' />
                </div>
            )
        }

        return <Component {...props} />
    })

    return wrapped
}