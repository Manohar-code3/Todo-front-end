
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import './components/ListComponents'
import Todo from './components/todo'
import ListComponents from './components/ListComponents'
import { BrowserRouter,  Navigate,  Route,  Routes } from 'react-router-dom'
import RegisterComponents from './components/RegisterComponents'
import LoginComponents from './components/LoginComponents'
import { isUserLoggedIn } from './Service/AuthService'


function App() {
  function AuthenticatedRoute({children})
  {
      const isAuth =isUserLoggedIn()
      if(isAuth)
      {
        return children
      }
      return <Navigate to="/"/>
  }
  

  return (
    <>
      <div className="background-div">
            
        
        <BrowserRouter>
          <Header/>
          <Routes>
            <Route path='/' element={ <LoginComponents/>}></Route>
            <Route path='/todos' element={<AuthenticatedRoute><ListComponents/></AuthenticatedRoute>}></Route>
            <Route path='/add-todo' element={<AuthenticatedRoute><Todo/></AuthenticatedRoute>}></Route>
            <Route path='/update-todo/:id' element={<AuthenticatedRoute><Todo/></AuthenticatedRoute>}></Route>
            <Route path='/register' element={<RegisterComponents/>}></Route>
            <Route path='/login' element={<LoginComponents/>}></Route>
          </Routes>
      

        
          <Footer/>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
