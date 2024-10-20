import { log } from '@graphprotocol/graph-ts'

import { DisasterCreated, ReportDisasterCall } from '../types/DisasterRegistry/DisasterRegistry'
import { Disaster } from '../types/schema'
import { Disaster as DisasterTemplate } from '../types/templates'

export function handleReportDisaster(call: ReportDisasterCall): void {
  log.info('reportDisaster function called. Caller: {}', [call.from.toHexString()])

  // The actual disaster creation will be handled by the DisasterCreated event handler
}

export function handleDisasterCreated(event: DisasterCreated): void {
  log.info('handleDisasterCreated called with disasterId: {}', [event.params.disasterId.toString()])

  const disaster = new Disaster(event.params.disasterId.toString())
  disaster.disasterContract = event.params.disasterContract
  disaster.latitude = event.params.latitude
  disaster.longitude = event.params.longitude
  disaster.timestamp = event.params.timestamp

  log.info('Disaster entity created with id: {}', [disaster.id])

  disaster.save()

  log.info('Disaster entity saved with id: {}', [disaster.id])

  DisasterTemplate.create(event.params.disasterContract)

  log.info('DisasterTemplate created for contract: {}', [event.params.disasterContract.toHexString()])
}
