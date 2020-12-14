import { Controller, Get } from '@nestjs/common';
import { CastQuery, CastParam } from '@tunnel-cast/nestjs/parameter-decorators/common-cast-parameter-decorator'

import { GetAllCats, GetCatsByType} from './cast'

@Controller('cats')
export class CatsController {
    @Get()
    getCats(@CastQuery() query: GetAllCats.Query) {
        return {query}
    }
    
    @Get(':type')
    getCatsByType(@CastParam() params: GetCatsByType.Params) {
        return {params}
    }
}
