process.env.NODE_ENV = 'test';

import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/server'
import Words from '../src/modules/dictionary/word.model';
import Users from '../src/modules/users/user.model';

chai.use(chaiHttp);
const expect = chai.expect;

const dictionaryURL: string = '/api/v1/dictionary';
const usersURL: string = '/api/v1/users';

const adminUserTest = {
  email: 'admin@sample.com',
  password: 'adminPassword1',
  firstName: 'Admin',
  lastName: 'Doe',
  userName: 'AdminDoe',
  role: 'Admin',
}

const wordTest = {
  word: "一別",
  reading: "いちべつ",
  meaning: [
    "partición"
  ],
  abrev: []
}

const wordPostTest = {
  word: "二元",
  reading: "にげん",
  meaning: [
    "dualidad",
  ],
  abrev: []
}

describe('DICTIONARY', () => {
  beforeEach(async () => {
    let dropDictionary = await Words.collection.drop();
    let createWord = await Words.create(wordTest);
    let dropUsers = await Users.collection.drop();
    let createAdmin = await Users.create(adminUserTest);
  });

  describe('/', () => {
    it('GET => Debe obtener todas las abreviaturas', (done) => {
      chai.request(app).get(dictionaryURL).end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).length(1);
        done();
      });
    });

    it('POST => Debe crear una nueva palabra', (done) => {
      chai.request(app).post(`${usersURL}/login`).send({
        email: adminUserTest.email,
        password: adminUserTest.password,
      }).end((err, res) => {
        chai.request(app).post(dictionaryURL).send(wordPostTest)
          .set('authorization', res.body.token).end((e, r) => {
            expect(e).to.be.null;
            expect(r).to.have.status(201);
            expect(r).to.be.json;
            expect(r.body.word).to.equal(wordPostTest.word);
            expect(r.body.reading).to.equal(wordPostTest.reading);
            done();
          });
      });
    });

    it('POST => No debe crar una nueva palabra sin todos los campos requeridos', (done) => {
      chai.request(app).post(`${usersURL}/login`).send({
        email: adminUserTest.email,
        password: adminUserTest.password,
      }).end((err, res) => {
        chai.request(app).post(dictionaryURL).send({
          word: "faltan_campos"
        }).set('authorization', res.body.token).end((e, r) => {
          expect(e).to.exist
          expect(e).to.have.status(400);
          expect(r).to.have.status(400);
          done();
        });
      });
    });
  });

  describe('/:id', () => {
    it('GET:id => Debe obtener un elemento por id', (done) => {
      chai.request(app).get(dictionaryURL).end((err, res) => {
        chai.request(app).get(`${dictionaryURL}/${res.body[0]._id}`).end((e, r) => {
          expect(e).to.be.null;
          expect(r).to.have.status(200);
          expect(r).to.be.json;
          expect(r.body.word).to.equal(wordTest.word);
          expect(r.body.reading).to.equal(wordTest.reading);
          done();
        });
      });
    });

    it('PATCH:id => Debe modificar un elemento por id', (done) => {
      let wordPatch = {
        word: wordTest.word + ".",
      }
      chai.request(app).post(`${usersURL}/login`).send({
        email: adminUserTest.email,
        password: adminUserTest.password,
      }).end((err, res) => {
        chai.request(app).get(dictionaryURL).end((e, r) => {
          chai.request(app).patch(`${dictionaryURL}/${r.body[0]._id}`)
            .send(wordPatch)
            .set('authorization', res.body.token)
            .end((e, r) => {
              expect(e).to.be.null;
              expect(r).to.have.status(200);
              expect(r).to.be.json;
              expect(r.body.word).to.equal(wordPatch.word);
              expect(r.body.reading).to.equal(wordTest.reading);
              done();
            });
        });
      });
    });

    it('DELETE:id => Debe eliminar un elemento por id', (done) => {
      chai.request(app).post(`${usersURL}/login`).send({
        email: adminUserTest.email,
        password: adminUserTest.password,
      }).end((err, res) => {
        chai.request(app).get(dictionaryURL).end((e, r) => {
          chai.request(app).del(`${dictionaryURL}/${r.body[0]._id}`)
            .set('authorization', res.body.token)
            .end((e, r) => {
              expect(e).to.be.null;
              expect(r).to.have.status(200);
              done();
            });
        });
      });
    });
  });

  describe('Rutas protegidas por login', () => {
    it('NO LOGIN - No debe permitir la creación de una nueva palabra', (done) => {
      chai.request(app)
        .post(dictionaryURL)
        .send(wordPostTest)
        .end((err, res) => {
          expect(err).to.exist;
          expect(err).to.have.status(401);
          expect(res).to.have.status(401);
          done();
        });
    });

    it('NO LOGIN - No debe permitir la actualización de una palabra', (done) => {
      let wordPatch = {
        word: wordTest.word + '.',
      }
      chai.request(app).get(dictionaryURL).end((err, res) => {
        chai.request(app)
          .patch(`${dictionaryURL}/${res.body[0]._id}`)
          .send(wordPatch)
          .end((err, res) => {
            expect(err).to.exist;
            expect(err).to.have.status(401);
            expect(res).to.have.status(401);
            done();
          });
      });
    });

    it('NO LOGIN - No debe eliminar una palabra', (done) => {
      chai.request(app).get(dictionaryURL).end((err, res) => {
        chai.request(app)
          .del(`${dictionaryURL}/${res.body[0]._id}`)
          .end((err, res) => {
            expect(err).to.exist;
            expect(err).to.have.status(401);
            expect(res).to.have.status(401);
            done();
          });
      });
    });
  });

  describe('/?query', () => {
    it('Debe permitir la busqueda mediante el query', (done) => {
      const query = {
        letter: '一'
      }
      chai.request(app).get(dictionaryURL)
        .query(query).end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).length(1);
          expect(res.body[0].word).to.equal(wordTest.word);
          done();
        });
    });
  });
});

