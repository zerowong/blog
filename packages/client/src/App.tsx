import { Suspense, lazy, StrictMode, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { BottomBar, NavBar } from './views'
import useStore from './store'
import { useMatchMedia } from './hooks'
import { Pages } from './utils/config'
import { Loading, GlobalLoading, GlobalMessage } from './views'

const Home = lazy(() => import('./pages/Home'))
const Articles = lazy(() => import('./pages/Articles'))
const Search = lazy(() => import('./pages/Search'))
const About = lazy(() => import('./pages/About'))
const Notification = lazy(() => import('./pages/Notification'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Profile = lazy(() => import('./pages/Profile'))
const SettingProfile = lazy(() => import('./pages/SetttingProfile'))
const Article = lazy(() => import('./pages/Article'))

export default function App() {
  const auth = useStore((state) => state.auth)
  const user = useStore((state) => state.user)

  useEffect(() => {
    auth()
  }, [auth])

  const lg = useMatchMedia('(min-width: 1024px)')

  return (
    <StrictMode>
      <Router>
        {!lg && <NavBar />}
        <div className="lg:max-w-7xl lg:mx-auto h-screen">
          <Suspense
            /**
             * @todo 顶部加载条
             */
            fallback={
              <div className="h-full flex justify-center items-center">
                <Loading />
              </div>
            }
          >
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path={Pages.articles} component={Articles} />
              <Route path={Pages.search} component={Search} />
              <Route path={Pages.about} component={About} />
              <Route path={Pages.notification} component={Notification} />
              <Route path={Pages.login}>{user ? <Redirect to="/" /> : <Login />}</Route>
              <Route path={Pages.register}>
                {user ? <Redirect to="/" /> : <Register />}
              </Route>
              <Route path={`${Pages.user}/:id`}>
                {user ? <Profile /> : <Redirect to="/" />}
              </Route>
              <Route path={Pages.settingProfile}>
                {user ? <SettingProfile /> : <Redirect to="/" />}
              </Route>
              <Route path={`${Pages.article}/:id`} component={Article} />
              <Redirect to="/" />
            </Switch>
          </Suspense>
        </div>
        {!lg && <BottomBar />}
      </Router>
      <GlobalLoading />
      <GlobalMessage />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        draggablePercent={50}
        draggableDirection={lg ? 'x' : 'y'}
      />
    </StrictMode>
  )
}
