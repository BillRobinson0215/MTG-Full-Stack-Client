'use strict'
const mtgApi = require('./api.js')
const getFormFields = require('../lib/get-form-fields.js')
const appUi = require('./ui.js')
// const store = require('./store')
// const cardNames = []
let cardId = null
let collectionId = null
let cardName = null

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

// const promiseName = new Promise((resolve, reject) => {
//   for (const card of collection) {
//     mtgApi.cardSearchId(card).then((card) => {
//       cardNames.push(card.cards.name)
//     })
//   }
// })
const onSignIn = function (event) {
  event.preventDefault()
  const form = event.target
  const authData = getFormFields(form)
  authData.credentials.email.toLowerCase()

  mtgApi
    .signIn(authData)
    .then((response) => {
      collectionId = response.cardCollection
      return response
    })
    .then(appUi.onSignInSuccess)
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
      cardName = card.cards.name
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
  mtgApi
    .updateCollection(collectionId[0]._id, cardId)
  $('.collection').append('<li class="collection-details">' + cardName + '<button class="removeCard" id="' + cardId + '">Remove Card</button>' + '</li>')
  appUi.removeCardActivate()
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

// const onDeleteCard = function (event) {
//   // let deleteId = null
//   // const card = event.parent.text()
//   console.log('this button works')
//   // console.log(card)
//   // mtgApi
//   // .cardSearch(card)
//   // .then(() => {
//   //   deleteId = {
//   //     card: card.cards._id
//   //   }
//   //   return deleteId
//   // })
//   // .then(() =>
//   // mtgApi.deleteCard(collectionId, deleteId))
// }

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
