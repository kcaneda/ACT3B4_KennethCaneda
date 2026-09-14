# Documentacion:
`CarritoService` actúa como la única fuente verdadera del estado del carrito, compartida entre `ProductosComponent` y `CarritoComponent` sin que estos se comuniquen directamente entre sí. 

El servicio expone tres operaciones sobre el carrito:

- `agregar(producto)`: añade un producto nuevo con cantidad inicial de 1, o incrementa la cantidad si el producto ya existe en el carrito.
- `cambiarCantidad(id, cantidad)`: actualiza la cantidad de un producto específico, validando que nunca sea menor a 1.
- `eliminar(id)`: remueve un producto del carrito por su `id`.

En las tres operaciones se aplica inmutabilidad: en lugar de modificar el arreglo existente directamente, se construye un arreglo nuevo (usando el operador spread `...` y `.map()`/`.filter()`). Esto es clave para que Angular detecte los cambios de forma reactiva y para que el patrón Observable reaccione correctamente.

## Uso de Observables

El estado del carrito se maneja con un `BehaviorSubject<Producto[]>`

```typescript
private carritoSubject = new BehaviorSubject<Producto[]>([]);
carrito$ = this.carritoSubject.asObservable();
```

Se eligió `BehaviorSubject` sobre un `Subject` porque mantiene y emite el último valor conocido a cualquier nuevo suscriptor — esto es importante porque `CarritoComponent` necesita recibir inmediatamente el estado actual del carrito, no solo los cambios futuros.

Cada vez que se llama a `agregar()`, `cambiarCantidad()` o `eliminar()`, el servicio emite un nuevo arreglo con `carritoSubject.next(...)`. `CarritoComponent` se suscribe a `carrito$` mediante el `async` pipe de forma automática en el template:

```html
*ngIf="carrito$ | async; as carrito"
```

## Pipes implementados

- `subtotal`: recibe `precio` y `cantidad`, devuelve `precio * cantidad`. Se aplica por producto.
- `total`: recibe el array de productos del carrito y devuelve la suma de todos los subtotales. Se aplica al carrito completo.

## Ventajas

- Los cálculos viven en la plantilla, lo que mantiene el componente limpio.
- Los pipes son reutilizables y puros (se recalculan solo cuando cambian sus entradas).

## Pruebas:
<img width="1569" height="813" alt="image" src="https://github.com/user-attachments/assets/d40deed0-66f4-4973-87a3-b74d25f669dc" />
<img width="1558" height="809" alt="image" src="https://github.com/user-attachments/assets/17456ef8-3d9a-4dfc-885d-5cce4e762e22" />
<img width="1495" height="802" alt="image" src="https://github.com/user-attachments/assets/208ec431-3e1c-476f-83ba-8429376fbc59" />
<img width="1535" height="803" alt="image" src="https://github.com/user-attachments/assets/f22fa8eb-8dbb-4994-a9ac-da94697f4aaf" />

