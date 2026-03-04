import styles from '../Auth.module.scss'
import Text from 'components/Text';
import Input from 'components/Input';
import { useCallback, useState } from 'react';
import Button from 'components/Button';
import { Link } from 'react-router';
import { userStore } from 'store/UserStore';
import { routes } from 'config/routes';
import { withAuthProtected} from '../withAuthProtected';
import { observer } from 'mobx-react-lite';

const Login = withAuthProtected(observer(() => {
    const [identifier, setIdentifier] = useState('')
    const [password, setPassword] = useState('')
    const { error } = userStore

    const submitLogin = useCallback((e: React.SubmitEvent) => {
        e.preventDefault()
        userStore.loginUser(identifier, password)
    }, [identifier, password])

    return (
        <div className={styles.authPage}>
            <form id='login-form' className={styles.form} onSubmit={submitLogin}>
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
                        value={password}
                        onChange={setPassword}
                        placeholder='Your password'
                        required />
                </div>

                <div className={styles.bottomContainer}>
                    <Link to={routes.register.mask}>
                        <Text className={styles.link}>I don't have an account</Text>
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

export default Login;