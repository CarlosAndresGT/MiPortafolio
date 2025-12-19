class AplicacionEspacial extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        // Estado inicial
        this.estado = {
            planetaSeleccionado: null,
            modoOscuro: false,
            mostrarMasInfo: false,
            planetaMasInfo: null
        };
    }

    connectedCallback() {
        this.renderizar();
        this.configurarEventos();
    }

    configurarEventos() {

        this.shadowRoot.addEventListener("planeta-seleccionado", (e) => {
            const planeta = e.detail;


            this.estado.planetaSeleccionado = planeta;
            if (this.estado.mostrarMasInfo) {
                this.estado.planetaMasInfo = planeta;
            }

            this.renderizar();
        });

        this.shadowRoot.addEventListener("toggle-modo-oscuro", () => {
            this.estado.modoOscuro = !this.estado.modoOscuro;
            this.renderizar();
        });

        this.shadowRoot.addEventListener("mostrar-mas-info", (e) => {
            const planeta = e.detail;
            this.estado.mostrarMasInfo = true;
            this.estado.planetaMasInfo = planeta;
            this.renderizar();
        });


        this.shadowRoot.addEventListener("cerrar-mas-info", () => {
            this.estado.mostrarMasInfo = false;
            this.estado.planetaMasInfo = null;
            this.renderizar();
        });


        this.shadowRoot.addEventListener("cerrar-modal-info", () => {
            this.estado.planetaSeleccionado = null;
            this.renderizar();
        });
    }

    // para guardar el estado antes de poner modo oscuro
    actualizarModal() {
        const modal = this.shadowRoot.querySelector("modal-info");
        if (modal) {
            modal.planeta = this.estado.planetaSeleccionado;
        }
    }

    // Para guardar el estado antes de poner modo oscuro
    actualizarMasInfo() {
        const masInfo = this.shadowRoot.querySelector("mas-info");
        if (!masInfo) return;

        if (this.estado.mostrarMasInfo && this.estado.planetaMasInfo) {
            masInfo.infoplaneta = this.estado.planetaMasInfo;
        } else {
            masInfo.infoplaneta = null;
        }
    }

    renderizar() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                    height: 100vh;
                    overflow: hidden;
                    background: ${this.estado.modoOscuro ? "#000" : "#2b3c74ff"}; 
                    color: white;
                    transition: background 0.3s ease;
                    font-family: 'Orbitron', sans-serif;
                }

                .contenedor {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    position: relative;
                }

                .contenido {
                    display: flex;
                    flex: 1;
                    overflow: hidden;
                    position: relative;
                }

                .zona-main {
                    flex: 1;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1;
                }

                .placeholder {
                    opacity: 0.6;
                    font-size: 1rem;
                    text-align: center;
                    padding: 10px;
                }

                .placeholder.oculto {
                    display: none;
                }

                lista-planetas {
                    z-index: 1;
                }

                modal-info {
                    z-index: 2;
                }

                mas-info {
                    z-index: 5;
                }

                fondo-estelar {
                    position: absolute;
                    inset: 0;
                    z-index: 0; 
                }
            </style>

            <div class="contenedor">
                <fondo-estelar></fondo-estelar>

                <panel-controles modoOscuro="${this.estado.modoOscuro}"></panel-controles>

                <div class="contenido">
                    <lista-planetas></lista-planetas>
                    <div class="zona-main">
                        <div class="placeholder ${(this.estado.planetaSeleccionado || this.estado.mostrarMasInfo) ? 'oculto' : ''}">
                            Selecciona un planeta para ver su información
                        </div>
                        <mas-info></mas-info>
                    </div>

                    <modal-info></modal-info>
                </div>
            </div>
        `;

        //para que no se borre cuando ponemos el modo oscuro
        this.actualizarModal();
        this.actualizarMasInfo();
    }
}

customElements.define("aplicacion-espacial", AplicacionEspacial);
