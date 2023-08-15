const bcrypt = require('bcryptjs');

const users = [
  {
    name: 'Admin',
    email: 'admin@ac.sce.ac.il',
    role: 'Warehouse Manager',
    password: bcrypt.hashSync('admin12', 12),
    isAdmin: true,
  },
];

exports.users = users;
