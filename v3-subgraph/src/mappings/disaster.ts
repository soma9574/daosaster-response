import { BigInt, log } from '@graphprotocol/graph-ts'

import { Agent, Disaster, HumanOrganization, Individual } from '../types/schema'
import { AgentAttached, IndividualAdded, OrganizationAdded } from '../types/templates/Disaster/Disaster'

export function handleAgentAttached(event: AgentAttached): void {
  log.info('handleAgentAttached called for agent: {}', [event.params.agent.toHexString()])

  const agentId = event.params.agent.toHexString()
  const agent = new Agent(agentId)
  agent.agentType = BigInt.fromI32(event.params.agentType)
  agent.disaster = event.address.toHexString()

  log.info('Agent entity created with id: {}', [agent.id])

  agent.save()

  log.info('Agent entity saved with id: {}', [agent.id])

  // Update the Disaster entity to include this agent
  const disaster = Disaster.load(event.address.toHexString())
  if (disaster) {
    // If you have an agents field in your Disaster entity, you can update it here
    // disaster.agents.push(agent.id)
    // disaster.save()
    log.info('Updated Disaster entity with id: {} to include Agent: {}', [disaster.id, agent.id])
  } else {
    log.warning('Disaster not found for address: {}', [event.address.toHexString()])
  }
}

export function handleOrganizationAdded(event: OrganizationAdded): void {
  const organization = new HumanOrganization(event.params.organization.toHexString())
  organization.save()
}

export function handleIndividualAdded(event: IndividualAdded): void {
  const individual = new Individual(event.params.individual.toHexString())
  individual.save()
}
