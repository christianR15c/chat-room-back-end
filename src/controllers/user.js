const model = require('../../models');
const bcrypt = require('bcrypt');

const { User } = model;

const createUser = (req, res) => {
  const { name, email } = req.body;
  const password = bcrypt.hashSync(
    req.body.password,
    Number.parseInt(process.env.SALT_ROUNDS, 10)
  );
  User.findOne({
    where: { email },
  })
    .then((user) => {
      if (user) {
        return res.status(400).json({ message: 'Email already exist' });
      }
      User.create({
        name,
        email,
        password,
      }).then((user) => {
        res.status(200).json({
          message: 'User created successfully',
          user: {
            name: user.name,
            email: user.email,
          },
        });
      });
    })
    .catch((error) => res.status(400).json({ message: error.message }));
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findByPk(userId).then((user) => {
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ name: user.name, email: user.email });
  });
};

const getAllUsers = (req, res) => {
  User.findAll().then((users) => {
    res.status(200).json({
      users: users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
      })),
    });
  });
};

const updateUser = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;
  User.findByPk(userId).then((user) => {
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user
      .update({ name })
      .then(() =>
        res.status(200).json({
          message: 'User updated',
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        })
      )
      .catch((error) => res.status(400).json({ message: error.message }));
  });
};

const deleteUser = (req, res) => {
  const { userId } = req.params;
  User.findByPk(userId).then((user) => {
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user
      .destroy()
      .then(() => res.status(200).json({ message: 'User deleted' }))
      .catch((error) => res.status(400).json({ message: error.message }));
  });
};

module.exports = { createUser, getUser, getAllUsers, updateUser, deleteUser };
