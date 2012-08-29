# ES6 Array Extras

Correct implementations for Array.of and Array.from. [Original proposal](https://gist.github.com/1074126)

## Getting Started
Install the module with: `npm install es6-array-extras`

## Documentation

### Array.of( ...items )

[ES6 Spec (15.4.3.3)](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-15.4.3.3)

Array.of provides a constructor that, unlike Array, does not have the special case for `new Array(42)`, which presets length (and hints to implementations to preallocate) but leaves holes in [0, length ).

One of the main goals of ES6 is to become a better language for library writers and code generators.

For compilation targets, ES/JS can't assume that implementations will always know what its factories are expected to construct:

Imagine the following piece of code is used in a VM (think Dart->JS, LLJS->JS)

```js
var o = (function( construct, ...rest ) {
  return new construct( rest );
})( factory [, variable arity args] );
```

If factory is Array and only one numeric arg is given, inline like this:

```js
var o = (function( construct, ...rest ) {
  return new construct( rest );
})( Array, 10 );
```

The result of `o` will be an array with 10 empty indexes, as if it were called like:

```js
new Array(10);
```

If you replace that by using `Array.of()`, you avoid this "gotcha".


```js

Array.of( 1 );

// [ 1 ]


Array.of( 1, 2, 3, 4 );

// [ 1, 2, 3, 4 ]

```




### Array.from( arrayLike )

[ES6 Spec (15.4.3.4)](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-15.4.3.4)

Converts a single argument that is an array-like object or list (eg. arguments, NodeList, DOMTokenList (used by classList), NamedNodeMap (used by attributes property)) into a new Array() and returns it;

``` javascript

var divs = document.querySelectorAll("div");

Array.from( divs );
// [ <div class=​"some classes" data-info=​"12">​</div>​, <div data-info=​"10">​</div>​ ]


Array.from( divs ).forEach(function( node ) {
    console.log( node );
});
// <div class=​"some classes" data-info=​"12">​</div>​
// <div data-info=​"10">​</div>​


Array.from( divs ).filter(function( node ) {
    return !!node.classList.length;
});
// [ <div class="some classes" data-info="12"></div> ]


Array.from( divs ).reduce(function( prev, current ) {
    return ( +prev.dataset.info ) + ( +current.dataset.info );
});
// 22


Array.from( divs[0].classList )
// ["some", "classes"]

```



## Contributing
All contributions must adhere to the [Idiomatic.js Style Guide](https://github.com/rwldrn/idiomatic.js),
by maintaining the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/cowboy/grunt).

## License
Copyright (c) 2012 Rick Waldron
Licensed under the MIT license.
