import React, { Component } from 'react'
import '../styles/screen.sass'
import moment from 'moment'

class Answer extends Component {

  isFromToday () {
    return this.createdAt.getDay() === new Date().getDay() &&
        this.createdAt.getMonth() === new Date().getMonth() &&
        this.createdAt.getFullYear() === new Date().getFullYear()
  }

  // Turn the created_at into a real JavaScript Date object
  get createdAt () {
    return new Date(Date.parse(this.props.answer.created_at))
  }

  render () {
    let user = this.props.getUser(this.props.answer.user_id)

    let displayedAnswerTime = this.isFromToday() ? moment().to(this.createdAt) : moment(this.createdAt).format('dddd, MMMM Do YYYY')

    return <div className='response-lists'>
      <div className='my-friend'>
        <img src={user.picture} />
        <div className='friend-response'>
          <p className='friend-response-name'>{user.name}</p>
          <p className='friend-response-ago'>{displayedAnswerTime}</p>
          <p className='friend-response-answer'>{this.props.answer.text}</p>
        </div>
      </div>
    </div>
  }
}

export default Answer
