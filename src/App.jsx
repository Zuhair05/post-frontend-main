import Nav from "./components/Nav"
import SignUpForm from "./pages/SignUpForm"
import './App.css'
import { Routes, Route, useNavigate } from "react-router"
import { useState, useEffect } from "react"
import SignInForm from "./pages/SignInForm"
import Landing from "./pages/Landing"
import Dashboard from "./pages/Dashboard"
import PostList from "./pages/PostList"
import * as postServices from './services/posts'
import PostDetails from "./pages/PostDetails"
import PostForm from "./pages/PostForm"


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
      const postsData = await postServices.index()
      setPosts(postsData)
    }
    if (user) fetchAllPosts()
  }, [user])

  const handleAddPost = async (formData) => {
    const newPost = await postServices.create(formData)
    setPosts([newPost, ...posts])
    navigate('/posts')
  }
  
  const handleDelete = async (postId) => {
    await postServices.deletePost(postId)
    setPosts(posts.filter((post) => post._id !== postId))
    navigate('/posts')
  }

  // const handleUpdate = async (postId, formData) => {
  //   const updatedPost = await postServices.update(postId, formData)
  //   setPosts(posts.map((post) => (post._id === postId ? updatedPost : post)))
  //   navigate(`/posts/${postId}`)
  // }

  // const openComments = async (postId) => {
  //   setSelectedPostId(postId)
  //   setShowComments(true)
  // }

  // const closeComments = () => {
  //   setSelectedPostId(null)
  //   setShowComments(false)
  // }


  return (
    <div>
      <Nav user={user} setUser={setUser} />
      <main className="app-main">
      <Routes>
        <Route path='/' element={user ? <Dashboard user={user} /> : <Landing />} />
        {user ? (
          <>
            <Route path='/posts' element={<PostList posts={posts} />} />
            <Route path='/posts/:postId' element={<PostDetails user={user} handleDelete={handleDelete} />} />
            <Route path='/posts/new' element={<PostForm handleAddPost={handleAddPost} />} />
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