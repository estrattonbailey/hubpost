var objectTypeIds = {
  contact: '0-1',
  company: '0-2',
  deal: '0-3',
  ticket: '0-5',
}

function normalizeFields(payload) {
  return Object.keys(payload).reduce(function (fields, key) {
    var field = payload[key]
    var objectTypeId = field && field.objectTypeId ? field.objectTypeId : objectTypeIds.contact
    return fields.concat({
      objectTypeId: objectTypeId,
      name: key,
      value: field && typeof field === 'object' ? field.value : field,
    })
  }, [])
}

function hubpost(portal, form, payload) {
  var url = `https://api.hsforms.com/submissions/v3/integration/submit/${portal}/${form}`
  var fields = normalizeFields(payload)
  var context = {
    pageUri: window.location.href,
    pageName: document.title,
  }

  return fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      submittedAt: Date.now(),
      fields,
      context
    })
  })
    .then(function (res) { return res.json() })
    .then(function (res) {
      if (!res.ok && res.status === 'error') {
        var error = new Error(res.message)

        error.status = res.status
        error.correlationId = res.correlationId
        error.errors = res.errors

        throw error
      }

      return res
    })
}

module.exports = {
  objectTypeIds,
  hubpost
}
