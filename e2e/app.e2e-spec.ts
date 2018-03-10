import { LmzPage } from './app.po';

describe('lmz App', () => {
  let page: LmzPage;

  beforeEach(() => {
    page = new LmzPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
