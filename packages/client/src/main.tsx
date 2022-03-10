import { render } from 'react-dom'
import App from './App'
import './index.css'
import '@waterui/react/dist/waterui.css'
// import 'react-toastify/dist/ReactToastify.css'
import useStore from './store'

function mediaHandler(e: MediaQueryListEvent) {
  useStore.setState({ isDesktop: e.matches })
}

const mediaQueryList = window.matchMedia('(min-width: 1024px)')
mediaQueryList.addEventListener('change', mediaHandler)

render(<App />, document.getElementById('app'))
