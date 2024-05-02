const express = require('express');
const app = express();

const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded());
app.use((req, res, next) => {
console.log(req.url)
})

app.listen(PORT, ()=> {console.log("running server on port 3001")})

const grocerylist = [
  {
    item: 'milk', 
    quantity: 2,
    price: 25,
  },
  {
    item: 'bread', 
    quantity: 5,
    price: 30,
  },
  {
    item: 'eggs', 
    quantity: 7,
    price: 45,
  }
]

app.use(express.json()); // This line is needed to parse JSON body in POST requests

app.get(
  '/groceries', 
(req, res, next)=>{
  res.send(grocerylist);
  next();
}
);

app.post('/groceries', (req, res) => {
  console.log(req.body);
  grocerylist.push(req.body);
  req.send(201);
 
});