import Header from './components/Header'
import styles from './App.module.scss'
import { Outlet } from 'react-router'
import Loader from 'components/Loader'
import { userStore } from 'store/UserStore'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'

const App = observer(() => {
  useEffect(() => {
    userStore.checkAuth()
  }, [])

  if (!userStore.isInit) {
    return (
      <div className={styles.loaderContainer}>
        <Loader size='l' />
      </div>
    )
  }

  return (
    <div className={styles.app}>
      <Header />
      {
        !userStore ?
          <div className={styles.loaderContainer}>
            <Loader size='l' />
          </div>
          :
          <main className={styles.main}>
            <Outlet />
          </main>
      }
    </div>
  )
})

export default App
