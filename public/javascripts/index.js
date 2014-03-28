(function () {

  var request = new XMLHttpRequest()
  request.onreadystatechange = function () {
    if (request.readyState !== 4 || request.status !== 200) return

    var res = JSON.parse(request.response)
    res.forEach(function (stats) {
      document.getElementsByClassName('js-ticket-count-' + stats.type)[0].innerHTML = stats.count
      console.log(stats.count)
      if (stats.count >= 4) {
        $('.ticket-count').css('background-color', '#d90000')
      }
    })
  }

  request.open('GET', '/ticket-counts', true)
  request.send()

  setInterval(function () {
    request.open('GET', '/ticket-counts', true)
    request.send()
  }, 300000)

})()
