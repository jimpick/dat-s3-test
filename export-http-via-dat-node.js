var Dat = require('dat-node')
var datHttp = require('dat-http')

var storage = datHttp('https://s3-us-west-2.amazonaws.com/dat-backups/signl-fm/')

console.log('Jim1')
Dat(storage, {sparse: true}, (err, dat) => {
  console.log('Jim2', dat.archive.version)
  try {
    dat.archive.metadata.update(err => {
      console.log('Jim3', err, dat.archive.version)
    })
  } catch (e) {
    console.error('Exception', e)
  }
  dat.archive.on('ready', () => console.log('Ready'))
	dat.joinNetwork(function (err) {
    if (err) throw err

    // After the first round of network checks, the callback is called
    // If no one is online, you can exit and let the user know.
    if (!dat.network.connected || !dat.network.connecting) {
      console.error('No users currently online for that key.')
      // process.exit(1)
    }
  })
})

