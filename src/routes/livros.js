import { Router } from 'express'
import { get, set, insert } from '../models/livros.js'

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

router.put('/:sbn', async (req, res) => {
	const { sbn } = req.params
	const conn = req.app.get('db connection')

	const params = pick(req.body, ['nome', 'autor', 'descricao', 'estoque'])
	set(conn, sbn, params)

	res.end()
})

router.post('/', async (req, res) => {
	const conn = req.app.get('db connection')

	const params = pick(req.body, ['sbn', 'nome', 'autor', 'descricao', 'estoque'])
	insert(conn, params)

  	res.status(201);
	res.send('""');
})

export default router
