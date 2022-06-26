# CRUD API

### [assignment](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md)

### [score](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/score.md)

<br/>

### Для удобства работы рекомендую установить

```
$ sudo apt install -y jq
```

<br/>

В репо для Mac тоже имеется.  
Возможно команда для установки под mac выглядит следующим образом:

```
$ brew install jq
```

<br/>

### Запуск приложения:

```
$ cd app
$ npm install

// DEV
$ npm run start:dev

// PROD
$ npm run start:prod
```

<br/>

### Типичный сценарий

```
// CREATE USER1
$ curl \
  --header "Content-Type: application/json" \
  --request POST \
  --data  '{"username":"pavel", "age":"15", "hobbies":"sport,music,games"}' \
  --url http://localhost:4000/api/users \
    | jq
```

<br/>

```
// CREATE USER2
$ curl \
  --header "Content-Type: application/json" \
  --request POST \
  --data  '{"username":"marina", "age":"25", "hobbies":"books,art,travel"}' \
  --url http://localhost:4000/api/users \
    | jq
```

<br/>

```
// CREATE USER3
$ curl \
  --header "Content-Type: application/json" \
  --request POST \
  --data  '{"username":"oleg", "age":"21", "hobbies":"kino,vino,domino"}' \
  --url http://localhost:4000/api/users \
    | jq
```

<br/>

```
// GET ALL
$ curl \
  --header "Content-Type: application/json" \
  --request GET \
  --url http://localhost:4000/api/users \
    | jq
```

<br/>

```
// GET BY ID
$ curl \
  --header "Content-Type: application/json" \
  --request GET \
  --url http://localhost:4000/api/users/c69965aa-25f8-4418-816a-2170654dd91e \
    | jq
```

<br/>

```
// UPDATE
$ curl \
  --header "Content-Type: application/json" \
  --request PUT \
  --data  '{"username":"zaurbek", "age":"24", "hobbies":"box,running,swimming"}' \
  --url http://localhost:4000/api/users/c69965aa-25f8-4418-816a-2170654dd91e \
    | jq
```

<br/>

```
// DELETE
$ curl \
  --header "Content-Type: application/json" \
  --request DELETE \
  --url http://localhost:4000/api/users/de3dabf5-daa5-4b80-97d8-0704846b1b75 \
    | jq
```

<br/>

### Автотесты

**Нужно перестартовать сервер и запускать на чистом, чтобы тесты прошли!**

<br/>

```
$ npm install -g newman
```

<br/>

```
$ cd tests
```

<br/>

```
$ newman run RSS.postman_collection.json
```

<br/>

![Application](/img/pic01.png?raw=true)

<br/>

### Проверка работы возвращаемых кодов:

<br/>

**GET api/users is used to get all persons**

<br/>

Server should answer with status code 200 and all users records

<br/>

```
// GET ALL
// 200
$ curl -s -o /dev/null -w "%{http_code}" \
  --header "Content-Type: application/json" \
  --request GET \
  --url http://localhost:4000/api/users
```

<br/>

**GET api/users/${userId}**

Server should answer with status code 200 and and record with id === userId if it exists

<br/>

```
// GET BY ID
// 200
$ curl -s -o /dev/null -w "%{http_code}" \
  --header "Content-Type: application/json" \
  --request GET \
  --url http://localhost:4000/api/users/b3236724-18f1-42b4-b4b7-2df361e80960
```

<br/>

Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)

<br/>

```
// GET BY ID
// 400
$ curl -s -o /dev/null -w "%{http_code}" \
  --header "Content-Type: application/json" \
  --request GET \
  --url http://localhost:4000/api/users/oleg
```

<br/>

Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist

<br/>

```
// GET BY ID
// 404
$ curl -s -o /dev/null -w "%{http_code}" \
  --header "Content-Type: application/json" \
  --request GET \
  --url http://localhost:4000/api/users/b3236724-18f1-42b4-a4b7-2df361e80960
```

<br/>

**POST api/users is used to create record about new user and store it in database**

Server should answer with status code 201 and newly created record

<br/>

```
// CREATE USER1
// 201
$ curl -s -o /dev/null -w "%{http_code}" \
  --header "Content-Type: application/json" \
  --request POST \
  --data  '{"username":"pavel", "age":"15", "hobbies":"sport,music,games"}' \
  --url http://localhost:4000/api/users
```

<br/>

Server should answer with status code 400 and corresponding message if request body does not contain required fields

<br/>

```
// CREATE USER1
// 400
$ curl -s -o /dev/null -w "%{http_code}" \
  --header "Content-Type: application/json" \
  --request POST \
  --data  '{"product":"123", "shop":"152", "location":"St.Petersburg"}' \
  --url http://localhost:4000/api/users
```

<br/>

**PUT api/users/{userId} is used to update existing user**

Server should answer with status code 200 and updated record

<br/>

```
// UPDATE
// 200
$ curl -s -o /dev/null -w "%{http_code}" \
  --header "Content-Type: application/json" \
  --request PUT \
  --data  '{"username":"zaurbek", "age":"24", "hobbies":"box,running,swimming"}' \
  --url http://localhost:4000/api/users/0e0dc1ac-f683-4864-a1ef-d512fd089121 \
    | jq
```

<br/>

Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)

<br/>

```
// UPDATE
// 400
$ curl -s -o /dev/null -w "%{http_code}" \
  --header "Content-Type: application/json" \
  --request PUT \
  --data  '{"username":"zaurbek", "age":"24", "hobbies":"box,running,swimming"}' \
  --url http://localhost:4000/api/users/oleg \
    | jq
```

Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist

```
// UPDATE
// 404
$ curl -s -o /dev/null -w "%{http_code}" \
  --header "Content-Type: application/json" \
  --request PUT \
  --data  '{"username":"zaurbek", "age":"24", "hobbies":"box,running,swimming"}' \
  --url http://localhost:4000/api/users/0e0dc1ac-f683-4864-a1ef-d512fd089120 \
    | jq
```

<br/>

**DELETE api/users/${userId} is used to delete existing user from database**

Server should answer with status code 204 if the record is found and deleted

<br/>

```
// DELETE
// 204
$ curl -s -o /dev/null -w "%{http_code}" \
  --header "Content-Type: application/json" \
  --request DELETE \
  --url http://localhost:4000/api/users/8cfe500a-0092-4085-9b91-59331069ba54 \
    | jq
```

<br/>

Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)

<br/>

```
// DELETE
// 400
$ curl -s -o /dev/null -w "%{http_code}" \
  --header "Content-Type: application/json" \
  --request DELETE \
  --url http://localhost:4000/api/users/oleg \
    | jq
```

<br/>

Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist

<br/>

```
// DELETE
// 404
$ curl -s -o /dev/null -w "%{http_code}" \
  --header "Content-Type: application/json" \
  --request DELETE \
  --url http://localhost:4000/api/users/8c29fa07-4a66-4e44-8219-1af14e36ea55 \
    | jq
```
