module.exports = {
  up: (queryInterface, Sequelize) => {
    const UsersTable = queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      avatar: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password_hash: {
        allowNull: false,
        type: Sequelize.STRING
      },
      provider: {
        allowNull: false,
        defaultvalue: false,
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })

    return UsersTable
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface => queryInterface.dropTable('users')
  }
}
