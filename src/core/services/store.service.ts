import { Injectable } from '@angular/core';

@Injectable()
export class StoreService {
    public setItem(key: string, value: any): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    public getItem(key: string): any {
        return JSON.parse(localStorage.getItem(key) as string);
    }

    public removeItem(key: string): void {
        localStorage.removeItem(key);
    }
}
