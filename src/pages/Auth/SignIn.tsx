import { Col, Row, Button, Form } from "antd"
import { Outlet, useNavigate } from "react-router-dom"
import Typography from "../../components/UI/Typography"
import { useLoginMutation } from "../../redux/slices/auth"
import { setCredentials, setTheme } from "../../redux/features/authSlice"
import { useDispatch, useSelector } from "react-redux"
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
  const { user } = useSelector((state: any) => state.auth)
  console.log("user:::", user)

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
          console.log("response: ", response)
        })
        .catch((err) => {
          openNotification({
            type: "error",
            title: err?.response?.data?.detail,
          })
          console.log("error: ", err)
        })
    } catch (error: unknown) {
      console.log(error, "ERRO")
    }
  }

  return (
    <>
      {contextHolder}

      <div className="h-screen w-full overflow-hidden relative">
        {/* Background with garbage collection theme */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${IMAGES.BG_LOGIN})`,
            filter: "blur(1px)"
          }}
        />

        {/* Overlay with garbage bins pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/50 to-blue-900/90" />

        {/* Decorative garbage bins pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1532996122724-e3c354a0b15b")`,
          }}
        />

        <Row className="h-full w-full relative z-10">
          {/* Left side with logo and illustration */}
          <Col xs={0} sm={0} md={0} lg={14} xl={14} className="flex items-center justify-center p-8">
            <div className="max-w-2xl">
              <div className="flex items-center mb-8">
                <FaRecycle className="text-white text-5xl mr-4" />
                <h1 className="text-4xl font-bold text-white">EcoTrack</h1>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-white/20">
                <h2 className="text-3xl font-bold text-white mb-4">Smart Waste Management System</h2>
                <p className="text-xl text-white/80 mb-6">
                  Track, manage, and optimize garbage collection routes in real-time.
                </p>

                <div className="grid grid-cols-2 gap-6 mt-8">
                  <div className="bg-white/10 p-4 rounded-xl flex items-center">
                    <div className="bg-green-500/20 p-3 rounded-full mr-4">
                      <MdCleaningServices className="text-white text-2xl" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">Efficient Collection</h3>
                      <p className="text-white/70 text-sm">Optimize routes and schedules</p>
                    </div>
                  </div>

                  <div className="bg-white/10 p-4 rounded-xl flex items-center">
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
          </Col>

          {/* Right side with login form */}
          <Col xs={24} sm={24} md={24} lg={10} xl={10} className="flex items-center justify-center">
            <div className="w-full max-w-md px-6 py-8 bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4">
                  <FaRecycle className="text-white text-3xl" />
                </div>
                <Typography
                  variant="headingOneLight"
                  noMargin
                  className="text-center justify-center text-white text-2xl font-bold"
                >
                  Waste Management Admin
                </Typography>
                <p className="text-white/80 mt-2">Sign in to access your dashboard</p>
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
									inputPrefix={<UserOutlined />}
                  placeholder={STRINGS.EMAIL}
                  inputType="input"
                //   className="mb-4"
                  // Override styles for input field
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
                  // Override styles for input field
                  itemClassName="!bg-white/10 !border-white/20 !text-white placeholder:text-white/60 h-12"
                />

                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  className="w-full mt-8 mb-4 !h-12 !bg-gradient-to-r !from-green-600 !to-teal-600 !border-0 !text-white font-medium text-base hover:!from-green-700 hover:!to-teal-700 shadow-lg"
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
          </Col>
        </Row>
        <Outlet />
      </div>
    </>
  )
}
export default Index

