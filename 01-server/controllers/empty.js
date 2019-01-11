module.exports = (req, res) => {
    const {baseUrl, method} = req;
    res.json({baseUrl, method});
};