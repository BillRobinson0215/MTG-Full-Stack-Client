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
  $('form').trigger('reset')
  store.user = response.user
  console.log(store)
  $('.modal-bg').hide(750)
  $('.collection').show()
}

const onSignInFailure = function () {
  $('.message').text('Access Denied.')
}

const onSignOutSuccess = function () {
  $('.modal-bg').show(750)
  $('.collection').hide()
}
const onSignOutFailure = function () {
  $('.message').text('Failed to sign out')
}

const onCardSearchFailure = function () {
  $('.message').text('No cards found.')
}

const onChangePasswordSuccess = function () {
  $('form').trigger('reset')
  console.log('password changed')
}

const onCardSearchSuccess = function (response) {
  const card = response

  for (const field in card) {
    $('.card').show()
    $('.card').append('<li class="details">' + field + ': ' + card[field] + '</li>')
  }
  $('.card').append('<button id="addCard">Add Card</button>')
}

module.exports = {
  onSignUpFailure,
  onSignUpSuccess,
  onSignInFailure,
  onSignInSuccess,
  onSignOutFailure,
  onSignOutSuccess,
  onCardSearchSuccess,
  onCardSearchFailure,
  onChangePasswordSuccess
}
