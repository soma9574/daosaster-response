# Trusted LLM

A small LLM app that uses the TEE to generate text.

## Getting Started

1. (If demoing) Run the TEE Remote Attestation Simulator:

```bash
docker run --rm -p 8090:8090 phalanetwork/tappd-simulator:latest
```

2. Build the python docker container:

```bash
docker build -t trusted-llm:latest .
```

3. Run the docker container:

```bash
docker run --rm -p 3000:3000 trusted-llm:latest
```

### Using the app

To authenticate with the TEE, go to http://0.0.0.0:3000/ (or the hostname of your docker container).

To use the LLM, go to http://0.0.0.0:3000/llm/{prompt}. For example, http://0.0.0.0:3000/llm/Once%20upon%20a%20time%20in%20a%20far%20away%20land.