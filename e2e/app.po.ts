import { browser, by, element } from 'protractor/globals';

export class RightAngledDemoPage {
  public navigateTo() {
    return browser.get('/');
  }

  public getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
