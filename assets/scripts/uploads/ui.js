'use strict'

const api = require('./api')

const showUploadsTemplate = require('../templates/uploads-table.handlebars')

const success = function (data) {
  resetTable()
  $('#message_02').show()
  $('#message_02').text('Successfully uploaded a file!').fadeOut(5000)
  $('#multipart-form-data').trigger('reset')
}

const error = function () {
  $('#message_02').show()
  $('#message_02').text('Error on uploading a file! Try again.').fadeOut(5000)
}

const onGetUploadsSuccess = function (data) {
  const showUploadsHtml = showUploadsTemplate({ uploads: data.uploads })
  $('#message_02').show()
  $('#message_02').text('Here are the files!').fadeOut(5000)
  $('.uploads-table').append(showUploadsHtml)
  $('.edit-btn').on('click', onEditUpload)
  $('.delete-btn').on('click', onDeleteUpload)
  $('#refresh').on('click', resetTable)
  $('.createdDate').each(function () {
    $(this).html($(this).html().split('T')[0])
  })
  $('.updatedDate').each(function () {
    $(this).html($(this).html().split('T')[0])
  })
  $('.td-tags').each(function () {
    if ($(this).children()[0].innerHTML) {
      if ($(this).children()[0].innerHTML === '# ') {
        $(this).children()[0].innerHTML = ''
      }
    }
  })
  $('.hashtag').on('click', function () {
    const value = $(this).html().replace(/#/g, '')
    $('.uploads-table').html('')
    api.getUploads(value)
      .then(onGetUploadsSuccess)
      .catch(onGetUploadsFailure)
  })
}

const onGetUploadsFailure = function () {
  $('#message_02').show()
  $('#message_02').text('Error on getting files. Try again.').fadeOut(5000)
}

const onEditUpload = function () {
  const elementId = $(this).parent().parent().attr('data-id')
  const fileName = $(this).parent().siblings()[0]
  const tags = $(this).parent().siblings()[4]
  fileName.contentEditable = true
  tags.contentEditable = true
  $('#message_02').show()
  $('#message_02').text('File succesfully edited.').fadeOut(5000)
  $(fileName).css('background-color', 'rgba(255, 255, 0, 0.5)') // Show user editable fields
  $(tags).css('background-color', 'rgba(255, 255, 0, 0.5)')
  $(tags).html('')
  $(fileName).keydown(function (e) { // Prevent user from adding new lines in table
    if (e.which === 13) { // 13 --> enter key
      fileName.blur()
    }
  })
  $(tags).keydown(function (e) {
    if (e.which === 13) {
      tags.blur()
    }
  })
  $(this).next().hide() // Hide delete button
  $(this).parent().append('<button class="btn btn-info confirm-edit-btn">Confirm</button>')
  $(this).hide() // Hide edit button
  $('.confirm-edit-btn').on('click', function () {
    onConfirmEdit(elementId, fileName, tags)
  })
}

const onConfirmEdit = function (elementId, fileName, tags) {
  const newFileName = $(fileName).html()
  let newTags = $(tags).html().replace(/[^a-z0-9 ]/gi, '').split(' ')
  if (newTags[0] === '') {
    newTags = null
  }
  const data =
    {
      upload: {
        name: newFileName,
        tags: newTags
      }
    }
  api.editUpload(elementId, data)
    .then(onEditUploadSuccess)
    .catch(onEditUploadFailure)
}

const onEditUploadSuccess = function (data) {
  $('#message_02').show()
  $('#message_02').text('Success on editing file.').fadeOut(5000)
  resetTable()
}

const onEditUploadFailure = function () {
  $('#message_02').show()
  $('#message_02').text('Error on editing file. Try again.').fadeOut(5000)
}

const onDeleteUpload = function () {
  const elementId = $(this).parent().parent().attr('data-id')
  $(this).parent().append('<button class="btn btn-danger confirm-delete-btn">Confirm</button>')
  $(this).parent().append('<button class="btn btn-default cancel-delete-btn">Cancel</button>')
  const editBtn = $(this).siblings()[0]
  $(editBtn).remove()
  $(this).remove()
  $('.confirm-delete-btn').on('click', function () {
    api.deleteUpload(elementId)
      .then(onDeleteUploadSuccess)
      .catch(onDeleteUploadFailure)
  })
  $('.cancel-delete-btn').on('click', function () {
    $(this).siblings().each(function () {
      $(this).remove()
    })
    $(this).parent().append('<button class="btn btn-info edit-btn">Edit</button>')
    $(this).parent().append('<button class="btn btn-danger delete-btn">Delete</button>')
    $('.edit-btn').on('click', onEditUpload)
    $('.delete-btn').on('click', onDeleteUpload)
    $(this).remove()
  })
}

const onDeleteUploadSuccess = function (data) {
  resetTable()
  $('#message_02').show()
  $('#message_02').text('File succesfully deleted.').fadeOut(5000)
}

const onDeleteUploadFailure = function () {
  $('#message_02').show()
  $('#message_02').text('Error on deleting file. Try again.').fadeOut(5000)
}

const resetTable = function () {
  $('.uploads-table').html('')
  api.getUploads()
    .then(onGetUploadsSuccess)
    .catch(onGetUploadsFailure)
}

module.exports = {
  success,
  error,
  onGetUploadsSuccess,
  onGetUploadsFailure,
  onEditUpload,
  onEditUploadFailure,
  onDeleteUpload,
  onDeleteUploadSuccess,
  onDeleteUploadFailure,
  resetTable
}
