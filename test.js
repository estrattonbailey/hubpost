const { test } = require('uvu')
const assert = require('uvu/assert')

const { hubpost, objectTypeIds } = require('./index')

test('works', async () => {
  let options

  globalThis.window = {
    location: {
      href: 'href'
    }
  }
  globalThis.document = {
    title: 'title'
  }
  globalThis.fetch = async (url, opts) => {
    options = opts

    return {
      json() {
        return {
          ok: true,
        }
      }
    }
  }

  await hubpost('foo', 'bar', {
    name: 'eric',
    test: undefined,
    foo: {
      objectTypeId: objectTypeIds.company,
      value: 'bar',
    },
    bar: {
      value: 0,
    },
    zero: 0,
    empty: '',
  })

  assert.equal(options.method, 'POST')
  assert.equal(options.headers, {
    'content-type': 'application/json'
  })

  const body = JSON.parse(options.body)

  assert.equal(body.fields, [
    {
      objectTypeId: objectTypeIds.contact,
      name: 'name',
      value: 'eric',
    },
    {
      objectTypeId: objectTypeIds.contact,
      name: 'test',
    },
    {
      objectTypeId: objectTypeIds.company,
      name: 'foo',
      value: 'bar',
    },
    {
      objectTypeId: objectTypeIds.contact,
      name: 'bar',
      value: 0,
    },
    {
      objectTypeId: objectTypeIds.contact,
      name: 'zero',
      value: 0,
    },
    {
      objectTypeId: objectTypeIds.contact,
      name: 'empty',
      value: '',
    },
  ])
  assert.equal(body.context, {
    pageUri: 'href',
    pageName: 'title'
  })
})

test.run()
