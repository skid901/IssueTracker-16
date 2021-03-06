const { Model, DataTypes } = require('sequelize');

module.exports = class Issue extends Model {
  static init(sequelize) {
    return super.init(
      {
        num: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        isClosed: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        sequelize,
        underscored: true,
        paranoid: true,
        modelName: 'Issue',
        tableName: 'issues',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }
  static associate({ Issue, Comment, Milestone, User, Label }) {
    Issue.hasMany(Comment, {
      foreignKey: {
        name: 'issueNum',
        allowNull: false,
      },
      sourceKey: 'num',
      as: 'comments',
    });
    Issue.belongsTo(Milestone, {
      foreignKey: 'milestoneNum',
      targetKey: 'num',
    });
    Issue.belongsTo(User, {
      foreignKey: {
        name: 'userNum',
        allowNull: false,
      },
      targetKey: 'num',
      as: 'author',
    });
    Issue.belongsToMany(User, {
      foreignKey: 'issueNum',
      through: 'assignments',
      as: 'assignees',
      timestamps: false,
    });
    Issue.belongsToMany(Label, {
      foreignKey: 'issueNum',
      through: 'labelings',
      as: 'labels',
      timestamps: false,
    });
  }
};
