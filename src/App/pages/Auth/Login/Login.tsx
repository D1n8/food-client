import styles from '../Auth.module.scss'
import Text from 'components/Text';
import Input from 'components/Input';
import { useState } from 'react';
import Button from 'components/Button';
import { Link } from 'react-router';
import { userStore } from 'store/UserStore';

function Login() {
    const [identifier, setIdentifier] = useState('')
    const [loginPassword, setLoginPassword] = useState('')

    const submitLogin = (e: React.SubmitEvent) => {
        e.preventDefault()
        userStore.loginUser(identifier, loginPassword)
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
            </form>
        </div>
    );
}

export default Login;