import os
from dstack_sdk import AsyncTappdClient, DeriveKeyResponse, TdxQuoteResponse
from fastapi import FastAPI
from transformers import pipeline

app = FastAPI()
# endpoint = '../../tappd.sock'
endpoint = 'http://host.docker.internal:8090'

# Initialize the LLM
llm = pipeline("text-generation", model="gpt2")

@app.get("/")
async def root():
    client = AsyncTappdClient()
    deriveKey = await client.derive_key('/', 'test')
    assert isinstance(deriveKey, DeriveKeyResponse)
    asBytes = deriveKey.toBytes()
    assert isinstance(asBytes, bytes)
    limitedSize = deriveKey.toBytes(32)
    tdxQuote = await client.tdx_quote('test')
    return {"deriveKey": asBytes.hex(), "derive_32bytes": limitedSize.hex(), "tdxQuote": tdxQuote}

@app.get("/llm/{prompt}")
async def generate_text(prompt: str):
    response = llm(prompt, max_length=100, num_return_sequences=1)
    return response[0]['generated_text']
