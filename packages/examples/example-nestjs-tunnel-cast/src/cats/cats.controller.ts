import { Controller, Get } from '@nestjs/common';
import { CastQueryInfer } from 'nestjs-tunnel-cast/dist/parameter-decorators/common-cast-parameter-decorator'

import { GetAllCats } from './cast-models'

@Controller('cats')
export class CatsController {

    @Get()
    getCats(@CastQueryInfer query: GetAllCats.Query ) {
        return {query}
    }
}
