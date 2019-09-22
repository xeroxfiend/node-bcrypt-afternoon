module.exports = {
  usersOnly: (req, res, next) => {
    if (req.session.user) {
      next();
    } else {
      res.status(401).send("Please log in.");
    }
  }
};
