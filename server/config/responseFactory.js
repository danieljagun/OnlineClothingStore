module.exports = {
    success: function (data, message = "Success") {
        return { status: 'success', message, data };
    },

    error: function (message = "Error", statusCode = 400) {
        return { status: 'error', message, statusCode };
    }
};
