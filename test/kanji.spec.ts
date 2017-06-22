process.env.NODE_ENV = 'test';

import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/server'
import Users from '../src/modules/users/user.model';
import Kanjis from '../src/modules/kanji/kanji.model';

chai.use(chaiHttp);
const expect = chai.expect;

const kanjiURL: string = '/api/v1/kanjis';
const userURL: string = '/api/v1/users';

const adminUserTest = {
  email: 'admin@sample.com',
  password: 'adminPassword1',
  firstName: 'Admin',
  lastName: 'Doe',
  userName: 'AdminDoe',
  role: 'Admin',
}

const kanjiTest = {
  kanji: "一",
  onYomi: {
    reading: ["イチ", "イツ"],
    meaning: ["uno"]
  },
  kunYomi: {
    reading: ["ひと", "ひと。つ"],
    meaning: ["1", "uno"]
  },
  KAC: 1,
  radical: "一",
  strokes: 1,
  level: 1,
  dictionary: []
}

const kanjiPostTest = {
  kanji: "二",
  onYomi: {
    reading: ["二"],
    meaning: ["dos"]
  },
  kunYomi: {
    reading: ["ふた", "ふた。つ"],
    meaning: ["2", "dos"]
  },
  KAC: 2,
  radical: "二",
  strokes: 2,
  level: 1,
  dictionary: []
}

describe('KANJIS', () => {
  beforeEach(async () => {
    let dropKanjis = await Kanjis.collection.drop();
    let createKanji = await Kanjis.create(kanjiTest);
    let dropUsers = await Users.collection.drop();
    let createAdmin = await Users.create(adminUserTest);
  });

  describe('/', () => {
    it('GET => Debe obtener todos los kanjis', (done) => {
      chai.request(app).get(kanjiURL).end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).length(1);
        expect(res.body[0].kanji).to.equal(kanjiTest.kanji);
        done();
      });
    });

    it('POST => Debe crear un nuevo kanji', (done) => {
      chai.request(app).post(`${userURL}/login`).send({
        email: adminUserTest.email,
        password: adminUserTest.password,
      }).end((err, res) => {
        chai.request(app)
          .post(kanjiURL)
          .send(kanjiPostTest)
          .set('authorization', res.body.token)
          .end((e, r) => {
            expect(e).to.be.null;
            expect(r).to.have.status(201);
            expect(r).to.be.json;
            expect(r.body.kanji).to.equal(kanjiPostTest.kanji);
            done();
          });
      });
    });

    it('POST => No debe crear un nuevo kanji sin todos los campos reuqridos', (done) => {
      chai.request(app).post(`${userURL}/login`).send({
        email: adminUserTest.email,
        password: adminUserTest.password,
      }).end((err, res) => {
        chai.request(app)
          .post(kanjiURL)
          .send({ kanji: 'faltan_campos' })
          .set('authorization', res.body.token)
          .end((e, r) => {
            expect(e).to.exist;
            expect(e).to.have.status(400);
            expect(r).to.have.status(400);
            done();
          });
      });
    });
  });

  describe('/:id', () => {
    it('GET:id => Debe obtener un kanji por id', (done) => {
      chai.request(app).get(kanjiURL).end((err, res) => {
        chai.request(app).get(`${kanjiURL}/${res.body[0]._id}`).end((e, r) => {
          expect(e).to.be.null;
          expect(r).to.have.status(200);
          expect(r).to.be.json;
          expect(r.body.kanji).to.equal(kanjiTest.kanji);
          done();
        });
      });
    });

    it('PATCH:id => Debe modificar un kanji por id', (done) => {
      let kanjiPatch = {
        kanji: kanjiTest.kanji + ".",
      }
      chai.request(app).post(`${userURL}/login`).send({
        email: adminUserTest.email,
        password: adminUserTest.password
      }).end((err, res) => {
        chai.request(app).get(kanjiURL).end((e, r) => {
          chai.request(app)
            .patch(`${kanjiURL}/${r.body[0]._id}`)
            .send(kanjiPatch)
            .set('authorization', res.body.token)
            .end((e, r) => {
              expect(e).to.be.null;
              expect(r).to.have.status(200);
              expect(r).to.be.json;
              expect(r.body.kanji).to.equal(kanjiPatch.kanji).to.equal(kanjiTest.kanji + '.');
              expect(r.body.radical).to.equal(kanjiTest.radical);
              done();
            });
        });
      });
    });

    it('DELETE:id => Debe eliminar un kanji por id', (done) => {
      chai.request(app).post(`${userURL}/login`).send({
        email: adminUserTest.email,
        password: adminUserTest.password,
      }).end((err, res) => {
        chai.request(app).get(kanjiURL).end((e, r) => {
          chai.request(app).del(`${kanjiURL}/${r.body[0]._id}`)
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
    it('NO LOGIN - No debe permitir la creación de un nuevo kanji', (done) => {
      chai.request(app)
        .post(kanjiURL)
        .send(kanjiPostTest)
        .end((err, res) => {
          expect(err).to.exist;
          expect(err).to.have.status(401);
          expect(res).to.have.status(401);
          done();
        });
    });

    it('NO LOGIN - No debe permitir la actualización de un kanji', (done) => {
      let kanjiPatch = {
        kanji: kanjiTest.kanji,
      }
      chai.request(app).get(kanjiURL).end((err, res) => {
        chai.request(app)
          .patch(`${kanjiURL}/${res.body[0]._id}`)
          .send(kanjiPatch)
          .end((e, r) => {
            expect(e).to.exist;
            expect(e).to.have.status(401);
            expect(r).to.have.status(401);
            done();
          });
      });
    });

    it('NO LOGIN - No debe permitir la eliminación de un kanji', (done) => {
      chai.request(app).get(kanjiURL).end((err, res) => {
        chai.request(app)
          .del(`${kanjiURL}/${res.body[0]._id}`)
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
      const query = {
        letter: '一'
      }
      chai.request(app).get(kanjiURL)
        .query(query).end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).length(1);
          expect(res.body[0].kanji).to.equal(kanjiTest.kanji);
          done();
        });
    });
  });
});