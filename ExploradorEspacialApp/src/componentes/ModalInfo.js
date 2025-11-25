class ModalInfo extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this._planeta = null;
    }

    set planeta(valor) {
        this._planeta = valor;
        this.renderizar();
    }

    get planeta() {
        return this._planeta;
    }

    connectedCallback() {
        this.renderizar();
    }

    cerrar() {
        this._planeta = null;
        this.renderizar();

        // Por si el contenedor quiere saber que se cerró
        this.dispatchEvent(
            new CustomEvent("cerrar-modal-info", {
                bubbles: true,
                composed: true,
            })
        );
    }

    renderizar() {
        // Si no hay planeta seleccionado, no mostramos nada
        if (!this._planeta) {
            this.shadowRoot.innerHTML = "";
            return;
        }

        const { nombre, descripcion, color } = this._planeta;

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    position: absolute;
                    right: 20px;
                    top: 80px;
                    width: 320px;
                    background: rgba(0, 0, 0, 0.65);
                    border-radius: 16px;
                    border: 1px solid rgba(255,255,255,0.25);
                    padding: 20px;
                    box-sizing: border-box;
                    color: #fff;
                    font-family: 'Orbitron', sans-serif;
                    backdrop-filter: blur(6px);
                    box-shadow: 0 0 18px rgba(0,0,0,0.6);
                    z-index: 3;
                    animation: aparecer 0.25s ease-out;
                }

                @keyframes aparecer {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .circulo {
                    width: 64px;
                    height: 64px;
                    border-radius: 50%;
                    background: ${color};
                    margin-bottom: 12px;
                }

                h2 {
                    margin: 0;
                    font-size: 1.4rem;
                    letter-spacing: 2px;
                }

                p {
                    margin-top: 10px;
                    margin-bottom: 0;
                    font-size: 0.9rem;
                    line-height: 1.5;
                }

                .acciones {
                    display: flex;
                    gap: 10px;
                    margin-top: 16px;
                }

                button {
                    flex: 1;
                    padding: 8px 10px;
                    background: transparent;
                    border-radius: 10px;
                    border: 1px solid rgba(255,255,255,0.4);
                    color: #fff;
                    cursor: pointer;
                    font-size: 0.85rem;
                    font-family: inherit;
                    transition: background 0.25s, transform 0.1s;
                }

                button:hover {
                    background: rgba(255,255,255,0.18);
                }

                button:active {
                    transform: scale(0.97);
                }
            </style>

            <div class="contenido">
                <div class="circulo"></div>
                <h2>${nombre}</h2>
                <p>${descripcion}</p>

                <div class="acciones">
                    <button id="cerrar">Cerrar</button>
                    <button id="masInfo">Más información</button>
                </div>
            </div>
        `;

        // Botón cerrar
        this.shadowRoot
            .querySelector("#cerrar")
            .addEventListener("click", () => this.cerrar());

        // Botón más información → manda el planeta completo
        this.shadowRoot
            .querySelector("#masInfo")
            .addEventListener("click", () => {
                this.dispatchEvent(
                    new CustomEvent("mostrar-mas-info", {
                        detail: this._planeta,
                        bubbles: true,
                        composed: true,
                    })
                );
            });
    }
}

customElements.define("modal-info", ModalInfo);
