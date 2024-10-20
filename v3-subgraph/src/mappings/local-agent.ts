import { DroneData, LocalAgent, ResourceLocation } from '../types/schema'
import { DroneDataUpdated, ResourceLocationAdded } from '../types/templates/LocalAgent/LocalAgent'

export function handleDroneDataUpdated(event: DroneDataUpdated): void {
  const id = event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  const droneData = new DroneData(id)
  droneData.agent = event.address.toHexString() // Use the contract address as the LocalAgent ID
  droneData.timestamp = event.params.timestamp
  droneData.latitude = event.params.latitude
  droneData.longitude = event.params.longitude
  droneData.altitude = event.params.altitude
  droneData.imageDescription = event.params.imageDescription
  droneData.emergencyAnalysis = event.params.emergencyAnalysis
  droneData.save()

  // Ensure LocalAgent entity exists
  let localAgent = LocalAgent.load(event.address.toHexString())
  if (!localAgent) {
    localAgent = new LocalAgent(event.address.toHexString())
    localAgent.address = event.address
    localAgent.disaster = event.params.agent.toHexString() // Assuming the agent parameter is the disaster ID
    localAgent.save()
  }
}

export function handleResourceLocationAdded(event: ResourceLocationAdded): void {
  const id = event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  const resourceLocation = new ResourceLocation(id)
  resourceLocation.agent = event.address.toHexString() // Use the contract address as the LocalAgent ID
  resourceLocation.resourceType = event.params.resourceType
  resourceLocation.latitude = event.params.latitude
  resourceLocation.longitude = event.params.longitude
  resourceLocation.description = event.params.description
  resourceLocation.save()

  // Ensure LocalAgent entity exists
  let localAgent = LocalAgent.load(event.address.toHexString())
  if (!localAgent) {
    localAgent = new LocalAgent(event.address.toHexString())
    localAgent.address = event.address
    localAgent.disaster = event.params.agent.toHexString() // Assuming the agent parameter is the disaster ID
    localAgent.save()
  }
}
