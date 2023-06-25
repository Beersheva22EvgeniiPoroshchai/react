import navConfig from '../../config/nav-config.json'

    export function getMenuItem(currentUser:string):string[][]{
        let items = navConfig.authorized
        if(currentUser.substring(0,5) === 'admin'){
            items = navConfig.admin
        } else if (currentUser === 'unauthorized') {
            items = navConfig.unauthorized
        }
        return items
    }