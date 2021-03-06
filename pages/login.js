import React, { Component } from "react";
import Link from "next/link";
import apiUrl from "../components/GlobalUrl";
class LoginPage extends Component {
  state = {
    message: "",
    email: "",
    password: "",
    forgotPasswordDailogOpen: false,
    verificationCodeDialogOpen: false,
    dialogEmail: "",
    verificationCode: "",
    verifiedSuccess: false,
    newPassword: false,
    redirect: false,
  };

  async authenticate() {
    var formData = new FormData();
    var apiData = {
      email: this.state.email,
      password: this.state.password,
    };
    for (var name in apiData) {
      formData.append(name, apiData[name]);
    }
    const data = await fetch(apiUrl + "/v1/auth", {
      method: "POST",
      body: formData,
    });
    const myJson = await data.json();
    if ("accessToken" in myJson) {
      this.setState({ redirect: true });
      await localStorage.setItem("accessToken", myJson.accessToken);
      window.location = "/dashboard";
      this.props.setAccessToken({
        accessToken: myJson.accessToken,
      });
    } else {
      this.props.displaySnackBar({
        snackBarMessage: myJson.message,
        snackBarOpen: true,
        snackBarVariant: myJson.success ? "success" : "error",
      });
    }
  }

  handleLoginSubmit = (e) => {
    e.preventDefault();
    this.authenticate();
  };

  handleClose = () => {
    this.setState({
      forgotPasswordDailogOpen: false,
      verificationCodeDialogOpen: false,
      verifiedSuccess: false,
    });
  };

  handleOpen = () => {
    this.setState({ forgotPasswordDailogOpen: true });
  };

  async forgotPassword() {
    var formData = new FormData();
    var apiData = {
      email: this.state.dialogEmail,
    };
    for (var name in apiData) {
      formData.append(name, apiData[name]);
    }
    const data = await fetch(apiUrl + "v1/resetpassword", {
      method: "POST",
      body: formData,
    });
    const myJson = await data.json();
    if (myJson.success) {
      this.setState({
        message: myJson.message,
        forgotPasswordDailogOpen: false,
        verificationCodeDialogOpen: true,
      });
    } else {
      this.props.displaySnackBar({
        snackBarMessage: myJson.message,
        snackBarOpen: true,
        snackBarVariant: myJson.success ? "success" : "error",
      });
    }
  }

  handleSend = (e) => {
    e.preventDefault();
    this.forgotPassword();
  };

  async resetPassword() {
    var formData = new FormData();
    var apiData = {
      temporaryPassword: this.state.verificationCode,
      password: this.state.newPassword,
    };
    for (var name in apiData) {
      formData.append(name, apiData[name]);
    }
    const reset = await fetch(apiUrl + "v1/forgotpassword", {
      method: "POST",
      body: formData,
    });
    const myJson = await reset.json();
    if (myJson.success) {
      this.setState({
        verificationCodeDialogOpen: false,
        verifiedSuccess: true,
      });
    }
  }

  handleVerificationCode = (e) => {
    e.preventDefault();
    this.resetPassword();
  };

  handleOk = () => {
    this.setState({ verifiedSuccess: false });
  };
  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div class="w-full h-screen flex items-center justify-center">
        <form
          class="w-full md:w-1/4 bg-white rounded-lg border shadow"
          onSubmit={this.handleLoginSubmit}
        >
          <h2 class="text-3xl text-center text-gray-700 m-4">Log In</h2>
          <div class="px-12 pb-10">
            <div class="w-full mb-2">
              <div class="flex item-center mb-2">
                <input
                  type="email"
                  placeholder="Email"
                  class="px-8 w-full border rounded py-2 text-gray-700 focus:outline-none"
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
              </div>
              <div class="flex items-center mb-2">
                <input
                  type="password"
                  placeholder="Password"
                  class="px-8  w-full border rounded py-2 text-gray-700 focus:outline-none"
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
              </div>
              <a
                href="#"
                class="text-xs text-gray-500 float-start mb-5 hover:underline"
              >
                Forgot Password
              </a>
              <div class="flex mt-4">
                <Link href="/signup">
                  <a class="flex-1 text-blue-600 hover:underline">
                    Create account
                  </a>
                </Link>
                <button
                  type="submit"
                  class="flex-1 py-2 p-5 rounded text-gray-200 focus:outline-none hover:bg-gray-700"
                  style={{ backgroundColor: "#3f51b5" }}
                  onClick={this.handleLoginSubmit}
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginPage;
