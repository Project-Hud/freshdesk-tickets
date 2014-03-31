(function () {

  var request = new XMLHttpRequest()
  request.onreadystatechange = function () {
    if (request.readyState !== 4 || request.status !== 200) return

    var res = JSON.parse(request.response)

    res.forEach(function (stats, i) {
      var countClass = ''

      if (stats.count === 0) {
        countClass = ' amount--good'
      } else if (stats.count >= 1) {
        countClass = ' amount--danger'
      }

      $('.js-ticket-count-' + stats.type).html(stats.count)

      if (stats.type === 'overdue')
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


