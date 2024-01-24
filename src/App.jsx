import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Register from './onboarding/Register'
import Login from './onboarding/Login'
import Poll from './assets/Poll'
import Votepage from './assets/Votepage'
import Admin from './assets/Admin'
import VoteAcess from './onboarding/VoteAcess'
import Result from './assets/Result'
import VerifyEmail from './onboarding/VerifyEmail'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Register />
  },
  {
    path: "/verify",
    element: <VerifyEmail />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/poll",
    element: <Poll />
  },
  {
    path: '/acess',
    element: <VoteAcess />
  },
  {
    path: "/vote",
    element: <Votepage />
  },
  {
    path: "/result",
    element: <Result />
  },
  {
    path: "/admin",
    element: <Admin />
  },
])

function App() {


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
