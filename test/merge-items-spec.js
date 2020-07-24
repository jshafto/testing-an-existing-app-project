const { expect } = require('chai');
const { mergeItems } = require('../merge-items');
describe("The mergeItems function", () => {
  const template = `
    <table>
      <tbody>
        <!-- Content here -->
      </tbody>
    </table>
  `;
  it("should return no <tr>s and no <td>s for no items", () => {
    //arrange
    const items = [];
    //act
    let test = mergeItems(template, items);
    //assert
    expect(test).to.contain("<table>");
    expect(test).to.contain("</table>");
    expect(test).to.contain("<tbody>");
    expect(test).to.contain("</tbody>");
    expect(test).to.not.contain("<tr>");
    expect(test).to.not.contain("</tr>");
    expect(test).to.not.contain("<td>");
    expect(test).to.not.contain("</td>");
    expect(test).to.not.contain("<!-- Content here -->");
  });

  it("should return a single <tr>, four <td>s, and a <form> for one {uncompleted it}em", () => {
    //arrange
    const items = [
      {title: "title 1", category: "category 1"}];
    //act
      let test = mergeItems(template, items);
    //assert
    expect(test).to.contain("<table>");
    expect(test).to.contain("</table>");
    expect(test).to.contain("<tbody>");
    expect(test).to.contain("</tbody>");
    expect(test).to.contain("<tr>");
    expect(test).to.contain("</tr>");
    expect(test).to.contain(`<td>${items[0]["title"]}</td>`);
    expect(test).to.contain(`<td>${items[0]["category"]}</td>`);
    expect(test).to.contain('<form method="POST" action="/items/1">');
    expect(test).to.not.contain("<!-- Content here -->");
  });

  it("should return a single <tr>, four <td>s, and no <form> for one completed item", () => {
    //arrange
    const items = [ {title: "title 1", category: "category 1", isComplete: true} ];
    //act
    let test = mergeItems(template, items);
    //assert
    expect(test).to.contain("<table>");
    expect(test).to.contain("</table>");
    expect(test).to.contain("<tbody>");
    expect(test).to.contain("</tbody>");
    expect(test).to.contain("<tr>");
    expect(test).to.contain("</tr>");
    expect(test).to.contain(`<td>${items[0]["title"]}</td>`);
    expect(test).to.contain(`<td>${items[0]["category"]}</td>`);
    expect(test).to.not.contain('<form method="POST" action="/items/1">');
    expect(test).to.not.contain("<!-- Content here -->");
  });

  it("should return three <tr>s for three items", () => {
    // arrange
    const items = [
      {title: "title 1", category: "category 1", isComplete: true},
      {title: "title 2", category: "category 2"},
      {title: "title 3", category: "category 3", isComplete: true}
    ]
    // act
    let test = mergeItems(template, items);
    // assert
    expect(test).to.contain("<table>");
    expect(test).to.contain("</table>");
    expect(test).to.contain("<tbody>");
    expect(test).to.contain("</tbody>");
    expect(test).to.contain("<tr>");
    expect(test).to.contain("</tr>");
    items.forEach(el => {
      expect(test).to.contain(`<td>${el["title"]}</td>`);
      expect(test).to.contain(`<td>${el["category"]}</td>`);
    });
    expect(test).to.not.contain('<form method="POST" action="/items/1">');
    expect(test).to.contain('<form method="POST" action="/items/2">');
    expect(test).to.not.contain('<form method="POST" action="/items/3">');
    expect(test).to.not.contain("<!-- Content here -->");
  });
});
