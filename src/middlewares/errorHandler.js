import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res) => {
    if (err instanceof HttpError) {
        res.status(404).json({
            status: 404,
            message: "Not Found",
            data: {
                message: "Contact not found"
            }
        });
        return;
    }

    res.status(500).json({
        status: 500,
        message: 'Something went wrong',
        data: err.message,
    });
};
