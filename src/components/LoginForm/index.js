import {Component} from 'react'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = () => {
    const {history} = this.props

    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess()
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderPasswordField = () => {
    const {password} = this.state

    return (
      <>
        <label className="inputLabel" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="passwordInputField"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state

    return (
      <>
        <label className="inputLabel" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="usernameInputField"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Username"
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    return (
      <div className="loginFormContainer">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          alt="website logo"
          className="loginWebsiteLogoMobileImg"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          alt="website login"
          className="loginImg"
        />
        <form className="formContainer" onSubmit={this.submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            alt="website logo"
            className="loginWebsiteLogoDesktopImg"
          />
          <div className="inputContainer">{this.renderUsernameField()}</div>
          <div className="inputContainer">{this.renderPasswordField()}</div>
          <button className="loginButton" type="submit">
            Login
          </button>
          {showSubmitError && <p className="errorMessage">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
