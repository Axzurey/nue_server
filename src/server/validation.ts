import {object, string} from 'yup';

const containsForbiddenCharacter = (str: string) => /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(str);
const containsForbiddenCharacterModEmail = (str: string) => /[ `!#$%^&*()+=\[\]{};':"\\|,<>\/?~]/.test(str);
const containsWhitespace = (str: string) => /\s/.test(str);
const startsWithNumber = (str: string) => str ? isNaN(str.charAt(0) as unknown as number) : true;

export const userSignupSchema = object({
    username: string()
        .min(3, 'username length must be greater than 2 characters')
        .max(15, 'username length must be less than 16 characters')
        .test('username', 'username may not contain any whitespace characters', (value) => !containsWhitespace(value))
        .test('teststartsnum', 'username may not start with a number', (v) => startsWithNumber(v))
        .test('containsforbiddenchar', 'username may not contain a forbidden character', (v) => !containsForbiddenCharacter(v))
        .required('This is a required field'),
    email: string()
        .email('email is malformed or invalid')
        .test('email', 'email may not contain any whitespace characters', (value) => !containsWhitespace(value))
        .test('containsforbiddenchar', 'email may not contain a forbidden character', (v) => !containsForbiddenCharacterModEmail(v))
        .required('This is a required field'),
    password: string()
        .min(6, 'password length must be greater than 5 characters')
        .max(24, 'password length must be less than 25 characters')
        .test('password', 'password may not contain any whitespace characters', (value) => !containsWhitespace(value))
        .test('teststartsnum', 'password may not start with a number', (v) => startsWithNumber(v))
        .test('containsforbiddenchar', 'password may not contain a forbidden character', (v) => !containsForbiddenCharacter(v))
        .required('This is a required field'),
})

export const userLoginSchema = object({
    username: string()
        .min(3, 'username length must be greater than 2 characters')
        .max(15, 'username length must be less than 16 characters')
        .test('username', 'username may not contain any whitespace characters', (value) => !containsWhitespace(value))
        .test('teststartsnum', 'username may not start with a number', (v) => startsWithNumber(v))
        .test('containsforbiddenchar', 'username may not contain a forbidden character', (v) => !containsForbiddenCharacter(v)),
    email: string()
        .email('email is malformed or invalid')
        .test('email', 'email may not contain any whitespace characters', (value) => !containsWhitespace(value))
        .test('containsforbiddenchar', 'email may not contain a forbidden character', (v) => !containsForbiddenCharacterModEmail(v)),
    password: string()
        .min(6, 'password length must be greater than 5 characters')
        .max(24, 'password length must be less than 25 characters')
        .test('password', 'password may not contain any whitespace characters', (value) => !containsWhitespace(value))
        .test('teststartsnum', 'password may not start with a number', (v) => startsWithNumber(v))
        .test('containsforbiddenchar', 'password may not contain a forbidden character', (v) => !containsForbiddenCharacter(v))
        .required('This is a required field'),
})

export interface userSignupInterface {
    username: string
    password: string
    email: string
}

export interface usernameLogin {
    username: string
    password: string
}

export interface emailLogin {
    email: string
    password: string
}

export type loginOptions = usernameLogin | emailLogin

export enum AuthError {
    USERNAME_TAKEN = "This username is already in use",
    EMAIL_TAKEN = "This email is already in use",
    NO_SUCH_USER = "Invalid login credentials have been provided"
}