<template>
  <div class="login-page">
    <div class="card card-container">
      <img
        id="profile-img"
        src="https://nvdien.blob.core.windows.net/images/360formen.png"
        class="profile-img-card"
      />
      <form
        name="form"
        @submit.prevent="handleLogin"
        class="login-form"
      >
        <div class="form-group">
          <label for="username">Tài khoản</label>
          <input
            v-model="user.username"
            v-validate="'required'"
            type="text"
            class="form-control"
            name="username"
          />
          <div
            v-if="errors.has('username')"
            class="alert alert-danger login-warning"
            role="alert"
          >Tài khoản bắt buộc nhập.</div>
        </div>
        <div class="form-group">
          <label for="password">Mật khẩu</label>
          <input
            v-model="user.password"
            v-validate="'required'"
            type="password"
            class="form-control"
            name="password"
          />
          <div
            v-if="errors.has('password')"
            class="alert alert-danger login-warning"
            role="alert"
          >Mật khẩu bắt buộc nhập.</div>
        </div>
        <div class="form-group">

        </div>
        <div class="form-group">
          <button
            class="btn btn-primary btn-block mt-3"
            :disabled="loading"
          >
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm "
            ></span>
            <span>Đăng nhập</span>
          </button>
        </div>
        <div class="form-group">
          <div
            v-if="message"
            class="alert alert-danger "
            role="alert"
          >{{message}}</div>
        </div>
      </form>
    </div>
  </div>
</template>
  
  <script>
import User from "../../../models/user";

export default {
  name: "Login",
  data() {
    return {
      user: new User("", ""),
      loading: false,
      message: "",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      this.$validator.validateAll().then((isValid) => {
        if (!isValid) {
          this.loading = false;
          return;
        }

        if (this.user.username && this.user.password) {
          this.$store.dispatch("auth/login", this.user).then(
            () => {
              this.$router.push("/profile");
            },
            (error) => {
              this.loading = false;
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            }
          );
        }
      });
    },
  },
};
</script>
  
<style scoped>
.login-page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 400px !important;
  padding: 40px 40px;
}

.login-warning {
  margin-top: 8px !important;
  padding: 0.5rem;
}
.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 120px;
  height: 120px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}

.login-form {
  width: 250px !important;
}
</style>