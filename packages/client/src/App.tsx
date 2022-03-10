import { Suspense, lazy, StrictMode, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
// import { ToastContainer } from 'react-toastify'
import {
  BottomBar,
  NavBar,
  GlobalLoading,
  GlobalMessage,
  SliderLeft,
  SliderRight,
} from './views'
import { Loading } from './components'
import useStore from './store'
import { Pages } from './utils/config'

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
const Tweet = lazy(() => import('./pages/Tweet'))

export default function App() {
  const auth = useStore((s) => s.auth)
  const user = useStore((s) => s.user)
  const isDesktop = useStore((s) => s.isDesktop)

  useEffect(() => {
    auth()
  }, [auth])

  return (
    <StrictMode>
      <Router>
        <div className="lg:flex lg:justify-center">
          {isDesktop && <SliderLeft />}
          <div className="lg:relative lg:border-x lg:w-[700px] min-h-[calc(100vh-49px)] lg:min-h-screen">
            <NavBar />
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
                <Route path={`${Pages.tweet}/:id`} component={Tweet} />
                <Redirect to="/" />
              </Switch>
            </Suspense>
          </div>
          {isDesktop ? <SliderRight /> : <BottomBar />}
        </div>
      </Router>
      <GlobalLoading />
      <GlobalMessage />
      {/* <ToastContainer
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
        draggableDirection={isDesktop ? 'x' : 'y'}
      /> */}
    </StrictMode>
  )
}
