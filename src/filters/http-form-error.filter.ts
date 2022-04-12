import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from 'express';
import HCore from 'hcore';
import { CaseType } from "hcore/dist/casing";

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        const error = exception.getResponse() as any;

        //const validationErrors = error.message as ValidationError[];

        let body = null;

        console.log(error);

        if (Array.isArray(error.message)) {
            body = {};

            for (const message of error.message) {

                const parts = message.split(" ");
                let keyName = parts[0];
                let errorMsg = parts.slice(1).join(" ");

                console.log(keyName);

                switch(errorMsg) {
                    case "must be an email":
                        errorMsg = "Valid email required";
                        break;
                    case "should not be empty":
                        errorMsg = `${HCore.Casing.toType(keyName, CaseType.StdCase)} ${keyName[keyName.length - 1] === 's' ? 'are' : 'is'} required`;
                        break;
                }

                body[parts[0]] = HCore.Casing.toType(keyName, CaseType.StdCase) + ' ' + errorMsg;
            }
        } else {
            body = error.message ? error.message : error ? error : "Unknown error";
        }

        response
            .status(400)
            .json(body)
    }
}