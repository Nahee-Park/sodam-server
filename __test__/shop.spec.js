// 테스트 코드 작성 폴더 구조
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);
const dotenv = require('dotenv');
dotenv.config();

const url = 'http://localhost:8080';

describe('[GET] /shop?area={}&sort={}', () => {
  it('[GET] 지역별 소품샵 : 인기순 정렬', (done) => {
    chai
      .request(url)
      .get('/shop')
      .query({ area: '서대문구', sort: 'popular' })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.status).to.deep.equal(200);
        expect(res.body.message).to.deep.equal('지역별 소품샵 가져오기 성공');
        expect(res.body).be.a('object');
        expect(res.body.data).be.a('array');
        expect(res.body.data[0].shopId).be.a('number');
        expect(res.body.data[0].shopName).be.a('string');
        expect(res.body.data[0].category).be.a('array');
        expect(res.body.data[0].roadAddress).be.a('string');
        expect(res.body.data[0].landAddress).be.a('string');
        expect(res.body.data[0].time).be.a('string');
        expect(res.body.data[0].image).be.a('array');
        expect(res.body.data[0]).to.have.all.keys('shopId', 'shopName', 'category', 'roadAddress', 'landAddress', 'reviewCount', 'time', 'image');
        done();
      });
  });

  it('[GET] 지역별 소품샵 : 내가 저장한 소품샵 정렬 - 저장한 소품샵이 있을 때', (done) => {
    chai
      .request(url)
      .get('/shop')
      .set('accesstoken', process.env.TEST_TOKEN)
      .query({ area: '광진구', sort: 'mysave' })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.status).to.deep.equal(200);
        expect(res.body.message).to.deep.equal('지역별 소품샵 가져오기 성공');
        expect(res.body).be.a('object');
        expect(res.body.data).be.a('array');
        expect(res.body.data[0].shopId).be.a('number');
        expect(res.body.data[0].shopName).be.a('string');
        expect(res.body.data[0].category).be.a('array');
        expect(res.body.data[0].roadAddress).be.a('string');
        expect(res.body.data[0].landAddress).be.a('string');
        expect(res.body.data[0].time).be.a('string');
        expect(res.body.data[0].image).be.a('array');
        expect(res.body.data[0]).to.have.all.keys('shopId', 'shopName', 'category', 'roadAddress', 'landAddress', 'reviewCount', 'time', 'image');
        done();
      });
  });

  it('[GET] 지역별 소품샵 : 내가 저장한 소품샵 정렬 - 저장한 소품샵이 없을 때', (done) => {
    chai
      .request(url)
      .get('/shop')
      .set('accesstoken', process.env.TEST_TOKEN)
      .query({ area: '서대문구', sort: 'mysave' })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({
          status: 200,
          success: true,
          message: '저장한 소품샵이 없습니다.',
          data: [],
        });
        done();
      });
  });

  it('[GET] 지역별 소품샵 : 내가 저장한 소품샵 정렬 - 로그인 안되어 있을 때', (done) => {
    chai
      .request(url)
      .get('/shop')
      .query({ area: '서대문구', sort: 'mysave' })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(401);
        expect(res.body).to.deep.equal({
          status: 401,
          success: false,
          message: '로그인이 필요한 서비스 입니다.',
        });
        done();
      });
  });
});

describe('[GET] /shop?theme={}&sort={}&offset={}&limit={}', () => {
  it('[GET] 테마별 소품샵 : 인기순 정렬 - offset, limit 없음', (done) => {
    chai
      .request(url)
      .get('/shop')
      .query({ theme: '빈티지', sort: 'popular' })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.status).to.deep.equal(200);
        expect(res.body.message).to.deep.equal('테마별 소품샵 가져오기 성공');
        expect(res.body).be.a('object');
        expect(res.body.data).be.a('array');
        expect(res.body.data).to.have.lengthOf(20);
        expect(res.body.data[0].shopId).be.a('number');
        expect(res.body.data[0].shopName).be.a('string');
        expect(res.body.data[0].category).be.a('array');
        expect(res.body.data[0].image).be.a('array');
        expect(res.body.data[0]).to.have.all.keys('shopId', 'shopName', 'category', 'image');
        done();
      });
  });

  it('[GET] 테마별 소품샵 : 인기순 정렬 - offset 1, limit 10', (done) => {
    chai
      .request(url)
      .get('/shop')
      .query({ theme: '아기자기한', sort: 'popular', offset: 2, limit: 10 })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.status).to.deep.equal(200);
        expect(res.body.message).to.deep.equal('테마별 소품샵 가져오기 성공');
        expect(res.body).be.a('object');
        expect(res.body.data).be.a('array');
        expect(res.body.data).to.have.lengthOf(10);
        expect(res.body.data[0].shopId).be.a('number');
        expect(res.body.data[0].shopName).be.a('string');
        expect(res.body.data[0].category).be.a('array');
        expect(res.body.data[0].image).be.a('array');
        expect(res.body.data[0]).to.have.all.keys('shopId', 'shopName', 'category', 'image');
        done();
      });
  });

  it('[GET] 테마별 소품샵 : 리뷰순 정렬 - offset, limit 없음', (done) => {
    chai
      .request(url)
      .get('/shop')
      .query({ theme: '힙한', sort: 'review' })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.status).to.deep.equal(200);
        expect(res.body.message).to.deep.equal('테마별 소품샵 가져오기 성공');
        expect(res.body).be.a('object');
        expect(res.body.data).be.a('array');
        expect(res.body.data).to.have.lengthOf(20);
        expect(res.body.data[0].shopId).be.a('number');
        expect(res.body.data[0].shopName).be.a('string');
        expect(res.body.data[0].category).be.a('array');
        expect(res.body.data[0].image).be.a('array');
        expect(res.body.data[0]).to.have.all.keys('shopId', 'shopName', 'category', 'image');
        done();
      });
  });

  it('[GET] 테마별 소품샵 : 리뷰순 정렬 - offset = 2, limit = 10 ', (done) => {
    chai
      .request(url)
      .get('/shop')
      .query({ theme: '모던한', sort: 'review', offset: 1, limit: 30 })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.status).to.deep.equal(200);
        expect(res.body.message).to.deep.equal('테마별 소품샵 가져오기 성공');
        expect(res.body).be.a('object');
        expect(res.body.data).be.a('array');
        expect(res.body.data).to.have.lengthOf(30);
        expect(res.body.data[0].shopId).be.a('number');
        expect(res.body.data[0].shopName).be.a('string');
        expect(res.body.data[0].category).be.a('array');
        expect(res.body.data[0].image).be.a('array');
        expect(res.body.data[0]).to.have.all.keys('shopId', 'shopName', 'category', 'image');
        done();
      });
  });

  it('[GET] 테마별 소품샵 : theme 쿼리가 없을 때', (done) => {
    chai
      .request(url)
      .get('/shop')
      .query({ sort: 'review' })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.body).to.deep.equal({
          status: 400,
          success: false,
          message: '필요한 값이 없습니다',
        });
        done();
      });
  });
});
