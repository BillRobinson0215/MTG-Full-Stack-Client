'use strict'
const store = require('./store')
const config = require('./config.js')

const signUp = function (data) {
  return $.ajax({
    method: 'POST',
    url: config.apiUrl + '/sign-up',
    data
  })
}

const signIn = function (data) {
  return $.ajax({
    method: 'POST',
    url: config.apiUrl + '/sign-in',
    data
  })
}

const signOut = function () {
  return $.ajax({
    method: 'DELETE',
    url: config.apiUrl + '/sign-out',
    headers: {
      Authorization: 'Bearer ' + store.user.token
    }
  })
}

const changePassword = function (data) {
  return $.ajax({
    method: 'PATCH',
    url: config.apiUrl + '/change-password',
    headers: {
      Authorization: 'Bearer ' + store.user.token
    },
    data
  })
}

const createCollection = function (data) {
  return $.ajax({
    method: 'POST',
    url: config.apiUrl + '/collection/new',
    data
  })
}

const showCollection = function (data) {
  return $.ajax({
    method: 'GET',
    url: config.apiUrl + '/collection/:id',
    data
  })
}
// '/collection/:id/:cardId'
const updateCollection = function (collectionId, cardId) {
  console.log(collectionId)
  console.log(cardId)
  return $.ajax({
    method: 'PATCH',
    url: config.apiUrl + '/collection/' + collectionId._id + '/' + cardId
  })
}

const deleteCollection = function (data) {
  return $.ajax({
    method: 'DELETE',
    url: config.apiUrl + '/collection/delete/:id',
    data
  })
}

const cardSearch = function (data) {
  return $.ajax({
    method: 'GET',
    url: config.apiUrl + '/cards/' +
    data
  })
}

module.exports = {
  signUp,
  signIn,
  signOut,
  changePassword,
  createCollection,
  showCollection,
  updateCollection,
  deleteCollection,
  cardSearch
}
