'use strict'

const uploadApi = require('./api')
const uploadUi = require('./ui')

const createUploadMultiPart = function (event) {
  event.preventDefault()

  const formData = new FormData(event.target)
  uploadApi.createMulti(formData)
    .then(uploadUi.success)
    .catch(uploadUi.error)
}

module.exports = {
  createUploadMultiPart
}
