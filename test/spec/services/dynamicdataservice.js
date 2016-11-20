'use strict';

describe('Service: DynamicDataService', function () {

  // load the service's module
  beforeEach(module('wordPuzzleGameApp'));

  // instantiate service
  var DynamicDataService;
  beforeEach(inject(function (_DynamicDataService_) {
    DynamicDataService = _DynamicDataService_;
  }));

  it('should do something', function () {
    expect(!!DynamicDataService).toBe(true);
  });

});
