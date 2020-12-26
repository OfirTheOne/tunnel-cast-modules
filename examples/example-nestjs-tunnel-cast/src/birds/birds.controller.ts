import { Controller, Get, Query, Param, UseInterceptors } from '@nestjs/common';
import { CastQueryInterceptor, CastParamInterceptor } from '@tunnel-cast/nestjs/interceptors/common-cast-interceptor'
import { CastParam } from '@tunnel-cast/nestjs/parameter-decorators/common-cast-parameter-decorator'

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
    
    // @UseInterceptors(
    //     CastParamInterceptor(GetBirdsByType.Params),
    // )
    @Get(':type')
    getBirdsByType(@CastParam() params: GetBirdsByType.Params) {
        return { params }
    }
}
