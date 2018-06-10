import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class ProfileGithub extends Component {
  static propTypes = {
    username: PropTypes.string.isRequired
  }

  state = {
    clientId: 'aec87c6aee778d471b2d',
    clientSecret: '45beeabfc60ebd94a2043469b38323a666b8d981',
    count: 5,
    sort: 'created: asc',
    repos: []
  }

  componentDidMount() {
    const { username } = this.props
    const { count, sort, clientId, clientSecret } = this.state

    fetch(`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ repos: data })
      })
      .catch(e => console.log('e', e))
  }

  render() {
    const { repos } = this.state
    const repoItems = repos.map(repo => (
      <div key={repo.id} className='card card-body mb-2'>
        <div className='row'>
          <div className='col-md-6'>
            <h4>
              <Link to={repo.html_url} className='text-info' target='_blank'>
                {repo.name}
              </Link>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div className='col-md-6'>
            <span className='badge badge-info mr-1'>
              Stars: {repo.stargazers_count}
            </span>
            <span className='badge badge-secondary mr-1'>
              Watchers: {repo.watchers_count}
            </span>
            <span className='badge badge-success'>
              Forks: {repo.forks_count}
            </span>
          </div>
        </div>
      </div>
    ))
    return (
      <div>
        <hr />
        <h3 className='mb-4'>Latest Github Repos</h3>
        {repoItems}
      </div>
    )
  }
}

export default ProfileGithub