import Button from 'components/Button';
import Text from 'components/Text'
import styles from './Profile.module.scss'
import { userStore } from 'store/UserStore';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

const Profile = observer(() => {
    const navigate = useNavigate()
    const isAuth = userStore.isAuth

    useEffect(() => {
        if (!isAuth) {
            navigate('/login')
        }
    }, [isAuth, navigate])

    return (
        <div className={styles.profilePage}>
            <Text tag='h2'>Your profile</Text>
            <Button onClick={() => userStore.logoutUser()}>Logout</Button>
        </div>
    );
})

export default Profile;