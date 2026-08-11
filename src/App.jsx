import Nav from "./components/Nav"
import SignUpForm from "./pages/SignUpForm"
import './App.css'
import { Routes, Route, useNavigate } from "react-router"
import { useState, useEffect } from "react"
import SignInForm from "./pages/SignInForm"
import Landing from "./pages/Landing"
import Dashboard from "./pages/Dashboard"
import PostList from "./pages/PostList"
import * as postService from './services/posts'
import * as commentService from './services/comments'
import PostDetails from "./pages/PostDetails"
import PostForm from "./pages/PostForm"
import Comments from "./components/Comments"


const getUserFromToken = () => {
  const token = localStorage.getItem('token')
  if (!token) return null
  return JSON.parse(atob(token.split('.')[1])).payload
}

const App = () => {
  const navigate = useNavigate()

  const [user, setUser] = useState(getUserFromToken())
  const [posts, setPosts] = useState([])
  const [comments,setComments] = useState([])
  const [postId, setPostId] = useState(null)
  const [showComments, setShowComments] = useState(false)


  useEffect(() => {
    const fetchAllPosts = async () => {
      const postsData = await postService.index()
      setPosts(postsData)
    }
    if (user) fetchAllPosts()
  }, [user])

  const handleAddPost = async (formData) => {
    const newPost = await postService.create(formData)
    setPosts([newPost, ...posts])
    navigate('/posts')
  }

  const openComments = async (postId) => {
    const data = await commentService.index(postId)
    setComments(data)
    setShowComments(true)
    setPostId(postId)
  }

  const closeComments = () => {
    setShowComments(false)
    setPostId(null)
  }
    
  
  return (
    <div>
      <Nav user={user} setUser={setUser} />
      <main className="app-main">
      <Routes>
        <Route path='/' element={user ? <Dashboard user={user} /> : <Landing />} />
        {user ? (
          <>
            <Route path='/posts' element={<PostList posts={posts} openComments={openComments} />} />
            <Route path='/posts/:postId' element={<PostDetails user={user} />} />
            <Route path='/posts/new' element={<PostForm handleAddPost={handleAddPost} />} />
          </>
        ) : (
          <>
            <Route path='/sign-up' element={<SignUpForm setUser={setUser} />} />
            <Route path='/sign-in' element={<SignInForm setUser={setUser} />} />
          </>
        )}
      </Routes>
      {showComments && <Comments postId={postId} comments={comments} closeComments={closeComments} />}
      </main>
    </div>
  )
}

export default App