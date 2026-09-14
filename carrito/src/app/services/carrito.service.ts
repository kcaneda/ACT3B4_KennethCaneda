import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from '../models/producto.model';

@Injectable({ providedIn: 'root' })
export class CarritoService {
    private carritoSubject = new BehaviorSubject<Producto[]>([]);
    carrito$ = this.carritoSubject.asObservable();

    agregar(producto: Producto): void {
        const listaActual = this.carritoSubject.value;
        const existente = listaActual.find(p => p.id === producto.id);

        if (existente) {
            //Si el producto ya existe dentro del carrito, solo aumentamos su cantidad
            existente.cantidad++;
            //Aplicamos la inmutabilidad utilizando el operador spread (...)
            //para que angular detecte los cambios en las listas correctamente.
            this.carritoSubject.next([...listaActual]);
        } else {
            //Si el producto no existia dentro del carrito, lo agregamos copiando
            //su misma estructura pero cambiando la cantidad a 1 por defecto.
            this.carritoSubject.next([...listaActual, { ...producto, cantidad: 1 }])
        }
    }

    cambiarCantidad(id: number, cantidad: number): void {
        //Usamos 2 operadores ternarios, el primero identifica el elemento que vamos a modificar comparando su id con el id ingresado y deja los otros intactos
        // El segundo operador verifica que la cantidad sea mayor a 0, si lo es, guarda la cantidad, y si no, cambia el valor a 1 por defecto.
        const listaActual = this.carritoSubject.value.map(p =>
            p.id === id ? { ...p, cantidad: cantidad < 1 ? 1 : cantidad } : p
        );
        this.carritoSubject.next(listaActual);
    }

    eliminar(id: number): void {
        //Guarda en el arreglo un nuevo arreglo en el que se encuentran todos los elementos que NO coinciden con el id ingresado, excluyendolo.
        const listaActual = this.carritoSubject.value.filter(p => p.id !== id);
        this.carritoSubject.next(listaActual);
    }
}
