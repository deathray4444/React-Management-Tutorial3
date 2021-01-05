const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
const mysql = require("mysql"); // << 새로 추가된 부분
const fs = require("fs");

const data = fs.readFileSync("./database.json");
const conf = JSON.parse(data);

const connection = mysql.createConnection({
  /// 새로 추가된 부분
  host: conf.host,
  user: conf.user, // mysql에 아이디를 넣는다.
  password: conf.password, // mysql의 비밀번호를 넣는다.
  port: conf.port,
  database: conf.database, //위에서 만든 데이터베이스의 이름을 넣는다.
});

connection.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/customers", (req, res) => {
  connection.query("SELECT * FROM CUSTOMER", (err, rows, fields) => {
    res.send(rows);
  });
});

app.listen(port, () => console.log(`Listening on port${port}`));
