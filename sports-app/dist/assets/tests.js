'use strict';

define("sports-app/tests/lint/app.lint-test", [], function () {
  "use strict";

  QUnit.module('ESLint | app');
  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });
  QUnit.test('components/accepted-proposals.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/accepted-proposals.js should pass ESLint\n\n');
  });
  QUnit.test('components/bet-proposals.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/bet-proposals.js should pass ESLint\n\n6:9 - \'game\' is defined but never used. (no-unused-vars)\n7:7 - Unexpected console statement. (no-console)\n7:29 - \'proposal\' is not defined. (no-undef)');
  });
  QUnit.test('components/daily-games-table.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/daily-games-table.js should pass ESLint\n\n7:7 - Unexpected console statement. (no-console)');
  });
  QUnit.test('components/game-view.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/game-view.js should pass ESLint\n\n');
  });
  QUnit.test('components/mlb-game.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/mlb-game.js should pass ESLint\n\n');
  });
  QUnit.test('components/nav-bar.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/nav-bar.js should pass ESLint\n\n');
  });
  QUnit.test('controllers/accept-proposal.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/accept-proposal.js should pass ESLint\n\n9:20 - \'$\' is not defined. (no-undef)\n22:16 - Use import Controller from \'@ember/controller\'; instead of using Ember.Controller (ember/new-module-imports)\n32:7 - Unexpected console statement. (no-console)\n36:7 - Unexpected console statement. (no-console)');
  });
  QUnit.test('controllers/claim-winnings.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/claim-winnings.js should pass ESLint\n\n13:20 - \'$\' is not defined. (no-undef)\n26:16 - Use import Controller from \'@ember/controller\'; instead of using Ember.Controller (ember/new-module-imports)\n38:9 - Unexpected console statement. (no-console)\n40:9 - Unexpected console statement. (no-console)\n42:9 - Unexpected console statement. (no-console)\n46:9 - Unexpected console statement. (no-console)');
  });
  QUnit.test('controllers/login.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/login.js should pass ESLint\n\n14:13 - Unexpected console statement. (no-console)');
  });
  QUnit.test('controllers/new-proposal.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/new-proposal.js should pass ESLint\n\n5:3 - Unexpected console statement. (no-console)\n16:20 - \'$\' is not defined. (no-undef)\n29:16 - Use import Controller from \'@ember/controller\'; instead of using Ember.Controller (ember/new-module-imports)\n39:9 - Unexpected console statement. (no-console)\n41:9 - Unexpected console statement. (no-console)\n43:9 - Unexpected console statement. (no-console)\n47:9 - Unexpected console statement. (no-console)');
  });
  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });
  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'router.js should pass ESLint\n\n4:16 - Use import EmberRouter from \'@ember/routing/router\'; instead of using Ember.Router (ember/new-module-imports)');
  });
  QUnit.test('routes/accept-proposal.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/accept-proposal.js should pass ESLint\n\n17:5 - Unexpected console statement. (no-console)');
  });
  QUnit.test('routes/bet.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/bet.js should pass ESLint\n\n3:8 - \'config\' is defined but never used. (no-unused-vars)\n15:16 - \'headers\' is not defined. (no-undef)');
  });
  QUnit.test('routes/claim-winnings.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/claim-winnings.js should pass ESLint\n\n3:8 - \'$\' is defined but never used. (no-unused-vars)');
  });
  QUnit.test('routes/game.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/game.js should pass ESLint\n\n3:8 - \'config\' is defined but never used. (no-unused-vars)\n15:16 - \'headers\' is not defined. (no-undef)');
  });
  QUnit.test('routes/home.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/home.js should pass ESLint\n\n3:16 - Use import Route from \'@ember/routing/route\'; instead of using Ember.Route (ember/new-module-imports)\n14:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n15:8 - Don\'t use jQuery without Ember Run Loop (ember/jquery-ember-run)\n16:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n20:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n21:8 - Don\'t use jQuery without Ember Run Loop (ember/jquery-ember-run)\n22:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n26:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n27:8 - Don\'t use jQuery without Ember Run Loop (ember/jquery-ember-run)\n28:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n32:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n33:8 - Unexpected console statement. (no-console)\n33:8 - Don\'t use jQuery without Ember Run Loop (ember/jquery-ember-run)\n34:8 - Don\'t use jQuery without Ember Run Loop (ember/jquery-ember-run)\n35:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)');
  });
  QUnit.test('routes/login.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/login.js should pass ESLint\n\n');
  });
  QUnit.test('routes/mlb-game.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/mlb-game.js should pass ESLint\n\n');
  });
  QUnit.test('routes/new-proposal.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/new-proposal.js should pass ESLint\n\n');
  });
  QUnit.test('routes/test-route.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/test-route.js should pass ESLint\n\n');
  });
});
define("sports-app/tests/lint/tests.lint-test", [], function () {
  "use strict";

  QUnit.module('ESLint | tests');
  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });
  QUnit.test('unit/routes/accpet-proposal-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/accpet-proposal-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/routes/bet-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/bet-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/routes/claim-winnings-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/claim-winnings-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/routes/game-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/game-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/routes/login-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/login-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/routes/mlb-game-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/mlb-game-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/routes/new-proposal-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/new-proposal-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/routes/test-route-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/test-route-test.js should pass ESLint\n\n');
  });
});
define("sports-app/tests/test-helper", ["sports-app/app", "sports-app/config/environment", "@ember/test-helpers", "ember-qunit"], function (_app, _environment, _testHelpers, _emberQunit) {
  "use strict";

  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));
  (0, _emberQunit.start)();
});
define("sports-app/tests/unit/routes/accpet-proposal-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | accpet-proposal', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:accpet-proposal');
      assert.ok(route);
    });
  });
});
define("sports-app/tests/unit/routes/bet-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | bet', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:bet');
      assert.ok(route);
    });
  });
});
define("sports-app/tests/unit/routes/claim-winnings-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | claim-winnings', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:claim-winnings');
      assert.ok(route);
    });
  });
});
define("sports-app/tests/unit/routes/game-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | game', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:game');
      assert.ok(route);
    });
  });
});
define("sports-app/tests/unit/routes/login-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | login', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:login');
      assert.ok(route);
    });
  });
});
define("sports-app/tests/unit/routes/mlb-game-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | mlb-game', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:mlb-game');
      assert.ok(route);
    });
  });
});
define("sports-app/tests/unit/routes/new-proposal-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | new-proposal', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:new-proposal');
      assert.ok(route);
    });
  });
});
define("sports-app/tests/unit/routes/test-route-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | test-route', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:test-route');
      assert.ok(route);
    });
  });
});
define('sports-app/config/environment', [], function() {
  var prefix = 'sports-app';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

require('sports-app/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
