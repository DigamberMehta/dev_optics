'use strict';
import slugify from 'slugify';

export default {
  async up(queryInterface, Sequelize) {
    // Step 1: Add slug column (temporarily nullable)
    await queryInterface.addColumn('Products', 'slug', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // Step 2: Get all existing products
    const [products] = await queryInterface.sequelize.query(
      'SELECT product_id, name FROM Products;'
    );

    // Step 3: Generate slugs for existing products
    for (const product of products) {
      let baseSlug = slugify(product.name, { lower: true, strict: true });
      let slug = baseSlug;
      let counter = 1;

      // Ensure slug is unique
      while (true) {
        const [existing] = await queryInterface.sequelize.query(
          `SELECT product_id FROM Products WHERE slug = '${slug}'`
        );
        if (existing.length === 0) break;
        slug = `${baseSlug}-${counter++}`;
      }

      // Update the product with the generated slug
      await queryInterface.sequelize.query(
        `UPDATE Products SET slug = '${slug}' WHERE product_id = ${product.product_id}`
      );
    }

    // Step 4: Make slug column non-nullable and unique
    await queryInterface.changeColumn('Products', 'slug', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
  },

  async down(queryInterface) {
    // Remove the slug column if migration is rolled back
    await queryInterface.removeColumn('Products', 'slug');
  },
};
