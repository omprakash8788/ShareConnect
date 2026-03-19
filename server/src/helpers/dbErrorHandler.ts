import { Error as MongooseError } from "mongoose";
type MongoError = {
    code?: number;
    message: string;
    keyValue?: Record<string, any>;
};

type AppError = MongoError | MongooseError.ValidationError;

const getUniqueErrorMessage = (err: MongoError): string => {
    let output
    try {
        let fieldName =
            err.message.substring(err.message.lastIndexOf('.$') + 2,
                err.message.lastIndexOf('_1'))
        output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) +
            ' already exists'
    } catch (ex) {
        output = 'Unique field already exists'
    }
    return output
}

const getErrorMessage = (err: AppError): string => {
    let message = "";

    if ("code" in err && err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = getUniqueErrorMessage(err);
                break;
            default:
                message = "Something went wrong";
        }
    } else if (err instanceof MongooseError.ValidationError) {
        for (let errName in err.errors) {
            if (err.errors[errName].message) {
                message = err.errors[errName].message;
            }
        }
    }

    return message;
};
export default { getErrorMessage }