import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth(): any {
    return{
      service: "post-api service",
      message: "online"
    }
  }
}