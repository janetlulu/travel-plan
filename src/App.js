import React, { Component } from "react";
import "./App.css";
// import auth from "./base";
import { auth as dbAuth } from "./base";

class Authenticate extends Component {
  state = {
    account: "",
    password: "",
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
    this.props.register(this.state.account, this.state.password);
  };

  handleLogin = () => {
    this.props.login(this.state.account, this.state.password);
  };

  render() {
    let isCreate = this.state.isCreate;
    return (
      <div>
        {isCreate ? "註冊" : "登入"}
        <hr />
        <div>
          <label> 帳號 </label>
          <input type="text" name="account" onChange={this.inputChange} />
        </div>
        <div>
          <label> 密碼 </label>
          <input type="password" name="password" onChange={this.inputChange} />
        </div>
        {isCreate ? (
          <button onClick={this.handleRegister}>註冊</button>
        ) : (
          <button onClick={this.handleLogin}>登入</button>
        )}
        <br />
        <button
          className="facebook"
          onClick={() => this.props.loginSocial("Facebook")}
        >
          Facebook 登入
        </button>

        <br />
        <button onClick={this.toggleRegister}>
          {isCreate ? "已有帳號? 登入" : "第一次使用? 註冊去"}
        </button>
      </div>
    );
  }
}

class MainPage extends Component {
  render() {
    return (
      <div>
        Hi, {this.props.name} <br />
        登入成功!! <br />
        <button onClick={this.props.logout}>登出</button>
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

  authHandler = async authData => {
    console.log("authHandler, authData=", authData);
    this.setState({
      uid: authData.user.uid,
      name: authData.user.displayName || authData.user.email
    });
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
    console.log("logout!");
    await dbAuth.signOut();
    this.setState({ uid: null, name: null });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {!this.state.uid ? (
            <Authenticate
              register={this.register}
              login={this.login}
              loginSocial={this.loginSocial}
            />
          ) : (
            <MainPage logout={this.logout} name={this.state.name} />
          )}
        </header>
      </div>
    );
  }
}

export default App;
