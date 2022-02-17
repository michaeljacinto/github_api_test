## Instructions for running test assignment

1. Download NodeJS from this [link](https://nodejs.org/dist/v16.14.0/node-v16.14.0-x64.msi).
2. Inside this folder at the root level run 'npm install'.
3. To use the GitHub API, generate a token from this [link](https://github.com/settings/tokens) and tick the 'gist' box.
4. Inside the provided .env file, input your GitHub token and GitHub username.
5. Run 'npm test' to run the tests.

## Justifications

For my test cases I looked at the expected outputs of all tests. From there, I ensured that parts of the reponses matched what I originally sent in a request and matched the expected status code. 

E.g:

a. Made sure response body content and filename matched what I originally sent. Also made sure that 201 was returned.

b. Made sure that the message of the response body contained 'files wasn't supplied' and that 422 was returned.

c. Made sure that for each type of HTTP method the response text included 'Please make sure your request has a User-Agent header'. Also made sure that 403 was returned.