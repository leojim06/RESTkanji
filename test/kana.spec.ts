process.env.NODE_ENV = 'test';

import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/server'
import Users from '../src/modules/users/user.model';
import Kanas from '../src/modules/kana/kana.model';

chai.use(chaiHttp);
const expect = chai.expect;

const kanaURL: string = '/api/v1/kanas';
const userURL: string = '/api/v1/users';

const adminUserTest = {
  email: 'admin@sample.com',
  password: 'adminPassword1',
  firstName: 'Admin',
  lastName: 'Doe',
  userName: 'AdminDoe',
  role: 'Admin',
}

const hiraganaTest = {
  symbol: "あ",
  strokes: 3,
  shape: "Hiragana",
}

const katakanaTest = {
  symbol: "ア",
  strokes: 2,
  shape: "Katakana",
}

const hiraganaPostTest = {
  symbol: "い",
  strokes: 2,
  shape: "Hiragana",
}

const katakanaPostTest = {
  symbol: "イ",
  strokes: 2,
  shape: "Katakana",
}

describe('KANA (Hiragana - Katakana)', () => {
  beforeEach(async () => {
    let dropKanas = await Kanas.collection.drop();
    let createHiragana = await Kanas.create(hiraganaTest);
    let createKatakana = await Kanas.create(katakanaTest);
    let dropUsers = await Users.collection.drop();
    let createAdmin = await Users.create(adminUserTest);
  });

  describe('/', () => {
    it('GET => Debe obtener todos los kanas', (done) => {
      chai.request(app).get(kanaURL).end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).length(2);
        done();
      });
    });

    it('GET => Debe obtener todos los hiraganas', (done) => {
      chai.request(app).get(`${kanaURL}/hiragana`).end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).length(1);
        expect(res.body[0].symbol).to.equal(hiraganaTest.symbol);
        expect(res.body[0].shape).to.equal('Hiragana');
        done();
      });
    });

    it('GET => Debe obtener todos los katakanas', (done) => {
      chai.request(app).get(`${kanaURL}/katakana`).end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).length(1);
        expect(res.body[0].symbol).to.equal(katakanaTest.symbol);
        expect(res.body[0].shape).to.equal('Katakana');
        done();
      });
    });

    it('POST => Debe crear un nuevo hiragana', (done) => {
      chai.request(app).post(`${userURL}/login`).send({
        email: adminUserTest.email,
        password: adminUserTest.password,
      }).end((err, res) => {
        chai.request(app)
          .post(kanaURL)
          .send(hiraganaPostTest)
          .set('authorization', res.body.token)
          .end((e, r) => {
            expect(e).to.be.null;
            expect(r).to.have.status(201);
            expect(r).to.be.json;
            expect(r.body.symbol).to.equal(hiraganaPostTest.symbol);
            expect(r.body.shape).to.equal('Hiragana');
            done();
          });
      });
    });

    it('POST => Debe crear un nuevo katakana', (done) => {
      chai.request(app).post(`${userURL}/login`).send({
        email: adminUserTest.email,
        password: adminUserTest.password,
      }).end((err, res) => {
        chai.request(app)
          .post(kanaURL)
          .send(katakanaPostTest)
          .set('authorization', res.body.token)
          .end((e, r) => {
            expect(e).to.be.null;
            expect(r).to.have.status(201);
            expect(r).to.be.json;
            expect(r.body.symbol).to.equal(katakanaPostTest.symbol);
            expect(r.body.shape).to.equal('Katakana');
            done();
          });
      });
    });

    it('POST => No debe crear un nuevo kana sin todos los campos requeridos', (done) => {
      chai.request(app).post(`${userURL}/login`).send({
        email: adminUserTest.email,
        password: adminUserTest.password,
      }).end((err, res) => {
        chai.request(app)
          .post(kanaURL)
          .send({
            symbol: "faltan_campos"
          })
          .set('authorization', res.body.token)
          .end((e, r) => {
            expect(e).to.exist;
            expect(e).to.have.status(400);
            expect(r).to.have.status(400);
            done();
          });
      });
    });

    it('POST => No debe crear un nuevo kana si la forma no es Hiragana o Katakana', (done) => {
      let katakanaChange = Object.assign({}, katakanaPostTest, { shape: 'other' });
      chai.request(app).post(`${userURL}/login`).send({
        email: adminUserTest.email,
        password: adminUserTest.password,
      }).end((err, res) => {
        chai.request(app)
          .post(kanaURL)
          .send(katakanaChange)
          .set('authorization', res.body.token)
          .end((e, r) => {
            expect(e).to.exist
            expect(e).to.have.status(400);
            expect(r).to.have.status(400);
            done();
          });
      });
    });
  });

  describe('/:id', () => {
    it('GET:id => Debe obtener un kana por id', (done) => {
      chai.request(app).get(kanaURL).end((err, res) => {
        chai.request(app).get(`${kanaURL}/${res.body[0]._id}`).end((e, r) => {
          expect(e).to.be.null;
          expect(r).to.have.status(200);
          expect(r).to.be.json;
          expect(r.body.symbol).to.equal(hiraganaTest.symbol);
          done();
        });
      });
    });

    it('PATCH:id => Debe modificar un kana por id', (done) => {
      let kanaPatch = {
        symbol: hiraganaTest.symbol + ".",
      }
      chai.request(app).post(`${userURL}/login`).send({
        email: adminUserTest.email,
        password: adminUserTest.password,
      }).end((err, res) => {
        chai.request(app).get(kanaURL).end((e, r) => {
          chai.request(app)
            .patch(`${kanaURL}/${r.body[0]._id}`)
            .send(kanaPatch)
            .set('authorization', res.body.token)
            .end((e, r) => {
              expect(e).to.be.null;
              expect(r).to.have.status(200);
              expect(r).to.be.json;
              expect(r.body.symbol).to.equal(kanaPatch.symbol).to.equal(hiraganaTest.symbol + '.');
              expect(r.body.strokes).to.equal(hiraganaTest.strokes);
              done();
            });
        });
      });
    });

    it('DELETE:id => Debe eliminar un kana por id', (done) => {
      chai.request(app).post(`${userURL}/login`).send({
        email: adminUserTest.email,
        password: adminUserTest.password,
      }).end((err, res) => {
        chai.request(app).get(kanaURL).end((e, r) => {
          chai.request(app).del(`${kanaURL}/${r.body[0]._id}`)
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
    it('NO LOGIN - No debe permitir la creación de un nuevo kana', (done) => {
      chai.request(app)
        .post(kanaURL)
        .send(hiraganaPostTest)
        .end((err, res) => {
          expect(err).to.exist;
          expect(err).to.have.status(401);
          expect(res).to.have.status(401);
          done();
        });
    });

    it('NO LOGIN - No debe permitir la actualización de un kana', (done) => {
      let kanaPatch = {
        symbol: hiraganaTest.symbol,
      }
      chai.request(app).get(kanaURL).end((err, res) => {
        chai.request(app)
          .patch(`${kanaURL}/${res.body[0]._id}`)
          .send(kanaPatch)
          .end((e, r) => {
            expect(e).to.exist;
            expect(e).to.have.status(401);
            expect(r).to.have.status(401);
            done();
          });
      });
    });

    it('NO LOGIN - No debe permitir la eliminación de un kana', (done) => {
      chai.request(app).get(kanaURL).end((err, res) => {
        chai.request(app)
          .del(`${kanaURL}/${res.body[0]._id}`)
          .end((e, r) => {
            expect(e).to.exist;
            expect(e).to.have.status(401);
            expect(r).to.have.status(401);
            done();
          });
      });
    });
  });

  describe('/?query', () => {
    it('Debe permitir la busqueda mediante el query', (done) => {
      let query = {
        limit: 1,
        skip: 1,
        page: 0,
      };
      chai.request(app).get(kanaURL)
        .query(query).end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).length(1);
          expect(res.body[0].symbol).to.equal(katakanaTest.symbol);
          done();
        });
    });
  });
});