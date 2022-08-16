import { of } from "rxjs";

export abstract class BaseEffects {
    protected handleResponse(response: any, action: any, errorMsg: string) {
        if (response) {
           return action;
        } else {
            throw new Error(errorMsg);
        }
    }

    protected handleFailure(error: any, action: any) {
        console.log('Something strange in handleFailure', error);
        return of(action);
    }
}