var Dat = require('dat-node')

var opts = {
	key: '1acff5f5229429c3d6474e06d9035fd91055bbde9d80c9973a18ae559b435d03',
	sparse: true,
  // temp: true,
  indexed: false
}
Dat('./local-copy', opts, function (err, dat) {
  if (err) throw err
  dat.joinNetwork()
	dat.archive.metadata.update(() => {
		console.log('Updated', dat.archive.version)
		dat.archive.readdir('/', (err, files) => {
			if (err) {
				console.error('readdir err', err)
				return
			}
			console.log(files)
		})
		dat.archive.download('signl-fm.dmg.md5', (err) => {
      if (err) {
        console.error('download err', err)
        return
      }
			console.log('Downloaded')
      process.exit(0)
		})
	})
})
