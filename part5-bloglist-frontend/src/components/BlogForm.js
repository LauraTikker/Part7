import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogsReducer'

const BlogForm = (
  { showNotice, blogFormRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const handleNewPosts = async (event)  =>  {
    event.preventDefault()

    const newBlog = {
      title, author, url
    }
    blogFormRef.current.toggleVisibility()
    dispatch(addBlog(newBlog))
      .then(() => {
        showNotice(`New blog ${title} created ${newBlog.author}`, 'success')
        setTitle('')
        setAuthor('')
        setUrl('')
      })
      .catch(() => showNotice('Error creating a new post', 'error'))
  }

  return (
    <div className="form">
      <h2>Create</h2>
      <form onSubmit={handleNewPosts}>
        <div className="creating-new-blog">
          <span className="creating-new-blog-text">Title</span>
          <input
            id="title"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div className="creating-new-blog">
          <span className="creating-new-blog-text">Author</span>
          <input
            id="author"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div className="creating-new-blog">
          <span className="creating-new-blog-text">Url</span>
          <input
            id="url"
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id='submit-post' type="submit" className="creating-new-blog-button">Create</button>
      </form>
    </div>
  )
}
export default BlogForm