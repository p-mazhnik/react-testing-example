/*
 * Copyright (c) p-mazhnik 09/10/2020.
 * https://github.com/p-mazhnik
 *
 * Based on Material-UI Sign In sample.
 */

import React, {FormEvent, useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useInput} from "../../utils/hooks";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/p-mazhnik">
        p-mazhnik
      </Link>
      {` ${new Date().getFullYear()}.`}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export interface ILoginFormProps {
  onLogin: (email: string, password: string, rememberMe?: boolean) => void;
  includeSignUp?: boolean;
  includePasswordRecovery?: boolean;
  error?: string,
}

const LoginForm: React.FC<ILoginFormProps> = (
  {onLogin, error, includeSignUp, includePasswordRecovery}
  ) => {
  const classes = useStyles();
  const [email, , emailBind] = useInput('');
  const [password, , passwordBind] = useInput('');
  const [rememberMe, setRemember] = useState(false);
  // handle errors
  const [_error, setError] = useState(error || '');
  useEffect(() => {
    if (error) {
      setError(error);
    }
  }, [error])

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    if (!email || !password) {
      setError('email and password are required');

      return;
    }
    setError('');
    onLogin(email, password, rememberMe);
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            {...emailBind}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...passwordBind}
          />
          <FormControlLabel
            control={
              <Checkbox value="remember" color="primary" checked={rememberMe}
                        onChange={(e) => setRemember(e.target.checked)}/>
            }
            label="Remember me"
          />
          <Typography variant="body2" color='error'>
            {_error}
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            {includePasswordRecovery &&
            <Grid item xs>
                <Link href="#" variant="body2">
                    Forgot password?
                </Link>
            </Grid>
            }
            {includeSignUp &&
            <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
            </Grid>
            }
          </Grid>
        </form>
      </div>
      <Box mt={includeSignUp || includePasswordRecovery ? 3 : 1}>
        <Copyright/>
      </Box>
    </Container>
  );
}

export default LoginForm;

