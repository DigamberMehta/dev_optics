// Login.jsx
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useContext, useEffect } from "react"; // Import useEffect
import authContext from "../context/authContext";
import { toast } from "sonner"; // Import toast from sonner

const Login = ({ closeModal }) => { // Receive the closeModal prop
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { user, isLoading, isError, registerUser, loginUser } =
    useContext(authContext);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true); // Trigger fade-in on mount
  },);

  const handleClose = () => {
    setIsVisible(false);
    closeModal(); // Remove the setTimeout for testing
  };

  console.log(user, isLoading, isError);

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  const handleRegistration = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;
    try {
      if (type === "signup") {
        const response = await registerUser(inputData);
        if (response?.data?.token && response?.data?.user) {
          toast.success("Registration successful!");
          handleClose(); // Close the modal on success
        } else {
          toast.error(response?.data?.message || "Registration failed. Please try again.");
          // Do not close modal on error
        }
      } else {
        const response = await loginUser(inputData);
        if (response?.data?.token && response?.data?.user) {
          toast.success("Login successful!");
          handleClose(); // Close the modal on success
        } else {
          toast.error(response?.data?.message || "Login failed. Please check your credentials.");
          // Do not close modal on error
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'An unexpected error occurred.');
      // Do not close modal on error
    }
  };

  return (
    <div className={`relative bg-white rounded-2xl shadow-lg p-8 w-full max-w-md ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Added transition to Login content */}
      <button
        onClick={handleClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        <i className="fa fa-times"></i>
      </button>
      <Tabs defaultValue="Signup" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="Signup">Signup</TabsTrigger>
          <TabsTrigger value="Login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="Signup">
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>Create a new Account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  onChange={(e) => changeInputHandler(e, "signup")}
                  type="text"
                  placeholder="Eg. Akash"
                  required
                  name="name"
                  value={signupInput.name}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  placeholder="example@email.com"
                  required
                  name="email"
                  onChange={(e) => changeInputHandler(e, "signup")}
                  value={signupInput.email}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  placeholder="password"
                  required
                  name="password"
                  value={signupInput.password}
                  onChange={(e) => changeInputHandler(e, "signup")}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleRegistration("signup")}>
                Signup
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="Login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Login to your Account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  placeholder="example@email.com"
                  required
                  onChange={(e) => changeInputHandler(e, "login")}
                  name="email"
                  value={loginInput.email}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input
                  type="password"
                  name="password"
                  value={loginInput.password}
                  onChange={(e) => changeInputHandler(e, "login")}
                  placeholder="password"
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleRegistration("login")}>Login</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;