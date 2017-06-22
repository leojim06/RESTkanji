
process.env.NODE_ENV = 'test';

import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/server'
import Users from '../src/modules/users/user.model';

chai.use(chaiHttp);
const expect = chai.expect;
const usersURL = '/api/v1/users';

const userTest = {
  email: 'test@sample.com',
  password: 'testPassword1',
  firstName: 'Jon',
  lastName: 'Doe',
  userName: 'JonDoe',
}

const adminUserTest = {
  email: 'admin@sample.com',
  password: 'adminPassword1',
  firstName: 'Admin',
  lastName: 'Doe',
  userName: 'AdminDoe',
  role: 'Admin',
}

describe('RUTAS GENERALES', () => {
  beforeEach(async () => {
    let dropUsers = await Users.collection.drop();
    let createUser = await Users.create(userTest);
    let adminUser = await Users.create(adminUserTest);
  });

  describe('/', () => {
    it('Debe tener un status 200 y el mensaje de Bienvenida \'Hello World シ\'', (done) => {
      chai.request(app).get('/').end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.equal('Hello world シ');
        done();
      });
    });
  });

  describe('/private', () => {
    it('Debe prohibir el ingreso a la ruta /private', (done) => {
      chai.request(app).get('/private').end((err, res) => {
        expect(err).to.exist;
        expect(res).to.have.status(401);
        done();
      });
    });

    it('Debe permitir el ingreso a la ruta /private después del login', (done) => {
      chai.request(app).post(`${usersURL}/login`)
        .send({ email: adminUserTest.email, password: adminUserTest.password })
        .end((err, res) => {
          chai.request(app).get('/private')
            .set('authorization', res.body.token)
            .end((e, r) => {
              expect(e).to.be.null;
              expect(r).to.have.status(200);
              expect(r.body).to.equal('This is a private route!!!');
              done();
            })
        });
    });

    // it('Debe permitir el ingreso a la ruta /private', (done) => {
    //    chai.request(app)
    //       .post(`${usersURL}/login`)
    //       .send({ email: adminUserTest.email, password: adminUserTest.password })
    //       .end((err, res) => {
    //          chai.request(app)
    //             .get('/private')
    //             .set('authorization', res.body.token)
    //             .end((e, r) => {
    //                console.log('=======================================');
    //                console.log(r.body);
    //                console.log('=======================================');
    //                expect(e).to.be.null;
    //                expect(r).to.have.status(200);
    //                expect(r.body).to.be.json;
    //                done();
    //             });
    //       });
    // });
  });
});

describe('USERS', () => {
  describe('/signup', () => {
    it('Debe crear un nuevo usuario - base de datos vacia', (done) => {
      Users.collection.drop();
      chai.request(app)
        .post(`${usersURL}/signup`)
        .send(userTest)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res).to.be.json;
          done();
        });
    });

    it('No debe crear un usuario con los mismos datos que otro', (done) => {
      chai.request(app)
        .post(`${usersURL}/signup`)
        .send(userTest)
        .end((err, res) => {
          expect(err).exist;
          expect(res).to.have.status(400);
          done();
        });
    });

    it('No debe crear un usuario que contenga el campo rol', (done) => {
      let userTestRole = Object.assign('', userTest, {
        email: 'test2@sample.com',
        userName: 'testUserName',
        role: 'user'
      });
      chai.request(app)
        .post(`${usersURL}/signup`)
        .send(userTestRole)
        .end((err, res) => {
          expect(err).exist;
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  describe('/login', () => {
    it('Debe iniciar sesión de usuario', (done) => {
      chai.request(app)
        .post(`${usersURL}/login`)
        .send({
          email: userTest.email,
          password: userTest.password
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('_id');
          expect(res.body).to.have.property('userName');
          expect(res.body).to.have.property('token');
          done();
        });
    });

    it('No debe iniciar sesión de usuario - faltan campos', (done) => {
      chai.request(app)
        .post(`${usersURL}/login`)
        .send({
          email: userTest.email,
        })
        .end((err, res) => {
          expect(err).to.exist;
          expect(res).to.have.status(400);
          done();
        });
    });
  });
});