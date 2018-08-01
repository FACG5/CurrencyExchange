const test= require("tape");
const router= require ("../src/router.js")
const supertest= require ("supertest");
test('Initialise', (t) => {
  let num = 2
  t.equal(num, 2, 'Should return 2');
  t.end();
});
test('Home route returns a status code of 200', (t) => {
    supertest(router)
        .get("/")
        .expect(200)
        .expect('Content-Type', /html/)
        .end((err, res) => {
          t.error()
          t.equal(res.statusCode, 200, 'Should return 200');
          t.end();
        });
})
test('Error 404', (t) => {
    supertest(router)
        .get("/sss")
        .expect(404)
        .expect('Content-Type', /html/)
        .end((err, res) => {
          t.error(err)
          t.equal(res.statusCode, 404, 'Should return 404');
          t.end();
        });
})



test('Error 404', (t) => {
    supertest(router)
        .get("/calc")
        .expect(404)
        .expect('Content-Type', /html/)
        .end((err, res) => {
          t.error(err)
          t.equal(res.statusCode, 404, 'Should return 404');
          t.end();
        });
})

test('sssss', (t) => {
    supertest(router)
        .post("/calc")
        .send({val:"USD",num:55})
        .expect(200)

        .end((err, res) => {
          t.error(err);
          t.equal(typeof res, "object", 'Should return object');
          t.equal(res.statusCode, 200, 'Should return 200');
          t.end();
        });
})
