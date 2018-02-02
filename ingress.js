function ingressMesh(options) {
  const seneca = this

  seneca.depends('balance-client')
  seneca.depends('mesh')

  seneca.sub('role:transport,type:balance,add:client', function(msg) {
    const ingress = msg.config.nodeMetadata
      ? msg.config.nodeMetadata.ingress
      : null
    if (ingress) {
      this.act('role:ingress,cmd:add', { ingress })
    }
  })
}

module.exports = ingressMesh
