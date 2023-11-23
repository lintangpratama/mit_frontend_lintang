import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface User {
    username: string;
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
  }

export default function UserDetail() {
  const { id } = useParams();
  const [userData, setUserData] = useState<User>({
    username: "",
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
  });

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
        setUserData({
          username: res.data.username,
          firstname: res.data.name.firstname,
          lastname: res.data.name.lastname,
          phone: res.data.phone,
          email: res.data.email,
        });
      });
    };
    getUserById(id);
  }, []);
  return (
    <div className="w-full max-w-md p-4 mx-auto mt-10 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          User Detail
        </h5>
        <a
          href={`edit/${id}`}
          className="text-sm font-medium text-blue-600 hover:text-blue-900 dark:text-blue-500"
        >
          Edit user
        </a>
      </div>
      <div className="flow-root">
        <ul
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-700"
        >
          <li className="py-3 sm:py-4">
            <div className="flex items-center">
              <div className="flex-1 min-w-0 ms-4">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  Full Name
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400 capitalize">
                  {userData.firstname + " " + userData.lastname}
                </p>
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center">
              <div className="flex-1 min-w-0 ms-4">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  Username
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  {userData.username}
                </p>
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center">
              <div className="flex-1 min-w-0 ms-4">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  Email
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  {userData.email}
                </p>
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center">
              <div className="flex-1 min-w-0 ms-4">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  Phone
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  {userData.phone}
                </p>
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center">
              <div className="flex-1 min-w-0 ms-4">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  Phone
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  {userData.phone}
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
