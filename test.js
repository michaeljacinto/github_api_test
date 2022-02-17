// Submission by Michael Jacinto
// Feb 16 2021

const request = require('supertest')('https://api.github.com');
const dotenv = require('dotenv');
const assert = require('chai').assert;
dotenv.config();
const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_USERNAME = process.env.GITHUB_USERNAME

describe('a. Test that you can create a new gist containing a file with the contents "UBC IRP Student QA!"', () => {

    let file_name = 'sample.txt'
    let file_content = 'UBC IRP Student QA!'
    let file_object = {};
    file_object[file_name] = { 'content': `${file_content}` };

    let test_data = {
        description: 'Create a text file',
        files: file_object,
        public: 'true'
    };

    it('POST /gists - 200', () => {
        return request
            .post('/gists')
            .set('user-agent', GITHUB_USERNAME)
            .set('accept', 'application/vnd.github.v3+json')
            .set('authorization', `token ${GITHUB_TOKEN}`)
            .set('username', GITHUB_USERNAME)
            .send(test_data)
            .expect(201)
            .then((res) => {
                let body = res.body.files[file_name]
                assert.equal(body.content, file_content, `Content to be '${file_content}'`)
                assert.equal(body.filename, file_name, `Filename should be '${file_content}'`)
            })
    });

    after(() => {
        // implement tearDown function
        // After creating a new gist it should delete the file afterwards
    });
});

describe('b. Test that when creating a new gist the file parameter is in fact required.', () => {
    it('POST /gists - 422', () => {

        let test_data = {
            description: 'Create a text file',
            files: undefined,
            public: 'true'
        };

        return request
            .post('/gists')
            .set('user-agent', GITHUB_USERNAME)
            .set('accept', 'application/vnd.github.v3+json')
            .set('authorization', `token ${GITHUB_TOKEN}`)
            .set('username', GITHUB_USERNAME)
            .send(test_data)
            .expect(422)
            .then((res) => {
                assert.equal(res.body.message, 'Invalid request.\n\n"files" wasn\'t supplied.')
                assert.equal(res.status, 422)
            })
    });
});

describe('c. Test that the "User Agent" header is required when making a request.', () => {
    it('GET /gists - 403', () => {
        return request
            .get('/gists')
            .set('accept', 'application/vnd.github.v3+json')
            .set('authorization', `token ${GITHUB_TOKEN}`)
            .set('username', GITHUB_USERNAME)
            .expect(403)
            .then((res) => {
                assert.include(res.text, 'Please make sure your request has a User-Agent header')
                assert.equal(res.status, 403)
            })
    });

    it('POST /gists - 403', () => {
        return request
            .post('/gists')
            .set('accept', 'application/vnd.github.v3+json')
            .set('authorization', `token ${GITHUB_TOKEN}`)
            .set('username', GITHUB_USERNAME)
            .expect(403)
            .then((res) => {
                assert.include(res.text, 'Please make sure your request has a User-Agent header')
            })
    });

    it('PATCH /gists - 403', () => {
        return request
            .patch('/gists')
            .set('accept', 'application/vnd.github.v3+json')
            .set('authorization', `token ${GITHUB_TOKEN}`)
            .set('username', GITHUB_USERNAME)
            .expect(403)
            .then((res) => {
                assert.include(res.text, 'Please make sure your request has a User-Agent header')
            })
    });

    it('DELETE /gists - 403', () => {
        return request
            .delete('/gists')
            .set('accept', 'application/vnd.github.v3+json')
            .set('authorization', `token ${GITHUB_TOKEN}`)
            .set('username', GITHUB_USERNAME)
            .expect(403)
            .then((res) => {
                assert.include(res.text, 'Please make sure your request has a User-Agent header')
            })
    });
});