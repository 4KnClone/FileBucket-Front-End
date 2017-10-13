'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const authEvents = require('./auth/events.js')
const uploadEvents = require('./uploads/events')

$(() => {
  setAPIOrigin(location, config)
  authEvents.addHandlers()
  $('.initial-hide').hide()
  $('#multipart-form-data').on('submit', uploadEvents.createUploadMultiPart)
  $(document).on('change', ':file', function () {
    const input = $(this)
    const numFiles = input.get(0).files ? input.get(0).files.length : 1
    const label = input.val().replace(/\\/g, '/').replace(/.*\//, '')
    input.trigger('fileselect', [numFiles, label])
  })
  $(':file').on('fileselect', function (event, numFiles, label) {
    const input = $(this).parents('.input-group').find(':text')
    const log = numFiles > 1 ? numFiles + ' files selected' : label
    if (input.length) {
      input.val(log)
    }
  })
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
