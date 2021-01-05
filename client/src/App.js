import React, { useState, useEffect } from "react";
import Customer from "./components/Customer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import CustomerAdd from "./components/CustomerAdd";

const styles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
  },
  table: {
    minWidth: 1080,
  },
  progress: {
    margin: theme.spacing(2),
  },
}));

const App = () => {
  const [customers, setCustomers] = useState("");
  const [completed, setCompleted] = useState(0);
  const [isLoad, setIsLoad] = useState(false);

  const stateReFresh = () => {
    setCustomers("");
    setCompleted(0);
    callApi()
      .then((res) => {
        setCustomers(res);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    let complete = 0;
    let timer = setInterval(() => {
      if (complete >= 100) {
        complete = 0;
      } else {
        complete += 1;
      }
      setCompleted(complete);
      if (isLoad) {
        clearInterval(timer);
      }
    }, 20);
    callApi()
      .then((res) => {
        setCustomers(res);
      })
      .catch((err) => console.log(err));
  }, [isLoad]);

  const callApi = async () => {
    const response = await fetch("/api/customers");
    const body = await response.json();
    setIsLoad(true);
    return body;
  };
  const classes = styles();
  return (
    <div>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
              <TableCell>설정</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers ? (
              customers.map((c) => {
                return (
                  <Customer
                    stateReFresh={stateReFresh}
                    key={c.id}
                    id={c.id}
                    image={c.image}
                    name={c.name}
                    birthday={c.birthday}
                    gender={c.gender}
                    job={c.job}
                  />
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan="6" align="center">
                  <CircularProgress
                    className={classes.progress}
                    variant="determinate"
                    value={completed}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
      <CustomerAdd stateReFresh={stateReFresh} />
    </div>
  );
};

export default withStyles(styles)(App);
