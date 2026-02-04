# Discord Ticket Bot System

A fully customizable Discord Ticket Bot system, inspired by TicketToolz, built with:

- Node.js & Discord.js v14  
- PostgreSQL (via Database URL only)  
- Fully v2 Message Components (embeds, buttons, modals)  
- Deployable on Wispbyte or Render  

---

## Features

- `/setup` — Configure server roles and channels  
- `/panel` — Sends ticket panel with v2 embed + button  
- Modal for order input → creates **private ticket channel**  
- Ticket database persistence (status, customer, chef, order)  
- **Race-safe claim system** (buttons)  
- **Close system** with:  
  - Points awarding (chef & customer)  
  - Transcript generation & DM  
  - Channel deletion  
- `/leaderboard` — Top users by points  
- `/adjust-points` — Admin-only manual points adjustment  
- `/discount` — Calculate and post discounted totals  

---

## Project Structure
project-root/ ├── src/ │   ├── index.js │   ├── bot.js │   ├── web/ │   ├── database/ │   ├── handlers/ │   ├── commands/ │   ├── interactions/ │   ├── tickets/ │   ├── embeds/ │   ├── utils/ │   └── config/ ├── .env ├── package.json └── README.md

---

## Environment Variables (`.env`)

```env
DISCORD_TOKEN=YOUR_BOT_TOKEN
DATABASE_URL=postgresql://username:password@host:port/dbname
PORT=3000
