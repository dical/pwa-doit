let createRegistry = {
    root: {
        style: {
            margin: ' 56px 16px 0',
            flexGrow: 1
        }
    },
    bar : {
        style: {
            minHeight: 56
        }
    },
    paperHeader: {
        style: {
            display: 'flex',
            alignItems: 'center',
            height: 50,
            paddingLeft: 16,
            marginBottom: 16
        }
    },
    mobileStepper : {
        style: {
            position: 'fixed',
            bottom: 0,
            width: '100%',
            padding: 0,
            left: 0
        },
        activeStep: 0
    },
    flex: {
        style: {
            flex: 1,
            fontWeight: 500,
            paddingTop: 5  
        }
    },
    iconButton: {
        style: {
            margin:'0 16px 0 -9px'
        }
    },
    inputEmail: {
        error: false
    },
    inputName: {
        error: false
    },
    inputSurname: {
        error: false
    },
    inputPhone: {
        error: false
    },
    inputUser: {
        error: false
    },
    inputPassword: {
        error: false
    },
    inputPasswordRepeat: {
        error: false
    },
    form: {
        style:{
            margin: '0 16px'
        }
    },
    formControl: {
        style: {
            width: '100%',
            marginBottom: '16px'
        }
    },
    textField: {
        style: {
            width: '45%',
            marginBottom: '16px'
        }
    },
    progress: {
        style: {
            position: 'fixed',
            width: '100%',
            top: 0,
            left: 0,
            visibility: 'hidden'
        }
    }
};

export default createRegistry;
