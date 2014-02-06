var request = require('request')

module.exports = function (freshdeskUrl, filterName, callback) {
  var count = 0

  if (!freshdeskUrl) return callback(new Error('freshdeskUrl undefined'))
  if (!filterName) return callback(new Error('filterName undefined'))

  function getCount(page, cb) {
    request.get(freshdeskUrl + 'tickets.xml?filter_name=' + filterName + '&page=' + page,
      { 'auth':
        { 'user': process.env.API_KEY
        , 'pass': 'X'
        , 'sendImmediately': true
        }
      }
      , function (error, res) {
        if (error) return cb(error)

        var ticketCount = res.body.match(/<helpdesk-ticket>/g)

        if (ticketCount) {
          count += ticketCount.length
        }

        if (ticketCount === 30) {
          page++
          getCount(page, cb)
        } else {
          cb(error, count)
        }

      }
    )
  }

  getCount(1, function (error, totalCount) {
    callback(error, totalCount)
  })


}
