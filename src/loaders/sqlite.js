import Database from 'better-sqlite3';

const file = process.env.NODE_ENV === 'production'
	? process.env.DB_FILE
	: process.env.DB_FILE_TEST

const db = new Database(file, {
	fileMustExist: true
})

db.pragma('journal_mode = WAL')

export default db
