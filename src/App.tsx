import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import NavBar from '@/components/NavBar/NavBar'
import UserContextWrapper from '@/components/UserContextWrapper/UserContextWrapper'

const Home = lazy(() => import('@/pages/Home/Home'))
const Articles = lazy(() => import('@/pages/Articles/Articles'))
const Comments = lazy(() => import('@/pages/Comments/Comments'))
const Manager = lazy(() => import('@/pages/Manager/Manager'))

export default function App() {
  return (
    <>
      <Router>
        <UserContextWrapper>
          <NavBar />
          <Suspense fallback={null}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/articles" component={Articles} />
              <Route path="/comments" component={Comments} />
              <Route path="/manager" component={Manager} />
              <Redirect to="/" />
            </Switch>
          </Suspense>
        </UserContextWrapper>
      </Router>
      <footer>footer</footer>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}
