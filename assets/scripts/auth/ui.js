'use strict'
const store = require('../store')
const uploadApi = require('../uploads/api')
const uploadUi = require('../uploads/ui')

const resetFormFields = function () {
  $('#sign-in').trigger('reset')
  $('#change-password').trigger('reset')
  $('#sign-up').trigger('reset')
}

const signUpSuccess = function (data) {
  $('#message').show()
  $('#message').text('Successfully signed up, go ahead and sign in!')
  $('#message').fadeOut(5000)
  resetFormFields()
}

const signUpFailure = function () {
  $('#message').show()
  $('#message').text('Failure on signing up. E-mail and/or password already taken. Try again.').fadeOut(5000)
  resetFormFields()
}

const signInSuccess = function (data) {
  $('#message').show()
  $('#message').text('Successfully signed in!').fadeOut(5000)
  $('.initial-hide').show()
  $('.secondary-hide').hide()
  store.user = data.user
  $('#auth-modal').modal('hide')
  resetFormFields()

  uploadApi.getUploads()
    .then(uploadUi.onGetUploadsSuccess)
    .catch(uploadUi.onGetUploadsFailure)
}

const signInFailure = function () {
  $('#message').show()
  $('#message').text('Failure on signing in. Try again.').fadeOut(5000)
  resetFormFields()
}

const changePasswordSuccess = function (data) {
  $('#message').show()
  $('#message').text('Password changed!')
  $('#message').fadeOut(5000)
  resetFormFields()
}

const changePasswordFailure = function () {
  $('#message').show()
  $('#message').text('Failure on changing password. Try again.').fadeOut(5000)
  resetFormFields()
}

const signOutSuccess = function (data) {
  $('#message').show()
  $('#message').text('Signed out!')
  $('.initial-hide').hide()
  $('.secondary-hide').show()
  $('#message').fadeOut(5000)
  $('#auth-modal').modal('hide')
  store.user = null
  $('.uploads-table').html('')
  resetFormFields()
}

const signOutFailure = function () {
  $('#message').show()
  $('#message').text('Failure on signing out. Try Again.')
  $('#message').fadeOut(5000)
  resetFormFields()
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure
}
