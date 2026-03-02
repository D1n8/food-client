import styles from '../Auth.module.scss'
import Text from 'components/Text';
import Input from 'components/Input';
import { useState } from 'react';
import Button from 'components/Button';
import { Link } from 'react-router';

function Login() {
    const [identifier, setIdentifier] = useState('')
    const [loginPassword, setLoginPassword] = useState('')

    const submitLogin = () => {

    }

    return (
        <div className={styles.authPage}>
            <form action="POST" id='login-form' className={styles.form} onSubmit={submitLogin}>
                <Text tag='h3' className={styles.title}>Login</Text>
                <div className={styles.inputContainer}>
                    <label htmlFor="identifier">Email or Username</label>
                    <Input
                        name='identifier'
                        style={{ width: '100%' }}
                        value={identifier}
                        onChange={setIdentifier}
                        required />
                </div>

                <div className={styles.inputContainer}>
                    <label htmlFor="loginPassword">Password</label>
                    <Input
                        name='loginPassword'
                        style={{ width: '100%' }}
                        type='password'
                        value={loginPassword}
                        onChange={setLoginPassword}
                        required />
                </div>

                <div className={styles.bottomContainer}>
                    <Link to={'/register'}>
                        <Text className={styles.link} onClick={() => { }}>I don't have an account</Text>
                    </Link>
                    <Button type='submit'>Confirm</Button>
                </div>
            </form>
        </div>
    );
}

export default Login;