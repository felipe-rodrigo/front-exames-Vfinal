<template>
  <q-page style="background-image: ;" class="col-12 col-md-6 justify-center items-center q-ma-md">
    <div class="col col-md-6">
        <q-form class="justify-center items-center row" @submit.prevent="handleLogin">
          <p class="col-12 text-h3 text-center text-bold my-font q-ma-xs">Exames - MT</p>
          <p class="col-12 text-h4 text-center text-bold my-font q-ma-md q-mt-xl q-mb-xl">Login</p>
          <div class="flex justify-center items-center col-md-4 col-sm-6 col-xs-10 my-font">
            <div class="full-width">
              <q-input
              outlined
              rounded
              label="Usuario"
              v-model="form.usuario"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Usuário é obrigatório',
              ]"
              type="usuario"
            />

            <q-input outlined
            rounded label="Senha" style="font-family: Arial, Helvetica, sans-serif;" v-model="password" :type="isPwd ? 'password' : 'text'" hint="Digite sua senha">
              <template v-slot:append>
                <q-icon
                  label="Digite sua senha"
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>



            <div class="row flex justify-center items-center q-pa-md q-pb-xl">
              <q-btn
                label="Login"
                color="primary"
                class="full-width q-ma-md"
                rounded
                type="submit"
              />
              <q-btn
                label="Cadastrar-se"
                color="primary"
                rounded
                outline
                class="full-width"
                :to="{ name: 'register' }"
              />
            </div>
          </div>
          </div>
        </q-form>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
//import useAuthUser from "src/composables/UseAuthUser";
import useNotify from "src/composables/UseNotify";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "PageLogin",

  setup() {
    const router = useRouter();
    const { notifyError, notifySuccess } = useNotify()
    // const { login } = useAuthUser();

    const form = ref({
      usuario: "",
      password: "",
    });

    const handleLogin = async () => {
      try {
        // await login(form.value);
        notifySuccess("Login Efetuado!");
        router.push({ name: "home" });
      } catch (error) {
        notifyError(error.message);
      }
    };

    return {
      form,
      handleLogin,
      //useAuthUser,

      isPwd: ref(true)
    };
  },
});
</script>

<!-- <style>
.my-card {
  width: 50%;
}
</style> -->
