const zod   = require('zod');

const signUpbody = zod.object({
        email: zod.string().email(),
        firstName: zod.string().min(3).max(30),
        lastName: zod.string().min(3).max(30),
        password: zod.string().min(6).max(30),
});

const signInbody = zod.object({
        email: zod.string().email(),
        password: zod.string().min(6).max(30),
});

const updateBody = zod.object({
        firstName: zod.string().optional(),
        lastName: zod.string().optional(),
        password: zod.string().optional(),
});

module.exports = {
        signInbody,
        signUpbody,
        updateBody
}