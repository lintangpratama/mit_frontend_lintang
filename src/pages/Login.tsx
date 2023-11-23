import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

interface LoginInput {
  username: string;
  password: string;
}

export default function Login() {
  const [inputFields, setInputFields] = useState<LoginInput>({
    username: "",
    password: "",
  });

  const inputHandler = (e) => {
    const getInputAttribute = e.target.getAttribute("name");

    setInputFields({
      ...inputFields,
      [getInputAttribute]: e.target.value,
    });

    console.log(inputFields);
  };

  const submitFormHandler = async (e) => {
    e.preventDefault();
    try {
      if (!inputFields.username || !inputFields.password) {
        Swal.fire({
          title: "Login Error!",
          text: "You should input your username and password",
          icon: "error",
          confirmButtonText: "Ok",
        });
      } else {
        const response = await axios.post(
          "https://fakestoreapi.com/auth/login",
          {
            username: inputFields.username,
            password: inputFields.password,
          }
        );
        localStorage.setItem("login", response.data.token);
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error.response.data);
      Swal.fire({
        title: "Login Error!",
        text: error.response.data,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

// Check user authorization
  useEffect(() => {
    if(localStorage.getItem("login")) {
        window.location.href = "/"
    }
  }, [])

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  onChange={inputHandler}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="username"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={inputHandler}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <button
                onClick={(e) => {
                  submitFormHandler(e);
                }}
                className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
