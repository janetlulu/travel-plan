import React, { Component } from 'react';
import './App.css';


class LoginPage extends Component {
  idRef = React.createRef();
  pwdRef = React.createRef();

  onSubmit = (e) => {
    e.preventDefault();
    const id = this.idRef.current.value;
    const pwd = this.pwdRef.current.value;
    if (id === "" || pwd === "") {
      alert("帳號密碼未輸入!");
      return;
    }
    this.props.login({id, pwd});
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div>
          <label> 帳號 </label>
          <input type="text" ref={this.idRef}/>
        </div>
        <div>
          <label> 密碼 </label>
          <input type="password" ref={this.pwdRef}/>
        </div>
        <button>登入</button>

        <br /><br /><br />
        <div>
          測試帳密:
          <p>AAA / AAA123</p>
          <p>BBB / BBB123</p>
          <p>CCC / CCC123</p>
        </div>
      </form>
    );
  }
}

class MainPage extends Component {
  render() {
    return (
      <div>
        登入成功!! <br/>
        <button onClick={this.props.logout}>登出</button>
      </div>
    )
  }
}

class App extends Component {
  state = {
    isLogin: false,
    accounts: [
      { id: "AAA", pwd: "AAA123"},
      { id: "BBB", pwd: "BBB123"},
      { id: "CCC", pwd: "CCC123"},
    ]
  }

  login = (info) => {
    const result = (this.state.accounts).some((acc, index, array) => {
      return (acc.id === info.id) && (acc.pwd === info.pwd);
    });

    if (result) {
      this.setState({
        isLogin: !this.state.isLogin
      });
    } else {
      alert ("帳號或密碼錯誤");
    }
  };

  logout = e => {
    this.setState({
      isLogin: !this.state.isLogin
    });
  };
  render() {
    var { isLogin } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          {isLogin ? <MainPage logout={this.logout} /> : <LoginPage login={this.login}></LoginPage>}
        </header>
      </div>
    );
  }
}

export default App;
