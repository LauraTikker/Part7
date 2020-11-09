import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { changeBlog, removeBlog } from '../reducers/blogsReducer'

const Blog = ({ showNotice, user }) => {
  const id = useParams().id
  const [comment, setComment] = useState('')
  const allBlogs = useSelector(state => state.blogs)
  const oneBlog = allBlogs.find(blog => blog.id === id)

  const dispatch = useDispatch()

  const deleteButton = () => {
    if (user)  {
      if (oneBlog.author === user.name) {
        return (<button className="delete-blog" onClick={deleteBlog}>remove</button>)
      }else {
        return (<div>{`added by ${oneBlog.author}`}</div>)
      }
    } else {
      return (<div>{`added by ${oneBlog.author}`}</div>)
    }
  }

  const deleteBlog = async (event) => {
    event.preventDefault()
    const result = window.confirm(`Remove blog ${oneBlog.title} by ${oneBlog.author}?`)
    if (result) {
      let deletedBlog
      try {
        deletedBlog = await dispatch(removeBlog(oneBlog))
      } catch (error) {
        showNotice('The blog could not be removed', 'error')
      }
      if (deletedBlog) {
        showNotice('The blog was removed', 'success')
      }
    }
  }

  const handleLikes = (event) =>  {
    event.preventDefault()
    const newblog = {
      author: oneBlog.author,
      url: oneBlog.url,
      title: oneBlog.title,
      likes: oneBlog.likes + 1,
      id: oneBlog.id,
      comments: oneBlog.comments
    }
    dispatch(changeBlog(newblog)).catch(() => showNotice('Could not update likes', 'error'))
  }

  const handleComment = (event) => {
    event.preventDefault()
    const newblog = {
      author: oneBlog.author,
      url: oneBlog.url,
      title: oneBlog.title,
      likes: oneBlog.likes,
      id: oneBlog.id,
      comments: oneBlog.comments ? oneBlog.comments.concat(comment) : comment
    }
    dispatch(changeBlog(newblog)).then(() => {
      setComment('')
      showNotice('Comment was added', 'success')
    }
    ).catch(() => showNotice('Could not add the comment', 'error'))
  }

  const commentsView = () => {
    return (
      <div>
        <form onSubmit={handleComment}>
          <label>Write comment here: </label>
          <input id="comment" type="text" value={comment} onChange={({ target }) => setComment(target.value)}></input>
          <button id='submit-commet' type="submit" className="creat-new-comment" >comment</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      {oneBlog ?
        <div className="blog">
          <h2>{`${oneBlog.title} ${oneBlog.author}`}</h2>
          <div>Url: <a href="url">{oneBlog.url}</a></div>
          <div id='likes'>Likes: {oneBlog.likes} <button id='likes-button' onClick={handleLikes}>like</button></div>
          <div>{deleteButton()}</div>
          <div>{commentsView()}</div>
          <div>{oneBlog.comments ? oneBlog.comments.map(comment => <li key={comment}>{comment}</li>) : null}</div>
        </div>  : null
      }
    </div>
  )
}
export default Blog