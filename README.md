# JesterTech 

JesterTech is a modern, full-stack e-commerce platform dedicated to tech products. Built with a decoupled architecture utilizing a React TypeScript frontend and a robust ASP.NET Core backend, the platform delivers a fast, secure, and type-safe shopping experience. 

The standout feature of JesterTech is an **integrated AI Product Assistant**, allowing users to have real-time conversations and get instant, detailed context about specific tech hardware, specifications, and compatibility before purchasing.

---

##  Tech Stack

### Frontend
* **Framework:** React.js (with TypeScript for strict type safety)
* **Styling:** Vanilla CSS 
* **State Management** Tanstach Query

### Backend
* **Runtime & Framework:** .NET Core / ASP.NET Core Web API
* **Language:** C#
* **Architecture:** MVC / Repository Pattern for clean separation of concerns and maintainability
* **ORM:** Entity Framework Core (EF Core)

### Database & Hosting
* **Database:** PostgreSQL (chosen for robust relational data handling, complex querying, and highly efficient cloud hosting compatibility)

---

## Key Features

* **Advanced E-Commerce Architecture:** Secure user authentication, protected API routing, robust data validation, and clean product management flows.
* **AI-Powered Product Agent:** An intelligent conversational assistant built into the platform to answer user questions about product technical specs, comparisons, and stock availability.
* **Clean Architecture:** Designed around Object-Oriented Programming (OOP) principles and the Repository Pattern to keep the codebase modular, testable, and scalable.
* **Database Migrations:** Managed seamlessly through EF Core to track and update the PostgreSQL schema reliably.

---

## Future Roadmap & In-Progress Milestones

JesterTech is actively being developed with a production-first mindset. Upcoming milestones include:
- [ ] Complete integration of the LLM / AI API for the product assistant.
- [ ] Implementing automated backend unit and integration testing.
- [ ] Setting up CI/CD pipelines for automated cloud deployment.

---

## Getting Started (Local Development)

### Prerequisites
* [.NET SDK](https://dotnet.microsoft.com/download)
* [Node.js](https://nodejs.org/)
* [PostgreSQL](https://www.postgresql.org/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Jetmir-Al/JesterTech.git](https://github.com/Jetmir-Al/JesterTech.git)
   cd JesterTech

2. **Backend Setup:**

 Navigate to the server directory: 

```Bash
cd JesterTech.Server
```
Update the connection string in appsettings.json to point to your local PostgreSQL instance.

 **Apply database migrations:**

```Bash
dotnet ef database update
```
 **Run the API server:**

```Bash
dotnet run
```
 **Frontend Setup:**

Navigate to the client directory:

```Bash
cd ../JesterTech.Client
```
Install dependencies:

```Bash
npm install
```
Start the development server:

```Bash
npm run dev
```

## License
This project is open-source and available under the MIT License.
