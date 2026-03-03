import Button from 'components/Button'
import Text from 'components/Text'
import styles from './Profile.module.scss'
import { userStore } from 'store/UserStore'
import { observer } from 'mobx-react-lite'

const Profile = observer(() => {

    return (
        <div className={styles.profilePage}>
            <div className={styles.topContainer}>
                <Text tag='h2'>Profile</Text>
                <Button onClick={() => userStore.logoutUser()}>Logout</Button>
            </div>

            <div className={styles.textContainer}>
                <Text view='p-18'>Username: {userStore.user?.username}</Text>
                <Text view='p-18'>Email: {userStore.user?.email}</Text>
            </div>
        </div>
    );
})

export default Profile;