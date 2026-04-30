import { expect } from "chai";
import { calculatePrice, checkout, addToCart } from "../src/index.js";

describe("Payment Module", () => {
  it("should calculate price with tax and shipping", () => {
    const result = calculatePrice({
      subtotal: 100000,
      discount: 10000,
      shipping: 5000,
      iva: true,
    });
    expect(result.total).to.be.a("number");
    expect(result.iva).to.equal(17100); // 19% of 90000
  });

  it("should checkout successfully", () => {
    addToCart(1, 101, 1);
    const result = checkout(
      1,
      "tarjeta",
      { numero: "0000000000000000", cvv: "123" },
      { destCity: "Santiago", weight: 1 },
    );
    expect(result.ok).to.be.true;
    expect(result.data.order.status).to.equal("pagado");
  });

  it("should fail checkout with invalid card", () => {
    addToCart(1, 102, 1);
    const result = checkout(1, "tarjeta", { numero: "123", cvv: "12" }, {});
    expect(result.ok).to.be.false;
    expect(result.msg).to.include("Datos de tarjeta inválidos");
  });

  it("should fail checkout with empty cart", () => {
    const result = checkout(2, "transferencia", {}, {});
    expect(result.ok).to.be.false;
    expect(result.msg).to.include("vacío");
  });
});
