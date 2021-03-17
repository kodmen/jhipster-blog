import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import BlogComponentsPage from './blog.page-object';
import BlogUpdatePage from './blog-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';

const expect = chai.expect;

describe('Blog e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let blogComponentsPage: BlogComponentsPage;
  let blogUpdatePage: BlogUpdatePage;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  beforeEach(async () => {
    await browser.get('/');
    await waitUntilDisplayed(navBarPage.entityMenu);
    blogComponentsPage = new BlogComponentsPage();
    blogComponentsPage = await blogComponentsPage.goToPage(navBarPage);
  });

  it('should load Blogs', async () => {
    expect(await blogComponentsPage.title.getText()).to.match(/Blogs/);
    expect(await blogComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Blogs', async () => {
    const beforeRecordsCount = (await isVisible(blogComponentsPage.noRecords)) ? 0 : await getRecordsCount(blogComponentsPage.table);
    blogUpdatePage = await blogComponentsPage.goToCreateBlog();
    await blogUpdatePage.enterData();

    expect(await blogComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(blogComponentsPage.table);
    await waitUntilCount(blogComponentsPage.records, beforeRecordsCount + 1);
    expect(await blogComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await blogComponentsPage.deleteBlog();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(blogComponentsPage.records, beforeRecordsCount);
      expect(await blogComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(blogComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
