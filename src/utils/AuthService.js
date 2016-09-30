import Auth0Lock from 'auth0-lock'
import { browserHistory } from 'react-router'
import appIcon from '../../images/applogo.svg'

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
  }

  login = () => {
    // Call the show method to display the widget.
    this.lock.show()
  }

  loggedIn () {
    // Checks if there is a saved token and it's still valid
    return !!this.getToken()
  }

  setToken (idToken) {
    // Saves user token to localStorage
    window.localStorage.setItem('id_token', idToken)
  }

  getToken () {
    // Retrieves the user token from localStorage
    return window.localStorage.getItem('id_token')
  }

  logout () {
    // Clear user token and profile data from localStorage
    window.localStorage.removeItem('id_token')
  }
}
