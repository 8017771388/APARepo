import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { CommunicationService } from './communication.services';

@Injectable()
export class ErrorLogService {
    toastOption = {};

    constructor(private communicationService: CommunicationService) {
    }

    logError(error: any) {
        const date = new Date().toISOString();

        if (error instanceof HttpErrorResponse) {
            this.toastOption = {
                title: 'There was an HTTP error',
                message: error.message + ' ' + 'Status code:' + (<HttpErrorResponse>error).status,
                option: {
                    type: 'ERROR',
                    closeButton: true
                }
            };
            console.error(date, 'There was an HTTP error.', error.message, 'Status code:', (<HttpErrorResponse>error).status);
        } else if (error instanceof TypeError) {
            this.toastOption = {
                title: 'There was a Type error',
                message: error.message,
                option: {
                    type: 'ERROR',
                    closeButton: true
                }
            };
            console.error(date, 'There was a Type error.', error.message);
        } else if (error instanceof Error) {
            this.toastOption = {
                title: 'There was a general error',
                message: error.message,
                option: {
                    type: 'ERROR',
                    closeButton: true
                }
            };
            console.error(date, 'There was a general error.', error.message);
        } else {
            this.toastOption = {
                title: 'Nobody threw an Error but something happened!',
                message: error,
                option: {
                    type: 'ERROR',
                    closeButton: true
                }
            };
            console.error(date, 'Nobody threw an Error but something happened!', error);
        }

        // Push the error
        this.communicationService
            .setLogger(this.toastOption);
    }
}
