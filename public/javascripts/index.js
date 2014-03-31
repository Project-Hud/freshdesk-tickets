(function () {

  var request = new XMLHttpRequest()
  request.onreadystatechange = function () {
    if (request.readyState !== 4 || request.status !== 200) return

    var res = JSON.parse(request.response)

    res.forEach(function (stats, i) {
      var countClass = ''

      if (stats.count >= 5) {
        countClass = ' amount--danger'
      } else if (stats.count >= 3) {
        countClass = ' amount--warning'
      }

      $('.js-ticket-count-' + stats.type).html(stats.count)

      $('.js-ticket-count').eq(i).addClass(countClass)

    })
  }

  request.open('GET', '/ticket-counts', true)
  request.send()

  setInterval(function () {
    request.open('GET', '/ticket-counts', true)
    request.send()
  }, 300000)

})()


