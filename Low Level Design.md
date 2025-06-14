# Low Level Document (LLD) - Vue.js Todo App

## 1. Component Structure
- **App.vue**: Main layout
- **MainNavbar.vue**: Navigation with conditional auth links
- **HomeView.vue**: Task board
- **AddTask.vue**: Task input form
- **ShowTask.vue**: List of tasks
- **SignInView.vue / SignUp.vue**: Auth screens

## 2. Vuex Store Modules
- **auth.js**: Handles JWT, login, logout
- **tasks.js**: CRUD for tasks

## 3. API Endpoints
| Method | Endpoint         | Description         |
|--------|------------------|---------------------|
| POST   | /auth/signup     | Register            |
| POST   | /auth/signin     | Login               |
| GET    | /task            | Fetch all tasks     |
| POST   | /task            | Add task            |
| PATCH  | /task/:id        | Mark complete       |
| DELETE | /task/:id        | Delete task         |

## 4. Error Handling
- Displays validation messages
- API failure feedback via alert/notification

## 5. Data Flow
