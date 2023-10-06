<template>
  <q-page padding class="col-12 col-md-12 flex justify-center items-center q-ma-md">
    <div class="">
      <q-card class="">
        <q-form class="flex justify-center items-center row" @submit.prevent="handleLogin">
          <p class="col-12 text-h5 text-center my-font">Login</p>
          <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md my-font">
            <q-input
              label="Usuario"
              v-model="form.usuario"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Usuário é obrigatório',
              ]"
              type="usuario"
            />

            <q-input
              label="Password"
              v-model="form.password"
              lazy-rules
              type="password"
              :rules="[
                (val) => (val && val.length > 0) || 'Senha é obrigatória',
              ]"
            />

            <div class="full-width q-pt-md">
              <q-btn
                label="Login"
                color="primary"
                class="full-width"
                rounded
                type="submit"
              />
            </div>
            <div class="full-width q-gutter-y-sm">
              <q-btn
                label="Cadastrar-se"
                color="primary"
                rounded
                outline
                class="full-width"
                to="/register"
              />
              <q-btn
                label="Forgot Password ?"
                color="primary"
                class="full-width"
                flat
                :to="{ name: 'forgot-password' }"
                size="sm"
              />
            </div>
          </div>
        </q-form>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
//import useAuthUser from "src/composables/UseAuthUser";
//import useNotify from "src/composables/UseNotify";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "PageLogin",

  setup() {
    const router = useRouter();

    // const { login } = useAuthUser();

    const form = ref({
      usuario: "",
      password: "",
    });

    const handleLogin = async () => {
      try {
        // await login(form.value);
        // notifySuccess("Login successfully!");
        router.push({ name: "home" });
      } catch (error) {
        notifyError(error.message);
      }
    };

    return {
      form,
      handleLogin,
      //useAuthUser,
    };
  },
});
</script>

<!-- <style>
.my-card {
  width: 50%;
}
</style> -->
