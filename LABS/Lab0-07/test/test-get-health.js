/**
 * Тестовий скрипт для тестування Node-Red http сервісів
 * Відповідний flows знаходиться в Flows/test-get-health.js
 */

const mocha = require('mocha');
const chai = require('chai');
const request = require('supertest');

//var http = require('http');
var https = require('https');

const expect = chai.expect;

const l_baseurl = 'https://nod-red-wshp.eu-gb.mybluemix.net';
const i_host = 'nod-red-wshp.eu-gb.mybluemix.net';
const i_port = 443

describe('Test simple get requests /health', () => {
  it('Simple classic test /health', function( done ) {

    var responseString = '';

    var options = {
      host: i_host,
      port: i_port,
      path: '/health'
    };

    var callback = function(response){
      response.on('data', function (chunk) {
        responseString += chunk;
      });

      response.on('end', function () {
        expect(responseString).to.equal('{"status":"UP"}');
        expect( this.statusCode ).to.equal(200);
        expect(this.statusMessage).to.equal('OK');

        done();
      });
    };

    https.request(options, callback).end();



  });

  it('Super Test GET /health', function( done ) {
    request('https://'+i_host)
      .get('/health')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        
        expect(res.body.status).to.equal('UP');
        done();

      });
  
  });
});

/**
* Тест, для демонстрації http get з параметрами
* Request:  
*   https://nod-red-wshp.eu-gb.mybluemix.net/accs?id=12356&dt=2019-12-20
* Response:
* {"id":"12356","dt":"2019-12-20","bal":124.54,"acname":"Транзитний рахунок хитрого обліку"}
*/
describe('Get request with params /accs', () => {
  it('Test SuperTest GET with params /accs', function( done ) {
    request('https://'+i_host)
      .get('/accs')
      // set params
      .query({
              id: 123456,
              dt: '2019-18-23'
             })
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        
        expect(res.body).to.contain.property("id");
        expect(res.body).to.contain.property("dt");
        done();

      });
  
  });
});

/** 
 * POST Request
 * 
 * url = https://nod-red-wshp.eu-gb.mybluemix.net/acc
 * Request: 
 *   {"actype": "CARD", "acc": "262500011330"}
 * Response: 
 *   {"actype":"CARD","acc":"262500011330","bal":124.54,"acname":"Транзитний рахунок хитрого обліку"}
 * 
 */
describe('Test post /acc', () => {
    it('Test supertest POST', (done) => {
      request('https://'+i_host)
        .post('/acc')
        // body request
        .send( {actype: "CARD", acc: "262500011330"} )
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
              expect(res.body).to.contain.property("actype");
              expect(res.body).to.contain.property("acc");
              expect(res.body).to.contain.property("bal");
              expect(res.body).to.contain.property("acname");
              done();
          });
    });
});
