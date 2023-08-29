const router = require('express').Router();

router.use('/blog', require('./blog'));

router.use('/health', (_req, res) => {
    res.status(200).send('success');
});

module.exports = router;
