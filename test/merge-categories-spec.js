const { expect } = require('chai');
const { mergeCategories } = require('../merge-categories');

describe("mergeCategories()", () => {
  context("Using <li> tags", () => {
    const template = `
    <div>
      <ul>
        {{#each categories}}
          <li>{{ this }}</li>
        {{/each}}
      </ul>
    </div>
  `;
    it("should return no <li>s for no categories", () => {
      // arrange
      let categories = [];
      // act
      let test = mergeCategories(template, categories, 'li');
      // assert
      expect(test).to.have.string('<div>');
      expect(test).to.have.string('</div>');
      expect(test).to.have.string('<ul>');
      expect(test).to.have.string('</ul>');
      expect(test).to.not.have.string('<li>');
      expect(test).to.not.have.string('</li>');
      expect(test).to.not.have.string('<!-- Content here -->');
    });

    it("should return a single <li> for one category", () => {
      // arrange
      let categories = ['pizza'];
      // act
      let test = mergeCategories(template, categories, 'li');
      // assert
      expect(test).to.contain('<div>');
      expect(test).to.contain('</div>');
      expect(test).to.contain('<ul>');
      expect(test).to.contain('</ul>');
      expect(test).to.contain(`<li>${categories[0]}</li>`);
      expect(test).to.not.contain('<!-- Content here -->');
    });

    it("should return an <li> for each category", () => {
      // arrange
      let categories = ['bunny', 'dog', 'mata mata turtle'];

      // act
      let test = mergeCategories(template, categories, 'li');

      // assert
      expect(test).to.contain('<div>');
      expect(test).to.contain('</div>');
      expect(test).to.contain('<ul>');
      expect(test).to.contain('</ul>');
      categories.forEach(el => {
        expect(test).to.contain(`<li>${el}</li>`);
      });
      expect(test).to.not.contain('<!-- Content here -->')
    });
  });

  context("using <option> tags", () => {
    const template = `
    <div>
      <select>
        {{#each categories}}
          <option>{{ this }}</option>
        {{/each}}
      </select>
    </div>
  `;

    it("should return no <option>s for no categories", () => {
      // arrange
      let categories = [];

      // act
      let test = mergeCategories(template, categories, 'option');

      // assert
      expect(test).to.contain('<div>');
      expect(test).to.contain('</div>');
      expect(test).to.contain('<select>');
      expect(test).to.contain('</select>');
      expect(test).to.not.contain('<option>');
      expect(test).to.not.contain('</option>');
      expect(test).to.not.contain('<!-- Content here -->');
    });

    it("should return a single <option> for one category", () => {
      // arrange
      let categories = ['singlestring'];

      // act
      let test = mergeCategories(template, categories, 'option');

      // assert
      expect(test).to.contain('<div>');
      expect(test).to.contain('</div>');
      expect(test).to.contain('<select>');
      expect(test).to.contain('</select>');
      expect(test).to.contain(`<option>${categories[0]}</option>`);
      expect(test).to.not.contain('<!-- Content here -->');
    });

    it("should return an <option> for each category", () => {
      // arrange
      let categories = ['singlestring', 'multiple strings'];

      // act
      let test = mergeCategories(template, categories, 'option');

      // assert
      expect(test).to.contain('<div>');
      expect(test).to.contain('</div>');
      expect(test).to.contain('<select>');
      expect(test).to.contain('</select>');
      categories.forEach(el => {
        expect(test).to.contain(`<option>${el}</option>`);
      });
      expect(test).to.not.contain('<!-- Content here -->');
    });
  });
});
