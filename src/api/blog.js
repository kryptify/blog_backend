const express = require("express");
const { performance } = require('perf_hooks');
const tools = require('../lib/tools');
const log = require('../lib/logger')();

const app = express();

app.post('/', async (req, res) => {
    
    let page = 1;
    let rows = 10;
    let categories = [];
    let title = ""

    // try {
    //     page = req.query.page;
    //     rows = req.query.rows;
    // } catch (e) {}

    try {
        page = req.body.page;
        rows = req.body.rows;
        categories = req.body.categories;
        title = req.body.title;
    } catch (e) {}

    try {
        var startTime = performance.now()

        const data = await tools.getBlogs(title, categories);
        let page_data = data.slice((page - 1) * rows, page * rows)
        // page_data = {...page_data}
        var endTime = performance.now()
        var took = (endTime - startTime).toFixed(2)
        var total = data.length
        
        return res.status(200).send({
            result: 'success',
            took,
            total,
            page_data,
        });
    } catch (e) {
        log.error(e);
    }
    return res.status(200).json({ result: 'fail', tokens: [] });
});


module.exports = app;