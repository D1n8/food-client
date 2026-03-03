import Button from 'components/Button';
import Text from 'components/Text'
import styles from './Profile.module.scss'
import { userStore } from 'store/UserStore';
import { observer } from 'mobx-react-lite';

const Profile = observer(() => {

    return (
        <div className={styles.profilePage}>
            <Text tag='h2'>Your profile</Text>
            <Button onClick={() => userStore.logoutUser()}>Logout</Button>
        </div>
    );
})

export default Profile;