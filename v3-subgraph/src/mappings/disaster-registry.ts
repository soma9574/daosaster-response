import { log } from '@graphprotocol/graph-ts'

import { AgentAttachedToDisaster, DisasterCreated, LocalAgentCreated } from '../types/DisasterRegistry/DisasterRegistry'
import { Agent, Disaster, LocalAgent } from '../types/schema'
import { LocalAgent as LocalAgentTemplate } from '../types/templates'

export function handleDisasterCreated(event: DisasterCreated): void {
  log.info('handleDisasterCreated called with disasterId: {}', [event.params.disasterId.toString()])

  const disaster = new Disaster(event.params.disasterId.toString())
  disaster.latitude = event.params.latitude
  disaster.longitude = event.params.longitude
  disaster.timestamp = event.params.timestamp
  disaster.save()

  const agentId = event.params.disasterContract.toHexString() + '-' + event.params.disasterId.toString()
  const agent = new Agent(agentId)
  agent.address = event.params.disasterContract
  agent.agentType = event.params.agentType
  agent.disaster = disaster.id
  agent.save()

  log.info('Disaster and Agent created for disaster contract address: {}', [
    event.params.disasterContract.toHexString(),
  ])
}

export function handleAgentAttachedToDisaster(event: AgentAttachedToDisaster): void {
  log.info('Agent attached to disaster: {}', [event.params.disasterId.toString()])

  const agentId = event.params.disasterId.toString() + '-' + event.params.agent.toHexString()
  const agent = new Agent(agentId)
  agent.address = event.params.agent
  agent.agentType = event.params.agentType
  agent.disaster = event.params.disasterId.toString()
  agent.save()

  log.info('Agent saved with id: {}', [agentId])
}

export function handleLocalAgentCreated(event: LocalAgentCreated): void {
  log.info('Local Agent created for disaster: {}', [event.params.disasterId.toString()])

  const localAgentId = event.params.localAgentAddress.toHexString()
  const localAgent = new LocalAgent(localAgentId)
  localAgent.address = event.params.localAgentAddress
  localAgent.disaster = event.params.disasterId.toString()
  localAgent.save()

  // Create a new LocalAgent data source
  LocalAgentTemplate.create(event.params.localAgentAddress)

  log.info('LocalAgent created with id: {}', [localAgentId])
}
