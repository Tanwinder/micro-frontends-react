export class Application {
    root = null;
    title = 'Web Components';
    container = null;
    errorMode = false;
    loadedApp = null;

    bootstrap(root) {
        this.root = root;

        // this.root.innerHTML = `
        // <app-header></app-header>
        //     <div class="row app-container">
        //         <div class="col-sm-2">
        //             <div>
        //                 <button class="btn btn-default" data-app="angular-app">Load Angular App</button>
        //                 <button class="btn btn-default" data-app="react-app1">React App-1</button>
        //                 <button class="btn btn-default" data-app="react-app2">React App-2</button>
        //             </div>
        //         </div>
        //         <div class="col-sm-10">
        //             <div class="jumbotron" id="main"></div>
        //         </div>
        //     </div>
        // <app-footer></app-footer> 
        //     `;


        this.root.innerHTML = `
        <app-header></app-header>
            <div class="row app-container">
                <div class="col-sm app-sidebar">
                    <button class="btn btn-default" data-app="react-app1">React App-1</button>
                    <button class="btn btn-default" data-app="react-app2">React App-2</button>
                    <button class="btn btn-default" data-app="both">Both</button>
                </div>
                <div class="col-sm app-content">
                    <div id="main">
                        <div class="both">
                            <react-app1></react-app1>
                            <react-app2></react-app2>
                        </div>
                    </div>
                </div>
            </div>
        <app-footer></app-footer> 
            `;

        this.container = this.root.querySelector('#main');
        this.root.addEventListener('keyup', this.handleInputChange);
        this.root.addEventListener('change', this.handleInputChange);
        this.root.addEventListener('click', this.handleButtonClick);
    }

    handleInputChange = (event) => {
        if (event.target.id === 'title') {
            this.title = event.target.value;
            this.updateLoadedApp();
            return;
        }

        if (event.target.name !== 'errorMode') {
            return false;
        }

        this.errorMode = event.target.value === '1';
        console.log('uploaded appppp')
        this.updateLoadedApp();
    };

    handleButtonClick = (event) => {
        if (event.target.nodeName !== 'BUTTON') {
            return;
        } 
        this.loadApp(event.target.dataset.app);
    };

    updateLoadedApp() {
        if (this.loadedApp) {
            this.loadedApp.setAttribute('title', this.title);

            if (this.errorMode) {
                this.loadedApp.setAttribute('error-mode', '');
            } else {
                this.loadedApp.removeAttribute('error-mode');
            }
        }
    }

    loadApp(myApp) {
        this.container.innerHTML = '';
        let app;

        if(myApp == "both") {
            this.loadedApp = document.createElement("div");
            let childone = document.createElement("react-app1");
            let childtwo = document.createElement("react-app2");

            this.loadedApp.setAttribute('class', "both");

            this.loadedApp.appendChild(childone);
            this.loadedApp.appendChild(childtwo);

            this.loadedApp.addEventListener('load', (load) => {
                console.log('loaded', load);
            });
    
            this.container.appendChild(this.loadedApp);
            
        } else {
            app = myApp;
            this.loadedApp = document.createElement(app);

            if (this.errorMode) {
                this.loadedApp.setAttribute('error-mode', '');
            }

            this.loadedApp.setAttribute('title', this.title);

            this.loadedApp.addEventListener('load', (load) => {
                console.log('loaded', load);
            });

            this.loadedApp.addEventListener('error', (err) => {
                console.error('error', err);

                this.loadedApp.parentNode.removeChild(this.loadedApp);
                this.loadedApp = null;
                this.container.appendChild(this.getError(err.detail));
            });

            this.container.appendChild(this.loadedApp);
        }
    }

    getError(err) {
        const message = document.createElement('p');
        message.innerHTML = err.stack.split('\n').join('<br/>');
        return message;
    }
}

export function render(Component, element) {
    const component = new Component();
    component.bootstrap(element);
}
