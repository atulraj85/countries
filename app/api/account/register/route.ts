import { usersRepo } from '@/app/_helpers/server';
import { apiHandler } from '@/app/_helpers/server/api';
import joi from 'joi';



module.exports = apiHandler({
    POST: register
});

async function register(req: Request) {
    const body = await req.json();
    await usersRepo.create(body);
}

register.schema = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    username: joi.string().required(),
    password: joi.string().min(6).required(),
});