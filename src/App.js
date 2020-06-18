import React, {useState} from 'react';
import {Grid, Button, TextField, Snackbar} from "@material-ui/core";
import './App.css';
import { validateEmail } from './utils'

function App() {
    const [email, setEmail] = useState(null);
    const [username, setUsername] = useState(null);
    const [usernameError, setUsernameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [dataSaved, setDataSaved] = useState(false);

    const saveData = () => {
        const emailValid = validate(email, 'email');
        const usernameValid = validate(username, 'username');
        if (emailValid && usernameValid) {
            const url = 'https://5ede19ffe36dd000166c7f2a.mockapi.io/v1/user';
            const data = {email, username};
            fetch(url, {method: 'POST', body: data}).then(r => {
                if (r.ok) {
                    setDataSaved(true)
                }
            }).catch(e => console.warn(e))
        }
    };

    const validate = (value, key) => {
        switch (key) {
            case 'email':
                const res = !validateEmail(value);
                setEmailError(res);
                return !res;
            case 'username':
                setUsernameError(!value);
                return !!value;
        }
    };

    return (
        <Grid className="App"
              container
              direction="column"
              justify="center"
              alignItems="center">
            <Grid item container direction="column"
                  justify="space-between"
                  alignItems="center" xs={3}>
                <Grid>
                    <TextField onChange={(e) => setEmail(e.currentTarget.value)}
                               helperText={emailError && 'Необходимо заполнить поле email'}
                               error={emailError} onBlur={() => validate(email, 'email')}
                               label={'Email'} margin="normal" fullWidth/>
                    <TextField onChange={(e) => setUsername(e.currentTarget.value)}
                               helperText={usernameError && 'Необходимо заполнить поле username'}
                               error={usernameError} onBlur={() => validate(username, 'username')}
                               label={'Username'} margin="normal" fullWidth/>
                </Grid>
                <Grid>
                    <Button onClick={saveData} variant="contained" color="primary">Сохранить</Button>
                </Grid>
            </Grid>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={dataSaved}
                autoHideDuration={3000}
                onClose={() => setDataSaved(false)}
                message="Сохранено"
            />
        </Grid>
    );
}

export default App;
