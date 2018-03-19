const k8s = require('@kubernetes/client-node')

const k8sApi = k8s.Config.defaultClient()

async function getService(serviceName, namespace) {
  const serviceResponse = await k8sApi.readNamespacedService(
    serviceName,
    namespace
  )
  return serviceResponse.body
}

async function serviceExists(serviceName, namespace) {
  try {
    await getService(serviceName, namespace)
  } catch (err) {
    return false
  }
}

module.exports = {
  serviceExists
}
