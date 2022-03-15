# Introduction 

An example of Clean Architecture principles applied to a REST API back-end service in Node.js and TypeScript. 


# Getting Started

- Original article https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html
- Good article (from a good series) https://edwardthienhoang.wordpress.com/2017/12/13/clean-architecture-standing-on-the-shoulders-of-giants/
- The book https://www.amazon.com/Clean-Architecture-Craftsmans-Software-Structure-dp-0134494164/dp/0134494164/


# Build and Test

1. `npm i` (shorthand for `npm install`)
2. Create a PostgreSQL database "`clean-arch-demo`"
3. Setup connection details in `src/Gateways/PostgreSQL/Bootstrap.ts`
4. Hit **F5** from VSCode or `npm start`
5. Make API calls with your REST client of choice (https://www.postman.com/ or https://insomnia.rest/)
   -  or use the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) VSCode extension (you'll be prompted to install it on the very first workspace load)
   -  go to `rest-client` top-level folder and look at any of the  `.http` files


# Contribute

Send us pull requests 😄
