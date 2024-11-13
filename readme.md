# Accessibility Audit API

This project is a Node.js application that uses Puppeteer, Axe-core, and OpenAI’s API to perform accessibility audits on websites and summarize the results. It follows an MVC structure with modular code, making it easy to scale and maintain.

## Table of Contents

- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Setup](#setup)
- [Running the Server](#running-the-server)
- [Using the API](#using-the-api)
- [Testing with Postman](#testing-with-postman)

## Technologies

- **Node.js** and **Express**: Backend server
- **Puppeteer**: For navigating and interacting with web pages
- **Axe-core**: To perform accessibility audits
- **OpenAI API**: To generate a summary of accessibility audit results
- **Nodemon**: Development tool to auto-restart the server on changes

## Project Structure

```plaintext
project-folder/
├── controllers/
│   ├── auditController.js          # Handles API request logic
├── models/
│   ├── openAIModel.js              # (If needed) Model for OpenAI interactions
├── routes/
│   ├── auditRoutes.js              # Defines the /audit endpoint
├── services/
│   ├── auditService.js             # Runs audit and calls OpenAI API for summary
├── utils/
│   ├── axeAudit.js                 # Handles axe-core auditing
│   ├── openAIClient.js             # Manages OpenAI API requests
├── app.js                          # Express app configuration
├── server.js                       # Server entry point
├── .env                            # Environment variables
├── .gitignore                      # Git ignore settings, includes node_modules
├── package.json                    # Project dependencies and scripts
└── README.md                       # Project documentation
```

## Running the Server

To start the server, you can use the following commands:

- **Development Mode** (with Nodemon):

  ```bash
  npm run dev

## API Endpoint

The application provides an API endpoint that allows users to perform an accessibility audit on a given website URL. This audit checks for accessibility issues and best practices and then summarizes the results using OpenAI.

### Endpoint: `POST /api/audit`

This endpoint accepts a URL in the request body and performs the following actions:

1. Navigates to the specified URL using Puppeteer.
2. Runs an accessibility audit on the page using Axe-core.
3. Summarizes the audit results using OpenAI.

### Request Format

**URL**: `/api/audit`

**Method**: `POST`

**Headers**: Add a `Content-Type: application/json` header.

**Body**: The request body must be in JSON format with the following field:

```json
{
  "url": "https://example.com"
}```
