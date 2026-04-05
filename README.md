# CrisisMesh AI

AI-powered Disaster Response & Victim Localization Platform

CrisisMesh AI is an intelligent disaster response system that helps rescue teams locate victims faster during emergencies such as floods, earthquakes, and large-scale accidents. The platform combines AI prediction, swarm simulation, and real-time communication to identify high-risk zones and improve decision-making during the critical Golden Hour.

## Problem Statement

During natural disasters, communication infrastructure often fails, leaving victims unable to contact emergency services. Rescue teams also lack real-time visibility of affected areas, resulting in delayed response and inefficient resource allocation.

Existing systems rely heavily on manual coordination and fragmented data sources, making it difficult to:

- Identify victim locations quickly
- Prioritize high-risk zones
- Coordinate rescue teams efficiently
- Operate in network-disrupted environments

CrisisMesh AI provides a software-defined intelligent disaster response platform to address these issues.

## Solution Overview

CrisisMesh AI simulates a decentralized emergency intelligence system that combines:

- AI-based victim risk prediction
- Real-time heatmap visualization
- Swarm intelligence simulation
- Mesh communication logic
- Offline-capable data capture
- Live alert system

The platform helps emergency responders visualize disaster zones, identify priority rescue locations, and coordinate operations effectively.

## Approach

The system follows an intelligent workflow to maximize rescue efficiency:

```
Finds victims automatically
     |
Groups them into rescue zones
     |
Decides who needs help first
     |
Guides drones along the best path
     |
Keeps communication alive without internet
     |
Shows everything on a live dashboard
```

1. **Victim Detection** - Automatically locates and identifies potential victim locations using AI prediction
2. **Zone Clustering** - Groups victims into geographic rescue zones for efficient coordination
3. **AI Triage Engine** - Prioritizes victims based on urgency and risk scores
4. **Swarm Pathfinding** - Routes autonomous drones using optimized path algorithms (A\* navigation)
5. **Mesh Communication** - Maintains decentralized communication without reliance on internet infrastructure
6. **Real-time Dashboard** - Displays live heatmaps and victim locations for instant situational awareness

## Key Features

### Autonomous Swarm Simulation

Simulates distributed nodes (drones) that collaboratively scan disaster zones and provide spatial coverage insights. Uses A\* pathfinding for optimal navigation.

### AI-powered Triage Engine

Automatically analyzes SOS beacons and victim data to generate urgency scores, prioritizing high-risk cases for rescue teams.

### Risk Heatmap Clustering

Uses K-means clustering algorithms to identify high-risk rescue zones based on victim concentrations and spatial data distribution.

### Mesh Network Communication

Enables decentralized peer-to-peer communication between rescue operations without reliance on centralized internet infrastructure.

### Real-time Alerts & SOS Beacon Parsing

Socket.io-based live updates deliver victim alerts, priority classifications, and beacon signal patterns to emergency responders.

### Offline-first Support (PWA)

Allows basic functionality even when internet connectivity is limited or completely unavailable in disaster zones.

### Interactive Disaster Map

Mapbox/Leaflet-based dashboard visualizes affected zones, victim clusters, drone positions, and real-time heatmaps for situational awareness.

## System Architecture

```text
Frontend (React + Map Visualization)
        |
        v
Backend (Node.js + Express + Socket.io)
        |
        v
AI Service (Python + FastAPI)
        |
        v
Database (MongoDB)
```

## Technology Stack

### Frontend

- React.js
- Mapbox GL JS
- Tailwind CSS
- Socket.io Client
- Progressive Web App (PWA)

### Backend

- Node.js
- Express.js
- Socket.io
- MongoDB (Mongoose)
- REST APIs

### Tools

- Git
- VS Code

## Project Structure

```text
CrisisMesh-AI/
├── frontend/                      # React + Mapbox dashboard
│   ├── src/
│   │   ├── components/           # UI components
│   │   ├── pages/                # Route pages
│   │   ├── context/              # State management
│   │   ├── services/             # API clients
│   │   ├── hooks/                # Custom React hooks
│   │   └── assets/               # Static assets
│   └── public/
├── backend/                       # Node.js Express API
│   ├── controllers/              # Route handlers (disaster, victim, triage, SOS, swarm, heatmap)
│   ├── services/                 # Business logic (clustering, A* pathfinding, triage)
│   ├── models/                   # MongoDB schemas
│   ├── routes/                   # API endpoints
│   ├── sockets/                  # Real-time Socket.io handlers
│   ├── middleware/               # Express middleware
│   ├── utils/                    # Helper utilities
│   └── server.js                 # Entry point
├── ai/                           # Optional AI module (Python)
│   ├── src/
│   │   ├── ai/                   # ML models & prediction
│   │   ├── pipelines/            # Data processing
│   │   └── utils/
│   └── api/
├── shared/                        # Shared types & constants
│   ├── models/
│   └── constants/
└── config/                        # Configuration files
    └── env/
```

## Core Services & APIs

### Victim Management

- Auto-detect and locate victims in disaster zones
- Store victim data with coordinates and status
- Track victim IDs and metadata

### AI Triage Engine

- `POST /api/triage/score` - Calculate victim urgency scores
- Analyze SOS beacon signals for priority ranking
- Real-time risk assessment and classification

### SOS Beacon Parsing

- `POST /api/sos/parse` - Parse incoming beacon signals
- Extract location and urgency from signal patterns
- Queue victims for rescue based on priority

### Heatmap & Clustering

- `GET /api/heatmaps/generate` - Generate risk zone heatmaps
- K-means clustering for victim zone grouping
- Dynamic heatmap updates based on new victim data

### Swarm & Pathfinding

- `POST /api/swarm/simulate` - Simulate drone coverage and movement
- A\* algorithm for optimal drone routing
- Route optimization to minimize rescue time

### Mesh Network

- `GET /api/swarm/mesh` - Mesh network status and topology
- Decentralized communication simulation
- Support for offline peer-to-peer coordination

### Real-time Alerts

- Socket.io events for live victim updates
- Push notifications for high-priority cases
- Live dashboard synchronization

## How It Works

1. **Victim Detection & SOS Processing** - System detects and parses SOS beacon signals from affected areas
2. **Risk Assessment** - AI triage engine analyzes each victim's urgency based on signal strength, location, and contextual factors
3. **Zone Clustering** - K-means algorithm groups nearby victims into manageable rescue zones
4. **Priority Ranking** - Victims are ranked by urgency score for optimal rescue sequencing
5. **Swarm Planning** - Autonomous drones receive pathfinding directions using A\* navigation to optimal rescue points
6. **Real-time Updates** - Backend streams live updates via Socket.io to dashboard displaying heatmaps and drone positions
7. **Mesh Communication** - Network operates as decentralized mesh, maintaining connectivity even if central infrastructure fails
8. **Dashboard Visualization** - Frontend displays live map with victim markers, heatmaps, drone routes, and priority alerts

## Future Improvements

- Real mobile signal integration
- Drone hardware integration
- Satellite communication support
- Advanced AI prediction models
- Multi-region disaster coordination

## Installation (Development Setup)

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm start
```

### AI Service

```bash
cd ai
pip install fastapi uvicorn numpy scikit-learn
uvicorn main:app --reload
```
