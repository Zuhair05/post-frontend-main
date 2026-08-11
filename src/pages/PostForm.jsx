import { useState } from 'react'
import { useNavigate } from 'react-router'
import * as postService from '../services/posts'
import { useEffect } from 'react'

const PostForm = (props) => {

  const navigate = useNavigate()

    const initialState = {
        title: '',
        text: '',
        image: '',
    }
    const [formData, setFormData] = useState(initialState)

    useEffect(() => {
       const fetchPost = async () => {
        const postData = await postService.show(props.postId)
        setFormData(postData)
       }
       if (props.postId) fetchPost()

        return () => setFormData(initialState)
    }, [props.postId])

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = (evt) => {
        evt.preventDefault()
        props.handleAddPost(formData)
        setFormData(initialState)
        navigate('/posts')
  }

  


  return (
    <main className='card'>
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