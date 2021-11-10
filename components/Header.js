import React, { Component } from "react";
import Link from "next/link";

class Header extends Component {
  state = {};

  logOut = () => {
    localStorage.removeItem("accessToken");
    window.location = "/";
  };

  render() {
    return (
      <div class="fixed w-full text-gray-100">
        <nav
          class="flex justify-between"
          style={{ backgroundColor: "#3f51b5" }}
        >
          <div class="text-2xl ml-4 p-5">Vachan Admin</div>
          <div class="mt-6">
            <Link onClick={this.logOut} href="/">
              <a class="p-4">Log Out</a>
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
