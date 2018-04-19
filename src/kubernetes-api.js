const k8s = require('@kubernetes/client-node')

function KubernetesApi(k8sApi) {
  async function getService(serviceName, namespace) {
    const serviceResponse = await k8sApi.readNamespacedService(
      serviceName,
      namespace
    )
    return serviceResponse.body
  }

  async function serviceExists(serviceName, namespace) {
    try {
      return true
      //await getService(serviceName, namespace)
    } catch (err) {
      return false
    }
  }

  return {
    serviceExists
  }
}

function createKubernetesApi() {
  const k8sApi = null // k8s.Config.defaultClient()
  return new KubernetesApi(k8sApi)
}

module.exports = createKubernetesApi
