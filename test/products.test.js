import { expect } from "chai";
import { getProducts, getProductById, searchProducts } from "../src/index.js";

describe("Products Module", () => {
  it("should get all products", () => {
    const products = getProducts();
    expect(products).to.be.an("array");
    expect(products.length).to.be.greaterThan(0);
  });

  it("should get product by ID", () => {
    const product = getProductById(101);
    expect(product.nom).to.equal("Laptop Pro 15");
  });

  it("should search products by query", () => {
    const results = searchProducts({ query: "laptop" });
    expect(results).to.have.lengthOf(1);
    expect(results[0].nom).to.include("Laptop");
  });

  it("should search by category", () => {
    const results = searchProducts({ category: "electronica" });
    expect(results.every((p) => p.cat === "electronica")).to.be.true;
  });
});
