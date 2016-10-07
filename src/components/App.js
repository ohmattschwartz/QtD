import React, { Component } from 'react'
import '../styles/screen.sass'
import moment from 'moment'
import Api from './Api'

class App extends Component {

  static propTypes = {
    children: React.PropTypes.element,
    route: React.PropTypes.object
  }

  nilQuestion = { text: 'Oooops', day_posted: 'Never' }
  nilUser = { picture_large: '', name: '' }

  constructor (props) {
    super(props)

    props.route.auth.onUpdate = () => this.forceUpdate()

    this.state = {
      questions: [],
      answers: [],
      users: [],
      followings: []
    }
  }

  getUserId () {
    return this.props.route.auth.getUserId()
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

  answerForTodaysQuestion (userId) {
    const todaysQuestionId = this.todaysQuestion.id
    const answers = this.answersForUserId(userId)

    return answers.find((answer) => answer.question_id === todaysQuestionId)
  }

  myAnswers = () => {
    return this.state.answers.filter((answer) => {
      return answer.user_id === this.getUserId()
    })
  }

  answersForQuestion = (question) => {
    return this.state.answers.filter((answer) => {
      return answer.question_id === question.id
    })
  }

  answersForUserId = (userId) => {
    return this.state.answers.filter((answer) => {
      return answer.user_id === userId
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
    return this.state.users.find((user) => user.id === userId) || this.nilUser
  }

  get todaysQuestion () {
    const today = moment().format('YYYY-MM-DD')

    const question = this.state.questions.find((question) => question.day_posted === today) || this.nilQuestion

    return question
  }

  questionForId = (questionId) => {
    const question = this.state.questions.find((question) => question.id === questionId) || this.nilQuestion

    return question
  }

  followingsForUserId = (userId) => {
    return this.state.followings.filter((following) => {
      return (following.me === userId)
    })

  }

  myFollowings = () => {
    const my_own_id = this.getUserId()

    return this.followingsForUserId(my_own_id)
  }

  // Return if we are following this user
  isFollowing = (other_user_id) => {
    const my_own_id = this.getUserId()

    return this.state.followings.find((following) => {
      return (following.me === my_own_id && following.them === other_user_id)
    })
  }

  recordFollowing = (other_user_id) => {
    const my_own_id = this.getUserId()

    if (this.isFollowing(other_user_id)) {
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

  reviseAnswer = (text, answerId) => {
    const question = this.todaysQuestion

    return window.fetch(`${Api.url}/answers/${answerId}`, {
      method: 'PATCH',
      headers: { 'Authorization': Api.bearer_token, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: text,
        question_id: question.id,
        user_id: this.getUserId()
      })
    }).then(() => this.reloadAnswers())
  }

  submitAnswer = (text) => {
    if (this.props.route.auth.loggedIn()) {
      const question = this.todaysQuestion

      window.fetch(`${Api.url}/answers`, {
        method: 'POST',
        headers: { 'Authorization': Api.bearer_token, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: text,
          question_id: question.id,
          user_id: this.getUserId()
        })
      }).then(() => this.reloadAnswers())
    }
  }

  render () {
    return <div className='app-container'>
      <main>
        {React.cloneElement(this.props.children,
          {
            auth: this.props.route.auth,
            todaysQuestion: this.todaysQuestion,
            submitAnswer: this.submitAnswer,
            reviseAnswer: this.reviseAnswer,
            answersForQuestion: this.answersForQuestion,
            answersForUserId: this.answersForUserId,
            getUser: this.getUser,
            recordFollowing: this.recordFollowing,
            removeFollowing: this.removeFollowing,
            myFollowings: this.myFollowings,
            isFollowing: this.isFollowing,
            myAnswers: this.myAnswers,
            questionForId: this.questionForId,
            answerForTodaysQuestion: this.answerForTodaysQuestion,
            followingsForUserId: this.followingsForUserId
          })}
      </main>
      <footer>
        <div className='copyright-footer'>
          <p>Copyright &copy; 2016</p>
        </div>
        <div className='designed-by-footer'>
          <p><a href='https://github.com/ohmattschwartz'>Designed by Matt Schwartz</a></p>
        </div>
        <div className='TIY-footer'>
          <img src={require('../../images/tiyLogo.png')} alt='TIY Logo' />
        </div>
      </footer>
    </div>
  }
}

export default App
