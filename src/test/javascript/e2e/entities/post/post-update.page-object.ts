import { element, by, ElementFinder, protractor } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class PostUpdatePage {
  pageTitle: ElementFinder = element(by.id('blogApp.post.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  titleInput: ElementFinder = element(by.css('input#post-title'));
  contentInput: ElementFinder = element(by.css('textarea#post-content'));
  dateInput: ElementFinder = element(by.css('input#post-date'));
  blogSelect: ElementFinder = element(by.css('select#post-blog'));
  tagSelect: ElementFinder = element(by.css('select#post-tag'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTitleInput(title) {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput() {
    return this.titleInput.getAttribute('value');
  }

  async setContentInput(content) {
    await this.contentInput.sendKeys(content);
  }

  async getContentInput() {
    return this.contentInput.getAttribute('value');
  }

  async setDateInput(date) {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput() {
    return this.dateInput.getAttribute('value');
  }

  async blogSelectLastOption() {
    await this.blogSelect.all(by.tagName('option')).last().click();
  }

  async blogSelectOption(option) {
    await this.blogSelect.sendKeys(option);
  }

  getBlogSelect() {
    return this.blogSelect;
  }

  async getBlogSelectedOption() {
    return this.blogSelect.element(by.css('option:checked')).getText();
  }

  async tagSelectLastOption() {
    await this.tagSelect.all(by.tagName('option')).last().click();
  }

  async tagSelectOption(option) {
    await this.tagSelect.sendKeys(option);
  }

  getTagSelect() {
    return this.tagSelect;
  }

  async getTagSelectedOption() {
    return this.tagSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }

  async enterData() {
    await waitUntilDisplayed(this.saveButton);
    await this.setTitleInput('title');
    expect(await this.getTitleInput()).to.match(/title/);
    await waitUntilDisplayed(this.saveButton);
    await this.setContentInput('content');
    expect(await this.getContentInput()).to.match(/content/);
    await waitUntilDisplayed(this.saveButton);
    await this.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await this.getDateInput()).to.contain('2001-01-01T02:30');
    await this.blogSelectLastOption();
    // this.tagSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
