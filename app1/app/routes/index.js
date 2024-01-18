import {
  getUsers,
  registerUser
} from "../lib/db.js";

function writeData(res) {
return (result) => {
  res.status(200);
  res.set("Content-Type", "text/json");
  res.send(JSON.stringify(result));
  res.end();
};
}

function writeError(res) {
return (error) => {
  res.status(500);
  res.set("Content-Type", "text/json");
  res.send(JSON.stringify({ "SQL Error Messsage": error.sqlMessage }));
  res.end();
};
}

// Definerer routene i REST-API'et

const routes = (app) => {
  app.get("/user", (req, res) => {
      getUsers().then(writeData(res), writeError(res));
  });

  app.post("/user", (req, res) => {
      let { UserID, Password } = req.body;

      registerUser( UserID, Password ).then(writeData(res), writeError(res));
  });

  app.get("*", function (req, res) {
      res.status(404);
      res.set("Content-Type", "text/plain");
      res.send("Ukjent URL");
      res.end();
    });
}

export { routes };