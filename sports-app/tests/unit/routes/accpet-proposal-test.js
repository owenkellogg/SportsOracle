import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | accpet-proposal', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:accpet-proposal');
    assert.ok(route);
  });
});
