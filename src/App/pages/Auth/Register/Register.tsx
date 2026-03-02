import Input from 'components/Input';
import styles from '../Auth.module.scss'
import { useState } from 'react';
import Button from 'components/Button';
import Text from 'components/Text';
import { Link } from 'react-router';
import { userStore } from 'store/UserStore'

function Register() {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const submitRegister = (e: React.SubmitEvent) => {
        e.preventDefault()
        userStore.registerUser(username, email, password)
    }

    return (
        <div className={styles.authPage}>
            <form id='auth-form' className={styles.form} onSubmit={(e) => submitRegister(e)}>
                <Text tag='h3' className={styles.title}>Authorization</Text>
                <div className={styles.inputContainer}>
                    <label htmlFor="username">Username</label>
                    <Input
                        placeholder='Your username'
                        style={{ width: '100%' }}
                        id='username'
                        value={username}
                        onChange={setUsername}
                        required />
                </div>

                <div className={styles.inputContainer}>
                    <label htmlFor="email">Email</label>
                    <Input
                        placeholder='Your email'
                        style={{ width: '100%' }}
                        id='email'
                        type='email'
                        value={email}
                        onChange={setEmail}
                        required />
                </div>

                <div className={styles.inputContainer}>
                    <label htmlFor="password">Password</label>
                    <Input
                        placeholder='Your password'
                        style={{ width: '100%' }}
                        id='password'
                        type='password'
                        value={password}
                        onChange={setPassword}
                        required />
                </div>

                <div className={styles.bottomContainer}>
                    <Link to={'/login'}>
                        <Text className={styles.link}>I have an account</Text>
                    </Link>
                    <Button type='submit'>Confirm</Button>
                </div>
            </form>
        </div>
    );
}

export default Register;