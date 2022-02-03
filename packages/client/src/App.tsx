import React, { Suspense, lazy, StrictMode } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { NavBar, InitialEffect } from './views'
import { StoreContextProvider } from './context'

const Home = lazy(() => import('./pages/Home'))
const Articles = lazy(() => import('./pages/Articles'))
const Comments = lazy(() => import('./pages/Comments'))

export default function App() {
  return (
    <StrictMode>
      <Router>
        <StoreContextProvider>
          <InitialEffect />
          <NavBar />
          <main className="max-w-7xl mx-auto px-4 py-6 md:px-8">
            <Suspense fallback={null}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/articles" component={Articles} />
                <Route path="/comments" component={Comments} />
                <Redirect to="/" />
              </Switch>
            </Suspense>
          </main>
        </StoreContextProvider>
      </Router>
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
    </StrictMode>
  )
}
