import { DroneData, ResourceLocation } from '../types/schema'
import { DroneDataUpdated, ResourceLocationAdded } from '../types/templates/LocalAgent/LocalAgent'

export function handleDroneDataUpdated(event: DroneDataUpdated): void {
  const id = event.params.agent.toHexString() + '-' + event.params.timestamp.toString()
  const droneData = new DroneData(id)
  droneData.agent = event.params.agent.toHexString()
  droneData.timestamp = event.params.timestamp
  droneData.latitude = event.params.latitude
  droneData.longitude = event.params.longitude
  droneData.altitude = event.params.altitude
  droneData.imageDescription = event.params.imageDescription
  droneData.emergencyAnalysis = event.params.emergencyAnalysis
  droneData.save()
}

export function handleResourceLocationAdded(event: ResourceLocationAdded): void {
  const id =
    event.params.agent.toHexString() + '-' + event.params.latitude.toString() + '-' + event.params.longitude.toString()
  const resourceLocation = new ResourceLocation(id)
  resourceLocation.agent = event.params.agent.toHexString()
  resourceLocation.resourceType = event.params.resourceType
  resourceLocation.latitude = event.params.latitude
  resourceLocation.longitude = event.params.longitude
  resourceLocation.description = event.params.description
  resourceLocation.save()
}
