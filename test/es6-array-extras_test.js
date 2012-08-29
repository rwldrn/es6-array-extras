var es6_array_extras = require("../lib/es6-array-extras.js");

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports["Array.of"] = {
  setUp: function(done) {
    // setup here
    done();
  },
  "single numeric": function(test) {
    test.expect(1);
    // tests here
    test.deepEqual( Array.of(0), [0], "Array.of(0) => [0]" );
    test.done();
  },
  "mixed": function(test) {
    test.expect(1);
    // tests here
    test.deepEqual(
      Array.of(null, undefined, false, 2),
      [null, undefined, false, 2],
      "Array.of(null, undefined, false, 2) => [null, undefined, false, 2]"
    );
    test.done();
  },
  "empty": function(test) {
    test.expect(1);
    // tests here
    test.deepEqual(
      Array.of(),
      [],
      "Array.of() => []"
    );
    test.done();
  }
};


exports["Array.from"] = {
  setUp: function(done) {
    // setup here
    done();
  },
  "arraylike": function(test) {
    test.expect(1);

    var arrayLike = { 0: "a", 1: "b", 2: "c", length: 3 };

    // tests here
    test.deepEqual(
      Array.from(arrayLike),
      [ "a", "b", "c" ],
      "Array.from(arrayLike) => [ 'a', 'b', 'c' ]"
    );
    test.done();
  },
  "arguments": function(test) {
    test.expect(1);
    // tests here
    test.deepEqual(
      Array.from( arguments ),
      [ test ],
      "Array.from( arguments ) => [test]"
    );
    test.done();
  },
  "borrowed": function(test) {
    test.expect(1);
    // tests here
    test.deepEqual(
      Array.of(),
      [],
      "Array.of() => []"
    );
    test.done();
  }
};

exports["Subclassed"] = {
  setUp: function(done) {
    // setup here
    done();
  },
  "borrow": function(test) {
    test.expect(2);

    var arrayLike, other;

    arrayLike = { 0: "a", 1: "b", 2: "c", length: 3 };

    other = {
      from: Array.from,
      of: Array.of
    };

    test.deepEqual(
      other.from(arrayLike),
      [ "a", "b", "c" ],
      "other.from(arrayLike) => [ 'a', 'b', 'c' ]"
    );

    test.deepEqual(
      other.of(null, undefined, false, 2),
      [null, undefined, false, 2],
      "other.of(null, undefined, false, 2) => [null, undefined, false, 2]"
    );
    test.done();
  }
};
