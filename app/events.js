'use strict'
const mtgApi = require('./api.js')
const getFormFields = require('../lib/get-form-fields.js')
const appUi = require('./ui.js')
const store = require('./store')

const onSignUp = function (event) {
  event.preventDefault()
  console.log('Signed Up')

  const form = event.target
  const authData = getFormFields(form)
  console.log(authData)

  mtgApi
    .signUp(authData)
    .then(appUi.onSignUpSuccess)
    .catch(appUi.onSignUpFailure)
}

const onSignIn = function (event) {
  event.preventDefault()
  const form = event.target
  const authData = getFormFields(form)
  console.log(authData)

  mtgApi
    .signIn(authData)
    .then(appUi.onSignInSuccess)
    .then(res => {
      store.game = res.game
      console.log(store)
    })
    .catch(appUi.onSignInFailure)
  console.log('Welcome, Professor!')
}

const onSignOut = function (event) {
  event.preventDefault()
  console.log('signed out')

  const form = event.target
  const authData = getFormFields(form)
  console.log(authData)

  mtgApi
    .signOut(authData)
    .then(appUi.onSignOutSuccess)
    .catch(appUi.onSignOutFailure)
}

module.exports = {
  onSignUp,
  onSignIn,
  onSignOut
}
