import React from "react";
import "./Group.css";

export default function Groups() {
  return (
    <div className="noCoursePage">
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
    </div>
  );
}
