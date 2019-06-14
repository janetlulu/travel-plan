import React, { Component } from 'react';
import { connect } from 'react-redux';
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
import { isEmpty } from 'lodash';
import {
  userGetAuth,
  userCreateByEmail,
  userLogin,
  userLoginSocial,
  userSignOut
} from './userAction';

const SubmitButton = props => {
  const { isCreate, handleRegister, handleLogin } = props;
  const text = isCreate ? '註冊' : '登入';
  const action = isCreate ? handleRegister : handleLogin;
  return (
    <Button
      variant="contained"
      color="primary"
      size="large"
      fullWidth
      onClick={action}
    >
      {text}
    </Button>
  );
};

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
            <TextField
              label="密碼"
              type="password"
              name="password"
              fullWidth
              onChange={this.inputChange}
              margin="normal"
            />
          </form>
          <SubmitButton
            isCreate={isCreate}
            handleRegister={this.handleRegister}
            handleLogin={this.handleLogin}
          />

          <div className={classes.hrContainer}>
            <div className={classes.hr} />
            <Typography className={classes.hrWord}>or</Typography>
            <div className={classes.hr} />
          </div>

          <Button
            variant="contained"
            size="large"
            fullWidth
            className={classes.facebook}
            onClick={() => this.props.loginSocial('Facebook')}
          >
            Facebook 登入
          </Button>

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
        <p>Hi, {this.props.name}</p>
        <p>登入成功!!</p>
        <Button variant="contained" color="primary" onClick={this.props.logout}>
          登出
        </Button>
      </div>
    );
  }
}
class App extends Component {
  async componentDidMount() {
    await this.props.userGetAuth();
  }

  register = async (account, password) => {
    await this.props.userCreateByEmail(account, password);
  };

  login = (account, password) => {
    this.props.userLogin(account, password);
  };

  loginSocial = async provider => {
    await this.props.userLoginSocial(provider);
  };

  logout = async () => {
    await this.props.userSignOut();
  };

  render() {
    const isAuth = isEmpty(this.props.user.uid);
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

const mapStateToProps = state => ({
  user: state.user
});

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
    color: 'white',
    marginBottom: '1rem'
  }
});

export default connect(
  mapStateToProps,
  {
    userGetAuth,
    userCreateByEmail,
    userLogin,
    userLoginSocial,
    userSignOut
  }
)(withStyles(styles, { withTheme: true })(App));
