import React, { Component } from 'react'
import '../styles/screen.sass'
import moment from 'moment'
import { Link } from 'react-router'

class Answer extends Component {
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

  render () {
    let user = this.props.getUser(this.props.answer.user_id)

    let displayedAnswerTime = this.isFromToday() ? moment().to(this.createdAt) : moment(this.createdAt).format('dddd, MMMM Do YYYY')

    return <div className='response-lists'>
      <div className='my-friend'>
        <img src={user.picture_large} />
        <div className='friend-response'>
          <p className='friend-response-name'><Link to={`/profile/${user.id}`}>{user.name}</Link></p>
          <p className='friend-response-ago'>{displayedAnswerTime}</p>
          {this.displayQuestion}
          <p className='friend-response-answer'>{this.props.answer.text}</p>
        </div>
      </div>
    </div>
  }
}

export default Answer
