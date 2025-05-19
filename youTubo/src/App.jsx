import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useSelector } from 'react-redux'
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import Watch from './pages/Watch'
import Body from './components/Body'
import ValidationComponent from './components/ValidationComponent'
import Login from './pages/Login'
import ApplicationForm from './pages/ApplicationForm'
import ViewApplicationForm from './pages/ViewApplicationForm'
import ErrorPage from './pages/ErrorPage'
import LoginwithEmail from './components/LoginwithEmail'
function App() {
  const [count, setCount] = useState(0)
  const user = useSelector((state) => state.user?.userInfo)


  // console.log(user)
  const routers = createBrowserRouter([

    {
      path: "/",
      element: <ValidationComponent element={<HomePage />} />,
      children: [
        {
          path: "/",
          element: <ValidationComponent element={<Body />} />,
          // element: <Body />,
        },
        {
          path: "/watch",
          element: <Watch />,
        },

      ],
      errorElement: <ErrorPage />,
    },
    {
      path: "/about",
      element: <AboutPage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/applicationform",
      element: <ValidationComponent element={<ApplicationForm />} />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/viewapplicationform",
      element: <ValidationComponent element={<ViewApplicationForm />} />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/loginwithEmail",
      element: <LoginwithEmail />,
      errorElement: <ErrorPage />,
    }
  ])

  return (
    <>
      <RouterProvider router={routers} />
    </>
  )
}

export default App
