
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , async = require('async')
  , freshdeskTicketCount = require('./lib/freshdesk-ticket-count')
  , app = express()

// all environments
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')
app.use(express.favicon())
app.use(express.logger('dev'))
app.use(express.json())
app.use(express.urlencoded())
app.use(express.methodOverride())
app.use(app.router)
app.use(express.static(path.join(__dirname, 'public')))

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler())
}

var freshdeskUrl = process.env.FRESHDESK_URL
  , ticketOptions = process.env.COUNT_TYPES ? JSON.parse(process.env.COUNT_TYPES) : []
  , ticketTypes = Object.keys(ticketOptions)


app.get('/', function (req, res) {
  res.render
    ( 'index'
    , { title: 'Freshdesk Tickets'
      , ticketOptions: ticketOptions
      , ticketTypes: ticketTypes
      }
    )
})

app.get('/ticket-counts', function (req, res) {

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

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'))
})
