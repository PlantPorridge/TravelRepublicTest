import { TravelRepublicTestPage } from './app.po';

describe('travel-republic-test App', () => {
  let page: TravelRepublicTestPage;

  beforeEach(() => {
    page = new TravelRepublicTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
