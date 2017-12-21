var hyperdrive = require('hyperdrive')
var swarm = require('hyperdiscovery')
var datHttp = require('dat-http')

var key = '1acff5f5229429c3d6474e06d9035fd91055bbde9d80c9973a18ae559b435d03'

var storage = datHttp('https://s3-us-west-2.amazonaws.com/dat-backups/signl-fm/')

console.log('Jim1')
var httpDrive = hyperdrive(storage, key, {
  latest: true,
  live: false
})
httpDrive.on('ready', () => {
  console.log('Jim ready', httpDrive.version)
  console.log('Jim discoveryKey', httpDrive.discoveryKey)
  httpDrive.metadata.update(() => {
    console.log('Jim update')
  })
  var sw = swarm(httpDrive)
  sw.on('connection', function (peer, type) {
    // console.log('got', peer, type)
    console.log('connected to', sw.connections.length, 'peers')
    peer.on('close', function () {
      console.log('peer disconnected')
    })
  })
})
httpDrive.on('sync', () => console.log('Sync'))
