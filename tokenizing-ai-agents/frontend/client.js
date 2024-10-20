import { createPublicClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { StoryClient } from "@story-protocol/core-sdk";

// WARNING: Never expose private keys in frontend code
// This should be managed securely, preferably on the server side
const privateKey = "0xee1127ad1d95df1522ad8cc5a8257189e64fe20fa3e2f4492f9f0812e74ca5dfa";
const account = privateKeyToAccount(privateKey);

const publicClient = createPublicClient({
  chain: 1513,
  transport: http()
});

const config = {
  account: account,
  publicClient: publicClient
};

export const client = StoryClient.newClient(config);
