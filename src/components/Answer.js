import React, { Component } from 'react'
import '../styles/screen.sass'

class Answer extends Component {
  render () {
    return <div className='response-lists'>
      <div className='my-friend'>
        <img src='images/avatarFour.jpg' />
        <div className='friend-response'>
          <p className='friend-response-name'>Matt Schwartz</p>
          <p className='friend-response-answer'>{this.props.answer.text}</p>
        </div>
      </div>
    </div>
  }
}

export default Answer
