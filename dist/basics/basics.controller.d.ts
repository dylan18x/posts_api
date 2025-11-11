import { BasicsService } from './basics.service';
export declare class BasicsController {
    private readonly basicsService;
    constructor(basicsService: BasicsService);
    getMyFirstGet(): object;
    getConParametros(parametro: string): object;
    create(bodyPost: object): object;
    update(id: string, bodyPost: object): object;
    delete(id: string): object;
}
