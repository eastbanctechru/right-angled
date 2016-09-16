import { RightAngledDemoPage } from './app.po';

describe('right-angled-demo App', function() {
  let page: RightAngledDemoPage;

  beforeEach(() => {
    page = new RightAngledDemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
