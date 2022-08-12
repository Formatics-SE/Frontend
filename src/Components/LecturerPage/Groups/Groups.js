import React from "react";
import "./Group.css";

export default function Groups() {
  return (
    <div className="noCoursePage">
      <nav className="navbar1">
        <div className="content">
          <div className="project_name">
            <a>Class Administrator</a>
          </div>
          <ul className="nav1-list">
            <div className="icon cancel-btn">
              <i className="fas fa-times"></i>
            </div>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Help</a>
            </li>
            <li>
              <a href="#">Log out</a>
            </li>
          </ul>
          <div className="icon menu-btn">
            <i className="fas fa-bars"></i>
          </div>
        </div>
      </nav>

      <section className="bodyContent">
        <div>
          <h4>No groups have been created for this course</h4>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          data-bs-toggle="confirm"
          data-bs-target="#groupConfirm"
          id="confirmButton"
          onchange="getInputValue()"
        >
          Create Groups
        </button>
      </section>

      <footer className="footer">
        <div className="inner-footer">
          <div className="options">
            <ul className="links">
              <li>
                <a href="#">Privacy</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
              <li>
                <a href="#">Terms & Conditions Apply</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="outer-footer">
          Copyright &copy; 2022 Formatics. All rights reserved
        </div>
      </footer>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
        crossorigin="anonymous"
      ></script>
    </div>
  );
}
