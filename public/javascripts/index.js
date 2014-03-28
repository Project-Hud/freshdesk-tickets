(function () {

  var request = new XMLHttpRequest()
  request.onreadystatechange = function () {
    if (request.readyState !== 4 || request.status !== 200) return

    var res = JSON.parse(request.response)

    res.forEach(function (stats) {
      var i = 0
      //TEMP DEBUGGING VAR
      stats.count = 10

      var countClass

      if (stats.count > 5) {
        countClass = ' amount--danger'
      } else if (stats.count > 3) {
        countClass = ' amount--warning'
      } else {
        countClass = ' amount--good'
      }
      document.getElementsByClassName('js-ticket-count-' + stats.type)[0].innerHTML = stats.count

      document.getElementsByClassName('js-ticket-count')[i].className = document.getElementsByClassName('js-ticket-count')[0].className + countClass

      i++
    })
  }

  request.open('GET', '/ticket-counts', true)
  request.send()

  setInterval(function () {
    request.open('GET', '/ticket-counts', true)
    request.send()
  }, 300000)

})()


