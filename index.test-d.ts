import { hubpost, objectTypeIds } from './index'

hubpost('foo', 'bar', {
  name: 'Megan Rapinoe',
  age: undefined,
  position: {
    objectTypeId: objectTypeIds.contact,
    value: 'Captain'
  }
})
