import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SubtotalPipe } from '../../pipes/subtotal-pipe';
import { TotalPipe } from '../../pipes/total-pipe';
import { Producto } from '../../models/producto.model';
import { CarritoService } from '../../services/carrito.service';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  imports: [CommonModule, FormsModule, SubtotalPipe, TotalPipe],
  standalone:true,
  selector: 'app-carrito',
  styleUrl: './carrito.component.css',
  templateUrl: './carrito.component.html',
})
export class CarritoComponent {
  carrito$:Observable<Producto[]>;

  constructor(private carritoService:CarritoService){
    this.carrito$ = this.carritoService.carrito$;
  }

  cambiarCantidad(id:number, cantidad:number):void {
    this.carritoService.cambiarCantidad(id, cantidad);
  }

  eliminar(id:number):void{
    this.carritoService.eliminar(id);
  }
}
