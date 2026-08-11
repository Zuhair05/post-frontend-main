const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/posts`

const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

const show = async (postId) => {
  try {
    const res = await fetch(`${BASE_URL}/${postId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

const create = async (postFormData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postFormData),
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

const update = async (postId, postFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${postId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postFormData),
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

const deletePost = async (postId) => {
  try {
    const res = await fetch(`${BASE_URL}/${postId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}




export { 
  index,
  show,
  create,
  update,
  deletePost
}