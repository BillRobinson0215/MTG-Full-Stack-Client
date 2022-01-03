'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')
const authEvents = require('./events.js')
// use require without a reference to ensure a file is bundled

$(() => {
  $('#sign-up-form').on('submit', authEvents.onSignUp)
  $('#sign-in-form').on('submit', authEvents.onSignIn)
  $('#sign-out-form').on('submit', authEvents.onSignOut)
  $('#cardSearch').on('submit', authEvents.onCardSearch)
  $('#cp-show').on('click', authEvents.onChangePasswordShow)
  $('#cp-done').on('click', authEvents.onDone)
  $('#change-password-form').on('submit', authEvents.onChangePassword)
  // $('#addCard').on('click', authEvents.onAddCard)
})
