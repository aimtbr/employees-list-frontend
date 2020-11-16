# employees-list-frontend
**Frontend of the "employees-list" project**  

**[Go to backend](https://github.com/aimtbr/employees-list-backend)**

## How to run
### Shortcut
`git clone https://github.com/aimtbr/employees-list-frontend.git && cd employees-list-frontend && npm i && npm run dev`
### Steps
1. `git clone https://github.com/aimtbr/employees-list-frontend.git`
1. `cd employees-list-frontend`
1. `npm i`
1. Create the '.env' file based on '.env.example' with the data you need
1. `npm run dev`


## Pages
* Authorization
* Sign up
* Employees list

## Structure
* public/ – public static files
* src/ – main source code
  * src/elements – composite pages elements (actions, reducers, components, containers)
  * src/lib – utilitarian tools used across the application
  * src/pages – pages of the application assembled from the elements
* main.jsx – an entry point of the application
* store.js – an entry point of the Redux store
