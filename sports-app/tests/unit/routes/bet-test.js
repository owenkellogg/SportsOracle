import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | bet', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:bet');
    assert.ok(route);
  });
});
