'use strict'
const store = require('./store')

const onSignUpSuccess = function () {
  $('.message').text('New account created, Professor.')
  $('form').trigger('reset')
  console.log('success')
}
const onSignUpFailure = function () {
  $('.message').text('Invalid entry.')
  console.log('fail')
}

const onSignInSuccess = function (response) {
  $('.message').text('Welcome back, Professor.')
  $('form').trigger('reset')
  store.user = response.user
  console.log(store)
  $('.in').hide(1000)
  $('.out').show(1000)
  $('.row').show(1750)
  $('.btnRestart').show(2000)
}

const onSignInFailure = function () {
  $('.message').text('Access Denied.')
}

const onSignOutSuccess = function () {
  $('.message').text('Good-Bye Professor.')
  $('form').trigger('reset')
  $('.in').show(1000)
  $('.out').hide()
  $('.row').hide(1000)
  $('.btnRestart').hide(1000)
}
const onSignOutFailure = function () {
  $('.message').text('Failed to sign out')
}

const onStartNewSuccess = function (response) {
  $('.message').text('X moves first.')
  store.game = response.user
}

module.exports = {
  onSignUpFailure,
  onSignUpSuccess,
  onSignInFailure,
  onSignInSuccess,
  onSignOutFailure,
  onSignOutSuccess,
  onStartNewSuccess
}
