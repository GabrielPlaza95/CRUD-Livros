import { Router } from 'express'
//import livro from './livro.js'

const router = Router()

router.get('/', (req, res) => {
	res.send('Welcome to your library!')
})

//router.use('/livro', livro)

export default router
