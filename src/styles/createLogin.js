let createLogin = {
    buttonLogin: {
        style: {
            width: '-webkit-fill-available',
            margin: '16px 0 26px'
        },
        disabled: true
    },
    divLogo: {
        style: {
            backgroundImage: 'url(/images/background-doit.jpg)',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            height: '30vh'
        }
    },
    form: {
        style: {
            padding: '56px 26px 0',
            textAlign: 'center'
        }
    },
    formControl: {
        style: {
            margin: '0 0 16px'
        }
    },
    inputLoginPassword: {
        error: false
    },
    inputLoginUser: {
        error: false
    },
    tabs: {
        value: 0
    },
    typographyTitle: {
        style: {
            color: 'rgba(255, 255, 255, 0.84)',
            margin: '0 0 26px',
            textAlign: 'center'
        }
    },
    open: false,
    message: "Sin Conexion"
};

export default createLogin;