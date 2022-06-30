import { Router } from 'express'
import { get, getAll, set, insert, remove } from '../models/livros.js'

const router = Router()

// para extrair valores desejados do corpo de requisições
function pick(obj, keys) {
	return Object.fromEntries(keys.filter(key => key in obj).map(key => [key, obj[key]]))
}

router.get('/:sbn', async (req, res) => {
	const { sbn } = req.params
	const conn = req.app.get('db connection')

	const book = get(conn, sbn)

	res.json(book)
})

router.get('/', async (req, res) => {
	const { page = 0, limit = 10 } = req.query
	const conn = req.app.get('db connection')

	const books = getAll(conn, page, limit)

	res.json(books)
})

router.put('/:sbn', async (req, res) => {
	const { sbn } = req.params
	const conn = req.app.get('db connection')

	const params = pick(req.body, ['nome', 'autor', 'descricao', 'estoque'])
	set(conn, sbn, params)

  	res.status(204).json({})
})

router.post('/', async (req, res) => {
	const conn = req.app.get('db connection')

	const params = pick(req.body, ['sbn', 'nome', 'autor', 'descricao', 'estoque'])
	insert(conn, params)

  	res.status(201).json({})
})

router.delete('/:sbn', async (req, res) => {
	const { sbn } = req.params
	const conn = req.app.get('db connection')

	remove(conn, sbn)

  	res.status(204).json({})
})

export default router
