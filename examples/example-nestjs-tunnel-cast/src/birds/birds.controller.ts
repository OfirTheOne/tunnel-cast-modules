import { Controller, Get, Query, Param, UseInterceptors } from '@nestjs/common';
import { CastQueryInterceptor, CastParamInterceptor } from '@tunnel-cast/nestjs/interceptors'

import { SearchBirds, GetBirdsByType} from './cast'

@Controller('birds')
export class BirdsController {

    @UseInterceptors(
        CastQueryInterceptor(SearchBirds.Query),
    )
    @Get()
    getBirds(@Query() query: SearchBirds.Query) {
        return { query }
    }
    
    @UseInterceptors(
        CastParamInterceptor(GetBirdsByType.Params),
    )
    @Get(':type')
    getBirdsByType(@Param() params: GetBirdsByType.Params) {
        return { params }
    }
}
