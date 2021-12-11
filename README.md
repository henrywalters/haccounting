# HAccounting
## Introduction
A microservice designed to provide basic accounting abilities. It includes a client management system as well as 
a project management system. The project management system allows the creation of quotes and invoices for a client.
Each project contains a set of tasks with estimated and actual hours.
## Usage
### Clients
- GET `/clients` - return a list of all clients
- POST `/clients` - create a new client
- GET `/clients/{id}` - get a client
- PATCH `/clients/{id}` - update a client
- DELETE `/clients/{id}` - delete a client
- GET `/clients/{id}/projects` - return a list of all projects for a given client
### Projects
- GET `/projects` - return a list of all projects
- POST `/projects` - create a new project
- GET `/projects/{id}` - get a project
- PATCH `/projects/{id}` - update a project
- DELETE `/projects/{id}` - delete a project
- GET `/projects/{id}/tasks` - return a list of all project tasks
- POST `/projects/{id}/tasks` - set the list of project tasks
- GET `/projects/{id}/quote` - return a PDF of the quote
- GET `/projects/{id}/invoice` - return a PDF of the invoice
