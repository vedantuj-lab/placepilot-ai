@echo off
cd /d C:\Users\Vedant\Downloads\placepilot-ai-main\placepilot-ai-main
title PlacePilot AI Server (Port 3000)
echo ===================================================
echo PlacePilot AI — Scheme Saathi (AgentX PS-01)
echo Starting Web Server on http://localhost:3000 ...
echo ===================================================
set PORT=3000
set NODE_ENV=production
node server.js
pause
