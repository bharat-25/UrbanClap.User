
const swaggerAutogen = require("swagger-autogen")();
const outputFile = "./swagger_output.json";
const endpointsFiles = ["./server.ts"]; 

swaggerAutogen(outputFile, endpointsFiles);

