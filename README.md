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

## Key Features

### Autonomous Swarm Simulation

Simulates distributed nodes that collaboratively scan disaster zones and provide spatial coverage insights.

### AI-powered Risk Heatmap

Uses clustering algorithms to identify high-risk areas based on simulated signal patterns and spatial data.

### Real-time Alerts

Socket-based communication enables live updates of victim locations and risk zones.

### Offline-first Support (PWA)

Allows basic functionality even when internet connectivity is limited.

### Interactive Disaster Map

Map-based dashboard visualizes affected zones and predicted victim clusters.

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

### AI Module

- Python
- FastAPI
- Scikit-learn
- NumPy

### Tools

- OpenRouter / Claude
- Git
- VS Code

## Project Structure

```text
CrisisMesh-AI/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── assets/
│   └── public/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── models/
│   │   ├── sockets/
│   │   ├── middleware/
│   │   └── utils/
├── ai/
│   ├── src/
│   │   ├── ai/
│   │   ├── pipelines/
│   │   └── utils/
│   └── api/
├── shared/
│   ├── models/
│   └── constants/
└── config/
    └── env/
```

## MVP Scope

- Disaster map visualization
- Heatmap prediction prototype
- Swarm simulation demo
- Real-time alert system
- Basic offline support

## How It Works

1. Disaster area data is processed by the AI module.
2. Clustering logic generates a risk heatmap.
3. Swarm simulation provides coverage visualization.
4. Backend streams updates via Socket.io.
5. Frontend dashboard displays real-time insights.

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
