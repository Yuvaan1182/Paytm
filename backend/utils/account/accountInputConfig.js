const zod = require('zod');

const signUpbody = zod.object({
        to: zod.string(),
        amount: zod.number(),
});