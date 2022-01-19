# hubpost

A little util to submit form data to HubSpot using their [forms
API](https://legacydocs.hubspot.com/docs/methods/forms/submit_form).

```javascript
import { hubpost } from 'hubpost'

const portalId = '123123123'
const formId = '123123-123123-123123-123123'

try {
  await hubpost(portalId, formId, {
    first: 'Megan',
    last: 'Rapinoe'
  })
} catch (e) {
  console.log(e) // => { status, message, correlationId, errors[] }
}
```

When passing in your form fields, you can optionally structure them as objects
in order to specify custom `objectTypeId` values. They will otherwise default to
"contact" type `0-1`.

```javascript
await hubpost(portalId, formId, {
  name: 'Megan Rapinoe',
  position: {
    objectTypeId: '0-1234',
    value: 'Captain'
  }
})
```

This library also exports HubSpot's default `objectTypeId` values:

```javascript
import { objectTypeIds } from 'hubpost'

assert.deepEqual(objectTypeIds, {
  contact: '0-1',
  company: '0-2',
  deal: '0-3',
  ticket: '0-5',
})
```

## License

MIT License © [Eric Bailey](https://estrattonbailey.com)
