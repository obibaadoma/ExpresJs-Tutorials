import express from 'express';

const app = express();

const PORT =  process.env.PORT || 5000;

const mockUsers = [
  {id:1, username: "anson", diplayName: "Anson"},
  {id:2, username: "Obiba", diplayName: "Adom"},
  {id:3, username: "Daa", diplayName: "Nkwa"},
  {id:4, username: "Steve", diplayName: "Steve"},
  {id:5, username: "Paul", diplayName: "Yaw"},
  {id:6, username: "KKB", diplayName: "Dabo"}
];

const mockProducts = [
  [{
    "id": 123,
    "name": "Daa Nkwa",
    "price": 65.99
  }]
];
  
app.get("/api/users", (request, response) => {
  console.log(request.query);
  const {query: {filter, value}} = request;
  if(!filter && !value ) return response.send(mockUsers);
  // when filter and value are undefined 
  if(filter && !value) return response.send(
    mockUsers.filter(user => user[filter].includes(value))
  );
// kkn.m
});

app.get("/api/products", (request, response) => {
  response.send(mockProducts);
});

app.get("/api/users/:id", (request, response) => {
  console.log(request.params);
  const parseId = parseInt(request.params.id);
  if(isNaN(parseId)){
    return response.status(400).send({msg: "Bad Request"});
  }
  console.log(parseId);

  const findUser = mockUsers.find(
    (user) => user.id === parseId);
  if(!findUser){
    return response.status(404).send({msg: "User not found"});
  }

  response.send(findUser);
});

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});