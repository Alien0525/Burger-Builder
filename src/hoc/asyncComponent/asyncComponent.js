import React, {Component} from 'react';

const asyncComponent = (importComponent) => {
    return class extends Component {
        state = {
            component : null
        };

        componentDidMount() {
            // import component should be function refererce.
            // it returns promise
            importComponent().then(cpm => {
                // it has default property to load component dynamically (cpm.default)
                this.setState({component:cpm.default});
            });
        }
        render () {
            // render method renders the component dynamically.
            const C = this.state.component;
            return C ? <C {...this.props} /> : null;

        }
    }
}

export default asyncComponent;