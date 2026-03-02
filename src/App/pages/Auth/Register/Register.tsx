import Input from 'components/Input';
import styles from '../Auth.module.scss'
import { useState } from 'react';
import Button from 'components/Button';
import Text from 'components/Text';
import { Link } from 'react-router';

function Register() {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const submitRegister = () => {

    }

    return (
        <div className={styles.authPage}>
            <form action='POST' id='auth-form' className={styles.form} onSubmit={submitRegister}>
                <Text tag='h3' className={styles.title}>Authorization</Text>
                <div className={styles.inputContainer}>
                    <label htmlFor="username">Username</label>
                    <Input
                        placeholder='Your username'
                        style={{ width: '100%' }}
                        name='username'
                        value={username}
                        onChange={setUsername}
                        required />
                </div>

                <div className={styles.inputContainer}>
                    <label htmlFor="email">Email</label>
                    <Input
                        placeholder='Your email'
                        style={{ width: '100%' }}
                        name='email'
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
                        name='password'
                        type='password'
                        value={password}
                        onChange={setPassword}
                        required />
                </div>

                <div className={styles.bottomContainer}>
                    <Link to={'/login'}>
                        <Text className={styles.link} onClick={() => { }}>I have an account</Text>
                    </Link>
                    <Button type='submit'>Confirm</Button>
                </div>
            </form>
        </div>
    );
}

export default Register;