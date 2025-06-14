# High Level Document (HLD) - Vue.js Todo App

## 1. Project Overview
A responsive, modern task management app built using Vue.js 3. Users can sign up, sign in, and manage tasks through a clean, single-page interface. Backend communication is done via REST APIs.

## 2. Objectives
- Enable intuitive task management
- Ensure authentication and secure access
- Maintain clean state flow using Vuex

## 3. Major Modules
- **Authentication**: Register, Login, Logout
- **Task Management**: Create, complete, delete tasks
- **Routing**: View-based routing using Vue Router
- **State Management**: Global state via Vuex

## 4. User Roles
- **User**: Manages personal tasks after authentication

## 5. Technology Stack
- **Frontend**: Vue.js 3, Vuex, Vue Router
- **API**: RESTful (Node.js/NestJS assumed)
- **Auth**: JWT in localStorage

## 6. Key Flows
1. User signs in/registers
2. CRUD operations on tasks
3. Vuex dispatches update UI based on API response
