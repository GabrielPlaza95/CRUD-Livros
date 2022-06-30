# CRUD-Livros
Exemplo de microserviço expondo API de CRUD de livros.

## Exemplos

### GET
```
curl 'https://crud-livros.herokuapp.com/livros/9788535918502' 
curl 'https://crud-livros.herokuapp.com/livros?page=0&limit=5'
```
### PUT
```
curl --location --request PUT 'https://crud-livros.herokuapp.com/livros/9788535918502' \
--header 'Content-Type: application/json' \
--data-raw '{
    "estoque": 15
}'
```
### POST
```
curl --location --request POST 'https://crud-livros.herokuapp.com/livros/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "sbn": "9788560281527",
    "nome": "Norwegian Wood",
	  "autor": "Haruki Murakami",
	  "descricao": "Românce Japonês",
	  "estoque": 10
}'
```
### DELETE
```
curl --location --request DELETE 'https://crud-livros.herokuapp.com/livros/9788535918502'
```
