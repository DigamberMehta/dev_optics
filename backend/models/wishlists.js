// models/wishlists.js
import { DataTypes } from 'sequelize';

const WishlistsModel = (sequelize) => {
  const Wishlists = sequelize.define('Wishlists', {
    wishlist_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // Use the string name here
        key: 'user_id',
      },
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Products', // Assuming you have a Products model
        key: 'product_id',
      },
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      onUpdate: DataTypes.NOW,
    },
  }, {
    tableName: 'Wishlists',
    updatedAt: 'updated_at',
    createdAt: 'created_at',
    // Add unique constraint to prevent duplicate items in the wishlist for a user
    uniqueKeys: {
      actions_unique: {
        fields: ['user_id', 'product_id']
      }
    }
  });

  return Wishlists;
};

export default WishlistsModel;