import { Injectable,InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ChuckNorrisService {
    private chuckNorriesUrl = process.env.CHUCK_NORRIS_API_URL || ''
    async getRandomJoke(){
        try{
            const response = await axios.get(this.chuckNorriesUrl);
            return response.data;
        }catch(error){
            throw new InternalServerErrorException();
        }
    }
}
