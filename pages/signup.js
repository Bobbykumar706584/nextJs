import Link from "next/link";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import apiUrl from "../components/GlobalUrl";

class SignUp extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    message: "",
    redirect: false,
    verificationDialogOpen: false,
  };

  async registerUser() {
    var formData = new FormData();
    var apiData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
    };
    for (var name in apiData) {
      formData.append(name, apiData[name]);
    }
    const data = await fetch(apiUrl + "/v1/registrations", {
      method: "POST",
      body: formData,
    });
    const myJson = await data.json();

    if (myJson.success) {
      this.setState({ message: myJson.message, verificationDialogOpen: true });
    } else {
      alert(myJson.message);
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.registerUser();
  };

  handleOk = () => {
    this.setState({ redirect: true });
  };

  handleClose = () => {
    this.setState({ verificationDialogOpen: false });
  };
  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/signin" />;
    }
    return (
      <div class="w-full h-screen flex items-center justify-center">
        <form
          class="w-full md:w-1/4 bg-white rounded-lg border shadow"
          onSubmit={this.handleSubmit}
        >
          <h2 class="text-3xl text-center text-gray-700 m-4">Sign Up</h2>
          <div class="px-12 pb-10">
            <div class="w-full mb-2">
              <div class="flex items-center mb-2">
                <input
                  type="text"
                  placeholder="First Name"
                  class="px-8 w-full border rounded py-2 mr-4 text-gray-700 focus:outline-none"
                  onChange={(e) => this.setState({ firstName: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  class="px-8 w-full border rounded py-2 text-gray-700 focus:outline-none"
                  onChange={(e) => this.setState({ lastName: e.target.value })}
                />
              </div>
              <div class="flex items-center mb-2">
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
                  placeholder="password"
                  class="px-8 w-full border rounded py-2 text-gray-700 focus:outline-none"
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
              </div>
              <div class="flex mt-4">
                <Link href="/login">
                  <a class="flex-1 text-blue-600 hover:underline">
                    Sign in Instead{" "}
                  </a>
                </Link>
                <button
                  type="submit"
                  class="flex-1 py-2 p-5 rounded text-gray-100 focus:outline-none"
                  style={{ backgroundColor: "#3f51b5" }}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SignUp;
