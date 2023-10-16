import { Controller, Get, UseGuards } from '@nestjs/common';
import { ChuckNorrisService } from './chuck-norris.service';

@Controller('/api/random-joke')
export class ChuckNorrisController {
  constructor(private readonly chuckNorrisService: ChuckNorrisService) {}

  @Get()
  async getRandomJoke() {
    const Joke = await this.chuckNorrisService.getRandomJoke();
    return Joke;
  }
}