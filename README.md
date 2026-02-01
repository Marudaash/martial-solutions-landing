# Martial Solutions - Landing Pages

Vercel-deployed landing pages for Martial Solutions verticals with GHL + Retell integration.

## Structure

```
vercel-app/
├── api/
│   ├── lead.js         # Create contact in GHL
│   └── demo-call.js    # Trigger Retell outbound call
├── roofing/
│   └── index.html
├── hvac/
│   └── index.html
├── plumbing/
│   └── index.html
├── solar/
│   └── index.html
├── gyms/
│   └── index.html
├── salons/
│   └── index.html
├── bodywork/
│   └── index.html
├── index.html          # Main landing page (vertical selector)
├── package.json
└── vercel.json
```

## URLs (after deployment)

| Vertical | URL | Demo Phone |
|----------|-----|------------|
| Home | https://martial.solutions/ | - |
| Roofing | https://martial.solutions/roofing | (719) 361-9042 |
| HVAC | https://martial.solutions/hvac | (719) 824-4206 |
| Plumbing | https://martial.solutions/plumbing | (719) 738-8175 |
| Solar | https://martial.solutions/solar | (719) 417-9461 |
| Gyms | https://martial.solutions/gyms | (719) 745-4242 |
| Salons | https://martial.solutions/salons | (719) 800-7671 |
| Bodywork | https://martial.solutions/bodywork | (719) 417-5390 |

## Deployment

### 1. Install Vercel CLI
```bash
npm i -g vercel
```

### 2. Login
```bash
vercel login
```

### 3. Set Environment Variables
```bash
vercel secrets add ghl-api-key "your_ghl_api_key"
vercel secrets add ghl-location-id "jTXBaqyDhVnqj1Hpd4Hc"
vercel secrets add retell-api-key "your_retell_api_key"
```

### 4. Deploy
```bash
cd vercel-app
vercel --prod
```

### 5. Set Custom Domain (optional)
```bash
vercel domains add martial.solutions
```

## API Endpoints

### POST /api/lead
Creates a contact in GoHighLevel.

**Request:**
```json
{
  "firstName": "John",
  "lastName": "Smith",
  "phone": "+15551234567",
  "email": "john@example.com",
  "companyName": "Smith Roofing",
  "source": "Landing Page - roofing",
  "tags": ["martial-solutions", "demo-request", "roofing"]
}
```

### POST /api/demo-call
Triggers an outbound demo call via Retell.

**Request:**
```json
{
  "phone": "+15551234567",
  "agentId": "agent_xxx",
  "firstName": "John"
}
```

## Lead Flow

1. User fills form on landing page
2. Form submits to `/api/lead` → creates GHL contact
3. Form submits to `/api/demo-call` → triggers Retell call
4. User receives call from AI agent in ~30 seconds
5. Call recording + transcript saved in Retell
6. Lead tracked in GHL with source + tags

## Local Development

```bash
cd vercel-app
vercel dev
```

Visit http://localhost:3000
