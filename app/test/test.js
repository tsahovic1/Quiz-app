let chai = require("chai");
let assert = chai.assert;
let chaiHttp = require("chai-http");
chai.use(chaiHttp);

let server = require("../../server.js");

describe('Testovi ruta za rezultate', () => {

    it('Dodavanje kategorije', (done) => {
        let category = {
            name: "Sport"
        }
        setTimeout(function () {

            chai.request(server)
                .post('/api/categories')
                .send(category)
                .end((err, res) => {
                    assert.deepEqual(res.body.name, 'Sport');
                    done();
                })
        }, 4000)
    }).timeout(10000);
    it('Dodavanje rezultata pomoću POST requesta', (done) => {
        let score = {
            username: "Tarik",
            score: 30,
            categoryId: 1
        }
        setTimeout(function () {

            chai.request(server)
                .post('/api/scores')
                .send(score)
                .end((err, res) => {
                    assert.deepEqual(res.body.username, 'Tarik');
                    done();
                })
        }, 3000)
    }).timeout(10000);
    it('Dodavanje drugog rezultata pomoću POST requesta', (done) => {
        let score = {
            username: "tsahovic1",
            score: 40,
            categoryId: 1
        }
        setTimeout(function () {

            chai.request(server)
                .post('/api/scores')
                .send(score)
                .end((err, res) => {
                    assert.deepEqual(res.body.username, 'tsahovic1');
                    done();
                })
        }, 3000)
    }).timeout(10000);

    it('Testiranje dobijanja rezultata pomoću GET requesta', (done) => {
        setTimeout(function () {
            chai.request(server)
                .get('/api/scores')
                .end((err, res) => {
                    assert.deepEqual(res.body.length, 2);
                    done();
                })
        }, 3000)
    }).timeout(10000);
    it('Brisanje drugog rezultata', (done) => {
        setTimeout(function () {
            chai.request(server)
                .delete('/api/scores/2')
                .end((err, res) => {
                    assert.deepEqual(res.body.message, "Score was deleted successfully!")
                    done();
                })
        }, 3000)
    }).timeout(10000);
    it('Provjera rezultata u bazi nakon izbacivanja drugog rezultata', (done) => {
        setTimeout(function () {
            chai.request(server)
                .get('/api/scores')
                .end((err, res) => {
                    assert.deepEqual(res.body.length, 1);
                    done();
                })
        }, 3000)

    }).timeout(10000);



})
//}, 5000);
