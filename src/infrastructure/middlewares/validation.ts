import { Request, Response, NextFunction, RequestHandler } from 'express';
import { plainToInstance, ClassConstructor } from 'class-transformer';
import { validate } from 'class-validator';

export function createValidationMiddleware<T extends object>(dtoClass: ClassConstructor<T>): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const dtoInstance = plainToInstance(dtoClass, req.body);
        const errors = await validate(dtoInstance, {
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        });

        if (errors.length > 0) {
            const formattedErrors = errors.map(error => ({
                field: error.property,
                constraints: error.constraints ? Object.values(error.constraints) : [],
            }));

            res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: formattedErrors,
            });
            return;
        }

        req.body = dtoInstance;
        next();
    };
}