var Widget = new require('hud-widget')
  , widget = new Widget()
  , async = require('async')
  , freshdeskTicketCount = require('./lib/freshdesk-ticket-count')

var freshdeskUrl = process.env.FRESHDESK_URL
  , ticketOptions = process.env.COUNT_TYPES ? JSON.parse(process.env.COUNT_TYPES) : []
  , ticketTypes = Object.keys(ticketOptions)

widget.get('/', function (req, res) {
  res.render
    ( 'index'
    , { title: 'Freshdesk Tickets'
      , ticketOptions: ticketOptions
      , ticketTypes: ticketTypes
      }
    )
})

widget.get('/ticket-counts', widget.cache(5000), function (req, res) {

  async.map(ticketTypes, function (type, cb) {

    freshdeskTicketCount(freshdeskUrl, type, function (error, count) {
      if (error) return cb(error)

      var stat = { type: type, count: count }

      cb(error, stat)
    })

  }, function (error, stats) {
    if (error) console.warn(error)

    res.json(stats)
  })

})
