import request from 'supertest'
import app from '../src/loaders/index.js'

const conn = app.get('db connection')

beforeEach(() => {
	conn.prepare('DELETE FROM livros').run()
	conn.prepare(`
		INSERT INTO livros (sbn, nome, descricao, autor, estoque)
		VALUES
			('9788560281527', 'Norwegian Wood', 'Românce Japonês', 'Haruki Murakami', 6),
			('9788563560292', 'O Grande Gatsby', 'Românce Estadunidense', 'F. Scott Fitzgerald', 2),
			('9788535931983', 'Grande Sertão: Veredas', 'Românce Brasileiro', 'Guimarães Rosa', 6);
	`).run()
})

describe('GET Endpoint', () => {
  it('should obtain a single book\'s details', async () => {
    const res = await request(app)
      .get('/livros/9788535931983')

    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual({
        sbn: '9788535931983',
        nome: 'Grande Sertão: Veredas',
		autor: 'Guimarães Rosa',
		descricao: 'Românce Brasileiro',
		estoque: 6
	})
  })

  it('should obtain the first two books by title', async () => {
    const res = await request(app)
      .get('/livros?limit=2')

    expect(res.statusCode).toEqual(200)
    expect(res.body.length).toEqual(2)
    expect(res.body[0]).toEqual("Grande Sertão: Veredas")
    expect(res.body[1]).toEqual("Norwegian Wood")
  })
})

describe('PUT Endpoint', () => {
  it('should update the number of copies of a book available on stock', async () => {
    const res = await request(app)
      .put('/livros/9788535931983')
      .send({
		estoque: 5
      })

    expect(res.statusCode).toEqual(204)
    expect(res.body).toEqual({})
	  
	const { estoque } = conn.prepare(`
		SELECT estoque FROM livros WHERE sbn = '9788535931983'
	`).get()

	expect(estoque).toEqual(5)
  })
})

describe('POST Endpoint', () => {
  it('should add a new title to the library', async () => {
    const res = await request(app)
      .post('/livros/')
      .send({
        sbn: '9788535918502',
        nome: 'Hibisco Roxo',
		autor: 'Chimamanda Ngozi Adichie',
		descricao: 'Românce Nigeriano',
		estoque: 3
      })

    expect(res.statusCode).toEqual(201)
    expect(res.body).toEqual({})

	const { nome } = conn.prepare(`
		SELECT nome FROM livros WHERE sbn = '9788535918502'
	`).get()

	expect(nome).toEqual('Hibisco Roxo')
  })
})

describe('DELETE Endpoint', () => {
  it('should remove a book from the library', async () => {
    const res = await request(app)
      .delete('/livros/9788535931983')

    expect(res.statusCode).toEqual(204)
    expect(res.body).toEqual({})

	const books = conn.prepare(`
		SELECT * FROM livros WHERE sbn = '9788535931983'
	`).all()

	expect(books.length).toEqual(0)
  })
})
