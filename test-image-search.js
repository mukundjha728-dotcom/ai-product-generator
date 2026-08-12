import { searchProductImage } from './api/imageSearchService.js';

async function run() {
  console.log("Searching for Portable Espresso Machine...");
  const result1 = await searchProductImage("Portable Espresso Machine", "Home & Kitchen");
  console.log(JSON.stringify(result1, null, 2));

  console.log("\nSearching for Gaming Laptop...");
  const result2 = await searchProductImage("Gaming Laptop", "Electronics");
  console.log(JSON.stringify(result2, null, 2));
}

run();
