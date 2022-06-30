import { Router } from 'express'
import livros from './livros.js'

const router = Router()

router.get('/', (req, res) => {
	res.send('Welcome to your library!\n')
})

router.use('/livros', livros)

export default router
