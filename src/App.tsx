import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import NavBar from '@/components/NavBar/NavBar'
import UserContextWrapper from '@/components/UserContextWrapper/UserContextWrapper'

const Home = lazy(() => import('@/pages/Home/Home'))
const Articles = lazy(() => import('@/pages/Articles/Articles'))
const Comments = lazy(() => import('@/pages/Comments/Comments'))

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
              <Redirect to="/" />
            </Switch>
          </Suspense>
        </UserContextWrapper>
      </Router>
      <footer>footer</footer>
    </>
  )
}
