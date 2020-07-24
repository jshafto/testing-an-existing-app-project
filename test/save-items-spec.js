const { expect } = require('chai');
const { saveItems } = require('../save-items');
describe("The saveItems function", () => {
  it('adds the new item to the list', () => {
    const items = [
      {title: "title 1", category: "category 1", isComplete: true}
    ];
    const newItem = {title: "title 2", category: "category 2"};
    let test = saveItems(items, newItem);
    expect(test).to.contain(newItem);
  });

  it('makes sure the result and the original are different', () => {
    const items = [
      {title: "title 1", category: "category 1", isComplete: true}];
    const newItem = {title: "title 2", category: "category 2"};
    let test = saveItems(items, newItem);
    expect(test).to.not.equal(items);
  });
});
