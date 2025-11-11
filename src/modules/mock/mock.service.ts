import { Injectable } from '@nestjs/common';

@Injectable()
export class MockService {

    async callTimeoutData(): Promise<any> {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return { message: 'This is a delayed response after timeout.' };
    }

}
