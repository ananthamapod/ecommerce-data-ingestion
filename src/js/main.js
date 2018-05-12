import Resumable from 'resumablejs'
import NProgress from 'nprogress'
import $ from 'jquery'

var r = new Resumable({
  target: '/api/upload',
  chunkSize: 1024
})
var fileInfo = $('#fileInfo'),
  dropzone = $('#dropzone'),
  fileSubmitButton = $('#submit'),
  fileChooser = $('#fileChooser'),
  nothingToUploadMessage = $('#nothingToUploadMessage')


// if resumable is not supported aka IE
if (!r.support) location.href = 'http://browsehappy.com/'

r.assignBrowse(fileChooser)
r.assignDrop(dropzone)

r.on('fileAdded', function (file, event) {
  var template =
      '<div class="file">' +
      '<div data-uniqueid="' + file.uniqueIdentifier + '">' +
      '<div class="fileName">' + file.fileName + ' (' + file.file.type + ')' + '</div>' +
      '<div class="right deleteFile">X</div>' +
      '<div class="progress">' +
      '<span class="meter" style="width:0%"></span>' +
      '</div>' +
      '</div>' +
      '</div>'

  fileInfo.append(template)
  nothingToUploadMessage.hide()
})

fileSubmitButton.on('click', function () {
  if (fileInfo.children().length > 0) {
      r.upload()
  } else {
      nothingToUploadMessage.fadeIn()
      setTimeout(function () {
          nothingToUploadMessage.fadeOut()
      }, 3000)
  }
})

$(document).on('click', '.deleteFile', function () {
  var self = $(this),
      parent = self.parent(),
      identifier = parent.data('uniqueid'),
      file = r.getFromUniqueIdentifier(identifier)

  r.removeFile(file)
  parent.remove()
})


r.on('fileProgress', function (file) {
  var progress = Math.floor(file.progress() * 100)
  $('[data-uniqueId=' + file.uniqueIdentifier + ']').find('.meter').css('width', progress + '%')
  $('[data-uniqueId=' + file.uniqueIdentifier + ']').find('.meter').html('&nbsp;' + progress + '%')
  NProgress.inc(progress/100)
})

r.on('fileSuccess', function (file, message) {
  $('[data-uniqueId=' + file.uniqueIdentifier + ']').find('.progress').addClass('success');
  NProgress.done()
})


r.on('uploadStart', function () {
  $('#uploadStatus').text('Uploading....')
  NProgress.start()
})

r.on('complete', function () {
  $('#uploadStatus').text('Done Uploading')
})
