import { EsquissePage } from './app.po';

describe('esquisse App', () => {
  let page: EsquissePage;

  beforeEach(() => {
    page = new EsquissePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
