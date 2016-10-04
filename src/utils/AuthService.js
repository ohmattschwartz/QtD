import Auth0Lock from 'auth0-lock'
import { browserHistory } from 'react-router'
import appIcon from '../../images/applogo.svg'
import Api from '../components/Api'

const AUTH0_CLIENT_ID = 'XpW2Ua3re4XzerFfClZLX0GVzBrDVfLT'
const AUTH0_DOMAIN = 'questiontheday.auth0.com'

export default class AuthService {

  constructor () {
    // Configure Auth0
    this.lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN, {
      theme: {
        logo: appIcon
      },
      languageDictionary: {
        title: 'Question the Day'
      },
      auth: {
        responseType: 'token',
        redirectUrl: window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + '/'
      }
    })
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication)

    this.lock.on('authentication_error', (result) => {
      console.log('Auth Error', result)
    })
    this.lock.on('unrecoverable_error', (result) => {
      console.log('Unrecoverable Error', result)
    })
  }

  _doAuthentication = (authResult) => {
    // Saves the user token
    this.setToken(authResult.idToken)

    // Retrieve the auth0 user information matching this token
    this.fetchAuth0UserInfo(authResult.idToken)
  }

  login = () => {
    // Call the show method to display the widget.
    this.lock.show()
  }

  loggedIn () {
    // Checks if there is a saved token and it's still valid
    return !!this.getToken()
  }

  fetchAuth0UserInfo (idToken) {
    const auth0EndPoint = `https://${AUTH0_DOMAIN}/tokeninfo`

    window.fetch(auth0EndPoint, { method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_token: idToken }) }).then((response) => response.json()).then((userInfo) => {
        this.setUserInfo(userInfo)
      })
  }

  getUserId () {
    let savedID = window.localStorage.getItem('user_id')
    let integerID = parseInt(savedID)

    return integerID
  }

  setUserId (userId) {
    window.localStorage.setItem('user_id', userId)
    this.onUpdate && this.onUpdate()
  }

  getProfileImageURL () {
    const userInfo = this.getUserInfo()

    return userInfo ? userInfo.picture : ''
  }

  setUserInfo (userInfo) {
    // Create / update a user object in beoderp
    console.log(userInfo)
    // Use same property for picture from both APIs
    if (!userInfo.picture) {
      userInfo.picture = userInfo.picture_large
    }

    if (userInfo.picture.match('twimg')) {
      userInfo.picture = userInfo.picture.replace('normal.jpg', 'bigger.jpg')
    }

    // Fetch all the users
    Api.access('users', 'GET').then((users) => {
      let matchingUser = users.find((user) => user.user_id === userInfo.user_id)
      if (matchingUser) {
        this.setUserId(matchingUser.id)

        // Update the user
        Api.access(`users/${matchingUser.id}`, 'PATCH', userInfo)
      } else {
        Api.access(`users`, 'POST', userInfo).then((data) => {
          this.setUserId(data.id)
        })
      }
    })

    window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
    this.onUpdate && this.onUpdate()
  }

  getUserInfo (userInfo) {
    return JSON.parse(window.localStorage.getItem('userInfo'))
  }

  setToken (idToken) {
    // Saves user token to localStorage
    window.localStorage.setItem('id_token', idToken)
    this.onUpdate && this.onUpdate()
  }

  getToken () {
    // Retrieves the user token from localStorage
    return window.localStorage.getItem('id_token')
  }

  logout () {
    // Clear user token and profile data from localStorage
    window.localStorage.removeItem('id_token')
    window.localStorage.removeItem('userInfo')
    window.localStorage.removeItem('user_id')
  }
}
