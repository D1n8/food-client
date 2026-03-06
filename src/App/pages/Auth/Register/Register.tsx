import Input from 'components/Input';
import styles from '../Auth.module.scss'
import { useCallback, useState } from 'react';
import Button from 'components/Button';
import Text from 'components/Text';
import { Link } from 'react-router';
import { userStore } from 'store/UserStore';
import { routes } from 'config/routes';
import { withAuthProtected } from '../withAuthProtected';
import { observer } from 'mobx-react-lite';

const Register = withAuthProtected(observer(() => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { error } = userStore

    const submitRegister = useCallback((e: React.SubmitEvent) => {
        e.preventDefault()
        userStore.registerUser(username, email, password)
    }, [username, email, password])

    return (
        <div className={styles.authPage}>
            <form id='auth-form' className={styles.form} onSubmit={submitRegister}>
                <Text tag='h3' color='primary' className={styles.title}>Authorization</Text>

                <div className={styles.inputContainer}>
                    <label className={styles.label} htmlFor="username">Username</label>
                    <Input
                        placeholder='Your username'
                        style={{ width: '100%' }}
                        id='username'
                        value={username}
                        onChange={setUsername}
                        required />
                </div>

                <div className={styles.inputContainer}>
                    <label className={styles.label} htmlFor="email">Email</label>
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
                    <Link to={routes.login.mask}>
                        <Text className={styles.link}>I have an account</Text>
                    </Link>
                    <Button type='submit'>Confirm</Button>
                </div>

                {error && (
                    <Text view='p-16' className={styles.error}>{error}</Text>
                )}
            </form>
        </div>
    );
}))

export default Register;