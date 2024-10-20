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

export class AgentAdded extends ethereum.Event {
  get params(): AgentAdded__Params {
    return new AgentAdded__Params(this);
  }
}

export class AgentAdded__Params {
  _event: AgentAdded;

  constructor(event: AgentAdded) {
    this._event = event;
  }

  get agent(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class AgentRemoved extends ethereum.Event {
  get params(): AgentRemoved__Params {
    return new AgentRemoved__Params(this);
  }
}

export class AgentRemoved__Params {
  _event: AgentRemoved;

  constructor(event: AgentRemoved) {
    this._event = event;
  }

  get agent(): Address {
    return this._event.parameters[0].value.toAddress();
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

export class ProposalCreated extends ethereum.Event {
  get params(): ProposalCreated__Params {
    return new ProposalCreated__Params(this);
  }
}

export class ProposalCreated__Params {
  _event: ProposalCreated;

  constructor(event: ProposalCreated) {
    this._event = event;
  }

  get proposalId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get proposer(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get description(): string {
    return this._event.parameters[3].value.toString();
  }
}

export class ProposalExecuted extends ethereum.Event {
  get params(): ProposalExecuted__Params {
    return new ProposalExecuted__Params(this);
  }
}

export class ProposalExecuted__Params {
  _event: ProposalExecuted;

  constructor(event: ProposalExecuted) {
    this._event = event;
  }

  get proposalId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class Voted extends ethereum.Event {
  get params(): Voted__Params {
    return new Voted__Params(this);
  }
}

export class Voted__Params {
  _event: Voted;

  constructor(event: Voted) {
    this._event = event;
  }

  get proposalId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get voter(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get inSupport(): boolean {
    return this._event.parameters[2].value.toBoolean();
  }
}

export class DisasterResponseDAO__getProposalDetailsResult {
  value0: Address;
  value1: BigInt;
  value2: string;
  value3: BigInt;
  value4: BigInt;
  value5: boolean;

  constructor(
    value0: Address,
    value1: BigInt,
    value2: string,
    value3: BigInt,
    value4: BigInt,
    value5: boolean,
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
    map.set("value0", ethereum.Value.fromAddress(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromString(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    map.set("value4", ethereum.Value.fromUnsignedBigInt(this.value4));
    map.set("value5", ethereum.Value.fromBoolean(this.value5));
    return map;
  }

  getProposer(): Address {
    return this.value0;
  }

  getAmount(): BigInt {
    return this.value1;
  }

  getDescription(): string {
    return this.value2;
  }

  getYesVotes(): BigInt {
    return this.value3;
  }

  getNoVotes(): BigInt {
    return this.value4;
  }

  getExecuted(): boolean {
    return this.value5;
  }
}

export class DisasterResponseDAO__proposalsResult {
  value0: BigInt;
  value1: Address;
  value2: BigInt;
  value3: string;
  value4: BigInt;
  value5: BigInt;
  value6: boolean;

  constructor(
    value0: BigInt,
    value1: Address,
    value2: BigInt,
    value3: string,
    value4: BigInt,
    value5: BigInt,
    value6: boolean,
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.value5 = value5;
    this.value6 = value6;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromAddress(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    map.set("value3", ethereum.Value.fromString(this.value3));
    map.set("value4", ethereum.Value.fromUnsignedBigInt(this.value4));
    map.set("value5", ethereum.Value.fromUnsignedBigInt(this.value5));
    map.set("value6", ethereum.Value.fromBoolean(this.value6));
    return map;
  }

  getId(): BigInt {
    return this.value0;
  }

  getProposer(): Address {
    return this.value1;
  }

  getAmount(): BigInt {
    return this.value2;
  }

  getDescription(): string {
    return this.value3;
  }

  getYesVotes(): BigInt {
    return this.value4;
  }

  getNoVotes(): BigInt {
    return this.value5;
  }

  getExecuted(): boolean {
    return this.value6;
  }
}

export class DisasterResponseDAO extends ethereum.SmartContract {
  static bind(address: Address): DisasterResponseDAO {
    return new DisasterResponseDAO("DisasterResponseDAO", address);
  }

  getProposalDetails(
    _proposalId: BigInt,
  ): DisasterResponseDAO__getProposalDetailsResult {
    let result = super.call(
      "getProposalDetails",
      "getProposalDetails(uint256):(address,uint256,string,uint256,uint256,bool)",
      [ethereum.Value.fromUnsignedBigInt(_proposalId)],
    );

    return new DisasterResponseDAO__getProposalDetailsResult(
      result[0].toAddress(),
      result[1].toBigInt(),
      result[2].toString(),
      result[3].toBigInt(),
      result[4].toBigInt(),
      result[5].toBoolean(),
    );
  }

  try_getProposalDetails(
    _proposalId: BigInt,
  ): ethereum.CallResult<DisasterResponseDAO__getProposalDetailsResult> {
    let result = super.tryCall(
      "getProposalDetails",
      "getProposalDetails(uint256):(address,uint256,string,uint256,uint256,bool)",
      [ethereum.Value.fromUnsignedBigInt(_proposalId)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new DisasterResponseDAO__getProposalDetailsResult(
        value[0].toAddress(),
        value[1].toBigInt(),
        value[2].toString(),
        value[3].toBigInt(),
        value[4].toBigInt(),
        value[5].toBoolean(),
      ),
    );
  }

  isAgent(param0: Address): boolean {
    let result = super.call("isAgent", "isAgent(address):(bool)", [
      ethereum.Value.fromAddress(param0),
    ]);

    return result[0].toBoolean();
  }

  try_isAgent(param0: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall("isAgent", "isAgent(address):(bool)", [
      ethereum.Value.fromAddress(param0),
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
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

  proposalCount(): BigInt {
    let result = super.call("proposalCount", "proposalCount():(uint256)", []);

    return result[0].toBigInt();
  }

  try_proposalCount(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "proposalCount",
      "proposalCount():(uint256)",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  proposals(param0: BigInt): DisasterResponseDAO__proposalsResult {
    let result = super.call(
      "proposals",
      "proposals(uint256):(uint256,address,uint256,string,uint256,uint256,bool)",
      [ethereum.Value.fromUnsignedBigInt(param0)],
    );

    return new DisasterResponseDAO__proposalsResult(
      result[0].toBigInt(),
      result[1].toAddress(),
      result[2].toBigInt(),
      result[3].toString(),
      result[4].toBigInt(),
      result[5].toBigInt(),
      result[6].toBoolean(),
    );
  }

  try_proposals(
    param0: BigInt,
  ): ethereum.CallResult<DisasterResponseDAO__proposalsResult> {
    let result = super.tryCall(
      "proposals",
      "proposals(uint256):(uint256,address,uint256,string,uint256,uint256,bool)",
      [ethereum.Value.fromUnsignedBigInt(param0)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new DisasterResponseDAO__proposalsResult(
        value[0].toBigInt(),
        value[1].toAddress(),
        value[2].toBigInt(),
        value[3].toString(),
        value[4].toBigInt(),
        value[5].toBigInt(),
        value[6].toBoolean(),
      ),
    );
  }

  quorum(): BigInt {
    let result = super.call("quorum", "quorum():(uint256)", []);

    return result[0].toBigInt();
  }

  try_quorum(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("quorum", "quorum():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  token(): Address {
    let result = super.call("token", "token():(address)", []);

    return result[0].toAddress();
  }

  try_token(): ethereum.CallResult<Address> {
    let result = super.tryCall("token", "token():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  votingPeriod(): BigInt {
    let result = super.call("votingPeriod", "votingPeriod():(uint256)", []);

    return result[0].toBigInt();
  }

  try_votingPeriod(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("votingPeriod", "votingPeriod():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
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

  get _token(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _quorum(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get _votingPeriod(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class AddAgentCall extends ethereum.Call {
  get inputs(): AddAgentCall__Inputs {
    return new AddAgentCall__Inputs(this);
  }

  get outputs(): AddAgentCall__Outputs {
    return new AddAgentCall__Outputs(this);
  }
}

export class AddAgentCall__Inputs {
  _call: AddAgentCall;

  constructor(call: AddAgentCall) {
    this._call = call;
  }

  get _agent(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class AddAgentCall__Outputs {
  _call: AddAgentCall;

  constructor(call: AddAgentCall) {
    this._call = call;
  }
}

export class CreateProposalCall extends ethereum.Call {
  get inputs(): CreateProposalCall__Inputs {
    return new CreateProposalCall__Inputs(this);
  }

  get outputs(): CreateProposalCall__Outputs {
    return new CreateProposalCall__Outputs(this);
  }
}

export class CreateProposalCall__Inputs {
  _call: CreateProposalCall;

  constructor(call: CreateProposalCall) {
    this._call = call;
  }

  get _amount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _description(): string {
    return this._call.inputValues[1].value.toString();
  }
}

export class CreateProposalCall__Outputs {
  _call: CreateProposalCall;

  constructor(call: CreateProposalCall) {
    this._call = call;
  }
}

export class DepositFundsCall extends ethereum.Call {
  get inputs(): DepositFundsCall__Inputs {
    return new DepositFundsCall__Inputs(this);
  }

  get outputs(): DepositFundsCall__Outputs {
    return new DepositFundsCall__Outputs(this);
  }
}

export class DepositFundsCall__Inputs {
  _call: DepositFundsCall;

  constructor(call: DepositFundsCall) {
    this._call = call;
  }

  get _amount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class DepositFundsCall__Outputs {
  _call: DepositFundsCall;

  constructor(call: DepositFundsCall) {
    this._call = call;
  }
}

export class RemoveAgentCall extends ethereum.Call {
  get inputs(): RemoveAgentCall__Inputs {
    return new RemoveAgentCall__Inputs(this);
  }

  get outputs(): RemoveAgentCall__Outputs {
    return new RemoveAgentCall__Outputs(this);
  }
}

export class RemoveAgentCall__Inputs {
  _call: RemoveAgentCall;

  constructor(call: RemoveAgentCall) {
    this._call = call;
  }

  get _agent(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class RemoveAgentCall__Outputs {
  _call: RemoveAgentCall;

  constructor(call: RemoveAgentCall) {
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

export class VoteCall extends ethereum.Call {
  get inputs(): VoteCall__Inputs {
    return new VoteCall__Inputs(this);
  }

  get outputs(): VoteCall__Outputs {
    return new VoteCall__Outputs(this);
  }
}

export class VoteCall__Inputs {
  _call: VoteCall;

  constructor(call: VoteCall) {
    this._call = call;
  }

  get _proposalId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _inSupport(): boolean {
    return this._call.inputValues[1].value.toBoolean();
  }
}

export class VoteCall__Outputs {
  _call: VoteCall;

  constructor(call: VoteCall) {
    this._call = call;
  }
}

export class WithdrawFundsCall extends ethereum.Call {
  get inputs(): WithdrawFundsCall__Inputs {
    return new WithdrawFundsCall__Inputs(this);
  }

  get outputs(): WithdrawFundsCall__Outputs {
    return new WithdrawFundsCall__Outputs(this);
  }
}

export class WithdrawFundsCall__Inputs {
  _call: WithdrawFundsCall;

  constructor(call: WithdrawFundsCall) {
    this._call = call;
  }

  get _amount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class WithdrawFundsCall__Outputs {
  _call: WithdrawFundsCall;

  constructor(call: WithdrawFundsCall) {
    this._call = call;
  }
}
