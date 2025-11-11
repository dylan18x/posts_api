import { Injectable } from '@nestjs/common';

@Injectable()
export class BasicsService {
   

    getMyFirstGet(): object {
        return {
            service: 'Blog-Backend', 
            controller: '/basics', 
            function: 'Get Example'
        }
    }

    getConParametros(parametro: string): object{
        return{
            service: 'Blog-Bakend', 
            controller: '/basics/:parametro', 
            function: 'Get con Parametros', 
            parametroRecibido: parametro
        }; 
    }
    postFunction(bodyPost: object): object{
        return {
            service: 'Blog-Backend',
            controller: '/basics/:parametro', 
            function: 'Ejemplo de peticion Post', 
            bodyRecibido: bodyPost
        };
    }
     putFunction(bodyPost: object, parametro: string): object {
        return {
            service: 'Blog-Backend',
            controller: '/basics tipo put',
            function: 'Ejemplo de Peticion Put',
            body: bodyPost,
            parametro: parametro
        };            
    }

    deleteFunction(parametro: string): object {
        return {
            service: 'Blog-Backend',
            controller: '/basics tipo delete',
            function: 'Ejemplo de Peticion Delete',
            parametro: parametro
        };            
    }

}
