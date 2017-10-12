'use strict'

const store = require('../store')
const config = require('../config')

const createEnc = function (data) {
  return $.ajax({
    // ajax options go here
  })
}
const createMulti = function (formData) {
  console.log('formData is ', formData)
  return $.ajax({
    headers: {
      authorization: 'Token token=' + store.user.token
    },
    url: config.apiOrigin + '/uploads',
    method: 'POST',
    data: formData,
    processData: false,
    contentType: false
  })
}

const getUploads = function () {
  const token = store.user.token
  return $.ajax({
    url: config.apiOrigin + '/uploads',
    method: 'GET',
    headers: {
      authorization: 'Token token=' + token
    }
  })
}

module.exports = {
  createEnc,
  createMulti,
  getUploads
}
