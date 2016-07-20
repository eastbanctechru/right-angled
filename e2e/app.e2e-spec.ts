import { RightAngledPage } from './app.po';

describe('right-angled demo App', function() {
  let page: RightAngledPage;

  beforeEach(() => {
    page = new RightAngledPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
