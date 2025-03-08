# Paytm-100xdevs 

A application where users can make transaction, withdraw from banks.

## Stack used in this projects are

- 1. Frontend and Backend - Nextjs (or backend).
- 2. Express - Auxilary backend
- 3. Turborepo
- 4. Postgres as the Database.
- 5. Prisma as the ORM.
- 6. Tailwind.
- 7. zod as validation library, type inference for the frontend types
- 8. Typescript as the language.
- 9. NextAuth for the authentication.

## Demo Video

[![Watch the video](https://img.youtube.com/vi/T9_SrmFPMdw/maxresdefault.jpg)](https://youtu.be/T9_SrmFPMdw)


## Architecture - 

1. Nextjs app - Users 
2. Nextjs app - Merchant
3. DB - have tables - Users/Balances/Transfers
4. Bank webhook handler (nodejs/cloudflare)- Another Separate BE which will connect to BankAPI. and connected to 
DB. (for money Transfers) - kind of 
webhook. Making it Separtae as it should be highly avaiable while banking communication.
5. User withdrawal sweeper (nodejs): make trasactional requests in queue.
6. Bank sweeper : for Merchant. 


## Features of the projects:

- 1. send money to someone
- 3. withdraw balance of user bank to bank.
- 4. webhook from banks to trasfer in money.  
- 4. ...