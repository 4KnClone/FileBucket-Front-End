'use strict'

const store = require('../store')
const config = require('../config')

const createEnc = function (data) {
  return $.ajax({
    // ajax options go here
  })
}
const createMulti = function (formData) {
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

const getUploads = function (data) {
  const token = store.user.token
  return $.ajax({
    url: config.apiOrigin + '/uploads',
    method: 'GET',
    headers: {
      authorization: 'Token token=' + token
    },
    data
  })
}

const editUpload = function (id, data) {
  const token = store.user.token
  return $.ajax({
    url: config.apiOrigin + '/uploads/' + id,
    method: 'PATCH',
    headers: {
      authorization: 'Token token=' + token
    },
    data
  })
}

const deleteUpload = function (id) {
  const token = store.user.token
  return $.ajax({
    url: config.apiOrigin + '/uploads/' + id,
    method: 'DELETE',
    headers: {
      authorization: 'Token token=' + token
    }
  })
}

module.exports = {
  createEnc,
  createMulti,
  getUploads,
  editUpload,
  deleteUpload
}
