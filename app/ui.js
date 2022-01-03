'use strict'
const store = require('./store')
const mtgApi = require('./api.js')
const mtgEvents = require('./events.js')
let collectionId = null

const onSignUpSuccess = function () {
  $('.message').empty()
  $('.message').text('New account created')
  $('form').trigger('reset')
}
const onSignUpFailure = function () {
  $('.message').empty()
  $('.message').text('Invalid entry.')
}

const onSignInSuccess = async function (response) {
  const collection = response.cardCollection[0].cards
  collectionId = response.cardCollection[0]._id
  $('.collection').empty()
  $('.collection').prepend('<h4 class="collection-header">Your Collection</h4>')
  const cardArray = await refreshCollection(collection)
  $('form').trigger('reset')
  store.user = response.user
  $('.modal-bg').hide(750)
  $('.collection-list').show()
  $('.collection').show()
  $('.message').empty()
  $('.message').text('Welcome')
  populateCollection(cardArray)
  removeCardActivate()
}

const refreshCollection = async function (collection) {
  const cardNames = []
  for (const card of collection) {
    await mtgApi
      .cardSearchId(card)
      .then((card) => {
        cardNames.push({
          name: card.cards.name,
          id: card.cards._id
        })
      })
  }
  return cardNames
}

const onSignInFailure = function () {
  $('.message').empty()
  $('.message').text('Access Denied.')
}

const populateCollection = function (cardArray) {
  for (const card of cardArray) {
    $('.collection').append('<li class="collection-details">' + card.name + '<button class="removeCard" id="' + card.id + '">Remove Card</button>' + '</li>')
  }
}

const removeCardActivate = function () {
  $('.removeCard').on('click', (event) => {
    onDeleteCard(event.target.id)
    removeElement(event.target)
  })
}

const removeElement = function (event) {
  $(event).closest('li').remove()
}

// function populateCollection(cardArray) {
//   const collection = document.querySelector('.collection')
//   for (const card of cardArray) {
//     // Create the li
//     const li = document.createElement('li')
//     li.class = 'collection-details'
//     li.textContent = card.name
//     // Create the button
//     const btn = document.createElement('btn')
//     btn.onclick = () => li.remove()
//     btn.class = 'removeCard'
//     btn.textContent = Remove Card
//     // Add button to li
//     li.appendChild(btn)
//     // Add li to collection
//     collection.append(li)
//   }
// }

const onSignOutSuccess = function () {
  $('.modal-bg').show(750)
  $('.collection').hide()
  $('.card').hide()
  $('.message').empty()
  $('.message').text('Good-Bye.')
}
const onSignOutFailure = function () {
  $('.message').empty()
  $('.message').text('Failed to sign out')
}

const onCardSearchFailure = function () {
  $('.message').empty()
  $('.message').text('No cards found.')
}

const onChangePasswordSuccess = function () {
  $('form').trigger('reset')
  $('.message').empty()
  $('.message').text('Password Changed')
}

const onChangePasswordFailure = function () {
  $('form').trigger('reset')
  $('.message').empty()
  $('.message').text('Change Password Failed.')
}

const onCardSearchSuccess = function (response) {
  const card = response

  for (const field in card) {
    $('.card').show()
    $('.card').append('<li class="details">' + field + ': ' + card[field] + '</li>')
  }
  $('.card').append('<button id="addCard">Add Card</button>')
  $('#addCard').on('click', mtgEvents.onAddCard)
}

const onDeleteCard = function (event) {
  mtgApi.deleteCard(collectionId, event)
    .then(() => {
    })
    .then(onDeleteCardSuccess)
    .catch(onDeleteCardFailure)
}

const onDeleteCardSuccess = function () {
  $('.message').empty()
  $('.message').text('Card Deleted.')
}

const onDeleteCardFailure = function () {
  $('.message').empty()
  $('.message').text('No cards found.')
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
  onChangePasswordSuccess,
  onChangePasswordFailure,
  populateCollection,
  removeCardActivate
}
