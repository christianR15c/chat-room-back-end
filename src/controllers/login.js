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
    } else {
      if (bcrypt.compareSync(password, user.password) && user.isAdmin) {
        adminToken = jwt.sign(
          {
            id: user.id,
          },
          process.env.ADMIN_SECRET,
          { expiresIn: '5h' }
        );

        res
          .status(200)
          .header('Auhtorization', adminToken)
          .json({
            message: `${user.name} is logged in`,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              isAdmin: user.isAdmin,
              image: user.image,
              createdBy: user.createdBy,
              adminToken,
            },
          });
      } else if (bcrypt.compareSync(password, user.password) && !user.isAdmin) {
        userToken = jwt.sign(
          {
            id: user.id,
          },
          process.env.USER_SECRET,
          { expiresIn: '5h' }
        );
        res
          .status(200)
          .header('Authorization', userToken)
          .json({
            message: `${user.name} is logged in`,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              isAdmin: user.isAdmin,
              image: user.image,
              userToken,
            },
          });
      } else res.status(400).json({ error: `password incorrect` });
    }
  });
};

module.exports = {
  login,
};
