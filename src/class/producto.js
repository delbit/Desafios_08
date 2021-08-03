import { random } from '../module/app.js';

export default class Producto {
  constructor(title, price, thumbnail, id) {
    this.title = `Producto ${Math.floor(random(1, 10))}`;
    this.price = `${random(0.0, 9999.99).toFixed(2)}`;
    this.thumbnail = `https://picsum.photos/${Math.floor(random(1, 200))}`;
    this.id = id;
  }
}
