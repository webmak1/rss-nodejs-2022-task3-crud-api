# CRUD API

### [assignment](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md)

### [score](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/score.md)

<br/>

```
$ curl \
  --header "Content-Type: application/json" \
  --request GET \
  --url http://localhost:5000/api/products
```

<br/>

```
$ curl \
  --header "Content-Type: application/json" \
  --request GET \
  --url http://localhost:5000/api/products/a37216dd
```

<br/>

```
// POST
$ curl \
  --header "Content-Type: application/json" \
  --request POST \
  --data  '{"title":"value1", "description":"value1", "price":"10"}' \
  --url http://localhost:5000/api/products
```

<br/>

```
// PUT
$ curl \
  --header "Content-Type: application/json" \
  --request PUT \
  --data  '{"title":"value2", "description":"value2", "price":"14"}' \
  --url http://localhost:5000/api/products/a37216dd-e31b-4c97-a657-bf519748f23c
```
