(function () {

  var request = new XMLHttpRequest()
  request.onreadystatechange = function () {
    var res = JSON.parse(request.response)

    res.forEach(function (stats) {
      document.getElementsByClassName('js-ticket-count-' + stats.type)[0].innerHTML = stats.count
    })
  }

  request.open('GET', '/ticket-counts', true)
  request.send()

  setInterval(function () {
    request.open('GET', '/ticket-counts', true)
    request.send()
  }, 300000)

})()
