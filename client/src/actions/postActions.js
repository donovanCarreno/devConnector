import axios from 'axios'

import {
  ADD_POST,
  GET_POSTS,
  GET_POST,
  GET_ERRORS,
  CLEAR_ERRORS,
  POST_LOADING,
  DELETE_POST
} from './types'

// Add Post
export const addPost = postData => dispatch => {
  dispatch(clearErrors())
  axios
    .post('/api/posts', postData)
    .then(res => dispatch({
      type: ADD_POST,
      payload: res.data
    }))
    .catch(e => dispatch({
      type: GET_ERRORS,
      payload: e.response.data
    }))
}

// Get Posts
export const getPosts = () => dispatch => {
  dispatch(setPostLoading())
  axios
    .get('/api/posts')
    .then(res => dispatch({
      type: GET_POSTS,
      payload: res.data
    }))
    .catch(e => dispatch({
      type: GET_POSTS,
      payload: null
    }))
}

// Get Post
export const getPost = (postId) => dispatch => {
  dispatch(setPostLoading())
  axios
    .get(`/api/posts/${postId}`)
    .then(res => dispatch({
      type: GET_POST,
      payload: res.data
    }))
    .catch(e => dispatch({
      type: GET_POST,
      payload: null
    }))
}

// Delete Post
export const deletePost = postId => dispatch => {
  axios
    .delete(`/api/posts/${postId}`)
    .then(res => dispatch({
      type: DELETE_POST,
      payload: postId
    }))
    .catch(e => dispatch({
      type: GET_ERRORS,
      payload: e.response.data
    }))
}

// Add Like
export const addLike = postId => dispatch => {
  axios
    .post(`/api/posts/like/${postId}`)
    .then(res => dispatch(getPosts()))
    .catch(e => dispatch({
      type: GET_ERRORS,
      payload: e.response.data
    }))
}

// Remove Like
export const removeLike = postId => dispatch => {
  axios
    .post(`/api/posts/unlike/${postId}`)
    .then(res => dispatch(getPosts()))
    .catch(e => dispatch({
      type: GET_ERRORS,
      payload: e.response.data
    }))
}

// Add Comment
export const addComment = (postId, commentData) => dispatch => {
  dispatch(clearErrors())
  axios
    .post(`/api/posts/comment/${postId}`, commentData)
    .then(res => dispatch({
      type: GET_POST,
      payload: res.data
    }))
    .catch(e => dispatch({
      type: GET_ERRORS,
      payload: e.response.data
    }))
}

// Delete Comment
export const deleteComment = (postId, commentId) => dispatch => {
  axios
    .delete(`/api/posts/comment/${postId}/${commentId}`)
    .then(res => dispatch({
      type: GET_POST,
      payload: res.data
    }))
    .catch(e => dispatch({
      type: GET_ERRORS,
      payload: e.response.data
    }))
}

// Set loading state
export const setPostLoading = () => {
  return { type: POST_LOADING }
}

// clear errors
export const clearErrors = () => {
  return { type: CLEAR_ERRORS }
}
