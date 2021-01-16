const { Model, DataTypes } = require("sequelize");

const User = require("./user");
const sequelize = require("../sequelize");

class Phone extends Model {
  static col = {
    id: "id",
    phone: "phone",
    userId: "userId",
  };
  static alias = {
    user: "userPhone",
  };
}

Phone.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    phone: {
      unique: true,
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: User.col.id,
      },
    },
  },
  {
    sequelize: sequelize.getSeq(),
    paranoid: true,
  }
);

Phone.belongsTo(User, {
  as: Phone.alias.user,
  foreignKey: Phone.col.userId,
});
User.hasMany(Phone, {
  as: User.alias.phones,
  foreignKey: Phone.col.userId,
});

module.exports = Phone;
