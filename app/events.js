'use strict'
const mtgApi = require('./api.js')
const getFormFields = require('../lib/get-form-fields.js')
const appUi = require('./ui.js')
const store = require('./store')
let cardId = null
let collectionId = null

const onSignUp = function (event) {
  event.preventDefault()

  const form = event.target
  const authData = getFormFields(form)
  authData.credentials.email = authData.credentials.email.toLowerCase()
  mtgApi
    .signUp(authData)
    .then(appUi.onSignUpSuccess)
    .catch(appUi.onSignUpFailure)
}

const onSignIn = function (event) {
  event.preventDefault()
  const form = event.target
  const authData = getFormFields(form)
  authData.credentials.email.toLowerCase()

  mtgApi
    .signIn(authData)
    .then((response) => {
      console.log(response.collections)
      collectionId = response.collections._id
      console.log(collectionId)
      return response
    })
    .then(appUi.onSignInSuccess)
    .then((res) => {
      console.log(store)
    })
    .catch(appUi.onSignInFailure)
}

const onSignOut = function (event) {
  event.preventDefault()

  const form = event.target
  const authData = getFormFields(form)

  mtgApi
    .signOut(authData)
    .then(appUi.onSignOutSuccess)
    .catch(appUi.onSignOutFailure)
}

const onCardSearch = function (event) {
  event.preventDefault()
  $('.card').empty()
  const searchData = $('#cardName').val()

  mtgApi
    .cardSearch(searchData)
    .then(card => {
      const cardForm = {
        Name: card.cards.name,
        Mana_Cost: card.cards.manaCost,
        CMC: card.cards.convertedManaCost,
        Identity: card.cards.colorIdentity,
        Type: card.cards.type,
        SubType: card.cards.subtypes,
        Keywords: card.cards.keywords,
        Text: card.cards.text,
        Power: card.cards.power,
        Toughness: card.cards.toughness,
        Loyalty: card.cards.loyalty,
        Rarity: card.cards.rarity
      }
      cardId = card.cards._id
      return cardForm
    })
    .then((cardForm) => {
      appUi.onCardSearchSuccess(cardForm)
      $('#addCard').on('click', onAddCard)
    })
    .catch(appUi.onCardSearchFailure)
}

const onAddCard = function (event) {
  event.preventDefault()
  console.log('this button works')

  mtgApi
    .updateCollection(collectionId, cardId)
}

const onChangePasswordShow = function (event) {
  event.preventDefault()
  $('.collection').hide()
  $('.modal-cp').show(750)
}

const onChangePassword = function (event) {
  event.preventDefault()
  const form = event.target
  const authData = getFormFields(form)

  mtgApi
    .changePassword(authData)
    // .then(appUi.onSignUpSuccess)
    // .catch(appUi.onSignUpFailure)
}

const onDone = function (event) {
  event.preventDefault()
  $('.modal-cp').hide(750)
  $('.collection').show(200)
}

module.exports = {
  onSignUp,
  onSignIn,
  onSignOut,
  onCardSearch,
  onChangePasswordShow,
  onChangePassword,
  onDone,
  onAddCard
}
