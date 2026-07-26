# 📰 News API App

A full-stack application for fetching real-time news from an external API.

The backend is built with a strong focus on security, data validation, standardized error handling, and a modular architecture designed for scalability.

---

# 🚀 Technologies

## Backend

* Node.js
* TypeScript
* Express
* Axios

## Security & Code Quality

* Zod (data validation)
* `[data, error]` Result Pattern
* Basic input sanitization
* Modular architecture

---

# ⚙️ Features

* Fetch real-time news from an external API
* Optional category filtering
* Standardized error handling
* Architecture prepared for Bearer Token authentication

---

# 🔐 Data Validation with Zod

Example:

```ts
import { z } from "zod";

export const newsSchema = z.object({
    category: z.string().optional(),
});
```

---

# 🔁 Result Pattern (`[data, error]`)

The project uses a functional approach for error handling, avoiding excessive `try/catch` blocks throughout the application.

Example:

```ts
export async function getNews() {
    try {
        const response = await axios.get("API_URL");
        return [response.data, null];
    } catch (error) {
        return [null, error];
    }
}
```

Usage:

```ts
const [data, error] = await getNews();

if (error) {
    return res.status(500).json({
        error: "Failed to fetch news",
    });
}
```

---

# 🌐 API Integration

```ts
import axios from "axios";

export const api = axios.create({
    baseURL: "https://newsapi.org/v2",
});
```

---

# ▶️ Getting Started

Start the development server:

```bash
npm run dev
```

---

# 🔑 Environment Variables

Create a `.env` file:

```env
PORT=3000
API_KEY=your_api_key
```

---

# 📌 Example Endpoint

```http
GET /news?category=technology
```

Response:

```json
{
    "data": [...],
    "error": null
}
```

---

# 🛡️ Security

The application includes several security-focused practices:

* Data validation with Zod
* Architecture prepared for JWT authentication
* Centralized error handling
* Prevents unexpected application crashes
* Basic input sanitization

---

# 📈 Future Improvements

* Full JWT authentication
* Redis caching
* Rate limiting
* React frontend
* Docker deployment

---

# 👨‍💻 Author

**Pablo Antônio Mascena Da Silva**
