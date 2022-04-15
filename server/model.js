const db = require("./database");
const bcrypt = require("bcrypt");
const { rows } = require("pg/lib/defaults");

module.exports = {
  register: (req, res) => {
    const name = req.body.name;
    const password = req.body.password;

    db.pool
      .query("SELECT * FROM users WHERE name = $1", [name])
      .then((result) => {
        if (result.rows.length > 0) {
          res.send({ msg: "This username is already taken" });
        } else {
          bcrypt
            .hash(password, 10)
            .then((hash) => {
              db.pool
                .query("INSERT INTO users (name, password) VALUES ($1, $2)", [
                  name,
                  hash,
                ])
                .then(() => res.send({ msg: "Registered!" }))
                .catch((err) => console.log(err));
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => console.log(err));
  },

  login: (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    if (name.length === 0 || password.length === 0) {
      res.send({ msg: "Missing username or password" });
    }
    db.pool
      .query("SELECT * FROM users WHERE name = $1", [name])
      .then((result) => {
        if (result.rows.length > 0) {
          const hash = result.rows[0].password;
          const id = result.rows[0].id;
          bcrypt
            .compare(password, hash)
            .then((result) => {
              if (result) {
                res.send({ msg: "Login Successful!", id: id });
              } else {
                res.send({ msg: "passowrd is incorrect, please try again." });
              }
            })
            .catch((err) => console.log(err));
        } else {
          res.send({ msg: `username doesn't exist` });
        }
      })
      .catch((err) => console.log(err));
  },

  getMessages: (req, res) => {
    const query = `SELECT m.*, u.name FROM messages m JOIN users u ON u.id = m.user_id`;
    db.pool.query(query).then((result) => {
      res.json(result.rows);
    });
  },

  addMessage: (req, res) => {
    const id = req.params.id;
    const message = req.body.message;

    const query = `INSERT INTO messages(message, created_at, user_id) VALUES ($1, now(), $2)`;
    db.pool
      .query(query, [message, id])
      .then(() => {
        res.status(201).send("message sent!");
      })
      .catch((err) => console.log(err));
  },
};
