import React, { Component } from 'react'
import '../styles/screen.sass'
import Api from './Api'

class App extends Component {

  static propTypes = {
    children: React.PropTypes.element
  }

  constructor () {
    super()

    this.state = {
      questions: [],
      answers: [],
      users: [],
      followings: []
    }
  }

  reloadQuestions () {
    window.fetch(`${Api.url}/questions`, {
      headers: { 'Authorization': Api.bearer_token, 'Content-Type': 'application/json' }})
      .then((response) => response.json())
      .then((data) => {
        this.setState({questions: data})
      })
  }

  reloadAnswers () {
    Api.access('answers', 'GET').then((answers) => {
      this.setState({answers: answers})
    })
  }

  componentWillMount () {
    this.reloadQuestions()
    this.reloadAnswers()
    this.reloadUsers()
    this.reloadFollowings()
  }

  answersForQuestion = (question) => {
    return this.state.answers.filter((answer) => {
      return answer.question_id === question.id
    })
  }

  reloadFollowings () {
    Api.access('followings', 'GET').then((followings) => {
      // Make sure we are storing the followings as integers
      followings.forEach((following) => {
        following.me = parseInt(following.me)
        following.them = parseInt(following.them)
      })

      this.setState({followings: followings})
    })
  }

  reloadUsers () {
    Api.access('users', 'GET').then((users) => {
      this.setState({users: users})
    })
  }

  getUser = (userId) => {
    let defaultUser = { picture: '', name: '' }

    return this.state.users.find((user) => user.id === userId) || defaultUser
  }

  get todaysQuestion () {
    let question = this.state.questions.find((question) => question.day_posted === '2016-09-28')

    if (question) {
      return question
    } else {
      // Return something meaningful here
      return { text: 'Oooops', day_posted: 'Never' }
    }
  }

  // Return if we are following this user
  isFollowing (other_user_id) {
    return this.getFollowing(this.auth.getUserId(), other_user_id)
  }

  // returns something if the given user is following
  getFollowing = (my_own_id, other_user_id) => {
    return this.state.followings.find((following) => {
      return (following.me === my_own_id && following.them === other_user_id)
    })
  }

  recordFollowing = (my_own_id, other_user_id) => {
    if (this.getFollowing(my_own_id, other_user_id)) {
      // Already have this following!
      return
    }

    Api.access('followings', 'POST', { me: my_own_id, them: other_user_id }).then(() => {
      this.reloadFollowings();
    })
  }

  removeFollowing = (following_id) => {
    Api.access(`followings/${following_id}`, 'DELETE').then(() => {
      this.reloadFollowings();
    })
  }

  submitAnswer = (text) => {
    const { auth } = this.props.route
    if (auth.loggedIn()) {
      let question = this.todaysQuestion

      window.fetch(`${Api.url}/answers`, {
        method: 'POST',
        headers: { 'Authorization': Api.bearer_token, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: text,
          question_id: question.id,
          user_id: auth.getUserId()
        })
      }).then(() => this.reloadAnswers())
    }
  }

  render () {
    return <div className='app-container'>
      {React.cloneElement(this.props.children,
        {
          auth: this.props.route.auth,
          todaysQuestion: this.todaysQuestion,
          submitAnswer: this.submitAnswer,
          answersForQuestion: this.answersForQuestion,
          getUser: this.getUser,
          recordFollowing: this.recordFollowing,
          getFollowing: this.getFollowing,
          removeFollowing: this.removeFollowing,
          isFollowing: this.isFollowing
        })}
    </div>
  }
}

export default App
