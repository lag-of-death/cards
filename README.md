## Important scripts

In the project directory, you can run:

### `yarn/npm run test`

Runs the tests for both client and server side.
There are almost no tests and the coverage is lamentable. 

### `yarn/npm run start`

Compiles client-side scripts and runs the server on PORT env variable (defaults to 3000).

## Next steps

Because of the time limit, there is still a lot to do:

1. Cover the codebase with unit tests.
2. Ideally add some E2E tests.
3. Generate OAS with annotations with the use of `express-swagger-generator`. 
4. Add SSR.
5. Make clear to the user, that an async action is being performed. Could just use a spinner. For now, there is no such indicator - bad UX.
6. Introduce RWD. For now, the app was only developed with desktops in mind and the given resolution of the cards.
7. Add exception identification and handling. Could add error boundaries to the client-side and some fault prevention for the back-end.
8. Remove data-testid(s) when creating the bundle. Data-testid(s) are only needed in testing. 


## Possible changes to the game mechanics

1. If the two cards don't match, turn them back over immediately (don't wait for the user to click on the next card).
2. Do not reset the rounds counter when shuffling the cards. Keep the counter as is and don't turn over the guessed pairs. Only rearrange the cards that are not yet matched.
