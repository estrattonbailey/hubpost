declare enum objectTypeIds {
  contact = '0-1',
  company = '0-2',
  deal = '0-3',
  ticket = '0-5',
}

export type Value = string | number | boolean | null | undefined

export type Payload = {
  [field: string]: Value | {
    objectTypeId: string
    value: Value
  }
}

export function hubpost(portalId: string, formId: string, payload: Payload): Promise<void>
