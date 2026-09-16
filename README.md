# TripMate AI

TripMate AI is a multi-agent travel planner. It combines a React interface, a FastAPI API, LangGraph orchestration, Groq, MCP tools, and PostgreSQL-backed conversation state to create travel plans with human review.

## Architecture

![TripMate AI architecture](frontend/client/public/asset/d__AI_project_TripMate_TripMate-AI_demo.png)

The workflow is:

1. The user submits a travel request.
2. The input guardrail checks relevance and safety.
3. The supervisor selects the required specialist agents.
4. Specialist agents collect flight, hotel, weather, and budget information.
5. The itinerary agent creates a draft.
6. The user approves the draft or requests changes.
7. The final agent creates the polished travel plan.
8. LangGraph checkpoints are stored in PostgreSQL.

## Main Components

```text
TripMate-AI/
├── app.py                         FastAPI application and API routes
├── backend.py                     LangGraph workflow and PostgreSQL checkpointer
├── mcp_client.py                  MCP client and tool integrations
├── custom_weather_mcp_server.py   Local weather MCP server
├── tools/                         Supporting tools
├── frontend/client/               React + Vite frontend
│   ├── src/App.jsx                Page composition
│   ├── src/components/            Hero, planner, workflow, result, approval, footer
│   └── public/asset/              Public frontend assets
├── Dockerfile                     Multi-stage frontend/backend image
├── requirements.txt               Python dependencies
└── .env                          Local secrets; never commit this file
```

## Requirements

- Python 3.11 or newer
- Node.js 22 or newer
- PostgreSQL
- API keys for Groq, Tavily, AviationStack, and OpenWeather
- `uv`/`uvx` for the AviationStack MCP server

## Environment Variables

Create a `.env` file in the project root. Use your own values:

```env
DATABASE_URL=postgresql://user:password@host/database?sslmode=require
GROQ_API_KEY=your_groq_key
TAVILY_API_KEY=your_tavily_key
AVIATION_STACK_API_KEY=your_aviationstack_key
OPENWEATHER_API_KEY=your_openweather_key
```

For production on Render, use the PostgreSQL **Internal Database URL** when the web service and database are on Render. For local development, use the External Database URL. The backend adds `sslmode=require` when it is missing.

Never commit `.env` or place API keys in the frontend.

## Local Setup

### 1. Install Python dependencies

From the project root:

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Install `uv` so `uvx` is available to `mcp_client.py`:

```powershell
pip install uv
uv --version
uvx --version
```

### 2. Build the frontend

```powershell
cd frontend\client
npm install
npm run build
cd ..\..
```

### 3. Start the API and frontend

The production frontend is served by FastAPI from `frontend/client/dist`:

```powershell
python app.py
```

Open `http://127.0.0.1:8000/`.

For frontend-only development with hot reload:

```powershell
cd frontend\client
npm run dev
```

The Vite development server proxies `/api` requests to FastAPI on port `8000`.

## API

### `POST /api/travel`

Start a travel-planning workflow.

```json
{
	"message": "Plan a 7 day Japan trip from Bangladesh under 2 lakhs",
	"thread_id": null
}
```

The response includes the thread ID, selected agents, supervisor reasoning, itinerary draft, and whether human approval is required.

### `POST /api/travel/approve`

Approve or revise a paused itinerary.

```json
{
	"thread_id": "user_example",
	"approved": false,
	"feedback": "Reduce hotel costs and add one free day."
}
```

### `GET /health`

Returns the API service status and enabled workflow features.

## Docker

The Dockerfile builds the React app first, then copies the generated `dist` directory into the Python runtime image. It also provides `uv` and `uvx` for MCP subprocesses.

```powershell
docker build -t tripmate-test .
docker run --env-file .env -p 8000:8000 tripmate-test
```

Open `http://localhost:8000/` after the container starts.

## Render Deployment

1. Push the repository to GitHub.
2. Create a Render **Web Service** from the repository.
3. Select Docker as the runtime.
4. Add the environment variables listed above in Render.
5. Use a PostgreSQL database and set `DATABASE_URL` to its Internal Database URL.
6. Deploy and test `/health`.

The service starts with:

```text
uvicorn app:app --host 0.0.0.0 --port 8000
```

## Security Notes

- Keep `.env` out of Git.
- Rotate any credentials that have been shared publicly or committed accidentally.
- Store secrets only in local environment variables or the hosting provider's secret manager.
- Do not expose provider API keys through React code or browser requests.

