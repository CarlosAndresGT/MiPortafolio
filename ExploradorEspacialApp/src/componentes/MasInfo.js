class MasInfo extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        this._infoplaneta = null;
    }

    set infoplaneta(valor){
        this._infoplaneta = valor;
        this.renderizar();
    }

    get infoplaneta(){
        return this._infoplaneta;
    }

    connectedCallback(){
        this.renderizar();
    }
    // para el boton de cerrar 
    cerrar(){
        this._infoplaneta = null;
        this.dispatchEvent(new CustomEvent("cerrar-mas-info", {
            bubbles: true,
            composed: true
        }));
        this.renderizar();
    }
    // si no hay planeta no aparece
    renderizar(){
        if (!this._infoplaneta) {
            this.shadowRoot.innerHTML = "";
            return;
        }
        //  solo necesitamos el nombre la imagen y la informacion de la lista de planetas
        const { nombre, imagen, masinfo } = this._infoplaneta;

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    position: absolute;
                    top: 50%;
                    left: 30%;     
                    transform: translate(-50%, -50%);
                    
                    width: min(420px, 45vw);
                    height: min(70vh, 520px);
                    box-sizing: border-box;

                    background: rgba(0, 0, 0, 0.85);
                    border-radius: 16px;
                    border: 2px solid rgba(255,255,255,0.35);
                    padding: 24px;
                    z-index: 10; 
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                    box-shadow: 0 0 30px rgba(0,0,0,0.8);
                    font-family: 'Orbitron', sans-serif;
                }

                .cabecera {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                }

                .imagen-planeta {
                    width: 110px;
                    height: 110px;
                    border-radius: 50%;
                    overflow: hidden;
                    flex-shrink: 0;
                    border: 3px solid rgba(255,255,255,0.6);
                }

                .imagen-planeta img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                h2 {
                    margin: 0;
                    font-size: 1.8rem;
                    letter-spacing: 2px;
                }

                .contenido {
                    flex: 1;
                    border-radius: 12px;
                    border: 1px solid rgba(255,255,255,0.2);
                    padding: 16px;
                    overflow-y: auto;
                    font-size: 0.95rem;
                    line-height: 1.6;
                }

                .acciones {
                    display: flex;
                    justify-content: flex-end;
                    margin-top: 4px;
                }

                button {
                    padding: 8px 14px;
                    border-radius: 10px;
                    border: 1px solid rgba(255,255,255,0.4);
                    background: transparent;
                    color: white;
                    cursor: pointer;
                    transition: 0.3s;
                    font-family: inherit;
                    font-size: 0.9rem;
                }

                button:hover {
                    background: rgba(255,255,255,0.2);
                }
            </style>

            <div class="cabecera">
                <div class="imagen-planeta">
                    <img src="${imagen}" alt="${nombre}">
                </div>
                <h2>${nombre}</h2>
            </div>

            <div class="contenido">
                <p>${masinfo}</p>
            </div>

            <div class="acciones">
                <button id="btnCerrar">Cerrar</button>
            </div>
        `;


        this.shadowRoot.querySelector("#btnCerrar")
            .addEventListener("click", () => this.cerrar());
    }
}

customElements.define("mas-info", MasInfo);
