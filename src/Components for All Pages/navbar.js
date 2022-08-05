import React, { Component } from "react";

var Navbar = () => {
  return (
    
    <nav class="navbar1">
    {}
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"/>

      <div class="content">
        <div class="project_name">
          <a href="#">Class Administrator</a>
        </div>
        <ul class="nav1-list">
          <div class="icon cancel-btn">
            <i class="fas fa-times"></i>
          </div>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Features</a>
          </li>
          <li>
            <a href="about.txt">About</a>
          </li>
          <li>
            <a href="#">Log out</a>
          </li>
        </ul>
        <div class="icon menu-btn">
          <i class="fas fa-bars"></i>
        </div>
      </div>
    </nav>
    
  );
};
export default Navbar;
