import request from 'supertest'
import app from '../src/loaders/index.js'

const conn = app.get('db connection')

beforeAll(() => {
	conn.prepare(`
		INSERT INTO livros (sbn, nome, descricao, autor, estoque)
		VALUES
			('9788560281527', 'Norwegian Wood', 'Românce Japonês', 'Haruki Murakami', 6),
			('9788563560292', 'O Grande Gatsby', 'Românce Estadunidense', 'F. Scott Fitzgerald', 2),
			('9788535931983', 'Grande Sertão: Veredas', 'Românce Brasileiro', 'Guimarães Rosa', 6);
	`).run()
})

afterAll(() => {
	conn.prepare('DELETE FROM livros').run()
})

describe('GET Endpoint', () => {
  it('should create a new GET', async () => {
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
})

describe('POST Endpoint', () => {
  it('should create a new POST', async () => {
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
  })
})
