import { E2e4Ng2DemoPage } from './app.po';

describe('right-angled App', function() {
  let page: E2e4Ng2DemoPage;

  beforeEach(() => {
    page = new E2e4Ng2DemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
