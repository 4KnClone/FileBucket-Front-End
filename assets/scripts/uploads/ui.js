'use strict'

const showUploadsTemplate = require('../templates/uploads-table.handlebars')

const success = function (data) {
  console.log('success data is:', data)
}

const error = function (error) {
  console.log('error is:', error)
}

const onGetUploadsSuccess = function (data) {
  const showUploadsHtml = showUploadsTemplate({ uploads: data.uploads })
  $('.table-body').append(showUploadsHtml)
}

const onGetUploadsFailure = function (error) {
  console.error(error)
}

module.exports = {
  success,
  error,
  onGetUploadsSuccess,
  onGetUploadsFailure
}
