/*
  MIT License,
  Copyright (c) 2015-2017, Richard Rodger and other contributors.
*/

'use strict'

var Assert = require('assert')
var Util = require('util')

var Lab = require('lab')
var Code = require('code')
var Seneca = require('seneca')
var Rif = require('rif')

var lab = (exports.lab = Lab.script())
var describe = lab.describe
var it = lab.it
var expect = Code.expect

var Mesh = require('../mesh')

var intern = Mesh.intern

var test_discover = {
  stop: true,
  guess: { active: true },
  multicast: { active: false },
  registry: { active: false }
}

describe('mesh routing', function() {
  it(
    'accepts route configuration',
    { parallel: false, timeout: 5555 },
    function(fin) {
      const b0 = Seneca({ tag: 'b0', legacy: { transport: false } })
        .test(fin)
        .use('../mesh', { base: true, discover: test_discover, onAddClient })

      const s0 = Seneca({ tag: 's0', legacy: { transport: false } })
        .test(fin)
        .add('a:1', function(msg, reply) {
          reply({ x: msg.x })
        })

      b0.ready(function() {
        s0.use('../mesh', {
          pin: 'a:1',
          discover: test_discover,
          routes: [
            { path: '/test', method: 'POST', pattern: 'cmd:test,val:{qsValue}' }
          ]
        })
      })

      function onAddClient(meta) {
        const routes = meta.config.routes
        Assert.equal(routes.length, 1)
        s0.close(b0.close.bind(b0, setTimeout.bind(this, fin, 555)))
      }
    }
  )
})
