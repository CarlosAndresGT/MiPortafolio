**Descripción**



La aplicación funciona como un panel interactivo. Al cargar la página, se muestra un fondo estelar animado y una lista de planetas disponibles. Cada planeta aparece en una tarjeta que muestra su nombre e imagen.

Cuando el usuario selecciona un planeta, se despliega un modal con información más detallada y se activa una sección con datos adicionales. Todo esto se maneja mediante comunicación entre componentes, manteniendo el diseño separado y modular.



**Arquitectura de componentes**



La aplicación está construida con Web Components, aprovechando Shadow DOM para encapsular estilos y estructura. Cada parte de la interfaz está representada por un componente diferente:



FondoEstelar

Genera la animación del fondo estrellado que se mantiene activo durante toda la navegación.



ListaPlanetas

Muestra todos los planetas en orden y administra la interacción para seleccionar uno.



TarjetaPlaneta

Presenta individualmente cada planeta en una tarjeta con su imagen y un botón para ver más detalles.



ModalInfo

Al seleccionar un planeta, muestra una ventana con la información principal del mismo.



PanelControles

Incluye controles adicionales relacionados con la aplicación (opciones o configuraciones visuales).



MasInfo

Agrega información complementaria del planeta seleccionado.



AplicacionEspacial

Conecta a todos los componentes anteriores y coordina la comunicación entre ellos.



El archivo index.html solo se encarga de cargar los módulos y mostrar el componente principal.



**Diagrama de comunicación entre componentes**



El funcionamiento general se basa en eventos que viajan entre los componentes.

El flujo es el siguiente:



* ListaPlanetas genera las tarjetas.
* TarjetaPlaneta envía un aviso cuando el usuario selecciona un planeta.
* AplicacionEspacial recibe esta información y actualiza los componentes que dependen de ese dato.
* ModalInfo y MasInfo muestran la información detallada del planeta seleccionado.
* PanelControles puede influir en ciertas funciones visuales o de interacción.
* FondoEstelar funciona de manera independiente, pero puede reaccionar si algún control lo requiere.

De esta manera, cada módulo tiene una función clara y evita mezclarse con los otros.



**Integrantes y roles**



Milton Cueva: FondoEstelar y ListaPlanetas



Keila Galeano: TarjetaPlaneta y descripción general



Andres Guanoluisa: ModalInfo y PanelControles



Alejandra Rosero: Index y AplicacionEspacial



**Instrucciones para ejecutar**



1.Descargar o clonar el repositorio.

2.Mantener la estructura original de carpetas:

index.html  

src/componentes/\*.js

3.Abrir el archivo index.html en un navegador moderno.

4.No requiere instalación adicional ni servidor para funcionar.



