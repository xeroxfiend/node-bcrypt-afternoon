bcrypt = require("bcryptjs");

module.exports = {
  register: async (req, res) => {
    const {username, password, isAdmin} = req.body;
    const db = req.app.get("db");

    let result = await db.get_user(username);
    let existingUser = result[0];

    if (existingUser) return res.status(409).send({message: "Username taken"});
    else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const registeredUser = await db.register_user([isAdmin, username, hash]);
      const user = registeredUser[0];
      req.session.user = {
        isAdmin: user.is_admin,
        id: user.id,
        username: user.username
      };
      res.status(201).send(req.session.user);
    }
  }
};
