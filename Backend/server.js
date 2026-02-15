const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // 1. Load variables at the very top
const express = require('express');
const cors = require('cors');
const pool = require('./config/database');

const app = express();

// 2. Set the port from .env, or default to 3000 if .env is missing
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API running');
});

app.post('/api/register', async(req,res) => {
  const {name, email, password} = req.body;
  try{
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, hashedPassword]
    );
    res.status(201).json({message : 'User registered successfully', user : newUser.rows[0]});
  }catch(err){
    console.error(err.message);
    res.status(500).json({message : 'Registration failed'});
  }
});

app.post('/api/login', async(req, res) => {
  const {email, password} = req.body;
  try{
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if(user.rows.length === 0) return res.status(400).json({"Invalid Credentials" : "User not found"});

    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if(!validPassword) return res.status(400).json({"Invalid Credentials" : "Wrong Password"});
    
    const token = jwt.sign({id : user.rows[0].id}, process.env.JWT_SECRET, {expiresIn: '1h'});
    res.json({message: "Loin successful", token});
  }catch(err){
    res.status(500).json({message: 'Login Failed'});
  }
})

// 3. Use the variable here instead of the number 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});