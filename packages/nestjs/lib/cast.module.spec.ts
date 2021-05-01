
import { Controller, Get } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { CastModule } from './cast.module';

import { Required } from '@tunnel-cast/tunnel-cast/decorator/constraint/common/required.decorator';
import { IsString } from '@tunnel-cast/tunnel-cast/decorator/constraint/type/is-string.decorator';
import { Matches } from '@tunnel-cast/tunnel-cast/decorator/constraint/string/matches.decorator';
import { CastParam } from './parameter-decorators';

class GetByIdParams {
    @Required()
    @Matches(/\d/)
    @IsString()
    id: string
}

@Controller('entity')
class ExampleEntityController {
    @Get(':id')
    getById(@CastParam() id: GetByIdParams) {
        return { id };
    }
}



describe('CastModule', () => {
    it('should compile successfully', async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                CastModule.forFeature({})
            ],
            controllers: [ExampleEntityController],
        }).compile();

        expect(moduleRef).toBeDefined();
    });


    it('should throw an error on compiling', async () => {

        expect(async () => {
            const moduleRef = await Test.createTestingModule({
                imports: [],
                controllers: [ExampleEntityController],
            }).compile();

        }).toThrowError
    });

})

//   describe('findAll', () => {
//     it('should return an array of cats', async () => {
//       const result = ['test'];
//       jest.spyOn(catsService, 'findAll').mockImplementation(() => result);

//       expect(await catsController.findAll()).toBe(result);
//     });
//   });
// });
