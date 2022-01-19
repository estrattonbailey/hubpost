import { hubpost, objectTypeIds } from './index'

hubpost('foo', 'bar', {
  name: 'Megan Rapinoe',
  position: {
    objectTypeId: objectTypeIds.contact,
    value: 'Captain'
  }
})
