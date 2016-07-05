import { RightAngledPage } from './app.po';

describe('right-angled App', function() {
  let page: RightAngledPage;

  beforeEach(() => {
    page = new RightAngledPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
