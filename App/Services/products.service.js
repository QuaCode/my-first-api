import boom from '@hapi/boom';

class ProductServices {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: String(index),
        name: 'product_name_' + index,
        price: 100 + index,
        image: 'http://lorempixel.com/400/200/',
      });
    }
  }

  async create(data) {
    const elementosValidos = ['name', 'price', 'image'];
    Object.keys(data).forEach(
      (key) => elementosValidos.includes(key) || delete data[key]
    );

    const newProduct = { ...data, id: String(this.products.length + 1) };
    this.products.push(newProduct);
    return newProduct;
  }

  async find() {
    return this.products;
  }

  async findOne(id) {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw boom.notFound('Product Not Found');
    }
    return product;
  }

  async update(id, changes) {
    const index = this.products.findIndex((item) => item.id === id);

    if (index === -1) {
      throw boom.notFound('Product Not Found');
    }

    this.products[index] = { ...this.products[index], ...changes, id };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((item) => item.id === id);

    if (index === -1) {
      throw boom.notFound('Product Not Found');
    }

    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = ProductServices;
