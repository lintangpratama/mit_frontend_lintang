import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

interface UserData {
  address: {
    geolocation: {
      lat: string;
      long: string;
    };
    city: string;
    street: string;
    number: number;
    zipcode: string;
  };
  id: number;
  email: string;
  username: string;
  password: string;
  name: {
    firstname: string;
    lastname: string;
  };
  phone: string;
  __v: number;
}

export default function User() {
  const [userData, setUserData] = useState<Array<UserData>>();

// Check user authorization
  useEffect(() => {
    if(!localStorage.getItem("login")) {
        window.location.href = "/login"
    }
  }, [])

  useEffect(() => {
    const getUsers = async () => {
      const response = await axios.get("https://fakestoreapi.com/users");
      setUserData(response.data);
    };
    getUsers();
  }, []);

  const deleteUserHandler = (id: number) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`https://fakestoreapi.com/users/${id}`).then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          });
        }
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <>
      <div className="flex p-10 justify-between items-center ">
        <div>
          <h1 className="font-medium text-lg mb-2">Users</h1>
          <p className="text-gray-700 text-sm">
            A list of all the users including their name, username, email and
            phone.
          </p>
        </div>
        <a href="/add">
          <button className="text-white bg-blue-600 hover:bg-blue-500  font-medium rounded-lg text-sm px-4 h-9 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            Add user
          </button>
        </a>
      </div>
      <div className="relative overflow-x-auto p-10">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          {!userData ? (
            <></>
          ) : (
            <tbody>
              {userData.map((user) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white capitalize"
                  >
                    {user.name.firstname + " " + user.name.lastname}
                  </th>
                  <td className="px-6 py-4">{user.username}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.phone}</td>
                  <td className="flex px-6 py-4">
                    <a href={`user/${user.id}`}>
                      <button className="pr-6 text-blue-600 cursor-pointer hover:text-blue-900 font-semibold">
                        Detail
                      </button>
                    </a>
                    <button
                      onClick={() => {
                        deleteUserHandler(user.id);
                      }}
                      className="text-red-600 cursor-pointer hover:text-red-900 font-semibold"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
        {!userData ? (
          <p className="w-full text-center text-sm text-gray-700 py-4">
            No user data
          </p>
        ) : (
          <></>
        )}
        <button
          onClick={() => {
            localStorage.removeItem("login");
            window.location.href = "/login";
          }}
          className="text-white mt-10 text-center bg-red-600 hover:bg-red-500  font-medium rounded-lg text-sm px-4 h-9 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Log out
        </button>
      </div>
    </>
  );
}
