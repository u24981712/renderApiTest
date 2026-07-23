# Express Test API

A minimal Express.js API with an in-memory "tasks" resource, made for quickly
deploying to [Render](https://render.com) and testing endpoints with Postman.

## Run locally

```bash
npm install
npm start
```

The server starts on `http://localhost:3000` (or `$PORT` if set).

## Endpoints

| Method | Path              | Description                     |
|--------|-------------------|----------------------------------|
| GET    | `/`               | API info / list of endpoints    |
| GET    | `/health`         | Health check                    |
| GET    | `/api/tasks`      | Get all tasks                   |
| GET    | `/api/tasks/:id`  | Get a single task                |
| POST   | `/api/tasks`      | Create a task (`{ "title": "..." }`) |
| PUT    | `/api/tasks/:id`  | Update a task (`{ "title": "...", "done": true }`) |
| DELETE | `/api/tasks/:id`  | Delete a task                    |
| POST   | `/api/echo`       | Echoes back body/headers/query — useful for testing Postman requests |

## Deploying to Render

1. Push this project to a GitHub repo.
2. Go to [Render Dashboard](https://dashboard.render.com) → **New** → **Web Service**.
3. Connect your GitHub repo.
4. Configure:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** Node
   - Render sets `PORT` automatically — the app already reads `process.env.PORT`, so no changes needed.
5. Click **Create Web Service**. Render will give you a URL like
   `https://your-app-name.onrender.com`.

## Testing with Postman

1. Open Postman and create a new Collection (e.g. "Express Test API").
2. Set a collection variable `baseUrl`:
   - Locally: `http://localhost:3000`
   - Deployed: `https://your-app-name.onrender.com`
3. Try these requests:

**Health check**
```
GET {{baseUrl}}/health
```

**Get all tasks**
```
GET {{baseUrl}}/api/tasks
```

**Create a task**
```
POST {{baseUrl}}/api/tasks
Content-Type: application/json

{
  "title": "Buy milk"
}
```

**Update a task**
```
PUT {{baseUrl}}/api/tasks/1
Content-Type: application/json

{
  "done": true
}
```

**Delete a task**
```
DELETE {{baseUrl}}/api/tasks/1
```

**Echo (test what Postman is actually sending)**
```
POST {{baseUrl}}/api/echo
Content-Type: application/json

{
  "anything": "you send"
}
```

> Note: this app uses an in-memory array, so data resets whenever the
> server restarts (including Render's free-tier spin-down after inactivity).
> That's expected for a test API — swap in a real database later if needed.
