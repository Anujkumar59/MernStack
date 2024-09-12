import './App.css';
import React, { useState, useRef } from 'react';

function App() {
  const [jobList, setJobList] = useState([]);
  const [id, setId] = useState(null); // Set to null initially
  const nameRef = useRef();
  const emailRef = useRef();
  const pswRef = useRef();
  const mobileRef = useRef();

  const getData = async () => {
    try {
      let res = await fetch("http://localhost:8080/getjob", { method: "GET" });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      let json = await res.json();
      setJobList(json);
    } catch (error) {
      console.error("Error fetching job list: ", error);
    }
  };

  const job_create = async () => {
    let data = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: pswRef.current.value,
      mobile: mobileRef.current.value,
    };

    let res = await fetch("http://localhost:8080/createJob", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    // Automatically clear input fields after submission
    nameRef.current.value = "";
    emailRef.current.value = "";
    pswRef.current.value = "";
    mobileRef.current.value = "";

    let json = await res.json();
    console.log(json);
    getData();
  };

  const deleteJob = async (id) => {
    let res = await fetch(`http://localhost:8080/delete_id`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id }),
    });
    if (res.ok) {
      alert("Deleted successfully");
      getData();
    } else {
      alert("Unable to delete");
    }
  };

  const loadDataForUpdate = (id) => {
    let matchJob = jobList.find((j) => id === j._id);
    if (matchJob) {
      setId(id);
      nameRef.current.value = matchJob.name;
      emailRef.current.value = matchJob.email;
      pswRef.current.value = matchJob.password;
      mobileRef.current.value = matchJob.mobile;
    }
  };

  const updateJob = async () => {
    let data = {
      id: id,
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: pswRef.current.value,
      mobile: mobileRef.current.value,
    };

    let res = await fetch("http://localhost:8080/updateJob", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      alert("Updated successfully");
      getData();
    } else {
      alert("Unable to update");
    }
  };

  return (
    <div>
      {jobList.map((obj, index) => {
        return (
          <div key={index}>
            <h1>{obj.name}</h1>
            <button onClick={() => deleteJob(obj._id)}>Delete</button>
            <button onClick={() => loadDataForUpdate(obj._id)}>Load for Update</button>
          </div>
        );
      })}
      <button onClick={getData}>Get Job List</button>

      <div>
        <h1>Create/Update Form</h1>
        <div>
          <h6>New Name:</h6>
          <input type="text" ref={nameRef} placeholder="New Name" />
        </div>
        <div>
          <h6>New Email:</h6>
          <input type="email" ref={emailRef} placeholder="New Email" />
        </div>
        <div>
          <h6>New Password:</h6>
          <input type="password" ref={pswRef} placeholder="New Password" />
        </div>
        <div>
          <h6>New Mobile:</h6>
          <input type="text" ref={mobileRef} placeholder="New Mobile" />
        </div>

        <button onClick={id ? updateJob : job_create}>
          {id ? "Update Job" : "Create Job"}
        </button>
      </div>
    </div>
  );
}

export default App;
