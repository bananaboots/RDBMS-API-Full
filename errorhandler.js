module.exports = (err) => {
    res.status(500).json({
        message: 'Sorry, there was an error while handling your request.',
        error: err
    })
}