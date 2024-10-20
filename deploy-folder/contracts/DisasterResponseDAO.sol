// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract DisasterResponseDAO is Ownable {
    using SafeERC20 for IERC20;

    struct Proposal {
        uint256 id;
        address proposer;
        uint256 amount;
        string description;
        uint256 yesVotes;
        uint256 noVotes;
        bool executed;
        mapping(address => bool) hasVoted;
    }

    IERC20 public token;
    mapping(address => bool) public isAgent;
    mapping(uint256 => Proposal) public proposals;
    uint256 public proposalCount;
    uint256 public quorum;
    uint256 public votingPeriod;

    event AgentAdded(address agent);
    event AgentRemoved(address agent);
    event ProposalCreated(
        uint256 proposalId,
        address proposer,
        uint256 amount,
        string description
    );
    event Voted(uint256 proposalId, address voter, bool inSupport);
    event ProposalExecuted(uint256 proposalId);

    constructor(address _token, uint256 _quorum, uint256 _votingPeriod) {
        token = IERC20(_token);
        quorum = _quorum;
        votingPeriod = _votingPeriod;
    }

    modifier onlyAgent() {
        require(isAgent[msg.sender], "Not an authorized agent");
        _;
    }

    function addAgent(address _agent) external onlyOwner {
        isAgent[_agent] = true;
        emit AgentAdded(_agent);
    }

    function removeAgent(address _agent) external onlyOwner {
        isAgent[_agent] = false;
        emit AgentRemoved(_agent);
    }

    function createProposal(
        uint256 _amount,
        string memory _description
    ) external onlyAgent {
        proposalCount++;
        Proposal storage newProposal = proposals[proposalCount];
        newProposal.id = proposalCount;
        newProposal.proposer = msg.sender;
        newProposal.amount = _amount;
        newProposal.description = _description;

        emit ProposalCreated(proposalCount, msg.sender, _amount, _description);
    }

    function vote(uint256 _proposalId, bool _inSupport) external onlyAgent {
        Proposal storage proposal = proposals[_proposalId];
        require(!proposal.hasVoted[msg.sender], "Already voted");
        require(!proposal.executed, "Proposal already executed");

        proposal.hasVoted[msg.sender] = true;
        if (_inSupport) {
            proposal.yesVotes++;
        } else {
            proposal.noVotes++;
        }

        emit Voted(_proposalId, msg.sender, _inSupport);

        if (
            proposal.yesVotes > quorum && proposal.yesVotes > proposal.noVotes
        ) {
            executeProposal(_proposalId);
        }
    }

    function executeProposal(uint256 _proposalId) internal {
        Proposal storage proposal = proposals[_proposalId];
        require(!proposal.executed, "Proposal already executed");
        require(
            token.balanceOf(address(this)) >= proposal.amount,
            "Insufficient funds"
        );

        proposal.executed = true;
        token.safeTransfer(proposal.proposer, proposal.amount);

        emit ProposalExecuted(_proposalId);
    }

    function depositFunds(uint256 _amount) external {
        require(_amount > 0, "Amount must be greater than 0");
        token.safeTransferFrom(msg.sender, address(this), _amount);
    }

    function withdrawFunds(uint256 _amount) external onlyOwner {
        require(_amount > 0, "Amount must be greater than 0");
        require(
            token.balanceOf(address(this)) >= _amount,
            "Insufficient funds"
        );
        token.safeTransfer(msg.sender, _amount);
    }

    function getProposalDetails(
        uint256 _proposalId
    )
        external
        view
        returns (
            address proposer,
            uint256 amount,
            string memory description,
            uint256 yesVotes,
            uint256 noVotes,
            bool executed
        )
    {
        Proposal storage proposal = proposals[_proposalId];
        return (
            proposal.proposer,
            proposal.amount,
            proposal.description,
            proposal.yesVotes,
            proposal.noVotes,
            proposal.executed
        );
    }
}
