# Screenshot AI Analyst

Welcome to the Screenshot AI Analyst project! This Node.js application uses Express to provide a web interface for submitting directory paths, which will then trigger background processes for taking website screenshots, analyzing them with AI, and generating reports.

---

## Features

* **Web Interface**: Simple web form to submit a directory path.
* **Background Processing**: Simulates background tasks for screenshot capture and AI analysis.
* **Automatic Reload (Development)**: Uses Nodemon and BrowserSync for a smooth development experience with automatic server restarts and browser refreshes.

---

## Prerequisites

Make sure you have **Node.js** and **npm** (Node Package Manager) installed.

### Installing Node.js (Windows)

1.  Go to the official Node.js website: [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
2.  Download and run the **LTS (Long Term Support)** installer.
3.  Follow the on-screen prompts. Ensure "Node.js runtime" and "npm package manager" are selected.
4.  Verify the installation by opening Command Prompt/PowerShell and typing `node -v` and `npm -v`.

---

## Installation

1.  **Clone the repository** (or navigate to your project directory).
2.  Open your terminal in the project's root directory.
3.  **Install dependencies**:
    ```bash
    npm install
    ```

---

## Getting Started

### Development Mode

To run the application with hot-reloading for development:

```bash
npm run dev