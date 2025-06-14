# Architecture - Vue.js Todo App

## 1. System Diagram
[User] <-> [Vue Components] <-> [Vuex Store] <-> [API Service] <-> [Backend API]

markdown
Copy
Edit

## 2. Layers
- **Presentation**: Vue Components (`.vue`)
- **Business Logic**: Vuex modules
- **Services**: API handlers (fetch with auth headers)
- **Storage**: localStorage (JWT)

## 3. Security
- JWT used in headers
- Protected views using route guards

## 4. Scalability
- Modular component-based architecture
- Easily supports more features like categories, due dates
