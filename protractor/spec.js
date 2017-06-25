describe('TODO app', function() {
  it('should change languages', function() {

    browser.get('http://localhost:9000/');

    var title = element(by.binding('$ctrl.title'));
    expect(title.getText()).toEqual('Plánovací seznam');

    element(by.id('langSel')).click();
    expect(title.getText()).toEqual('TODO list');

  });
});