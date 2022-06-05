const model = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = model;

const login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({
    where: { email },
  }).then((user) => {
    if (!user) {
      res.status(400).json({ error: `email not registered` });
    }
    if (bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        {
          id: user.id,
        },
        process.env.SECRET_KEY,
        { expiresIn: '5h' }
      );

      res.cookie('token', token, {
        httpOnly: true,
      });

      res.status(200).json({
        message: `${user.name} is logged in`,
        user: {
          name: user.name,
          email: user.email,
          token,
        },
      });
    } else res.status(400).json({ error: `password incorrect` });
  });
};

module.exports = {
  login,
};
