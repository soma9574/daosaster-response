import { ProposalCreated, ProposalExecuted, Voted } from '../types/DisasterResponseDAO/DisasterResponseDAO'
import { Proposal } from '../types/schema'

export function handleProposalCreated(event: ProposalCreated): void {
  const proposal = new Proposal(event.params.proposalId.toString())
  proposal.proposer = event.params.proposer
  proposal.amount = event.params.amount
  proposal.description = event.params.description
  proposal.save()
}

export function handleVoted(event: Voted): void {
  const proposal = Proposal.load(event.params.proposalId.toString())
  if (proposal) {
    // Update vote count logic here
    proposal.save()
  }
}

export function handleProposalExecuted(event: ProposalExecuted): void {
  const proposal = Proposal.load(event.params.proposalId.toString())
  if (proposal) {
    proposal.executed = true
    proposal.save()
  }
}
