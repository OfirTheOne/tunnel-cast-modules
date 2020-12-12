import { Controller, Get } from '@nestjs/common';
import { CastQuery } from '@tunnel-cast/nestjs/parameter-decorators/common-cast-parameter-decorator'

import { GetAllCats } from './cast'

@Controller('cats')
export class CatsController {

    @Get()
    getCats(@CastQuery() query: GetAllCats.Query ) {
        return {query}
    }
}
