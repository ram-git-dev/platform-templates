# ${{ values.name }}

## Overview

${{ values.description }}

## Quick Start
```bash
# Install dependencies
npm install

# Run locally
npm run dev

# Run tests
npm test
```

## API Endpoints

- `GET /` - Welcome message
- `GET /health` - Health check
{% if values.needsDatabase %}
- `GET /db-test` - Database connection test
{% endif %}

## Environment Variables

- `PORT` - Server port (default: 3000)
{% if values.needsDatabase %}
- `DATABASE_URL` - PostgreSQL connection string
{% endif %}
{% if values.needsRedis %}
- `REDIS_URL` - Redis connection string
{% endif %}

## Architecture

[Add architecture diagram here]

## Deployment

This service is deployed via ArgoCD. See `k8s/` directory for Kubernetes manifests.
