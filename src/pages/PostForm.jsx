import { useState } from 'react'
import { useNavigate } from 'react-router'
import * as postService from '../services/posts'
import { useEffect } from 'react'
import {Link} from 'react-router'
import { useParams } from 'react-router'

const PostForm = (props) => {

  const navigate = useNavigate()
  const { postId } = useParams()

    const initialState = {
        title: '',
        text: '',
        image: '',
    }
    const [formData, setFormData] = useState(initialState)

    
    const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    
    if (postId) {
      props.handleUpdatePost(postId, formData)
    } else {
      props.handleAddPost(formData)
    }
    
    setFormData(initialState)
    navigate('/posts')
  }
  
  useEffect(() => {
     const fetchPost = async () => {
      const postData = await postService.show(postId)
      setFormData(postData)
     }
     if (postId) fetchPost()

      return () => setFormData(initialState)
  }, [postId])
  


  return (
    <main className='card'>
      <h2>{postId ? 'Edit Post' : 'Create New Post'}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='title-input'>Title</label>
        <input
          required
          type='text'
          name='title'
          id='title-input'
          value={formData.title}
          onChange={handleChange}
        />
        <label htmlFor='text-input'>Text</label>
        <textarea
          required
          type='text'
          name='text'
          id='text-input'
          value={formData.text}
          onChange={handleChange}
        />
        <label htmlFor='image-input'>Image</label>
        <input
        id="image"
          name='image'
          value={formData.image}
          onChange={handleChange}
        />
        <button type='submit'>SUBMIT</button>
      </form>
    </main>
  )
}

export default PostForm