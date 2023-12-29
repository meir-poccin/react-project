const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

//middleware
app.use(cors());
app.use(express.json()); //req.body


//routes
//----------------

//create a todo

app.post('/todos', async (req, res) => {
    try {
       const {description} = req.body;
       const newTodo = await pool.query('insert into todo (description) values($1) returning *',
       [description]
        );

        res.json(newTodo.rows[0]);
      //console.log(req.body);

    } catch (err) {
       console.error(err.message) ;
    }
})

//get all todos

app.get('/todos', async (req, res) => {
  try {
     
     const allTodos = await pool.query('select * from todo'
      );

      res.json(allTodos.rows);

  } catch (err) {
     console.error(err.message) ;
  }
})

//get any todo

app.get('/todos/:id', async (req, res) => {
   try {
      //console.log(req.params) ;
      const {id} = req.params;
      const todo = await pool.query('select * from todo where todo_id = $1', [id])
      res.json(todo.rows[0])
   } catch (err) {
      console.error(err.message) ;
   }
 })


//update a todo

app.put('/todos/:id', async (req, res) => {
   try {
     
      const {id} = req.params;
      const {description} = req.body;
      const updateTodo = await pool.query('update todo set description = $1 where todo_id = $2', [description, id])
   
      res.json('updated')
   } catch (err) {
      console.error(err.message) ;
   }
 })


//delete a todo

app.delete('/todos/:id', async (req, res) => {
   try {
      const {id} = req.params;
      const deleteTodo = await pool.query('delete from todo where todo_id = $1', [id])
      res.json('deleted')
   } catch (err) {
      console.error(err.message) ;
   }
 })

app.listen(5000,  ()=>{
    console.log('SERVER STARTED now')
});