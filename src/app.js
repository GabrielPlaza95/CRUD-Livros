import app from './loaders/index.js'

const port = process.env.PORT

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
