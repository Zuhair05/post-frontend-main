import Nav from "./components/Nav"
import SignUpForm from "./pages/SignUpForm"
import './App.css'
import { Routes, Route, useNavigate } from "react-router"
import { useState, useEffect } from "react"
import SignInForm from "./pages/SignInForm"
import Landing from "./pages/Landing"
import Dashboard from "./pages/Dashboard"
import HootList from "./pages/PostList"
import * as hootService from './services/posts'
import HootDetails from "./pages/PostDetails"
import HootForm from "./pages/PostForm"


const getUserFromToken = () => {
  const token = localStorage.getItem('token')
  if (!token) return null
  return JSON.parse(atob(token.split('.')[1])).payload
}

const App = () => {
  const navigate = useNavigate()

  const [user, setUser] = useState(getUserFromToken())
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchAllPosts = async () => {
      const postsData = await hootService.index()
      setPosts(postsData)
    }
    if (user) fetchAllPosts()
  }, [user])

  const handleAddPost = async (formData) => {
    const newPost = await hootService.create(formData)
    setPosts([newPost, ...posts])
    navigate('/posts')
  }
  
  return (
    <div>
      <Nav user={user} setUser={setUser} />
      <main className="app-main">
      <Routes>
        <Route path='/' element={user ? <Dashboard user={user} /> : <Landing />} />
        {user ? (
          <>
            <Route path='/posts' element={<HootList posts={posts} />} />
            <Route path='/posts/:postId' element={<HootDetails user={user} />} />
            <Route path='/posts/new' element={<HootForm handleAddPost={handleAddPost} />} />
          </>
        ) : (
          <>
            <Route path='/sign-up' element={<SignUpForm setUser={setUser} />} />
            <Route path='/sign-in' element={<SignInForm setUser={setUser} />} />
          </>
        )}
      </Routes>
      </main>
    </div>
  )
}

export default App