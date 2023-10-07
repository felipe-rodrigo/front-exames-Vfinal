<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleRegister">
      <p class="col-12 text-h4 text-center text-bold my-font q-ma-md q-mb-xl">Cadastro de Usuario</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          outlined
          rounded
          label="Nome do Usuário"
          v-model="form.name"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Usuário Necessário']"
        />

        <q-input
          outlined
          rounded
          label="Email"
          v-model="form.email"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Email necessário']"
          type="email"
        />
        <q-input
          outlined
          rounded
          label="Confirme o Email"
          v-model="form.emailConfirm"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Email necessário']"
          type="email"
        />

        <q-input outlined
        rounded label="Senha" v-model="password" :type="isPwd ? 'password' : 'text'" hint="Digite sua senha"
        :rules="[val => (val && val.length > 0) || 'Senha necessária']"
        >
          <template v-slot:append>
            <q-icon
              label="Confirme sua senha"
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <div class="full-width q-pt-md q-gutter-y-sm">
          <q-btn
            label="Register"
            color="primary"
            class="full-width"
            outline
            rounded
            type="submit"
          />

          <q-btn
            label="Back"
            color="dark"
            class="full-width"
            rounded
            flat
            :to="{ name: 'login' }"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
// import useAuthUser from 'src/composables/UseAuthUser'
import useNotify from 'src/composables/UseNotify'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'PageRegister',

  setup () {
    const router = useRouter()
    // const { register } = useAuthUser()
    const { notifyError, notifySuccess } = useNotify()

    const form = ref({
      name: '',
      email: '',
      emailConfirm: '',
      password: ''
    })

    const handleRegister = async () => {
      try {
        // await register(form.value)
        notifySuccess()
        router.push({
          name: 'login'
          // query: { email: form.value.email }
        })
      } catch (error) {
        notifyError(error.message)
      }
    }

    return {
      form,
      handleRegister,
      isPwd: ref(true)
    }
  }
})
</script>
