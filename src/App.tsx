import React, { Suspense, lazy, StrictMode } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { NavBar, InitialEffect } from 'src/views'
import { StoreContextProvider } from 'src/context'

const Home = lazy(() => import('src/pages/Home'))
const Articles = lazy(() => import('src/pages/Articles'))
const Comments = lazy(() => import('src/pages/Comments'))
const Manager = lazy(() => import('src/pages/Manager/Manager'))

export default function App() {
  return (
    <StrictMode>
      <Router>
        <StoreContextProvider>
          <InitialEffect />
          <NavBar />
          <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <Suspense fallback={null}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/articles" component={Articles} />
                <Route path="/comments" component={Comments} />
                <Route path="/manager" component={Manager} />
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
