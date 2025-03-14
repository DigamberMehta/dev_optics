// models/reviews.js
import { DataTypes } from 'sequelize';
// import { sequelize } from './index.js'; // Removed sequelize import
// import Users from './users.js'; // Import Users model - will be handled in index.js
// import Products from './products.js'; // Import Products model - will be handled in index.js

const ReviewsModel = (sequelize) => {
  const Reviews = sequelize.define('Reviews', {
    review_id: {
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
        model: 'Products', // Use the string name here
        key: 'product_id',
      },
    },
    rating: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 5,
      },
    },
    comment: {
      type: DataTypes.TEXT,
    },
    images: {
      type: DataTypes.JSON, // Store an array of image URLs or objects
      defaultValue:[],
    },
    review_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'Reviews',
    timestamps: false,
  });

  return Reviews;
};

export default ReviewsModel;