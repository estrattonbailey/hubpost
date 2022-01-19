declare enum objectTypeIds {
  contact = '0-1',
  company = '0-2',
  deal = '0-3',
  ticket = '0-5',
}

export type Payload = {
  [field: string]: string | {
    objectTypeId: string
    value: string | number
  }
}

export function hubpost(portalId: string, formId: string, payload: Payload): Promise<void>
