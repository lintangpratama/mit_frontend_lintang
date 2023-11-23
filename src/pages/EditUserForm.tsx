import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

// User interface
interface User {
  username: string;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
}

export default function EditUserForm() {
  const { id } = useParams();
  const [inputFields, setInputFields] = useState<User>({
    username: "",
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
  });

  // function to handle input fields
  const inputHandler = (e) => {
    const getInputAttribute = e.target.getAttribute("name");

    setInputFields({
      ...inputFields,
      [getInputAttribute]: e.target.value,
    });

    console.log(inputFields);
  };

  // function to submit input fields adn hit Fake API
  const submitFormHandler = async (e) => {
    e.preventDefault();
    try {
      if (
        !inputFields.username ||
        !inputFields.firstname ||
        !inputFields.lastname ||
        !inputFields.email ||
        !inputFields.phone
      ) {
        Swal.fire({
          title: "Edit User Failed!",
          text: "Please complete all the user data",
          icon: "error",
          confirmButtonText: "Ok",
        });
      } else {
        const response = await axios.post("https://fakestoreapi.com/users", {
          email: inputFields.email,
          username: inputFields.username,
          phone: inputFields.phone,
          name: {
            firstname: inputFields.firstname,
            lastname: inputFields.lastname,
          },
        });
        localStorage.setItem("login", response.data.token);
        Swal.fire({
          title: "Add New User Successful!",
          text: "The new user is added, but not saved in the database",
          icon: "success",
          confirmButtonText: "Ok",
        });
      }
      window.location.href = "/";
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
    if(!localStorage.getItem("login")) {
        window.location.href = "/login"
    }
  }, [])

  useEffect(() => {
    const getUserById = (id) => {
      axios.get(`https://fakestoreapi.com/users/${id}`).then((res) => {
        console.log(res.data);
        setInputFields({
          username: res.data.username,
          firstname: res.data.name.firstname,
          lastname: res.data.name.lastname,
          phone: res.data.phone,
          email: res.data.email,
        });
      });
    };

    getUserById(id);
  }, [id]);

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Edit user
            </h1>
            <form className="space-y-4 md:space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  value={inputFields.firstname}
                  onChange={inputHandler}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="First Name"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  value={inputFields.lastname}
                  onChange={inputHandler}
                  placeholder="Last Name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={inputFields.username}
                  onChange={inputHandler}
                  placeholder="Username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={inputFields.email}
                  onChange={inputHandler}
                  placeholder="Email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  value={inputFields.phone}
                  onChange={inputHandler}
                  placeholder="Phone"
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
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
