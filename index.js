var objectTypeIds = {
  contact: '0-1',
  company: '0-2',
  deal: '0-3',
  ticket: '0-5',
}

function hubpost(portal, form, payload) {
  var url = `https://api.hsforms.com/submissions/v3/integration/submit/${portal}/${form}`
  var data = {
    submittedAt: Date.now(),
    fields: Object.keys(payload).reduce((fields, key) => {
      var field = payload[key]
      return fields.concat({
        objectTypeId: field.objectTypeId || objectTypeIds.contact,
        name: key,
        value: field.value || field,
      })
    }, []),
    context: {
      pageUri: window.location.href,
      pageName: document.title,
    },
  }

  fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(res => {
      if (!res.ok && res.status === 'error') {
        let error = new Error(res.message)

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
