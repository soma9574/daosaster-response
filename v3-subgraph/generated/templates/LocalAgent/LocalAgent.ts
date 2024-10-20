// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt,
} from "@graphprotocol/graph-ts";

export class DroneDataUpdated extends ethereum.Event {
  get params(): DroneDataUpdated__Params {
    return new DroneDataUpdated__Params(this);
  }
}

export class DroneDataUpdated__Params {
  _event: DroneDataUpdated;

  constructor(event: DroneDataUpdated) {
    this._event = event;
  }

  get agent(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get timestamp(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get latitude(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get longitude(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get altitude(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get imageDescription(): string {
    return this._event.parameters[5].value.toString();
  }

  get emergencyAnalysis(): string {
    return this._event.parameters[6].value.toString();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class ResourceLocationAdded extends ethereum.Event {
  get params(): ResourceLocationAdded__Params {
    return new ResourceLocationAdded__Params(this);
  }
}

export class ResourceLocationAdded__Params {
  _event: ResourceLocationAdded;

  constructor(event: ResourceLocationAdded) {
    this._event = event;
  }

  get agent(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get resourceType(): string {
    return this._event.parameters[1].value.toString();
  }

  get latitude(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get longitude(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get description(): string {
    return this._event.parameters[4].value.toString();
  }
}

export class LocalAgent__getLatestDroneDataResultValue0Struct extends ethereum.Tuple {
  get timestamp(): BigInt {
    return this[0].toBigInt();
  }

  get latitude(): BigInt {
    return this[1].toBigInt();
  }

  get longitude(): BigInt {
    return this[2].toBigInt();
  }

  get altitude(): BigInt {
    return this[3].toBigInt();
  }

  get imageDescription(): string {
    return this[4].toString();
  }

  get emergencyAnalysis(): string {
    return this[5].toString();
  }
}

export class LocalAgent__getResourceLocationsResultValue0Struct extends ethereum.Tuple {
  get resourceType(): string {
    return this[0].toString();
  }

  get latitude(): BigInt {
    return this[1].toBigInt();
  }

  get longitude(): BigInt {
    return this[2].toBigInt();
  }

  get description(): string {
    return this[3].toString();
  }
}

export class LocalAgent__latestDroneDataResult {
  value0: BigInt;
  value1: BigInt;
  value2: BigInt;
  value3: BigInt;
  value4: string;
  value5: string;

  constructor(
    value0: BigInt,
    value1: BigInt,
    value2: BigInt,
    value3: BigInt,
    value4: string,
    value5: string,
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.value5 = value5;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromSignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromSignedBigInt(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    map.set("value4", ethereum.Value.fromString(this.value4));
    map.set("value5", ethereum.Value.fromString(this.value5));
    return map;
  }

  getTimestamp(): BigInt {
    return this.value0;
  }

  getLatitude(): BigInt {
    return this.value1;
  }

  getLongitude(): BigInt {
    return this.value2;
  }

  getAltitude(): BigInt {
    return this.value3;
  }

  getImageDescription(): string {
    return this.value4;
  }

  getEmergencyAnalysis(): string {
    return this.value5;
  }
}

export class LocalAgent__resourceLocationsResult {
  value0: string;
  value1: BigInt;
  value2: BigInt;
  value3: string;

  constructor(value0: string, value1: BigInt, value2: BigInt, value3: string) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromString(this.value0));
    map.set("value1", ethereum.Value.fromSignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromSignedBigInt(this.value2));
    map.set("value3", ethereum.Value.fromString(this.value3));
    return map;
  }

  getResourceType(): string {
    return this.value0;
  }

  getLatitude(): BigInt {
    return this.value1;
  }

  getLongitude(): BigInt {
    return this.value2;
  }

  getDescription(): string {
    return this.value3;
  }
}

export class LocalAgent extends ethereum.SmartContract {
  static bind(address: Address): LocalAgent {
    return new LocalAgent("LocalAgent", address);
  }

  disasterRegistry(): Address {
    let result = super.call(
      "disasterRegistry",
      "disasterRegistry():(address)",
      [],
    );

    return result[0].toAddress();
  }

  try_disasterRegistry(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "disasterRegistry",
      "disasterRegistry():(address)",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getDisasterRegistryAddress(): Address {
    let result = super.call(
      "getDisasterRegistryAddress",
      "getDisasterRegistryAddress():(address)",
      [],
    );

    return result[0].toAddress();
  }

  try_getDisasterRegistryAddress(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getDisasterRegistryAddress",
      "getDisasterRegistryAddress():(address)",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getLatestDroneData(): LocalAgent__getLatestDroneDataResultValue0Struct {
    let result = super.call(
      "getLatestDroneData",
      "getLatestDroneData():((uint256,int256,int256,uint256,string,string))",
      [],
    );

    return changetype<LocalAgent__getLatestDroneDataResultValue0Struct>(
      result[0].toTuple(),
    );
  }

  try_getLatestDroneData(): ethereum.CallResult<LocalAgent__getLatestDroneDataResultValue0Struct> {
    let result = super.tryCall(
      "getLatestDroneData",
      "getLatestDroneData():((uint256,int256,int256,uint256,string,string))",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      changetype<LocalAgent__getLatestDroneDataResultValue0Struct>(
        value[0].toTuple(),
      ),
    );
  }

  getResourceLocations(): Array<LocalAgent__getResourceLocationsResultValue0Struct> {
    let result = super.call(
      "getResourceLocations",
      "getResourceLocations():((string,int256,int256,string)[])",
      [],
    );

    return result[0].toTupleArray<LocalAgent__getResourceLocationsResultValue0Struct>();
  }

  try_getResourceLocations(): ethereum.CallResult<
    Array<LocalAgent__getResourceLocationsResultValue0Struct>
  > {
    let result = super.tryCall(
      "getResourceLocations",
      "getResourceLocations():((string,int256,int256,string)[])",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      value[0].toTupleArray<LocalAgent__getResourceLocationsResultValue0Struct>(),
    );
  }

  latestDroneData(): LocalAgent__latestDroneDataResult {
    let result = super.call(
      "latestDroneData",
      "latestDroneData():(uint256,int256,int256,uint256,string,string)",
      [],
    );

    return new LocalAgent__latestDroneDataResult(
      result[0].toBigInt(),
      result[1].toBigInt(),
      result[2].toBigInt(),
      result[3].toBigInt(),
      result[4].toString(),
      result[5].toString(),
    );
  }

  try_latestDroneData(): ethereum.CallResult<LocalAgent__latestDroneDataResult> {
    let result = super.tryCall(
      "latestDroneData",
      "latestDroneData():(uint256,int256,int256,uint256,string,string)",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new LocalAgent__latestDroneDataResult(
        value[0].toBigInt(),
        value[1].toBigInt(),
        value[2].toBigInt(),
        value[3].toBigInt(),
        value[4].toString(),
        value[5].toString(),
      ),
    );
  }

  monitorLocalSensors(): string {
    let result = super.call(
      "monitorLocalSensors",
      "monitorLocalSensors():(string)",
      [],
    );

    return result[0].toString();
  }

  try_monitorLocalSensors(): ethereum.CallResult<string> {
    let result = super.tryCall(
      "monitorLocalSensors",
      "monitorLocalSensors():(string)",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  reportLocalDisaster(_disasterInfo: string): string {
    let result = super.call(
      "reportLocalDisaster",
      "reportLocalDisaster(string):(string)",
      [ethereum.Value.fromString(_disasterInfo)],
    );

    return result[0].toString();
  }

  try_reportLocalDisaster(_disasterInfo: string): ethereum.CallResult<string> {
    let result = super.tryCall(
      "reportLocalDisaster",
      "reportLocalDisaster(string):(string)",
      [ethereum.Value.fromString(_disasterInfo)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  resourceLocations(param0: BigInt): LocalAgent__resourceLocationsResult {
    let result = super.call(
      "resourceLocations",
      "resourceLocations(uint256):(string,int256,int256,string)",
      [ethereum.Value.fromUnsignedBigInt(param0)],
    );

    return new LocalAgent__resourceLocationsResult(
      result[0].toString(),
      result[1].toBigInt(),
      result[2].toBigInt(),
      result[3].toString(),
    );
  }

  try_resourceLocations(
    param0: BigInt,
  ): ethereum.CallResult<LocalAgent__resourceLocationsResult> {
    let result = super.tryCall(
      "resourceLocations",
      "resourceLocations(uint256):(string,int256,int256,string)",
      [ethereum.Value.fromUnsignedBigInt(param0)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new LocalAgent__resourceLocationsResult(
        value[0].toString(),
        value[1].toBigInt(),
        value[2].toBigInt(),
        value[3].toString(),
      ),
    );
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _disasterRegistryAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class AddResourceLocationCall extends ethereum.Call {
  get inputs(): AddResourceLocationCall__Inputs {
    return new AddResourceLocationCall__Inputs(this);
  }

  get outputs(): AddResourceLocationCall__Outputs {
    return new AddResourceLocationCall__Outputs(this);
  }
}

export class AddResourceLocationCall__Inputs {
  _call: AddResourceLocationCall;

  constructor(call: AddResourceLocationCall) {
    this._call = call;
  }

  get _resourceType(): string {
    return this._call.inputValues[0].value.toString();
  }

  get _latitude(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get _longitude(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get _description(): string {
    return this._call.inputValues[3].value.toString();
  }
}

export class AddResourceLocationCall__Outputs {
  _call: AddResourceLocationCall;

  constructor(call: AddResourceLocationCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class ReportDisasterCall extends ethereum.Call {
  get inputs(): ReportDisasterCall__Inputs {
    return new ReportDisasterCall__Inputs(this);
  }

  get outputs(): ReportDisasterCall__Outputs {
    return new ReportDisasterCall__Outputs(this);
  }
}

export class ReportDisasterCall__Inputs {
  _call: ReportDisasterCall;

  constructor(call: ReportDisasterCall) {
    this._call = call;
  }

  get _latitude(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _longitude(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get _timestamp(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class ReportDisasterCall__Outputs {
  _call: ReportDisasterCall;

  constructor(call: ReportDisasterCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}

export class UpdateDroneDataCall extends ethereum.Call {
  get inputs(): UpdateDroneDataCall__Inputs {
    return new UpdateDroneDataCall__Inputs(this);
  }

  get outputs(): UpdateDroneDataCall__Outputs {
    return new UpdateDroneDataCall__Outputs(this);
  }
}

export class UpdateDroneDataCall__Inputs {
  _call: UpdateDroneDataCall;

  constructor(call: UpdateDroneDataCall) {
    this._call = call;
  }

  get _latitude(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _longitude(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get _altitude(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get _imageDescription(): string {
    return this._call.inputValues[3].value.toString();
  }

  get _emergencyAnalysis(): string {
    return this._call.inputValues[4].value.toString();
  }
}

export class UpdateDroneDataCall__Outputs {
  _call: UpdateDroneDataCall;

  constructor(call: UpdateDroneDataCall) {
    this._call = call;
  }
}
