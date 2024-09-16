import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  async uploadFile (file) {
    const { originalname, mimetype} = file;
    
  }
}
