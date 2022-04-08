export const handleErrors = (err, req, res, next) => {
    const errorDetails = {
        message: err.message,
        status: err.status
    };
    res.status(err.status || 500).json(errorDetails);
};