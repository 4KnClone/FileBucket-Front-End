'use strict'
const store = require('../store')
const uploadApi = require('../uploads/api')
const uploadUi = require('../uploads/ui')

const signUpSuccess = function (data) {
  $('#message').show()
  $('#message').text('Successfully signed up, go ahead and sign in!')
  $('#message').fadeOut(1800)
  $('input[type=text]').val('')
  $('input[type=password]').val('')
  const successSound = $('#successSound')[0]
  successSound.play()
}

const signInSuccess = function (data) {
  $('#message').show()
  $('#message').text('Successfully signed in!')
  $('.initial-hide').show()
  $('.secondary-hide').hide()
  $('#message').fadeOut(1800)
  store.user = data.user
  $('#auth-modal').modal('hide')

  $('input s[type=text]').val('')
  $('input[type=password]').val('')
  const successSound = $('#successSound')[0]
  successSound.play()

  uploadApi.getUploads()
    .then(uploadUi.onGetUploadsSuccess)
    .catch(uploadUi.onGetUploadsFailure)
}

const changePasswordSuccess = function (data) {
  $('#message').show()
  $('#message').text('Password changed!')
  $('#message').fadeOut(1800)
  $('input[type=password]').val('')
  const successSound = $('#successSound')[0]
  successSound.play()
}

const signOutSuccess = function (data) {
  $('#message').show()
  $('#message').text('Signed out!')
  $('.initial-hide').hide()
  $('.secondary-hide').show()
  $('#message').fadeOut(1800)
  $('#auth-modal').modal('hide')
  store.user = null

  $('.uploads-table').html('')
  const successSound = $('#successSound')[0]
  successSound.play()
}

const failure = function (error) {
  const failureSound = $('#failureSound')[0]
  failureSound.play()
  console.error(error)
  $('#message').show()
  $('#message').text('You messed up')
  $('#message').fadeOut(1800)
}

module.exports = {
  signUpSuccess,
  signInSuccess,
  changePasswordSuccess,
  signOutSuccess,
  failure
}
