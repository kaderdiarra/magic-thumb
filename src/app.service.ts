import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import axios from 'axios';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getInstaAccessToken(verificationCode: string) {
    // const reqBody = {
    //   client_secret: 'c832690bad0cdcc6368c6115e05656fe',
    //   client_id: 1190449038421831,
    //   grant_type: 'authorization_code',
    //   redirect_uri: 'https://localhost:3333/auth/redirect/access_token',
    //   code: verificationCode,
    // };

    // const res = await fetch('https://api.instagram.com/oauth/access_token', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    //   },
    //   body: JSON.stringify(reqBody),
    // });
    // console.log(
    //   '🚀 ~ file: app.service.ts ~ line 26 ~ AppService ~ getInstaAccessToken ~ res',
    //   res,
    // );

    try {
      const params = new URLSearchParams();
      params.append('client_secret', 'c832690bad0cdcc6368c6115e05656fe');
      params.append('client_id', '1190449038421831');
      params.append('grant_type', 'authorization_code');
      params.append('redirect_uri', 'https://localhost:3333/auth/redirect');
      params.append('code', verificationCode);
      const res = await axios.post(
        'https://api.instagram.com/oauth/access_token',
        params,
      );

      console.log(
        '🚀 ~ file: app.service.ts ~ line 55 ~ AppService ~ getInstaAccessToken ~ res?.data?.access_token',
        res?.data,
      );
      return res?.data;
    } catch (error) {
      console.log(
        '🚀 ~ file: app.service.ts ~ line 59 ~ AppService ~ getInstaAccessToken ~ error',
        error,
      );
    }
  }
}
