const loggingMiddleware = (db) =>
    (req, res, next) => {
        const ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || '').split(',')[0].trim();
        const headers = JSON.stringify(req.headers);
        const originalUrl = req.originalUrl;
        // Persist this info on DB
        db.logging.create({
            ip,
            header: headers,
            action: originalUrl
        }).then((resp) => console.log('Log almacenado'))
        next();
    }

module.exports = loggingMiddleware;