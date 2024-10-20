import { log } from '@graphprotocol/graph-ts'

import { Agent, Disaster, HumanOrganization, Individual } from '../types/schema'
import { AgentAttached, IndividualAdded, OrganizationAdded } from '../types/templates/Disaster/Disaster'

export function handleAgentAttached(event: AgentAttached): void {
  log.info('handleAgentAttached called for agent: {}', [event.params.agent.toHexString()])

  const agentId = event.params.agent.toHexString()
  let agent = Agent.load(agentId)

  if (agent == null) {
    log.warning('Agent not found, creating new agent: {}', [agentId])
    agent = new Agent(agentId)
    agent.address = event.params.agent
  }

  agent.agentType = event.params.agentType
  agent.disaster = event.address.toHexString()

  log.info('Agent entity updated with id: {}', [agent.id])

  agent.save()

  log.info('Agent entity saved with id: {}', [agent.id])

  // Update the Disaster entity to include this agent
  const disaster = Disaster.load(event.address.toHexString())
  if (disaster) {
    log.info('Updated Disaster entity with id: {} to include Agent: {}', [disaster.id, agent.id])
  } else {
    log.warning('Disaster not found for address: {}', [event.address.toHexString()])
  }
}

export function handleOrganizationAdded(event: OrganizationAdded): void {
  const organization = new HumanOrganization(event.params.organization.toHexString())
  organization.name = event.params.name
  organization.expertise = event.params.expertise
  organization.save()
}

export function handleIndividualAdded(event: IndividualAdded): void {
  const individual = new Individual(event.params.individual.toHexString())
  individual.name = event.params.name
  individual.skills = event.params.skills
  individual.save()
}
