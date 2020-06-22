import { ErrorHandler } from '@angular/core';

export class AppErrorHandler implements ErrorHandler {
    handleError(error) {
        // Maybe use a toast notification later?
        console.log(error);
    }
}