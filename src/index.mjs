import express from 'express';

const app = express();

app.use(express.json());

const loggingMiddleware = (request, response, next) => {
console.log("${request.method} - ${request.url}" )
next();
}

app.use(loggingMiddleware);

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
  [ {
    "id": 123,
    "name": "Daa Nkwa",
    "price": 65.99
  } ]
];
  
app.get("/api/users", (request, response) => {
  console.log(request.query);
  const {query: {filter, value}} = request;
  if(!filter || !value ) return response.send(mockUsers);
  return response.send(
    mockUsers.filter(user => user[filter].includes(value))
  );
});

app.get("/api/products", (request, response) => {
  response.send(mockProducts);
});

app.post('/api/users', (request, response)=> {
  console.log(request.body);
  const {body} = request;
  const newUser = {id: mockUsers[mockUsers.length-1].id + 1, ...body }
  mockUsers.push(newUser);
  return response.status(201).send(newUser);
})

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

app.put("/api/users/:id", (request, response)=>{
  const {body, params: { id }} = request;
  const parseId = parseInt(id);
  if(isNaN(parseId))
    return response.sendStatus(400);

  const findUserIndex = mockUsers.findIndex(
    (user) => user.id === parseId
  );
  if (findUserIndex === -1)
    return response.sendStatus(404);
  mockUsers[findUserIndex] = {id: parseId, ...body };
  return response.sendStatus(200);
});

app.patch("/api/users/:id", (request, response)=>{
  const {body, params: { id }} = request;
  const parseId = parseInt(id);
  if(isNaN(parseId))
    return response.sendStatus(400);

  const findUserIndex = mockUsers.findIndex(
    (user) => user.id === parseId
  );
  if (findUserIndex === -1)
    return response.sendStatus(404);
  mockUsers[findUserIndex] = {...mockUsers[findUserIndex], ...body};
  return response.sendStatus(200);
  });

  app.delete("/api/users/:id", (request, response)=>{
    const {params: { id }} = request;
    const parseId = parseInt(id);
    if(isNaN(parseId))
      return response.sendStatus(400);

    const findUserIndex = mockUsers.findIndex((user) => users.id === parseId);
    if(findUserIndex === -1) return response.sendStatus(404);
    mockUsers.splice(findUserIndex);
    return response.sendStatus(200);
  });

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});

app.get("/", (request, response, next)=>{
  console.log("Base Url");
},
(request, response)=>{
  response.status(201).send({msg: "Hello"});
}
);