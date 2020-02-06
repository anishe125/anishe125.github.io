import 'jsdom-global';
import {JSDOM} from 'jsdom';
global.document = new JSDOM();

import fetchMock from 'fetch-mock';

const fetchData = require('../src/fetchData');

import {assert} from 'chai';
import sinon from 'sinon';
import {data} from '../src/testData/testSuccess';
import {unsuccessfulData} from "../src/testData/testUnSuccess";

describe (('fetch check'), () => {

    it('output data is correct', ()=> {
        fetchMock.mock('url', 200);

        new Promise(resolve => {
            fetchData.fetchData('url')
        })
            .then(function (res) {
                assert.equal(res.success, true)
                })
            .catch(function (e) {
                console.log(e);
            });

        fetchMock.restore();
    });

    it('output data is incorrect', ()=> {
        fetchMock.mock('url', 500);

        new Promise(resolve => {
            fetchData.fetchData('url')
        })
            .then(function (res) {
                assert.equal(res.success, false)
            })
        .catch(function (e) {
            console.log(e);
        });

    fetchMock.restore();
});

    it('fetch happen by right url', ()=>{
        sinon.stub(fetchData, 'fetchData').callsFake(function (url) {
            assert.equal(url, 'http:lala')
        });

        new Promise(resolve => fetchData.fetchData('http:lala'))
            .catch(function (e) {
                console.log(e);
            });
        fetchData.fetchData.restore();
    });

    it('fetch successful', ()=>{
        sinon.stub(fetchData, 'fetchData').callsFake(function () {
            return data;
        });
        new Promise(resolve => {
            fetchData.fetchData()
        })
            .then(function (res) {
                fetchData.handleResponse(res, function (err, data) {
                    assert.equal(data.data.name, 'London')
                })
        })
            .catch(function (e) {
                console.log(e);
            });
        fetchData.fetchData.restore();
    });

    it('fetch is unsuccessful', ()=>{
        sinon.stub(fetchData, 'fetchData').callsFake(function () {
            return {'success': false, 'err': 'some error'};
        });
        new Promise(reject => {
            fetchData.fetchData()
        })
            .then(function (res) {
                fetchData.handleResponse(res, function (err, data) {
                    assert.equal(err, 'some error')
                })
            })
            .catch(function (e) {
                console.log(e);
            });
    })
});

describe (('handleResponse'), () => {
    it('handleResponse is called', ()=> {
        sinon.stub(fetchData, 'handleResponse').callsFake(function (res) {
            assert.equal(res.error, 500)
        });
        fetchMock.mock('url', 500);
        fetchData.load('url', () => {});
        fetchMock.restore();
        sinon.restore();
    });
    it('callback is called', ()=> {
        let callback = sinon.spy();
        fetchData.handleResponse(data, callback);
        assert(callback.calledOnce);
    });
    it('successful', ()=> {
        let callback = sinon.spy();
        fetchData.handleResponse(data, callback);
        assert.equal(callback.args[0][0], null);
    });
    it('unsuccessful', ()=> {
        let callback = sinon.spy();
        fetchData.handleResponse(unsuccessfulData, callback);
        assert.equal(callback.args[0][0], 500);
    });
});