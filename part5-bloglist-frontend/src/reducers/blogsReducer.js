import blogService from '../services/blogs'

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'ALL',
      data: {
        blogs: blogs
      }
    })
  }
}

export const addBlog = (newBlog) => {
  return async dispatch => {
    const blog = await blogService.create(newBlog)
    dispatch({
      type: 'NEW',
      data: {
        blog: blog
      }
    })
  }
}

export const changeBlog = (changedBlog) => {
  return async dispatch => {
    const blog = await blogService.change(changedBlog)
    dispatch({
      type: 'CHANGE',
      data: {
        blog: blog
      }
    })
  }
}

export const removeBlog = (deleteBlog) => {
  return async dispatch => {
    const blog = await blogService.deleteBlog(deleteBlog)
    dispatch({
      type: 'DELETE',
      data: {
        blog: blog
      }
    })
    return blog
  }
}



const blogsReducer = (state = [], action) => {
  switch (action.type)  {
  case 'ALL': {
    return action.data.blogs
  }
  case 'NEW': {
    return state.concat(action.data.blog)
  }
  case 'CHANGE': {
    const newBlogList = state.filter(blog => blog.id !== action.data.blog.id)
    return newBlogList.concat(action.data.blog).sort((a, b) => a.likes > b.likes ? -1 : a.likes < b.likes ? 1 : 0)
  }
  case 'DELETE': {
    return state.filter(blog => blog.id !== action.data.blog.id)
  }
  default:
    return state
  }
}

export default blogsReducer