import { print_a_title } from "../../utils/printInterface.js";

const routerFunction = (location) => {

    console.log(location);

    const [ , method ] = location.split('_');

        switch (method) {
        case 'home':
            print_a_title(method);
            break;
        case 'search':
            print_a_title(method);
            break;
        case 'filter':
            print_a_title(method);
            break;
        case 'details':
            print_a_title(method);
            break;
    
        default:
            console.log('Error 404 Not Found')
            break;
    }
} 

export {routerFunction};