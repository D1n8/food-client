import styles from '../Auth.module.scss'
import Text from 'components/Text';
import Input from 'components/Input';
import { useEffect, useState } from 'react';
import Button from 'components/Button';
import { Link, useNavigate } from 'react-router';
import { userStore } from 'store/UserStore';
import { observer } from 'mobx-react-lite';
import Loader from 'components/Loader';

const Login = observer(() => {
    const [identifier, setIdentifier] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const isAuth = userStore.isAuth

    const navigate = useNavigate()

    useEffect(() => {
        if (isAuth) {
            navigate('/profile')
        }
    }, [isAuth, navigate])

    const submitLogin = (e: React.SubmitEvent) => {
        e.preventDefault()
        userStore.loginUser(identifier, loginPassword)
    }

    if (userStore.isLoading) {
        return (
            <div className={styles.loaderContainer}>
                <Loader size='l' />
            </div>
        )
    }

    return (
        <div className={styles.authPage}>
            <form id='login-form' className={styles.form} onSubmit={e => submitLogin(e)}>
                <Text tag='h3' className={styles.title}>Login</Text>

                <div className={styles.inputContainer}>
                    <label htmlFor="identifier">Email or Username</label>
                    <Input
                        id='identifier'
                        style={{ width: '100%' }}
                        value={identifier}
                        onChange={setIdentifier}
                        placeholder='Your identifier'
                        required />
                </div>

                <div className={styles.inputContainer}>
                    <label htmlFor="loginPassword">Password</label>
                    <Input
                        id='loginPassword'
                        style={{ width: '100%' }}
                        type='password'
                        value={loginPassword}
                        onChange={setLoginPassword}
                        placeholder='Your password'
                        required />
                </div>

                <div className={styles.bottomContainer}>
                    <Link to={'/register'}>
                        <Text className={styles.link}>I don't have an account</Text>
                    </Link>
                    <Button type='submit'>Confirm</Button>
                </div>

                {userStore.error && (
                    <Text view='p-16' className={styles.error}>{userStore.error}</Text>
                )}
            </form>
        </div>
    );
})

export default Login;