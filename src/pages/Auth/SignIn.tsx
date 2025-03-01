import { Button, Form } from "antd"
import { Outlet, useNavigate } from "react-router-dom"
import Typography from "../../components/UI/Typography"
import { useLoginMutation } from "../../redux/slices/auth"
import { setCredentials, setTheme } from "../../redux/features/authSlice"
import { useDispatch } from "react-redux"
import { setThemeInLS, setUser } from "../../utils/helper"
import InputField from "../../components/Form/InputField"
import STRINGS from "../../utils/strings"
import { LockOutlined, UserOutlined } from "@ant-design/icons"
import type { AuthResponseDTO, LoginRequestDTO } from "./type"
import useNotification from "../../components/UI/Notification"
import IMAGES from "../../assets/images"
import axios from "axios"
import { FaRecycle } from "react-icons/fa"
import { MdCleaningServices } from "react-icons/md"

function Index() {
  const { openNotification, contextHolder } = useNotification()
  const dispatch = useDispatch()
  const [_login, { isLoading: isLoginLoading }] = useLoginMutation()
  const navigate = useNavigate()

  const onFinish = async (values: LoginRequestDTO) => {
    dispatch(setTheme("LIGHT"))
    setThemeInLS("LIGHT")
    try {
      axios
        .post("https://sa.wholesalerspk.com/login", values)
        .then((response) => {
          const obj = {
            isActive: true,
            email: values?.email,
            fullName: "shafiq",
            role: "super_admin",
            access_token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzaGFmaXFzaWRkaXFAZ21haWwuY29tIiwiZXhwIjoxNzQxMTk1ODE5fQ.E6V2RmZiia0fSrIUqyN5YPtFrOqcNKDyKaBa6hLOYH8",
          }
          const newObj = { ...obj, access_token: response?.data?.access_token }
          setUser(newObj as AuthResponseDTO)
          dispatch(setCredentials(newObj))
          navigate("/")
          openNotification({
            type: "success",
            title: "Login Success",
          })
        })
        .catch((err) => {
          openNotification({
            type: "error",
            title: err?.response?.data?.detail,
          })
        })
    } catch (error: unknown) {
      console.log(error, "ERROR")
    }
  }

  return (
    <>
      {contextHolder}

      <div className="min-h-screen w-full relative">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${IMAGES.BG_LOGIN})`,
            filter: "blur(1px)",
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/50 to-blue-900/90" />

        <div className="relative z-10 min-h-screen">
          {/* Mobile Header - Only visible on small screens */}
          <div className="lg:hidden w-full bg-black/30 backdrop-blur-sm p-4">
            <div className="flex items-center justify-center gap-3">
              <FaRecycle className="text-white text-2xl" />
              <h1 className="text-xl font-bold text-white">EcoTrack</h1>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex min-h-[calc(100vh-64px)] lg:min-h-screen">
            {/* Left Content - Hidden on small screens */}
            <div className="hidden lg:flex lg:w-[60%] xl:w-[65%] items-center justify-center p-8 bg-gradient-to-r from-transparent to-black/20">
              <div className="max-w-2xl">
                <div className="flex items-center mb-8">
                  <FaRecycle className="text-white text-5xl mr-4" />
                  <h1 className="text-4xl font-bold text-white">EcoTrack</h1>
                </div>

                <div className="backdrop-blur-sm p-8 rounded-2xl border border-white/10">
                  <h2 className="text-3xl font-bold text-white mb-4">Smart Waste Management System</h2>
                  <p className="text-xl text-white/80 mb-6">
                    Track, manage, and optimize garbage collection routes in real-time.
                  </p>

                  <div className="grid grid-cols-2 gap-6 mt-8">
                    <div className="bg-white/5 backdrop-blur-md p-4 rounded-xl flex items-center">
                      <div className="bg-green-500/20 p-3 rounded-full mr-4">
                        <MdCleaningServices className="text-white text-2xl" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium">Efficient Collection</h3>
                        <p className="text-white/70 text-sm">Optimize routes and schedules</p>
                      </div>
                    </div>

                    <div className="bg-white/5 backdrop-blur-md p-4 rounded-xl flex items-center">
                      <div className="bg-blue-500/20 p-3 rounded-full mr-4">
                        <FaRecycle className="text-white text-2xl" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium">Waste Analytics</h3>
                        <p className="text-white/70 text-sm">Track collection metrics</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Login Form */}
            <div className="w-full lg:w-[40%] xl:w-[35%] flex items-center justify-center p-4 lg:bg-black/20">
              <div className="w-full max-w-md">
                <div className="backdrop-blur-md rounded-2xl border border-white/10 p-6 lg:p-8">
                  {/* Logo and Title - Different versions for mobile and desktop */}
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-4">
                      <FaRecycle className="text-white text-3xl" />
                    </div>
                    <Typography
                      variant="headingOneLight"
                      noMargin
                      className="text-center justify-center text-white text-xl lg:text-2xl font-bold"
                    >
                      {/* Different text for mobile and desktop */}
                      <span className="lg:hidden">Welcome Back</span>
                      <span className="hidden lg:block">Waste Management Admin</span>
                    </Typography>
                    <p className="text-white/80 mt-2 text-sm lg:text-base">Sign in to access your dashboard</p>
                  </div>

                  <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{}}
                    onFinish={onFinish}
                    autoComplete="off"
                    layout="vertical"
                  >
                    <InputField
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: `${STRINGS.EMAIL} is required`,
                        },
                      ]}
                      autoComplete="off"
                      inputPrefix={<UserOutlined className="text-white/60" />}
                      placeholder={STRINGS.EMAIL}
                      inputType="input"
                      itemClassName="!bg-white/10 !border-white/20 !text-white placeholder:text-white/60 h-12"
                    />

                    <InputField
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: `${STRINGS.PASSWORD} is required`,
                        },
                      ]}
                      autoComplete="off"
                      placeholder={STRINGS.PASSWORD}
                      inputType="password"
                      inputPrefix={<LockOutlined className="text-white/60" />}
                      margin="small"
                      itemClassName="!bg-white/10 !border-white/20 !text-white placeholder:text-white/60 h-12"
                    />

                    <Button
                      type="primary"
                      htmlType="submit"
                      size="large"
                      className="w-full mt-6 !h-12 !bg-gradient-to-r !from-green-600 !to-teal-600 !border-0 !text-white font-medium text-base hover:!from-green-700 hover:!to-teal-700 shadow-lg"
                      disabled={isLoginLoading}
                      loading={isLoginLoading}
                    >
                      Sign In to Dashboard
                    </Button>

                    <div className="text-center mt-6">
                      <p className="text-white/60 text-sm">© 2023 EcoTrack Waste Management System</p>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  )
}

export default Index

