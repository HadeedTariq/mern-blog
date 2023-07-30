import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import NavBar from './components/NavBar'
import {Signin,Signup,Home,AddBlog, SingleBlog} from './pages'
function App() {
  return (
    <>
     <Router>
       <NavBar/>
       <Routes>
        <Route path='/'  element={<Home/>}/>
        <Route path='/register'  element={<Signup/>}/>
        <Route path='/auth'  element={<Signin/>}/>
        <Route path='/addBlog'  element={<AddBlog/>}/>
        <Route path='/blog/:id'  element={<SingleBlog/>}/>
       </Routes>
     </Router>
    </>
  )
}

export default App
