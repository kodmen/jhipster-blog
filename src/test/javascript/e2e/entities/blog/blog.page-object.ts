import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import BlogUpdatePage from './blog-update.page-object';

const expect = chai.expect;
export class BlogDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('blogApp.blog.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-blog'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class BlogComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('blog-heading'));
  noRecords: ElementFinder = element(by.css('#app-view-container .table-responsive div.alert.alert-warning'));
  table: ElementFinder = element(by.css('#app-view-container div.table-responsive > table'));

  records: ElementArrayFinder = this.table.all(by.css('tbody tr'));

  getDetailsButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-info.btn-sm'));
  }

  getEditButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-primary.btn-sm'));
  }

  getDeleteButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-danger.btn-sm'));
  }

  async goToPage(navBarPage: NavBarPage) {
    await navBarPage.getEntityPage('blog');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateBlog() {
    await this.createButton.click();
    return new BlogUpdatePage();
  }

  async deleteBlog() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const blogDeleteDialog = new BlogDeleteDialog();
    await waitUntilDisplayed(blogDeleteDialog.deleteModal);
    expect(await blogDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/blogApp.blog.delete.question/);
    await blogDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(blogDeleteDialog.deleteModal);

    expect(await isVisible(blogDeleteDialog.deleteModal)).to.be.false;
  }
}
