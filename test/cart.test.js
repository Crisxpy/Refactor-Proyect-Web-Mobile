import { expect } from "chai";
import { addToCart, getCart, removeFromCart, clearCart } from "../src/index.js";

describe("Cart Module", () => {
  it("should add item to cart", () => {
    const result = addToCart(1, 101, 1);
    expect(result.ok).to.be.true;
    expect(result.cart).to.have.lengthOf(1);
  });

  it("should get cart with total", () => {
    const cart = getCart(1);
    expect(cart.ok).to.be.true;
    expect(cart.total).to.be.a("number");
  });

  it("should remove item from cart", () => {
    removeFromCart(1, 101);
    const cart = getCart(1);
    expect(cart.cart).to.have.lengthOf(0);
  });

  it("should clear cart", () => {
    addToCart(1, 102, 1);
    clearCart(1);
    const cart = getCart(1);
    expect(cart.cart).to.have.lengthOf(0);
  });
});
