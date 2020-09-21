## How to start ?

This is the frontend of DB Request Approval  system. There are two more systems (Request-consumer, request-backend-services) which has to run in order to make this frontend completly functional.
now once the pre-requisite systems are running we can start running the frontend.

1. Clone the repository
2. In /src/config.js configure the url of request-backend-services
3. Run the following command from the root folder:
```
    npm install
```
4. Run the following command from the root folder:
```
    npm start 
```
This will start the server at http://localhost:3000



## Use cases:

1. Explore all the Request Id events

![Explore events](./screenshots/explore.png?raw=true "Explore events")

2. Approve or decline events

![Events approval](./screenshots/approve-decline.png?raw=true "Events approval")

2. Filter events based on different fields

![Filter](./screenshots/filter.png?raw=true "Filter")
