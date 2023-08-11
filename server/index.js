

const express = require('express');
const ejs = require('ejs');
const cors = require('cors');
const app = express();
const session = require('express-session')
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const path = require('path')
const multer = require("multer");
const cookieParser = require('cookie-parser');
const MySQLStore = require('express-mysql-session')(session);
// app.use('/Images', express.static('Images'));


const sessionStore = new MySQLStore({
  host: 'db4free.net',
  user: 'somrasaksham',
  password: 'Rengoku1@',
  database: 'jeweldata',
});





app.use(bodyParser.json());
app.use(express.json());

app.use(cors({
  origin: ["https://toddle-one.vercel.app"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true
})); 




app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));


app.set('trust proxy', 1); // Enable trust proxy

app.use(session({
  key: "userId",
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: true,
    sameSite: 'none',
    maxAge: 3600000,  // Set the cookie to expire in 30 days
  },
  store: sessionStore,
}));
   

const conn = mysql.createConnection({
  host: 'db4free.net',
  user: 'somrasaksham', 
  password: 'Rengoku1@',
  database: 'jeweldata',
  port: '3306',
  insecureAuth : true

});

conn.connect((err) => {
  if (err) throw err; 
  console.log('Mysql Connected with App...');
});





const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

const upload = multer({ storage: storage });




app.get('/api/get', (req, res) => {
  let sqlQuery = "SELECT * FROM items";

  let query = conn.query(sqlQuery, (err, results) => {
    
    res.send(results);
  });
}); 

 

app.get('/api/getcart', (req, res) => {
  let sqlQuery = `SELECT * FROM cart WHERE name = '${req.session.user}'`;

  let query = conn.query(sqlQuery, (err, results) => {
    
    res.send(results);
  });
});

 

app.get('/api/getprice', (req, res) => {
  let sqlQuery = `SELECT (price * qty) AS totalPrice FROM cart WHERE name = '${req.session.user}'`;
  
 
  let query = conn.query(sqlQuery, (err, results) => {
      
      res.send(results);
      console.log(results);
      
  });
});   
  

  
app.post("/api/inc", upload.single('file'), (req, res) => {
  const id = req.body.id; 

  let sqlQuery = `UPDATE cart SET qty = qty + 1 WHERE id = ${id}`;

  let query = conn.query(sqlQuery, id, (err, results) => {
    if (err) throw err; 
    res.send(apires(results));
  });

  console.log(req.body); 
});




app.post("/api/dec", upload.single('file'), (req, res) => {
  const id = req.body.id; 

  let sqlQuery = `UPDATE cart SET qty = qty - 1 WHERE id = ${id}`;

  let query = conn.query(sqlQuery, id, (err, results) => {
    if (err) throw err; 
    res.send(apires(results));
  });

  console.log(req.body); 
});

app.post("/api/deccheck", upload.single('file'), (req, res) => {
  const id = req.body.id; 

  let sqlQuery = `DELETE FROM cart where qty = 0`;

  let query = conn.query(sqlQuery, id, (err, results) => {
    if (err) throw err; 
    res.send(apires(results));
  });
  
  console.log(req.body); 
});  



app.post("/api/order", upload.single('file'), (req, res) => {
  

  let sqlQuery = `SELECT name, prod_name, qty FROM cart WHERE name = '${req.session.user}'`;

  let query = conn.query(sqlQuery, (err, results) => {
    if (err) throw err; 
    res.send(apires(results));

    const products = results.map((row) => [row.name, row.prod_name, row.qty]);

    const OrderQuery = 'INSERT INTO `orders`(name, prod_name, qty) VALUES ?';

    conn.query(OrderQuery, [products], (error, result) => {
      if (err) throw err; 

      console.log('Data inserted into order table successfully');
      console.log(products); 
    })
  });

  
  console.log(req.body);   
});  
   

app.post("/api/orderdel", upload.single('file'), (req,res) => {

  let sqlQuery = `DELETE FROM cart WHERE name = '${req.session.user}'`;

  conn.query(sqlQuery, (err, results) => {

  })

})
 



