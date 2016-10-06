import React, { Component } from 'react'
import '../styles/screen.sass'
import moment from 'moment'
import { Link } from 'react-router'

class Answer extends Component {
  beforeTheFoldTextLength = 140

  constructor (props) {
    super(props)

    this.state = { expanded: false }
  }

  isFromToday () {
    return this.createdAt.getDay() === new Date().getDay() &&
        this.createdAt.getMonth() === new Date().getMonth() &&
        this.createdAt.getFullYear() === new Date().getFullYear()
  }

  // Turn the created_at into a real JavaScript Date object
  get createdAt () {
    let created_at = Date.parse(this.props.answer.created_at)
    let now = new Date()

    if (created_at > now) {
      created_at = now
    }

    return new Date(created_at)
  }

  get displayQuestion () {
    if (this.props.showsQuestion)
    {
      let question = this.props.questionForId(this.props.answer.question_id)
      return <p className='friend-response-question'>{question.text}</p>
    } else {
      return ''
    }
  }

  expandAnswer = () => {
    this.setState({expanded: true})
  }

  get answerText () {
    if (this.props.answer.text.length <= this.beforeTheFoldTextLength || this.state.expanded === true) {
      return this.props.answer.text
    }

    return <span>{this.props.answer.text.substring(0, this.beforeTheFoldTextLength)}...<span className='show-more' onClick={this.expandAnswer}>(more)</span></span>
  }

  render () {
    let user = this.props.getUser(this.props.answer.user_id)

    let displayedAnswerTime = this.isFromToday() ? moment().to(this.createdAt) : moment(this.createdAt).format('dddd, MMMM Do YYYY')

    return <div className='response-lists'>
      <div className='my-friend'>
        <img src={user.picture} />
        <div className='friend-response'>
          <p className='friend-response-name'><Link to={`/profile/${user.id}`}>{user.name}</Link></p>
          <p className='friend-response-ago'>{displayedAnswerTime}</p>
          {this.displayQuestion}
          <p className='friend-response-answer'>{this.answerText}</p>
        </div>
      </div>
    </div>
  }
}

export default Answer
