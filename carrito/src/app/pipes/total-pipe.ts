import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from '../models/producto.model';

@Pipe({
  name: 'total',
  standalone: true
})
export class TotalPipe implements PipeTransform {
  transform(productos: Producto[]): number {
    //Reduce hace una sumatoria total de los subtotales, usando acumulador como el resultado de la operacion anterior y producto como el elemento actual mientras se recorre el arreglo.
    return productos.reduce((acumulador, producto) => acumulador + producto.cantidad * producto.precio, 0);
  }
}
