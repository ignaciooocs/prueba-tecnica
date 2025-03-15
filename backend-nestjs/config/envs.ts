import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
    USER_EMAIL: string;
    USER_PASSWORD: string;
}

const envsSchema = joi.object({
    USER_EMAIL: joi.string().required(),
    USER_PASSWORD: joi.string().required(),
})
.unknown();

const {error, value} = envsSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const envsVars: EnvVars = value;

export const envs = {
    userEmail: envsVars.USER_EMAIL,
    userPassword: envsVars.USER_PASSWORD
}