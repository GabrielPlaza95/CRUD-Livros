export function get(conn, sbn) {
	const query = conn.prepare(`
		SELECT sbn, nome, descricao, autor, estoque
		FROM livros
		WHERE sbn = ?;
	`)
	return query.get(sbn)
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
	const curr = { ...get(conn, sbn), ...cols }

	const query = conn.prepare(`
		UPDATE livros SET
			nome = $nome,
			descricao = $descricao,
			autor = $autor,
			estoque = $estoque
		WHERE sbn = $sbn;
	`)

	return query.run({ sbn, ...curr })
}

export function remove(conn, sbn) {
	const query = conn.prepare(`
		DELETE FROM livros
		WHERE sbn = ?;
	`)
	return query.run(sbn)
}
