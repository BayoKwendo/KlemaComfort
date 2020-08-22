import * as React from 'react';
import './style.css';
import { Icon } from 'react-fa';
import { login, LoginData } from 'Services/Api/User';
import { baseURL } from 'Helpers/baseURL';
import { currentUserSubject } from 'Helpers/storage.helper';
import axios from 'axios';
import { isLoggedIn } from 'Helpers/isLoggedIn';

interface LoginFormProps {
  active: boolean;
  openRegisterForm: () => void;
}
interface LoginFormState {
  remember: boolean;
  email: string;
  isLoading: boolean;
  password: string;
  error: string;
  errorShow: boolean;
  alert_error_color: string;
  isLoggedIn: boolean;
  isChecked: boolean;
  successShow: boolean;
  statusMessage: string;
  isShowSuccess: boolean;
  submitted: boolean;
  isShowError: boolean;
  login: boolean;
}
class LeaseAgreement extends React.Component<LoginFormProps, LoginFormState> {
  constructor() {
    super();
    this.state = {
      remember: false,
      email: '',
      isLoading: false,
      password: '',
      error: '',
      errorShow: false,
      isShowError: false,
      alert_error_color: '',
      isLoggedIn: false,
      isChecked: false,
      successShow: false,
      statusMessage: '',
      isShowSuccess: false,
      submitted: false,
      login: true,
    };

    if (isLoggedIn == " true ") {
      window.location.href = "/newproperty/sell";
    }
  }

  signIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginData: LoginData = {
      userName: this.state.email,
      password: this.state.password
    };
    login(loginData).then((responseData) => {
      // tslint:disable-next-line:no-console
      console.log(responseData);
    });
  }
  toggleRemember = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      remember: e.currentTarget.checked
    });
  }
  updateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      email: e.currentTarget.value
    });
  }
  updatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      password: e.currentTarget.value
    });
  }


  onSubmit = e => {
    e.preventDefault();
    this.setState({ isLoading: true });
    if (this.state.email === "" || this.state.password === "") {
      this.setState({
        isLoading: false,
        error: "Email Address and password is required",
        errorShow: true,
        submitted: true,

        alert_error_color: "alert alert-danger"
      });
    } else {
      let formData = {
        "email_address": this.state.email,
        "password": this.state.password
      }
      console.log("DATA", JSON.stringify(formData))
      this.setState({ isLoading: true });
      axios.post(baseURL + 'login', formData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      })
        .then((response) => {
          if (response.data.status) {
            localStorage.setItem("currentUser", JSON.stringify(response.data));
            localStorage.setItem("user_role", response.data.response.user.role_id);
            localStorage.setItem("token", response.data.response.token);
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("fullname", response.data.response.user.first_name + " " + response.data.response.user.last_name)
            localStorage.setItem("id", response.data.response.user.id);
            currentUserSubject.next(response.data);
            this.setState({
              statusMessage: "Login Success! Redirecting....",
              isShowError: true,
              errorShow: false,
              submitted: true,
              isLoggedIn: true
            });

            if (response.data.response.user.role_id == 1) {
              window.setTimeout(() => {
                window.location.href = "/user/role";
                this.setState({ isLoading: false });

              }, 2000);

            } if (response.data.response.user.role_id == 3) {
              window.setTimeout(() => {
                window.location.href = "/leaseLandLord";
                this.setState({ isLoading: false });

              }, 2000);

            }
            else if (response.data.response.user.role_id == 4) {
              window.setTimeout(() => {
                window.location.href = "/complain/rent";
                this.setState({ isLoading: false });

              }, 2000);
            }
          }
          else {

            this.setState({});
            this.setState({
              alert_error_color: "alert alert-danger",
              errorShow: true,
              error: "Wrong Email or Password",
              submitted: true,
              isLoading: false
            });
            this.setState({});
          }
        }).catch(error => {
          this.setState({
            alert_error_color: "alert alert-danger",
            errorShow: true,
            error: "Wrong Email or Password",
            submitted: true,
            isLoading: false
          });
        });
      this.setState({ password: "", email: "" });
    }
  };

  render() {

    return (
      <>

        <div
          className={'loginForm modal slimScroll fade' + (this.props.active ? ' in' : '')}
        >
          <div className="modal-dialog modal-sm">
            <div className="modal-content">
              <>
                {this.state.submitted ? (
                  <>
                    {this.state.errorShow && (
                      <div>
                        {this.state.errorShow ? (
                          <div
                            className={this.state.alert_error_color}
                            style={{ fontSize: "13px", fontWeight: 'normal' }}
                          >
                            <p
                              style={{ textAlign: "left", marginLeft: "20px" }}
                            >
                              {this.state.error}{" "}
                              {this.state.isLoggedIn ? (
                                <span>

                                </span>
                              ) : null}
                            </p>
                          </div>
                        ) : null}
                      </div>
                    )}
                    {this.state.isShowError ? (
                      <div
                        className="alert alert-success"
                        style={{ fontSize: "13px" }}>
                        {this.state.statusMessage}
                      </div>
                    ) : null}
                  </>
                ) : null}
              </>
              <div className="modal-header">
                <h4 className="modal-title" style={{color: "black"}}>Sign In</h4>
              </div>
              <div className="modal-body">
                <form role="loginForm form" onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <div className="btn-group-justified">
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="btn-group-justified">
                    </div>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="email_address"
                      placeholder="Email Address"
                      className="form-control"
                      onChange={this.updateEmail}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="form-control"
                      onChange={this.updatePassword}
                    />
                  </div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-xs-6">
                        <div className="checkbox custom-checkbox">
                          <label>
                            <input type="checkbox" checked={this.state.remember} onChange={this.toggleRemember} />
                            <Icon name="check" />
                          Remember me
                        </label>
                        </div>
                      </div>
                      <div className="col-xs-6 align-right">
                        <p className="help-block">
                          <a href="#" className="text-green isThemeText text-red">
                            Forgot password?
                        </a>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="btn-group-justified">
                      <button type="submit" className="btn btn-lg btn-green isThemeBtn btn-red">
                        {
                          this.state.isLoading ? "Please wait..." : "Sign In"
                        }
                      </button>
                    </div>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default LeaseAgreement;