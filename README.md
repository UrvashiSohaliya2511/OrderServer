# OrderServer Assignment

start : npm start 

## Routes : 

### viewOrder : http://localhost:8080/orders//vieworder/:id -get
### Find All order : http://localhost:8080/orders/allorders - get
### Create Vendor : http://localhost:8080/vendor/create  - post
### create order  : http://localhost:8080/orders/createorder - post
### changeStatus : http://localhost:8080/orders//commitorder/:id - patch 
(["pending","cancelled","confirmed"])
### view vendor : http://localhost:8080/vendor/:id  -get
### view all vendor : http://localhost:8080/vendor/  - get
