const err = new Error('Not Found')
err['status'] = 404

export function get(conn, sbn) {
	const query = conn.prepare(`
		SELECT sbn, nome, descricao, autor, estoque
		FROM livros
		WHERE sbn = ?;
	`)

	const book = query.get(sbn)

	if (!book) throw err 

	return book
}

export function getAll(conn, page, limit) {
	const query = conn.prepare(`
		SELECT nome
		FROM livros
		WHERE estoque > 0
		ORDER BY nome
		LIMIT ?
		OFFSET ?;
	`)
	return query.all(limit, page * limit).map(l => l.nome)
}

export function insert(conn, cols) {
	const query = conn.prepare(`
		INSERT INTO livros (sbn, nome, descricao, autor, estoque)
		VALUES ($sbn, $nome, $descricao, $autor, $estoque);
	`)
	return query.run(cols)
}

export function set(conn, sbn, cols) {
	const current = get(conn, sbn)

	if (!current) throw err

	const updated = { ...current, ...cols }

	const query = conn.prepare(`
		UPDATE livros SET
			nome = $nome,
			descricao = $descricao,
			autor = $autor,
			estoque = $estoque
		WHERE sbn = $sbn;
	`)

	return query.run({ sbn, ...updated })
}

export function remove(conn, sbn) {
	const query = conn.prepare(`
		DELETE FROM livros
		WHERE sbn = ?;
	`)
	return query.run(sbn)
}