app.post("/api/orderpu", upload.single('file'), (req, res) => {
  const username = req.session.user;

  let cartQuery = `SELECT prod_name, qty FROM cart WHERE name = ?`;

  conn.query(cartQuery, [username], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error retrieving cart items" });
    }

    const products = results;

    // Update items in the items table based on the cart items
    const updatePromises = products.map((product) => {
      const removeQuery = `UPDATE items SET qty = qty - ? WHERE prod_name = ?`;
      const { qty, prod_name } = product;

      return new Promise((resolve, reject) => {
        conn.query(removeQuery, [qty, prod_name], (err, result) => {
          if (err) {
            console.error(`Error updating quantity for ${prod_name}`);
            reject(err);
          } else {
            console.log(`Quantity updated for ${prod_name}`);
            resolve();
          }
        });
      });
    });

    Promise.all(updatePromises)
      .then(() => {
        console.log("All items updated successfully");
        res.status(200).json({ message: "Items removed from cart" });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "Error updating quantities" });
      });
  });
});





  



app.post("/api/items", upload.single('file'), (req, res) => {
  let data = { prod_name: req.body.prod_name, category: req.body.category, description: req.body.description, price: req.body.price, saleprice: req.body.saleprice, qty: req.body.qty };

  let sqlQuery = "INSERT INTO categories SET ?";

  let query = conn.query(sqlQuery, data, (err, results) => {
    if (err) throw err;
    res.send(apires(results));
  });

  console.log(req.body); 
});



app.post("/api/users",upload.single('file'), (req, res) => {
  let data = { email: req.body.email, username: req.body.username, password: req.body.password };

  let sqlQuery = "INSERT INTO user SET ?";
 
  let query = conn.query(sqlQuery, data, (err, results) => {
    if (err) throw err;

   
    res.send(apires(results));
    
    
  });
 
  console.log(req.body);
});

 
app.post("/api/addcart",upload.single('file'), (req, res) => {
  let data = { name: req.body.name, prod_name: req.body.prod_name,description: req.body.description, price: req.body.price, qty: req.body.qty};
  let id = req.body.id;

  let sqlQuery = "INSERT INTO cart SET ?" ;
  
  let query = conn.query(sqlQuery, data, (err, results) => {
   
    res.send(apires(results)); 
  });

  
});


// app.put("/api/addcart",upload.single('file'), (req, res) => {
  
//   let id = req.body.id;

//   let sqlQuery1 = `UPDATE items SET qty = qty - 1 WHERE id = ${id}`;

//   let query1 = conn.query(sqlQuery1, (err, results) => {
    
   
//   });
 
 

// });











app.get("/api/login", (req,res) => {
  if(req.session.loggedIn){
    res.send({loggedIn: true, user: req.session.user})
  } else{
    res.send({loggedIn: false})
  }
})


app.post("/api/login",upload.single('file'), (req, res) => {
  const username = req.body.username;
  const password = req.body.password;


  conn.query("SELECT * FROM user WHERE username = ? AND password = ?", 
  [username, password], 
  (err, results) => {
    if (err) {
      console.log(err);
    }else{
      if(results.length > 0){
        req.session.loggedIn = true;
        req.session.user = username;
        console.log(req.session.user);
        res.send(results);
      } else{
        res.send({message: "Wrong Combination"});
      }
    }
    

  });

  console.log(req.body);
});


app.post("/api/logout",upload.single('file'), (req,res) => {
  req.session.destroy(function(err) {
    if(err) {
      console.log(err);
      res.status(500).send('An error occurred while logging out.');
    } else {
      res.send('Logout successful.');
      console.log("session logged out");
    }
  });
})


app.get('/api/username', (req, res) => {
  res.send(req.session.user);
});

 

  

function apires(results) {
  return JSON.stringify({ "status": 200, "error": null, "res": results });
}

/*------------------------------------------
--------------------------------------------
Server listening
--------------------------------------------
--------------------------------------------*/

 
app.listen(3001);   

