import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../features/user/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SignUp() {
  const { loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      toast.success("User Created Successfully")
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(registerUser(user));
    setUser({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="h-full flex items-center justify-center">
      <div className="w-80 shadow-lg p-4 bg-white-400 flex flex-col items-center rounded-sm">
        <Heading label="Sign Up" />
        <SubHeading label="Enter Your information to create an account" />
        <div className="w-full py-2">
          <InputBox
            label="First Name"
            placeholder="John"
            type="text"
            name="firstName"
            value={user.firstName}
            handleChange={handleChange}
          />
          <InputBox
            label="Last Name"
            placeholder="Doe"
            type="text"
            name="lastName"
            value={user.lastName}
            handleChange={handleChange}
          />
          <InputBox
            label="Email"
            placeholder="johndoe@example.com"
            type="text"
            name="email"
            value={user.email}
            handleChange={handleChange}
          />
          <InputBox
            label="Password"
            placeholder="******"
            type="password"
            name="password"
            value={user.password}
            handleChange={handleChange}
          />
        </div>
        <div className="w-full py-2">
          <Button
            label={loading ? "Loading..." : "Register"}
            type="submit"
            color="blue"
            handleClick={handleClick}
            disabled={loading}
          />
        </div>
        <div className="w-full py-2 text-right">
          <BottomWarning
            warningText="Already have an account?"
            to="/login"
            label="Login"
          />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
