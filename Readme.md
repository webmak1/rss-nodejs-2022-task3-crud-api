# CRUD API

### [assignment](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md)

### [score](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/score.md)

<br/>

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
  --url http://localhost:4000/api/users/d1970bda-8068-4988-b49e-a1fabda1b0af \
    | jq
```

```
// UPDATE
$ curl \
  --header "Content-Type: application/json" \
  --request PUT \
  --data  '{"username":"zaurbek", "age":"24", "hobbies":"box,running,swimming"}' \
  --url http://localhost:4000/api/users/c38467da-7992-46cc-b1e3-b5857ef24c14 \
    | jq
```

<br/>

```
// DELETE
$ curl \
  --header "Content-Type: application/json" \
  --request DELETE \
  --url http://localhost:4000/api/users/508be281-55d9-4561-995a-de4571716e26 \
    | jq
```
