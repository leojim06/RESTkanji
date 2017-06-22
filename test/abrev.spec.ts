process.env.NODE_ENV = 'test';

import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/server'
import Abrevs from '../src/modules/abrev/abrev.model';
import Users from '../src/modules/users/user.model';


chai.use(chaiHttp);
const expect = chai.expect;

const abrevURL: string = '/api/v1/abrevs';
const usersURL: string = '/api/v1/users';

const adminUserTest = {
  email: 'admin@sample.com',
  password: 'adminPassword1',
  firstName: 'Admin',
  lastName: 'Doe',
  userName: 'AdminDoe',
  role: 'Admin',
}

const abrevTest = {
  abrev: 'vs',
  meaning: 'Se forma verbo con suru (つる)'
}

const abrevPostTest = {
  abrev: 'vsa',
  meaning: 'Se forma verbo con saseru (させる)'
}

describe('ABREVIATURAS', () => {
  beforeEach(async () => {
    let dropAbrevs = await Abrevs.collection.drop();
    let createAbrev = await Abrevs.create(abrevTest);
    let dropUsers = await Users.collection.drop();
    let createAdmin = await Users.create(adminUserTest);
  });

  describe('/', () => {
    it('GET => Debe obtener todas las abreviaturas', (done) => {
      chai.request(app).get(abrevURL).end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).length(1);
        done();
      });
    });

    it('POST => Debe crear una nueva abreviatura', (done) => {
      chai.request(app).post(`${usersURL}/login`).send({
        email: adminUserTest.email,
        password: adminUserTest.password,
      }).end((err, res) => {
        chai.request(app).post(abrevURL).send(abrevPostTest)
          .set('authorization', res.body.token).end((e, r) => {
            expect(e).to.be.null;
            expect(r).to.have.status(201);
            expect(r).to.be.json;
            expect(r.body.abrev).to.equal(abrevPostTest.abrev);
            expect(r.body.meaning).to.equal(abrevPostTest.meaning);
            done();
          });
      });
    });

    it('POST => No debe crear una nueva abreviatura sin todos los campos', (done) => {
      chai.request(app).post(`${usersURL}/login`).send({
        email: adminUserTest.email,
        password: adminUserTest.password,
      }).end((err, res) => {
        chai.request(app).post(abrevURL).send({
          meaning: 'Elemento sin abrev',
        }).set('authorization', res.body.token).end((e, r) => {
          expect(e).to.exist;
          expect(e).to.have.status(400);
          expect(r).to.have.status(400);
          done();
        });
      });
    });
  });

  describe('/:index', () => {
    it('GET:abrev => Debe obtener un elemento por abrev', (done) => {
      chai.request(app).get(`${abrevURL}/${abrevTest.abrev}`).end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.abrev).to.be.equal(abrevTest.abrev);
        done();
      });
    });

    it('PATCH:abrev => Debe actualizar los datos de la abreviación', (done) => {
      let abrevPatch = {
        meaning: abrevTest.meaning + '.',
      }
      chai.request(app).post(`${usersURL}/login`).send({
        email: adminUserTest.email,
        password: adminUserTest.password,
      }).end((err, res) => {
        chai.request(app).patch(`${abrevURL}/${abrevTest.abrev}`)
          .send(abrevPatch)
          .set('authorization', res.body.token)
          .end((e, r) => {
            expect(e).to.be.null;
            expect(r).to.have.status(200);
            expect(r.body.abrev).to.equal(abrevTest.abrev);
            expect(r.body.meaning).to.equal(abrevTest.meaning + '.');
            done();
          });
      });
    });

    it('DELETE:abrev => Debe eliminar una abreviatura por el index', (done) => {
      chai.request(app).post(`${usersURL}/login`).send({
        email: adminUserTest.email,
        password: adminUserTest.password,
      }).end((err, res) => {
        chai.request(app)
          .del(`${abrevURL}/${abrevTest.abrev}`)
          .set('authorization', res.body.token)
          .end((e, r) => {
            expect(e).to.be.null;
            expect(r).to.have.status(200);
            done();
          });
      });
    });
  });

  describe('Rutas protegidas por login', () => {
    it('NO LOGIN - No debe permitir la creación de una nueva abreviatura', (done) => {
      chai.request(app)
        .post(abrevURL)
        .send(abrevPostTest)
        .end((e, r) => {
          expect(e).to.exist;
          expect(e).to.have.status(401);
          expect(r).to.have.status(401);
          done();
        });
    });

    it('NO LOGIN - No debe permitir la actualización de una abreviatura', (done) => {
      let abrevPatch = {
        meaning: abrevTest.meaning + '.',
      }
      chai.request(app)
        .patch(`${abrevURL}/${abrevTest.abrev}`)
        .send(abrevPatch)
        .end((e, r) => {
          expect(e).to.exist
          expect(e).to.have.status(401);
          expect(r).to.have.status(401);
          done();
        });
    });

    it('NO LOGIN - No debe eliminar una abreviatura por el index', (done) => {
      chai.request(app)
        .del(`${abrevURL}/${abrevTest.abrev}`)
        .end((e, r) => {
          expect(e).to.exist;
          expect(e).to.have.status(401);
          expect(r).to.have.status(401);
          done();
        });
    });
  });
});


