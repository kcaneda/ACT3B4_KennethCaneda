import { Component, signal } from '@angular/core';
import { ProductosComponent } from './components/productos/productos.component';
import { CarritoComponent } from './components/carrito/carrito.component';

@Component({
  selector: 'app-root',
  imports: [ProductosComponent, CarritoComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('carrito');
}
