import React, { Component } from 'react';
import {
  Typography,
  Button,
  Grid,
  TextField,
  Link,
  Card,
  CardContent
} from '@material-ui/core';
import {
  MuiThemeProvider,
  createMuiTheme,
  withStyles
} from '@material-ui/core/styles';
import './App.css';
import { auth as dbAuth } from './base';
import { isEmpty } from 'lodash';

class Authenticate extends Component {
  state = {
    account: '',
    password: '',
    isCreate: false
  };
  toggleRegister = () => {
    this.setState({ isCreate: !this.state.isCreate });
  };

  inputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleRegister = () => {
    const { account, password } = this.state;
    this.props.register(account, password);
  };

  handleLogin = () => {
    const { account, password } = this.state;
    this.props.login(account, password);
  };

  render() {
    const isCreate = this.state.isCreate;
    const classes = this.props.classes;
    return (
      <Card className={classes.auth}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            TRAVEL PLAN
          </Typography>
          <Typography variant="h5" gutterBottom>
            {isCreate ? '註冊' : ''}
          </Typography>
          <form className={classes.from}>
            <TextField
              label="帳號"
              type="text"
              name="account"
              fullWidth
              onChange={this.inputChange}
              margin="normal"
            />
            <br />
            <TextField
              label="密碼"
              type="password"
              name="password"
              fullWidth
              onChange={this.inputChange}
              margin="normal"
            />
          </form>
          {isCreate ? (
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              onClick={this.handleRegister}
            >
              註冊
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              onClick={this.handleLogin}
            >
              登入
            </Button>
          )}

          <div className={classes.hrContainer}>
            <div className={classes.hr} />
            <Typography className={classes.hrWord}>or</Typography>
            <div className={classes.hr} />
          </div>

          <Button
            variant="contained"
            size="large"
            className={classes.facebook}
            onClick={() => this.props.loginSocial('Facebook')}
          >
            Facebook 登入
          </Button>

          <br />
          <br />
          <br />
          <Link
            component="button"
            variant="body2"
            onClick={this.toggleRegister}
          >
            {isCreate ? '已有帳號? 登入' : '第一次使用? 註冊去'}
          </Link>
        </CardContent>
      </Card>
    );
  }
}

class MainPage extends Component {
  render() {
    return (
      <div>
        Hi, {this.props.name} <br />
        登入成功!! <br />
        <Button variant="contained" color="primary" onClick={this.props.logout}>
          登出
        </Button>
      </div>
    );
  }
}

class App extends Component {
  state = {
    uid: null,
    name: null
  };

  componentDidMount() {
    dbAuth.getAuth(this.authHandler);
  }

  authHandler = authData => {
    const { uid, displayName, email } = authData.user;
    const name = displayName || email;
    const nextState = { uid, name };

    this.setState(state => ({ ...state, ...nextState }));
  };

  register = (account, password) => {
    dbAuth.createUserByEmail(account, password);
  };

  login = (account, password) => {
    dbAuth.login(account, password, dbAuth.getAuth(this.authHandler));
  };

  loginSocial = provider => {
    dbAuth.loginSocial(provider, dbAuth.getAuth(this.authHandler));
  };

  logout = async () => {
    await dbAuth.signOut();
    this.setState({ uid: null, name: null });
  };

  render() {
    const isAuth = isEmpty(this.state.uid);
    const classes = this.props.classes;
    return (
      <MuiThemeProvider theme={Theme}>
        <div className={classes.container}>
          <Grid item xs={12} sm={8} className={classes.grid}>
            {isAuth ? (
              <Authenticate
                classes={classes}
                register={this.register}
                login={this.login}
                loginSocial={this.loginSocial}
              />
            ) : (
              <MainPage logout={this.logout} name={this.state.name} />
            )}
          </Grid>
        </div>
      </MuiThemeProvider>
    );
  }
}

const Theme = createMuiTheme({
  typography: {
    fontFamily:
      '"微軟正黑體", "Microsoft JhengHei", "Segoe UI Semibold", "Segoe UI", sans-serif'
  }
});

const styles = theme => ({
  container: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      background: '#fcfcfc'
    }
  },
  grid: {
    maxWidth: '30rem'
  },
  auth: {
    padding: '2rem 3.5rem',
    [theme.breakpoints.down('xs')]: {
      boxShadow: 'none'
    }
  },
  from: {
    marginBottom: '3rem'
  },
  hrContainer: {
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4,
    display: 'flex',
    alignItems: 'center'
  },
  hrWord: {
    color: '#bcbcbc',
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  },
  hr: {
    flexGrow: 1,
    height: 1,
    backgroundColor: '#ccc'
  },
  facebook: {
    background: 'linear-gradient(45deg, #3C5A99 30%, #3C5A99 90%)',
    color: 'white'
  }
});

export default withStyles(styles, { withTheme: true })(App);
