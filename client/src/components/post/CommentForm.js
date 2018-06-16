import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import TextAreaFieldGroup from '../common/TextAreaFieldGroup'

import { addComment } from '../../actions/postActions'

class CommentForm extends Component {
  static propTypes = {
    addComment: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired
  }

  state = {
    text: '',
    errors: {}
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errors && Object.keys(nextProps.errors).length > 0) {
      return {
        ...prevState,
        errors: nextProps.errors
      }
    }

    if (Object.keys(nextProps.errors).length === 0) {
      return {
        ...prevState,
        errors: nextProps.errors
      }
    }

    return null
  }

  onSubmit = (e) => {
    e.preventDefault()

    const { user } = this.props.auth
    const { postId } = this.props
    const newComment = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    }

    this.props.addComment(postId, newComment)
    this.setState({ text: '' })
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { errors } = this.state

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            Make a comment...
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder='Reply to post'
                  name='text'
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.text}
                />
              </div>
              <button type="submit" className="btn btn-dark">Submit</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
})

export default connect(mapStateToProps, { addComment })(CommentForm)