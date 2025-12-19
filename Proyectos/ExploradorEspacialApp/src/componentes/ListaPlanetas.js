
class ListaPlanetas extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.planetas = [
            { 
                nombre: "Mercurio", 
                color: "#b1b1b1", 
                descripcion: "El planeta más cercano al Sol." ,
                masinfo: "Mercurio es un mundo extremo donde las temperaturas cambian más que en cualquier otro planeta del Sistema Solar. Tiene un enorme núcleo metálico que ocupa la mayor parte de su volumen y una superficie llena de cráteres debido a que casi no tiene atmósfera que lo proteja. Sus días duran más que sus años, lo que genera ciclos térmicos realmente brutales.",
                imagen: "src/img/mercurio.png"                
            },
            { 
                nombre: "Venus", 
                color: "#e0b36c", 
                descripcion: "El planeta más caliente del sistema solar.",
                masinfo: "Venus es el planeta más caliente del Sistema Solar debido al efecto invernadero descontrolado en su atmósfera. Sus nubes espesas de ácido sulfúrico cubren toda la superficie y su presión atmosférica aplastaría cualquier nave que intente aterrizar. Aun así, es tan brillante que es visible incluso de día desde la Tierra.",
                imagen: "src/img/venus.png" 
            },
            { 
                nombre: "Tierra", 
                color: "#4da6ff", 
                descripcion: "Nuestro hogar azul.",
                masinfo: "La Tierra es el único mundo conocido que alberga vida. Su atmósfera rica en oxígeno, su abundante agua líquida y su clima moderado la convierten en un oasis cósmico. La presencia de la Luna estabiliza el eje terrestre, permitiendo estaciones regulares y un clima estable.",
                imagen: "src/img/tierra.png" 
            },
            { 
                nombre: "Marte", 
                color: "#c1440e", 
                descripcion: "El planeta rojo y posible futuro hogar humano.",
                masinfo: "Marte es un mundo desértico, frío y polvoriento, pero alguna vez tuvo ríos, lagos e incluso océanos. Hoy, gigantescos cañones y volcanes extintos muestran un pasado geológicamente activo. Sus lunas irregulares parecen asteroides capturados y podrían haberse formado durante colisiones antiguas.",
                imagen: "src/img/marte.png" 
            },
            { 
                nombre: "Júpiter", 
                color: "#d1a177", 
                descripcion: "El planeta más grande del sistema solar.",
                masinfo: "AJúpiter es el planeta más grande del Sistema Solar y su atmósfera turbulenta está dominada por tormentas gigantes. Su Gran Mancha Roja es una megatormenta más grande que la Tierra. Alberga muchas lunas fascinantes, como Europa, que podría tener un océano subglacial con posibilidades de vida.",
                imagen: "src/img/jupiter.png" 
            },
            { 
                nombre: "Saturno", 
                color: "#d8c27a", 
                descripcion: "Famoso por sus anillos espectaculares.",
                masinfo: "Saturno es conocido por sus impresionantes anillos, formados por miles de millones de fragmentos de hielo. Su luna Titán es uno de los mundos más interesantes del Sistema Solar, con lagos de metano líquido y una atmósfera densa que podría albergar química orgánica compleja.",
                imagen: "src/img/saturno.png"  
            },
            { 
                nombre: "Urano", 
                color: "#7fd1d1", 
                descripcion: "Un gigante helado con rotación extrema.",
                masinfo: "AUrano es uno de los planetas más misteriosos del Sistema Solar. Su rotación está tan inclinada que parece rodar en su órbita. Esto provoca estaciones que duran más de 20 años. Su atmósfera de metano le da un tono azul suave y oculta un interior aún poco comprendido.",
                imagen: "src/img/urano.png" 
            },
            { 
                nombre: "Neptuno", 
                color: "#4570e6", 
                descripcion: "El planeta más ventoso y distante.",
                masinfo: "Neptuno es un mundo distante y violento, con los vientos más rápidos de todo el Sistema Solar. Su atmósfera azul profundo está marcada por tormentas gigantes que aparecen y desaparecen misteriosamente. A pesar de estar tan lejos del Sol, sigue siendo muy dinámico científicamente.",
                imagen: "src/img/neptuno.png" 
            }
        ];
    }

    connectedCallback() {
        this.renderizar();
    }

    emitirSeleccion(planeta) {
        this.dispatchEvent(new CustomEvent("planeta-seleccionado", {
            detail: planeta,
            bubbles: true,
            composed: true
        }));
    }

    renderizar() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 30%;
                    min-width: 250px;
                    height: 100%;
                    overflow-y: auto;
                    background: rgba(0, 0, 0, 0.3);
                    backdrop-filter: blur(4px);
                    padding: 20px;
                    border-right: 1px solid rgba(255, 255, 255, 0.1);
                }

                h2 {
                    text-align: center;
                    margin: 0 0 20px;
                    font-size: 1.5rem;
                    letter-spacing: 2px;
                }

                .planeta {
                    display: flex;
                    align-items: center;
                    background: rgba(255, 255, 255, 0.05);
                    padding: 12px;
                    margin-bottom: 12px;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: transform 0.2s, background 0.3s;
                }

                .planeta:hover {
                    background: rgba(255, 255, 255, 0.15);
                    transform: scale(1.03);
                }

                .circulo {
                    width: 28px;
                    height: 28px;
                    border-radius: 50%;
                    margin-right: 12px;
                }

                .nombre {
                    font-size: 1.1rem;
                    font-weight: bold;
                }
            </style>

            <h2>Planetas</h2>
            <div id="lista">
                ${this.planetas.map(p => `
                    <div class="planeta" data-nombre="${p.nombre}">
                        <div class="circulo" style="background:${p.color}"></div>
                        <div class="nombre">${p.nombre}</div>
                    </div>
                `).join('')}
            </div>
        `;

        // Asignar eventos
        this.shadowRoot.querySelectorAll('.planeta').forEach(elem => {
            elem.addEventListener('click', () => {
                const nombre = elem.getAttribute('data-nombre');
                const planeta = this.planetas.find(p => p.nombre === nombre);
                this.emitirSeleccion(planeta);
            });
        });
    }
}

customElements.define("lista-planetas", ListaPlanetas);