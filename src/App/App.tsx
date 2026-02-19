import Header from './components/Header'
import styles from './App.module.scss'
import { Outlet } from 'react-router'


function App() {

  return (
    <div className={styles.app}>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default App
